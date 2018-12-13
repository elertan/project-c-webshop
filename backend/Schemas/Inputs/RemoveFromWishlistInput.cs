using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class RemoveFromWishlistData : AuthorizedData
    {
        public int ProductId { get; set; }
    }
    
    public class RemoveFromWishlistInput : AuthorizedBaseInputTypeGraph<RemoveFromWishlistData>
    {
        public RemoveFromWishlistInput()
        {
            Field(x => x.ProductId);
        }
    }
}