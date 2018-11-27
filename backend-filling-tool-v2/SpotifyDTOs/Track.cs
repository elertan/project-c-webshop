using System.Collections.Generic;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Track : BaseDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("explicit")]
        public bool Explicit { get; set; }
        
        [JsonProperty("disc_number")]
        public int DiscNumber { get; set; }
        
        [JsonProperty("duration_ms")]
        public int DurationMs { get; set; }
        
        [JsonProperty("preview_url")]
        public string PreviewUrl { get; set; }

        [JsonProperty("artists")]
        public List<Artist> Artists { get; set; }

        [JsonProperty("album")]
        public Album Album { get; set; }
    }
}