using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Schemas.Graphs;
using backend.Schemas.Graphs.Mutations.Auth;
using backend.Schemas.Graphs.Mutations.Order;
using backend.Services;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas
{
    public class RootMutation : EfObjectGraphType<object>
    {
        private readonly IAccountService _accountService;
        private readonly IOrderService _orderService;

        public RootMutation(IEfGraphQLService service, IAccountService accountService, IOrderService orderService) : base(service)
        {
            _accountService = accountService;
            _orderService = orderService;
            Name = "Mutation";

            Field<ApiResultGraph<UserGraph, User>>(
                "register",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RegisterInput>> {Name = "data"}
                ),
                resolve: CreateAccountResolveFn);

            Field<ApiResultGraph<UserGraph, User>>(
                "login",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LoginInput>> {Name = "data"}),
                resolve: LoginResolveFn);
            
            Field<ApiResultGraph<OrderGraph, Order>>(
                "createAnonymousOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAnonymousOrderInput>> {Name = "data"}
                ),
                resolve: CreateAnonymousOrderResolveFn
            );
        }
        
        private async Task<ApiResult<User>> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RegisterData>("data");
            try
            {
                var user = await _accountService.Register(data);
                return new ApiResult<User> { Data = user };
            }
            catch (Exception ex)
            {
                return new ApiResult<User> { Errors = new List<ApiError> {new ApiError {Message = ex.Message}} };
            }
        }

        private async Task<ApiResult<User>> LoginResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<LoginData>("data");
            try
            {
                var user = await _accountService.Login(data);
                return new ApiResult<User> {Data = user};
            }
            catch (Exception ex)
            {
                return new ApiResult<User> { Errors = new List<ApiError> {new ApiError {Message = ex.Message}} };
            }
        }
        
        private async Task<ApiResult<Order>> CreateAnonymousOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAnonymousOrderData>("data");
            
            var order = await _orderService.CreateAnonymousOrder(data);
            return new ApiResult<Order>{Data = order};
        }
    }
}