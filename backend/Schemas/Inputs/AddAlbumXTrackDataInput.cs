using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddAlbumXTrackData : AuthorizedData
    {
        public int TrackId { get; set; }
        public int AlbumId { get; set; }
    }
    
    public class AddAlbumXTrackDataInput : AuthorizedBaseInputTypeGraph<AddAlbumXTrackData>
    {
        public AddAlbumXTrackDataInput()
        {
            Field(x => x.TrackId);
            Field(x => x.AlbumId);
        }
    }
}