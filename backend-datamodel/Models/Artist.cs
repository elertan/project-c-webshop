using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Artist : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public virtual IList<Image> Images { get; set; }
//        public IList<Track> Tracks { get; set; }
//        public IList<Album> Albums { get; set; }
        public IList<ArtistXTrack> ArtistXTracks { get; set; }
    }
}