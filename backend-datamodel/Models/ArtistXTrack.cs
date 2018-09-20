namespace backend_datamodel.Models
{
    /// <summary>
    /// Many to Many table
    /// </summary>
    public class ArtistXTrack
    {
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }

        public int TrackId { get; set; }
        public Track Track { get; set; }
    }
}