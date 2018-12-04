using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Schemas.Graphs.Mutations.Order.Exceptions;
using backend.Services;
using backend.Utils;
using GraphQL.Types;
using Models = backend_datamodel.Models;

namespace backend.Schemas.Graphs.Mutations.Order
{
    public class MutationOrderGraph : ObjectGraphType<object>
    {
        private readonly IOrderService _orderService;

        public MutationOrderGraph(IOrderService orderService)
        {
            _orderService = orderService;
            
            Field<ApiResultGraph<OrderGraph, Models.Order>>(
                "createAnonymous",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAnonymousOrderInput>> {Name = "data"}
                ),
                resolve: CreateAnonymousOrderResolveFn
            );
        }
        
        private async Task<ApiResult<Models.Order>> CreateAnonymousOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAnonymousOrderData>("order");
            
            var order = await _orderService.CreateAnonymousOrder(data);
            return new ApiResult<Models.Order>{Data = order};
        }
    }
}