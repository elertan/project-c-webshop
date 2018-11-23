using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Copyright
    {
        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }
    }
}