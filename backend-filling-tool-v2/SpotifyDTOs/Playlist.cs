using System.Collections.Generic;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Playlist : BaseDTO
    {
        [JsonProperty("collaborative")]
        public bool Collaborative { get; set; }
        
        [JsonProperty("images")]
        public List<Image> Images { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}