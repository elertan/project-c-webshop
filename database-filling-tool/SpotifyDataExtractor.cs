using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using DotNetEnv;
using Newtonsoft.Json;

namespace database_filling_tool
{
    public class SpotifyDataExtractor
    {
        public async Task<SpotifyData> Extract()
        {
            // TODO: Authorize spotify API
            // https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
            var clientId = Env.GetString("SPOTIFY_CLIENTID");
            var clientSecret = Env.GetString("SPOTIFY_CLIENTSECRET");
            var auth = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);
            var response = await httpClient.PostAsync("https://accounts.spotify.com/api/token", new FormUrlEncodedContent(
                new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                }));

            var responseString = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject(responseString);

            // TODO: Receive 
            var spotifyData = new SpotifyData();
            // TODO: Fill data
            return spotifyData;
        }
    }
}