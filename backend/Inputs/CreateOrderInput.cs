namespace backend.Inputs
{
    public class CreateOrderData
    {
        public string AuthToken { get; set; }
        public int[] ProductIds { get; set; }
    }
    
    public class CreateOrderInput : BaseInputTypeGraph<CreateOrderData>
    {
        public CreateOrderInput()
        {
            Field(e => e.AuthToken);
            Field(e => e.ProductIds);
        }
    }
}