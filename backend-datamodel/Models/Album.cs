using System.Collections.Generic;
using backend_datamodel.Models.Crosstables;

namespace backend_datamodel.Models
{
    public class Album : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public string AlbumType { get; set; }
        public string Label { get; set; }
        public int Popularity { get; set; }
        public virtual IList<Image> Images { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        
//        public IList<Track> Tracks { get; set; }
//        public IList<Artist> Artists { get; set; }
        public IList<AlbumXTrack> AlbumXTracks { get; set; }
        public IList<AlbumXCategory> AlbumXCategories { get; set; }
    }
}