using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace backend.Models
{
    public class Artist : BaseEntity
    {
        public string Name { get; set; }
        
        private ICollection<ArtistXTrack> ArtistXTracks { get; } =  new List<ArtistXTrack>();
        
        [NotMapped]
        public IEnumerable<Track> Tracks => ArtistXTracks.Select(t => t.Track);
    }
}