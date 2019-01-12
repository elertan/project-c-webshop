using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateArtistData : AuthorizedData
    {
        public int ArtistId { get; set; }
        public string Name {get; set;}
    }
    
    public class UpdateArtistDataInput : AuthorizedBaseInputTypeGraph<UpdateArtistData>
    {
        public UpdateArtistDataInput()
        {
            Field(e => e.ArtistId, nullable: false);
            Field(e => e.Name, nullable: true);
        }
    }
}