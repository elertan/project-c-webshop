using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ApiResultGraph<TGraph, TModel> : ObjectGraphType<ApiResult<TModel>> where TGraph : IGraphType
    {
        public ApiResultGraph()
        {
            Name = "ApiResult";
//            IsTypeOf(typeof(T));

            Field<TGraph>("data", resolve: e => e.Source.Data);
            Field<ListGraphType<ApiErrorGraph>>("errors", resolve: e => e.Source.Errors);
        }
    }
}