using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateTrackData : AuthorizedData
    {
        public int Id { get; set; }
    }
    
    public class UpdateTrackDataInput : AuthorizedBaseInputTypeGraph<UpdateTrackData>
    {
        public UpdateTrackDataInput()
        {
            Field(e => e.Id, nullable: true);

        }
    }
}