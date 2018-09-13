using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace backend.Models
{
    public class Track : BaseEntity
    {
        public string Name { get; set; }
        
        private ICollection<ArtistXTrack> ArtistXTracks { get; } = new List<ArtistXTrack>();
        
        [NotMapped]
        public IEnumerable<Artist> Artists => ArtistXTracks.Select(t => t.Artist);
    }
}