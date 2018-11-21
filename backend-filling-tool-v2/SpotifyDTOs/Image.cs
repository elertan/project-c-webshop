using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Image
    {
        [JsonProperty("width")]
        public int Width { get; set; }
        [JsonProperty("height")]
        public int Height { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}