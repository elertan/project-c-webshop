using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace backend_filling_tool_v2
{
    public interface ISpotifyAPI
    {
        Task Initialise();
    }
    
    public class SpotifyAPI : ISpotifyAPI
    {
        private readonly ILogger _logger;
        private readonly IEnvVariables _envVariables;
        private HttpClient _httpClient;

        public SpotifyAPI(ILogger logger, IEnvVariables envVariables)
        {
            _logger = logger;
            _envVariables = envVariables;
        }
        
        /// <summary>
        /// Authorize to begin usage
        /// </summary>
        /// <returns></returns>
        public async Task Initialise()
        {
            _logger.Log("Initialisation started", LogLevel.Verbose);
            _logger.Log($"Using credentials:\nClient ID: {_envVariables.SpotifyClientId}\nClient Secret: {_envVariables.SpotifyClientSecret}");

            var auth = Convert.ToBase64String(
                Encoding.UTF8.GetBytes($"{_envVariables.SpotifyClientId}:{_envVariables.SpotifyClientSecret}"));
            
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);
            
            _logger.Log("Requesting permission on spotify...");
            var response = await httpClient.PostAsync("https://accounts.spotify.com/api/token",
                new FormUrlEncodedContent(
                    new List<KeyValuePair<string, string>>
                    {
                        new KeyValuePair<string, string>("grant_type", "client_credentials")
                    }));

            var responseString = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<dynamic>(responseString);
            string token = data.access_token;
            
            _logger.Log($"Permission granted! Token: '${token}'");
            
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            _httpClient = httpClient;
            _logger.Log("Initialisation finished", LogLevel.Verbose);
        }
    }
}