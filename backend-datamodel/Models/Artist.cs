namespace backend_datamodel.Models
{
    public class Artist : BaseEntity
    {
        public string SpotifyId { get; set; }
        public string Name { get; set; }
    }
}