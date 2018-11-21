using System.Collections.Generic;
using backend_filling_tool_v2.SpotifyDTOs;
using Artist = backend_filling_tool_v2.SpotifyDTOs.Extended.Artist;

namespace backend_filling_tool_v2
{
    public class SpotifyDataset
    {
        public List<Track> Tracks { get; set; } = new List<Track>();
        public List<Artist> Artists { get; set; } = new List<Artist>();
        public List<Album> Albums { get; set; } = new List<Album>();
        public List<Image> Images { get; set; } = new List<Image>();
        public List<Playlist> Playlists { get; set; } = new List<Playlist>();
        public List<Category> Categories { get; set; } = new List<Category>();
    }
}