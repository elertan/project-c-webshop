using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_filling_tool_v2.SpotifyDTOs;
using MoreLinq;
using Artist = backend_filling_tool_v2.SpotifyDTOs.Extended.Artist;

namespace backend_filling_tool_v2
{
    public interface ISpotifyDatasetFetcher
    {
        Task<SpotifyDataset> Fetch();
    }
    
    public class SpotifyDatasetFetcher : ISpotifyDatasetFetcher
    {
        private readonly ILogger _logger;
        private readonly ISpotifyAPI _spotifyApi;

        public SpotifyDatasetFetcher(ILogger logger, ISpotifyAPI spotifyApi)
        {
            _logger = logger;
            _spotifyApi = spotifyApi;
        }

        public async Task<SpotifyDataset> Fetch()
        {
            _logger.Log("Fetching started", LogLevel.Verbose);

            await _spotifyApi.Initialise();
            
            /* Fetch all categories (since we need to populate every category to prevent
               empty category pages, we keep 25 of them to reduce the overall fetching duration
            */
            var categories = (await _spotifyApi.GetCategories()).Take(25).ToList();
            _logger.Log("Received categories");
            
            // Get a list of associated playlists for every category
            var playlistsByCategories = await GetPlaylistsForCategories(categories);
            _logger.Log("Received playlists for categories");
            
            // Put all fetched playlists into a single vector 
            var allPlaylists = playlistsByCategories.Select(dict => dict.Value.Take(10)).SelectMany(e => e).ToList();
            
            // Get a list of associated tracks for every playlist
            var tracksByPlaylists = await GetTracksForPlaylists(allPlaylists);
            _logger.Log("Received tracks for playlists");
            
            // Put all fetched tracks of their playlist (max 10 to reduce overall fetching duration) into a single vector
            var allTracks = tracksByPlaylists.Select(dict => dict.Value.Take(10)).SelectMany(e => e).ToList();

            var albumByTracks = await GetAlbumsForTracks(allTracks);
            _logger.Log("Received albums for tracks");

            var fullArtists = await _spotifyApi.GetArtists(
                tracksByPlaylists.Select(kvp =>
                    kvp.Value.Select(
                        t => t.Artists.Select(
                            a => a.Id
                        )
                    )
                ).SelectMany(x => x).SelectMany(x => x).DistinctBy(x => x).ToList()
            );

            var spotifyDataset = BuildDataset(
                categories,
                playlistsByCategories,
                tracksByPlaylists,
                albumByTracks,
                fullArtists
            );

            _logger.Log("Fetching finished", LogLevel.Verbose);
            return spotifyDataset;
        }

        private SpotifyDataset BuildDataset(
            List<Category> categories,
            Dictionary<Category, List<Playlist>> playlistsByCategories,
            Dictionary<Playlist, List<Track>> tracksByPlaylists,
            Dictionary<Track, Album> albumByTracks,
            List<Artist> fullArtists
        )
        {
            var dataset = new SpotifyDataset
            {
                Categories = categories,
                PlaylistsByCategories = playlistsByCategories,
                TracksByPlaylists = tracksByPlaylists,
                FullArtists = fullArtists
            };

            return dataset;
        }

        private async Task<Dictionary<Category, List<Playlist>>> GetPlaylistsForCategories(List<Category> categories)
        {
            // We will limit (1) the amount of playlist to a single playlist to reduce the overall fetching duration
            var tasks = categories.Select(async category =>
            {
                try
                {
                    return await _spotifyApi.GetCategoryPlaylists(category.Id, limit: 1);
                }
                catch
                {
                    return await Task.FromResult(new List<Playlist>());
                }
            });
            await Task.WhenAll(tasks);
            
            var dictionary = new Dictionary<Category, List<Playlist>>(
                tasks.Select((task, i) => new KeyValuePair<Category, List<Playlist>>(categories[i], task.Result))
            );
            
            return dictionary;
        }
        
        private async Task<Dictionary<Playlist, List<Track>>> GetTracksForPlaylists(List<Playlist> playlists)
        {
            var tasks = playlists.Select(playlist => _spotifyApi.GetTracksForPlaylist(playlist.Id));
            await Task.WhenAll(tasks);

            var dictionary = new Dictionary<Playlist, List<Track>>(
                tasks.Select((task, i) => new KeyValuePair<Playlist, List<Track>>(playlists[i], task.Result))
            );
            
            return dictionary;
        }
        
        private async Task<Dictionary<Track, Album>> GetAlbumsForTracks(List<Track> tracks)
        {
            var albums = await _spotifyApi.GetAlbums(tracks.Select(t => t.Album.Id).ToList());

            var dictionary = new Dictionary<Track, Album>(
                albums.Select((album, i) => new KeyValuePair<Track, Album>(tracks[i], album))
            );
            
            return dictionary;
        }

    }
}