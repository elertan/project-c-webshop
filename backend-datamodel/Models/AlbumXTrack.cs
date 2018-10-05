namespace backend_datamodel.Models
{
    public class AlbumXTrack
    {
        public int AlbumId { get; set; }
        public Album Album { get; set; }

        public int TrackId { get; set; }
        public Track Track { get; set; }
    }
}