using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ApiErrorGraph : ObjectGraphType<ApiError>
    {
        public ApiErrorGraph()
        {
            Field(e => e.Message);
        }
    }
}