using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ApiResultGraph<T> : ObjectGraphType<ApiResult<T>>
    {
        public ApiResultGraph()
        {
            Name = "ApiResult";

            Field(e => e.Data);
            Field<ListGraphType<ApiErrorGraph>>("errors", resolve: e => e.Errors);
        }
    }
}