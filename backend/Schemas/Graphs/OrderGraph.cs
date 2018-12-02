using backend_datamodel.Models;
using GraphQL.EntityFramework;
using Microsoft.EntityFrameworkCore;


namespace backend.Schemas.Types
{
    public class OrderGraph : BaseGraphType<Order>
    {
        public OrderGraph(IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Order";

//            Field<UserGraph>(
//                "user",
//                resolve: ctx =>  ctx.Source.User.Email);
            
            Field(u => u.User.Email).Description("The email of the user");
            
        }
    }
}
