using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class DeleteArtistData : AuthorizedData
    {
        public int ArtistId { get; set; }
    }
    
    public class DeleteArtistDataInput : AuthorizedBaseInputTypeGraph<DeleteArtistData>
    {
        public DeleteArtistDataInput()
        {
            Field(x => x.ArtistId);
        }
    }
}