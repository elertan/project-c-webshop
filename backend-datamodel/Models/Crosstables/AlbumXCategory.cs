namespace backend_datamodel.Models.Crosstables
{
    public class AlbumXCategory : BaseEntity
    {
        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}