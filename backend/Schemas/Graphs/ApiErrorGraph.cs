using GraphQL.Types;

namespace backend.Schemas.Graphs
{
    public class ApiErrorGraph : ObjectGraphType<ApiError>
    {
        public ApiErrorGraph()
        {
            Field(e => e.Message);
//            Field<GraphType>("data", resolve: ctx => ctx.Source.Data);
        }
    }
}