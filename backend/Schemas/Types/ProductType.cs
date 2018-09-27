using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ProductType : BaseGraphType<Product>
    {
        public ProductType()
        {
            Name = "Product";
            
            

            
            
        }
    }
}