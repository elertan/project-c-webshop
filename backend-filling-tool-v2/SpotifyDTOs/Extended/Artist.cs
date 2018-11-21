using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend_filling_tool_v2.SpotifyDTOs.Extended
{
    public class Artist : SpotifyDTOs.Artist
    {
        [JsonProperty("images")]
        public List<Image> Images { get; set; }
    }
}