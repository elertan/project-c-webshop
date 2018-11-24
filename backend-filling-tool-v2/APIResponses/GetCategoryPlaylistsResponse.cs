using System.Collections.Generic;
using backend_filling_tool_v2.SpotifyDTOs;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.APIResponses
{
    public class GetCategoryPlaylistsResponse
    {
        [JsonProperty("playlists")]
        public SpotifyEnumerableApiResult<Playlist> Playlists { get; set; }
    }
}