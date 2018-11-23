using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend_filling_tool_v2.SpotifyDTOs;

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
            
            // Get a list of associated playlists for every category
            var playlistsByCategories = await GetPlaylistsForCategories(categories);
            
            // Put all fetched playlists into a single vector 
            var allPlaylists = playlistsByCategories.Select(dict => dict.Value.Take(10)).SelectMany(e => e).ToList();
            
            // Get a list of associated tracks for every playlist
            var tracksByPlaylists = await GetTracksForPlaylists(allPlaylists);
            
            // Put all fetched tracks of their playlist (max 10 to reduce overall fetching duration) into a single vector
            var allTracks = tracksByPlaylists.Select(dict => dict.Value.Take(10)).SelectMany(e => e).ToList();

            var albumsByTracks = await GetAlbumsForTracks(allTracks);

            var spotifyDataset = BuildDataset(
                categories,
                playlistsByCategories,
                tracksByPlaylists,
                albumsByTracks
            );

            _logger.Log("Fetching finished", LogLevel.Verbose);
            return spotifyDataset;
        }

        private SpotifyDataset BuildDataset(
            List<Category> categories,
            Dictionary<Category, List<Playlist>> playlistsByCategories,
            Dictionary<Playlist, List<Track>> tracksByPlaylists,
            Dictionary<Track, List<Album>> albumsByTracks
        )
        {
            var dataset = new SpotifyDataset
            {
                Categories = categories,
                PlaylistsByCategories = playlistsByCategories,
                TracksByPlaylists = tracksByPlaylists
            };

            return dataset;
        }

        private async Task<Dictionary<Category, List<Playlist>>> GetPlaylistsForCategories(List<Category> categories)
        {
            // We will limit (1) the amount of playlist to a single playlist to reduce the overall fetching duration
            var tasks = categories.Select(category => _spotifyApi.GetCategoryPlaylists(category.Id, limit: 1));
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
        
        private async Task<Dictionary<Track, List<Album>>> GetAlbumsForTracks(List<Track> tracks)
        {
            // Separate in chunks due to Spotify limit
            var chunkedTracks = tracks.ChunkBy(20).ToList();
            
            // Gather all albums ids from their respective tracks
            var tasks = chunkedTracks.Select(cTracks => _spotifyApi.GetAlbums(cTracks.Select(track => track.Album.Id).ToList()));
            await Task.WhenAll(tasks);

            var dictionary = new Dictionary<Track, List<Album>>(
                tasks.Select((task, i) => new KeyValuePair<Track, List<Album>>(tracks[i], task.Result))
            );
            
            return dictionary;
        }

    }
}