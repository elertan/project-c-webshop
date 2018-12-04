using backend.Schemas.Graphs;
using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas
{
    public class OrderGraph : BaseGraphType<Order>
    {
        public OrderGraph(IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Field<UserGraph>("user", resolve: ctx => ctx.Source.User);
        }
    }
}