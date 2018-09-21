using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Album : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public string AlbumType { get; set; }
        public string Label { get; set; }
        public int Popularity { get; set; }
        public virtual List<Track> Tracks { get; set; }
    }
}