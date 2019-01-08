using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateAlbumData : AuthorizedData
    {
        public int AlbumId { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public int? Popularity { get; set; }
        public string AlbumType { get; set; }
    }

    public class UpdateAlbumDataInput : AuthorizedBaseInputTypeGraph<UpdateAlbumData>
    {
        public UpdateAlbumDataInput()
        {
            Field(x => x.AlbumId, nullable: false);
            Field(x => x.Name, nullable: true);
            Field(x => x.Label, nullable: true);
            Field(x => x.Popularity, nullable: true);
            Field(x => x.AlbumType, nullable: true);
        }
    }
}