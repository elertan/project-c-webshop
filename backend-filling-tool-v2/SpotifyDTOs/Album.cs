using System.Collections.Generic;
using Newtonsoft.Json;

namespace backend_filling_tool_v2.SpotifyDTOs
{
    public class Album : BaseDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        
        [JsonProperty("album_type")]
        public string AlbumType { get; set; }
        
        [JsonProperty("label")]
        public string Label { get; set; }
        
        [JsonProperty("popularity")]
        public int Popularity { get; set; }

        [JsonProperty("artists")]
        public List<Artist> Artists { get; set; }

        [JsonProperty("copyrights")]
        public List<Copyright> Copyrights { get; set; }
        
        [JsonProperty("genres")]
        public List<string> Genres { get; set; }

        [JsonProperty("images")]
        public List<Image> Images { get; set; }
    }
}