using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class DeleteAlbumXTrackData : AuthorizedData
    {
        public int AlbumId { get; set; }
        public int TrackId { get; set; }
    }
    
    public class DeleteAlbumXTrackDataInput : AuthorizedBaseInputTypeGraph<DeleteAlbumXTrackData>
    {
        public DeleteAlbumXTrackDataInput()
        {
            Field(e => e.AlbumId);
            Field(e => e.TrackId);
        }
    }
}