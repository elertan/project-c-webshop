using backend_filling_tool_v2.SpotifyDTOs;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace backend_filling_tool_v2.APIResponses
{
    public class GetCategoriesResponse
    {
        [JsonProperty("categories")]
        public SpotifyEnumerableApiResult<Category> Categories { get; set; }
    }
}