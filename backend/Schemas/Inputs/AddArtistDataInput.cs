using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddArtistData : AuthorizedData
    {
        public string ID { get; set; }
        public string Name { get; set; }

    }

    public class AddArtistDataInput : AuthorizedBaseInputTypeGraph<AddArtistData>
    {
        public AddArtistDataInput()
        {
            Field(x => x.ID);
            Field(x => x.Name);
        }
    }
}