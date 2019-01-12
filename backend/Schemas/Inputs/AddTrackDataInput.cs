using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddTrackData : AuthorizedData
    {
        public int TrackId { get; set; }
        public string Name { get; set; }
    }

    public class AddTrackDataInput : AuthorizedBaseInputTypeGraph<AddTrackData>
    {
        public AddTrackDataInput()
        {
            Field(e => e.TrackId);
            Field(e => e.Name);
        }
    }
}