namespace backend_datamodel.Models 
{
    public class AlbumXGenre {
        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}