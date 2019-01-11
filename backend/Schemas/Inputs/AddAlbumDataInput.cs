using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddAlbumData : AuthorizedData
    {
        public int AlbumId { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public int? Popularity { get; set; }
        public string AlbumType { get; set; }
    }

    public class AddAlbumDataInput : AuthorizedBaseInputTypeGraph<AddAlbumData>
    {
        public AddAlbumDataInput()
        {
            Field(x => x.AlbumId);
            Field(x => x.Name);
            Field(x => x.Label);
            Field(x => x.Popularity);
            Field(x => x.AlbumType);
        }
    }
}