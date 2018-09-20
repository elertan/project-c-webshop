using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Track : BaseEntity
    {
        public string Name { get; set; }
        public int DurationMs { get; set; }
        public bool Explicit { get; set; }
        public string PreviewUrl { get; set; }
        public virtual List<Artist> Artists { get; set; }
    }
}