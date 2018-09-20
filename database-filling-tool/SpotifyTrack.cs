using System.Collections.Generic;

namespace database_filling_tool
{
    public class SpotifyTrack
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int DiscNumber { get; set; }
        public int DurationMs { get; set; }
        public bool Explicit { get; set; }
        public string PreviewUrl { get; set; }
        public List<SpotifyArtist> SpotifyArtists { get; set; }
    }
}