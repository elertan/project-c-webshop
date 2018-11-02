using System.Collections.Generic;
using backend_datamodel.Models;

namespace database_filling_tool
{
    public class SpotifyArtist
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
    }
}