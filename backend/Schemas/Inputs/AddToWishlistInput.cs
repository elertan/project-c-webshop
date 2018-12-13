using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddToWishlistData : AuthorizedData
    {
        public int ProductId { get; set; }
    }
    
    public class AddToWishlistInput : AuthorizedBaseInputTypeGraph<AddToWishlistData>
    {
        public AddToWishlistInput()
        {
            Field(x => x.ProductId);
        }
    }
}