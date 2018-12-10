using System.Collections.Generic;
using backend_datamodel.Models.Crosstables;

namespace backend_datamodel.Models
{
    public class Category : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public virtual IList<Image> Images { get; set; }
        
        public IList<AlbumXCategory> AlbumXCategories { get; set; }
    }
}