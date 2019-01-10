using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddArtistData : AuthorizedData
    {
        public string Name { get; set; }
        public string SpotifyId { get; set; }
    }

    public class AddArtistDataInput : AuthorizedBaseInputTypeGraph<AddArtistData>
    {
        public AddArtistDataInput()
        {
            Field(x => x.Name);
            Field(x => x.SpotifyId);
        }
    }
}