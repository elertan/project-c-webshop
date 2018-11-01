using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Category : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public virtual IList<Image> Images { get; set; }
    }
}