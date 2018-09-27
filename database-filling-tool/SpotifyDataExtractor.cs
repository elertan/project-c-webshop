using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using DotNetEnv;
using Microsoft.EntityFrameworkCore.Internal;
using MoreLinq;
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
                await httpClient.GetStringAsync(
                    "https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=3");
            var toplistsPlaylists = JsonConvert.DeserializeObject<dynamic>(toplistsPlaylistsResponse);
            Console.WriteLine("Retrieved playlists");
            var albumTasks = ((IEnumerable<dynamic>) toplistsPlaylists.playlists.items)
                .Select(async playlist => await ExtractAlbumsFromPlaylist(httpClient, playlist))
                .ToArray();

            await Task.WhenAll(albumTasks);
            albumTasks.Select(task => task.Result as IEnumerable<SpotifyAlbum>).ForEach(spotifyData.Albums.AddRange);

            return RemoveDuplicates(spotifyData);
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
            var response = await httpClient.PostAsync("https://accounts.spotify.com/api/token",
                new FormUrlEncodedContent(
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

        private async Task<List<SpotifyAlbum>> ExtractAlbumsFromPlaylist(HttpClient httpClient, dynamic playlist)
        {
            Console.WriteLine($"Getting tracks for playlist: '{playlist.name}'");
            var playlistTracksResponse = await httpClient.GetStringAsync(
                $"https://api.spotify.com/v1/playlists/{playlist.id}/tracks?fields=items(track(album(id%2Cname%2Chref)))");
            var playlistTracks = JsonConvert.DeserializeObject<dynamic>(playlistTracksResponse);

            Console.WriteLine("Chunking tracks into buffers of 20 items each");
            // Chunk amount of tracks into an amount of 20 due to spotify get albums limit.
            var chunkedTracks = ((IEnumerable<dynamic>) playlistTracks.items).ChunkBy(20).ToArray();

            var chunkAlbumTasks = chunkedTracks.Select(async (trackChunk, i) =>
            {
                Console.WriteLine($"Getting albums for a trackchunk {i}...");
                var albumsParam = trackChunk.Select(track => track.track.album.id)
                    .Aggregate((prev, curr) => $"{prev},{curr}");
                var albumsResponse =
                    await httpClient.GetStringAsync(
                        $"https://api.spotify.com/v1/albums?ids={albumsParam}&market=NL");
                Console.WriteLine($"Retrieved all albums from chunk {i}");
                var albums = JsonConvert.DeserializeObject<dynamic>(albumsResponse);
                Console.WriteLine($"Extracting albums {i}");
                var result = ((IEnumerable<dynamic>) albums.albums).Select(ExtractAlbum).ToList();
                Console.WriteLine($"Extraction for album {i} finished");
                return result;
            }).ToArray();
            Console.WriteLine($"Waiting for all {chunkedTracks.Length} chunks to finish extraction...");
            await Task.WhenAll(chunkAlbumTasks);
            Console.WriteLine($"All {chunkedTracks.Length} are finished, moving on...");
            var newAlbums = chunkAlbumTasks.Select(task => task.Result)
                .Aggregate((prev, curr) =>
                {
                    var list = new List<SpotifyAlbum>(prev.Count + curr.Count);
                    list.AddRange(prev);
                    list.AddRange(curr);
                    return list;
                });
            return newAlbums;
        }

        private SpotifyData RemoveDuplicates(SpotifyData data)
        {
            // Only albums are filled with all of the artists beneath, extract them here and just link it all together nicely
            // for the database

            var artists = data.Albums
                .Select(album => album.SpotifyTracks.Select(track => track.SpotifyArtists))
                .Aggregate((prev, curr) =>
                {
                    var list = new List<List<SpotifyArtist>>(prev.Count() + curr.Count());
                    list.AddRange(prev);
                    list.AddRange(curr);
                    return list;
                })
                .Aggregate((prev, curr) =>
                {
                    var list = new List<SpotifyArtist>(prev.Count + curr.Count);
                    list.AddRange(prev);
                    list.AddRange(curr);
                    return list;
                })
                .DistinctBy(artist => artist.Id)
                .ToList();

            var tracks = data.Albums
                .Select(album => album.SpotifyTracks)
                .Aggregate((prev, curr) =>
                {
                    var list = new List<SpotifyTrack>(prev.Count + curr.Count);
                    list.AddRange(prev);
                    list.AddRange(curr);
                    return list;
                })
                .DistinctBy(track => track.Id)
                .ToList();

            var albums = data.Albums
                .DistinctBy(album => album.Id)
                .ToList();

            data.Artists = artists;
            data.Tracks = tracks;
            data.Albums = albums;
            return data;
        }

        private SpotifyAlbum ExtractAlbum(dynamic album)
        {
            Console.WriteLine($"Extracting album '{album.name}'");
            return new SpotifyAlbum
            {
                Id = album.id,
                Name = album.name,
                AlbumType = album.album_type,
                Label = album.label,
                Popularity = album.popularity,
//                        ReleaseDate = DateTime.Parse(album.release_date),
                ReleaseDatePrecision = album.release_date_precision,
                SpotifyTracks = ((IEnumerable<dynamic>) album.tracks.items).Select(ExtractTrack).ToList(),
                ImageUrl = album.images != null ? album.images[0].url : null
            };
        }

        private SpotifyTrack ExtractTrack(dynamic track)
        {
            Console.WriteLine($"Extracting track '{track.name}'");
            return new SpotifyTrack
            {
                Id = track.id,
                Name = track.name,
                Explicit = track["explicit"],
                DiscNumber = track.disc_number,
                DurationMs = track.duration_ms,
                PreviewUrl = track.preview_url,
                SpotifyArtists = ((IEnumerable<dynamic>) track.artists).Select(ExtractArtist).ToList()
            };
        }

        private SpotifyArtist ExtractArtist(dynamic artist)
        {
            Console.WriteLine($"Extracting artist '{artist.name}'");
            return new SpotifyArtist
            {
                Id = artist.id,
                Name = artist.name,
                ImageUrl = artist.images != null ? artist.images[0].url : null
            };
        }
    }
}