using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateTrackData : AuthorizedData
    {
        public int trackId { get; set; }
        public string name {get; set;}
    }
    
    public class UpdateTrackDataInput : AuthorizedBaseInputTypeGraph<UpdateTrackData>
    {
        public UpdateTrackDataInput()
        {
            Field(e => e.trackId, nullable: true);
            Field(e => e.name, nullable: true);


        }
    }
}