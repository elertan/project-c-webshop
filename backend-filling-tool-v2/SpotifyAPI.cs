using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using backend_filling_tool_v2.APIResponses;
using backend_filling_tool_v2.SpotifyDTOs;
using Newtonsoft.Json;

namespace backend_filling_tool_v2
{
    public interface ISpotifyAPI
    {
        Task Initialise();
        Task<List<Category>> GetCategories();
        Task<List<Playlist>> GetCategoryPlaylists(string categoryId, int limit = 10);
        Task<List<Track>> GetTracksForPlaylist(string playlistId);
        Task<List<Album>> GetAlbums(List<string> albumIds);
    }
    
    public class SpotifyAPI : ISpotifyAPI
    {
        private readonly  Uri _baseUri = new Uri("https://api.spotify.com/v1");
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
            ServicePointManager.DefaultConnectionLimit = 3;
            _httpClient = new HttpClient(new RetryHandler(new HttpClientHandler()));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            
            _logger.Log("Initialisation finished", LogLevel.Verbose);
        }


        private string GetUrl(string apiPath, string queryString = "")
        {
            var uriBuilder = new UriBuilder(_baseUri);
            uriBuilder.Path += apiPath;
            uriBuilder.Query += queryString;
            return uriBuilder.Uri.AbsoluteUri;
        }

        public async Task<List<Category>> GetCategories()
        {
            _logger.Log("GetCategories", LogLevel.Verbose);
            var requestUri = GetUrl("/browse/categories", "limit=50");
            var response = await _httpClient.GetStringAsync(requestUri);

            var result = JsonConvert.DeserializeObject<GetCategoriesResponse>(response);
            return result.Categories.Items;
        }

        public async Task<List<Playlist>> GetCategoryPlaylists(string categoryId, int limit = 10)
        {
            _logger.Log($"GetCategoryPlaylists: {categoryId}", LogLevel.Verbose);
            var response = await _httpClient.GetStringAsync(GetUrl($"/browse/categories/{categoryId}/playlists", $"limit={limit}"));

            var result = JsonConvert.DeserializeObject<GetCategoryPlaylistsResponse>(response);
            return result.Playlists.Items;
        }

        public async Task<List<Track>> GetTracksForPlaylist(string playlistId)
        {
            _logger.Log($"GetTracksForPlaylist: {playlistId}", LogLevel.Verbose);
            var response = await _httpClient.GetStringAsync(GetUrl($"/playlists/{playlistId}/tracks", "fields=items(track(name,explicit,disc_number,duration_ms,preview_url,artists(id,name,type),album(id,name,images,artists,album_type)))"));

            var result = JsonConvert.DeserializeObject<GetTracksForPlaylistResponse>(response);
            return result.Items.Select(item => item.Track).ToList();
        }

        public async Task<List<Album>> GetAlbums(List<string> albumIds)
        {
            _logger.Log("GetAlbums", LogLevel.Verbose);
            // Separate in chunks due to Spotify limit
            var chunks = albumIds.ChunkBy(10);
            var tasks = chunks.Select(async ids =>
            {
                var idsStr = ids.Aggregate((curr, next) => $"{curr},{next}");
                var response = await _httpClient.GetStringAsync(GetUrl($"/albums", $"market=NL&ids={idsStr}"));
                var result = JsonConvert.DeserializeObject<GetAlbumsForTracksResponse>(response);
                return result.Albums;
            });
            await Task.WhenAll(tasks);
            return tasks.Select(task => task.Result).SelectMany(x => x).ToList();
        }
    }
}