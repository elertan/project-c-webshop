using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Artist : BaseDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }
    }
}