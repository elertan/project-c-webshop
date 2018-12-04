using System;
using System.Threading.Tasks;
using backend.Schemas;
using GraphQL.Types;

namespace backend.Utils
{
    public static class GraphQLFieldResolveUtils
    {
        /// <summary>
        /// Wraps a resolve function within a try catch block that will automatically handle
        /// casting to the ApiError type when something goes not as expected
        /// </summary>
        /// <param name="fn"></param>
        /// <returns></returns>
        public static Func<ResolveFieldContext<object>, Task<object>> WrapApiResultTryCatch<T>(
            Func<ResolveFieldContext<object>, Task<ApiResult<T>>> fn)
        {
            return async context =>
            {
                try
                {
                    return await fn(context);
                }
                catch (Exception ex)
                {
                    return ex.ToApiResult<T>();
                }
            };
        }
    }
}