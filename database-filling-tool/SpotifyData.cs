using System.Collections.Generic;
using backend_datamodel.Models;

namespace database_filling_tool
{
    public class SpotifyData
    {
        public List<SpotifyTrack> Tracks { get; set; } = new List<SpotifyTrack>();
        public List<SpotifyAlbum> Albums { get; set; } = new List<SpotifyAlbum>();
        public List<SpotifyArtist> Artists { get; set; } = new List<SpotifyArtist>();
    }
}