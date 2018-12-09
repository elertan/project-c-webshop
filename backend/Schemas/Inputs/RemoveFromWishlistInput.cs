namespace backend.Schemas.Inputs
{
    public class RemoveFromWishlistData
    {
        public string AuthToken { get; set; }
        public int ProductId { get; set; }
    }
    
    public class RemoveFromWishlistInput : BaseInputTypeGraph<RemoveFromWishlistData>
    {
        public RemoveFromWishlistInput()
        {
            Field(x => x.AuthToken);
            Field(x => x.ProductId);
        }
    }
}