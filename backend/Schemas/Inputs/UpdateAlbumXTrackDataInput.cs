using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateAlbumXTrackData : AuthorizedData
    {
        public int AlbumXTrackId { get; set; }
        public int? AlbumId { get; set; }
        public int? TrackId { get; set; }
    }
    
    public class UpdateAlbumXTrackDataInput : AuthorizedBaseInputTypeGraph<UpdateAlbumXTrackData>
    {
        public UpdateAlbumXTrackDataInput()
        {
            Field(e => e.AlbumXTrackId);
            Field(e => e.AlbumId, nullable: true);
            Field(e => e.TrackId, nullable: true);
        }
    }
}