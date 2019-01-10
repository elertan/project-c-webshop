using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class DeleteTrackData : AuthorizedData
    {
        public int TrackId { get; set; }
    }
    
    public class DeleteTrackDataInput : AuthorizedBaseInputTypeGraph<DeleteTrackData>
    {
        public DeleteTrackDataInput()
        {
            Field(x => x.TrackId);
        }
    }
}