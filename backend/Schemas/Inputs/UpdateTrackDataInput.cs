using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateTrackData : AuthorizedData
    {
        public int TrackId { get; set; }
        public string Name {get; set;}
        public int? DurationMs { get; set; }
        public bool? Explicit { get; set; }
        public string PreviewUrl { get; set; }
    }
    
    public class UpdateTrackDataInput : AuthorizedBaseInputTypeGraph<UpdateTrackData>
    {
        public UpdateTrackDataInput()
        {
            Field(e => e.TrackId, nullable: false);
            Field(e => e.Name, nullable: true);
            Field(e => e.DurationMs, nullable: true);
            Field(e => e.Explicit, nullable: true);
            Field(e => e.PreviewUrl, nullable: true);
        }
    }
}