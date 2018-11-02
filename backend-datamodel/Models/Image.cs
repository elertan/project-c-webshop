namespace backend_datamodel.Models
{
    public class Image : BaseEntity
    {
        public string Url { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }

        public int? AlbumId { get; set; }
        public int? ArtistId { get; set; }
        public int? CategoryId { get; set; }
    }
}