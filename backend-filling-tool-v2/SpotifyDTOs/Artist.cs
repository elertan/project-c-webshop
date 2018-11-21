using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Artist : BaseDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}