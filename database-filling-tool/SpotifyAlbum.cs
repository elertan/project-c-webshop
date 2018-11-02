using System;
using System.Collections.Generic;
using backend_datamodel.Models;

namespace database_filling_tool
{
    public class SpotifyAlbum
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string AlbumType { get; set; }
        public string Label { get; set; }
        public int Popularity { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ReleaseDatePrecision { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
        
        public List<SpotifyTrack> SpotifyTracks { get; set; }
    }
}