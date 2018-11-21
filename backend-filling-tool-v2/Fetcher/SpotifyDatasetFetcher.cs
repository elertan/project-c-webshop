using System.Threading.Tasks;

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
            
        }
    }
}