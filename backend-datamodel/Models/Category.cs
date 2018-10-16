namespace backend_datamodel.Models
{
    public class Category : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}