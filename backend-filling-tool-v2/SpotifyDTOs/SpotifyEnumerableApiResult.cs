using System.Collections.Generic;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class SpotifyEnumerableApiResult<T>
    {
        [JsonProperty("items")]
        public List<T> Items { get; set; }
    }
}