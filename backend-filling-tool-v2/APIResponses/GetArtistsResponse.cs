using System.Collections.Generic;
using backend_filling_tool_v2.SpotifyDTOs;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Artist = backend_filling_tool_v2.SpotifyDTOs.Extended.Artist;

namespace backend_filling_tool_v2.APIResponses
{
    public class GetArtistsResponse
    {
        [JsonProperty("artists")]
        public List<Artist> Artists { get; set; }
    }
}