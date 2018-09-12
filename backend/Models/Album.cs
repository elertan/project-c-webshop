using System.Collections.Generic;

namespace backend.Models
{
    public class Album : BaseEntity
    {
        public virtual List<Track> Tracks { get; set; }
    }
}