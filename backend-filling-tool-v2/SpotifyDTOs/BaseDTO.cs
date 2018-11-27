using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class BaseDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}