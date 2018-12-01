
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Inputs
{
    public class CreateOrderData
    {
        public string UserEmail { get; set; }
        
        
        
    }

    public class CreateOrderInput : InputObjectGraphType<CreateOrderData>
    {
        public CreateOrderInput()
        {
            Name = "CreateOrderInput";

            Field(e => e.UserEmail);
         
           

        }
    }
}
