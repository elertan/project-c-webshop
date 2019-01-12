using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddTrackData : AuthorizedData
    {
        public string Name { get; set; }
        public int DurationMs { get; set; }
        public bool Explicit { get; set; }
        public string PreviewUrl { get; set; }
    }

    public class AddTrackDataInput : AuthorizedBaseInputTypeGraph<AddTrackData>
    {
        public AddTrackDataInput()
        {
            Field(e => e.Name);
            Field(e => e.DurationMs);
            Field(e => e.Explicit);
            Field(e => e.PreviewUrl, nullable: true);
        }
    }
}