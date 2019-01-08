using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateTrackData : AuthorizedData
    {
        public int TrackId { get; set; }
    }
    
    public class UpdateTrackDataInput : AuthorizedBaseInputTypeGraph<UpdateTrackData>
    {
        public UpdateTrackDataInput()
        {
            Field(e => e.TrackId, nullable: true);

        }
    }
}