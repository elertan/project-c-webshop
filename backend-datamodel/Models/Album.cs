using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Album : BaseEntity
    {
        public virtual List<Track> Tracks { get; set; }
    }
}