namespace backend_datamodel.Models
{
    public class Image : BaseEntity
    {
        public string Url { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
    }
}