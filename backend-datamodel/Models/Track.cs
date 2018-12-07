using System.Collections.Generic;
using backend_datamodel.Models.Crosstables;

namespace backend_datamodel.Models
{
    public class Track : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public int DurationMs { get; set; }
        public bool Explicit { get; set; }
        public string PreviewUrl { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        
//        public IList<Artist> Artists { get; set; }
//        public IList<Album> Albums { get; set; }
        public IList<ArtistXTrack> ArtistXTracks { get; set; }
        public IList<AlbumXTrack> AlbumXTracks { get; set; }
    }
}