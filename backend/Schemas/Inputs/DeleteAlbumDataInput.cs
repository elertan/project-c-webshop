using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class DeleteAlbumData : AuthorizedData
    {
        public int AlbumId { get; set; }
    }

    public class DeleteAlbumDataInput : AuthorizedBaseInputTypeGraph<DeleteAlbumData>
    {
        public DeleteAlbumDataInput()
        {
            Field(x => x.AlbumId);
        }
    }
}