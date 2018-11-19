namespace backend_datamodel.Models 
{
    public class ArtistXGenre {
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }

        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}