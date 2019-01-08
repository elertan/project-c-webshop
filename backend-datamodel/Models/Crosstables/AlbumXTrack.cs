namespace backend_datamodel.Models.Crosstables
{
    public class AlbumXTrack : BaseEntity
    {
        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public int TrackId { get; set; }
        public Track Track { get; set; }
    }
}