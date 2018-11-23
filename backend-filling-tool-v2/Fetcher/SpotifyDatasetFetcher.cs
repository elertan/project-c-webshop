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
            
            var spotifyDataset = new SpotifyDataset();

            await _spotifyApi.Initialise();
            
            /* Fetch all categories (since we need to populate every category to prevent
               empty category pages, we keep 25 of them to reduce overall fetching duration
            */
            var categories = (await _spotifyApi.GetCategories()).Take(25).ToList();
            
            // Get a list of associated playlists for every category
            var playlistsDictionary = await GetPlaylistsForCategories(categories);
            
            // Put all fetched playlists into a single vector 
//            var allPlaylists = playlistsDictionary.Select(dict => dict.Value).Aggregate((prev, curr) =>
//            {
//                var newSet = new List<Playlist>(prev.Count + curr.Count);
//                newSet.AddRange(prev);
//                newSet.AddRange(curr);
//                return newSet;
//            });
            // Select many is a more efficient method to do this vector merging
            var allPlaylists = playlistsDictionary.Select(dict => dict.Value).SelectMany(e => e).ToList();
            
            var albums = await GetAlbumsForPlaylists(allPlaylists);
            

            _logger.Log("Fetching finished", LogLevel.Verbose);
            return spotifyDataset;
        }

        private async Task<Dictionary<Playlist, List<Album>>> GetAlbumsForPlaylists(List<Playlist> playlists)
        {
            throw new System.NotImplementedException();
        }

        private async Task<Dictionary<Category, List<Playlist>>> GetPlaylistsForCategories(List<Category> categories)
        {
            // We will limit the amount of playlist to a single playlist to reduce the overall fetching duration
            var tasks = categories.Select(category => _spotifyApi.GetCategoryPlaylists(category.Id, limit: 1));
            await Task.WhenAll(tasks);
            
            var dictionary = new Dictionary<Category, List<Playlist>>(
                tasks.Select((task, i) => new KeyValuePair<Category, List<Playlist>>(categories[i], task.Result))
            );
            
            return dictionary;
        }
    }
}