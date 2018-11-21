using System.Collections.Generic;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Category : BaseDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("images")]
        public List<Image> Images { get; set; }
    }
}