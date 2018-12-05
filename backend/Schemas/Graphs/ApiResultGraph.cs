using System.Linq;
using GraphQL.Types;

namespace backend.Schemas.Graphs
{
    public class ApiResultGraph<TGraph, TModel> : ObjectGraphType<ApiResult<TModel>> where TGraph : IGraphType
    {
        public ApiResultGraph()
        {
            var type = GetType();
            Name =
                $"{type.Name}_{type.GenericTypeArguments.Select(arg => arg.Name).Aggregate((curr, next) => $"{curr}_{next}")}".Replace("`", "");
            
            Field<TGraph>("data", resolve: e => e.Source.Data);
            Field<ListGraphType<ApiErrorGraph>>("errors", resolve: e => e.Source.Errors);
        }
    }
}