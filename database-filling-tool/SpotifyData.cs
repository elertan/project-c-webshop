using System.Collections.Generic;
using backend_datamodel.Models;

namespace database_filling_tool
{
    public class SpotifyData
    {
        public List<Track> Tracks { get; set; } = new List<Track>();
        public List<Artist> Artists { get; set; } = new List<Artist>();
    }
}