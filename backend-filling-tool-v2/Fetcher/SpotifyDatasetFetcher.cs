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
            _logger.Log("Fetching started", LogLevel.Verbose);
            
            var spotifyDataset = new SpotifyDataset();

            await _spotifyApi.Initialise();
            var categories = await _spotifyApi.GetCategories();

            _logger.Log("Fetching finished", LogLevel.Verbose);
            return spotifyDataset;
        }
    }
}