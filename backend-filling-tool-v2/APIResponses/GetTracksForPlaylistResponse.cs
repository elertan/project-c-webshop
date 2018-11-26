using System.Collections.Generic;
using backend_filling_tool_v2.SpotifyDTOs;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.APIResponses
{
    public class ItemObjectWrapper
    {
        [JsonProperty("track")]
        public Track Track { get; set; }
    }
    
    public class GetTracksForPlaylistResponse
    {
        [JsonProperty("items")]
        public List<ItemObjectWrapper> Items { get; set; }
    }
}