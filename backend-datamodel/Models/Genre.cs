using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Genre : BaseEntity
    {
        public string Name { get; set; }
        public IList<AlbumXGenre> AlbumXGenres { get; set; }
        public IList<ArtistXGenre> ArtistXGenres { get; set; }
    }
}