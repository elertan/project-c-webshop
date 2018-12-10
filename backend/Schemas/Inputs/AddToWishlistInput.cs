namespace backend.Schemas.Inputs
{
    public class AddToWishlistData
    {
        public string AuthToken { get; set; }
        public int ProductId { get; set; }
    }
    
    public class AddToWishlistInput : BaseInputTypeGraph<AddToWishlistData>
    {
        public AddToWishlistInput()
        {
            Field(x => x.AuthToken);
            Field(x => x.ProductId);
        }
    }
}