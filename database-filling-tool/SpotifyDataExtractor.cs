using System;
using System.Collections.Generic;
using System.Linq;
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
            var httpClient = await Authorize();
            
            var spotifyData = new SpotifyData();
            Console.WriteLine("Retrieving toplists playlists...");
            var toplistsPlaylistsResponse =
                await httpClient.GetStringAsync("https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=3");
            var toplistsPlaylists = JsonConvert.DeserializeObject<dynamic>(toplistsPlaylistsResponse);
            Console.WriteLine("Retrieved playlists");
            foreach (var playlist in toplistsPlaylists.playlists.items)
            {
                Console.WriteLine($"Getting tracks for playlist: '{playlist.name}'");
                var playlistTracksResponse = await httpClient.GetStringAsync(
                    $"https://api.spotify.com/v1/playlists/{playlist.id}/tracks?fields=items(track(album(id%2Cname%2Chref)))");
                var playlistTracks = JsonConvert.DeserializeObject<dynamic>(playlistTracksResponse);

                Console.WriteLine("Chunking tracks into buffers of 20 items each");
                // Chunk amount of tracks into an amount of 20 due to spotify get albums limit.
                var chunkedTracks = ((IEnumerable<dynamic>)playlistTracks.items).Select((s, i) => new { Value = s, Index = i })
                    .GroupBy(x => x.Index / 20)
                    .Select(grp => grp.Select(x => x.Value).ToArray())
                    .ToArray();

                var chunkAlbumTasks = chunkedTracks.Select(async trackChunk =>
                {
                    Console.WriteLine("Getting albums for a trackchunk...");
                    var albumsParam = trackChunk.Select(track => track.track.album.id)
                        .Aggregate((prev, curr) => $"{prev},{curr}");
                    var albumsResponse =
                        await httpClient.GetStringAsync($"https://api.spotify.com/v1/albums?ids={albumsParam}");
                    Console.WriteLine("Retrieved all albums");
                    var albums = JsonConvert.DeserializeObject<dynamic>(albumsResponse);
                    return ((IEnumerable<dynamic>)albums.albums).Select(album => new SpotifyAlbum
                    {
                        Id = album.id,
                        Name = album.name,
                        AlbumType = album.album_type,
                        Label = album.label,
                        Popularity = album.popularity,
//                        ReleaseDate = DateTime.Parse(album.release_date),
                        ReleaseDatePrecision = album.release_date_precision,
                        SpotifyTracks = ((IEnumerable<dynamic>)album.tracks).Select(track => new SpotifyTrack
                        {
                            Id = track.id,
                            Name = track.name,
                            Explicit = track["explicit"],
                            DiscNumber = track.disc_number,
                            DurationMs = track.duration_ms,
                            PreviewUrl = track.preview_url
                        }).ToList()
                    }).ToList();
                });
                await Task.WhenAll(chunkAlbumTasks);
                Console.WriteLine("Finished getting all albums");
            }

            // TODO: Fill data
            return spotifyData;
        }

        private async Task<HttpClient> Authorize()
        {
            Console.WriteLine("Authorizing");
            // TODO: Authorize spotify API
            // https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
            var clientId = Env.GetString("SPOTIFY_CLIENTID");
            var clientSecret = Env.GetString("SPOTIFY_CLIENTSECRET");
            Console.WriteLine($"Using ClientID: '{clientId}' and Secret: '{clientSecret}'");
            var auth = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);
            Console.WriteLine("Requesting permission on Spotify...");
            var response = await httpClient.PostAsync("https://accounts.spotify.com/api/token", new FormUrlEncodedContent(
                new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials")
                }));

            var responseString = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<dynamic>(responseString);
            string token = data.access_token;
            Console.WriteLine($"Permission granted! Token: '${token}'");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            return httpClient;
        }
    }
}