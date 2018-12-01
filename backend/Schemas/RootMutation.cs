using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Schemas.Inputs;
using backend.Schemas.Types;
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
                "createAccount",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAccountInput>> {Name = "account"}
                ),
                resolve: CreateAccountResolveFn);

            Field<ApiResultGraph<UserGraph, User>>(
                "login",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LoginInput>> {Name = "login"}),
                resolve: LoginResolveFn);
            
            Field<ApiResultGraph<OrderGraph, Order>>(
                "createOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateOrderInput>> {Name = "order"}
                ),
                resolve: CreateOrderResolveFn
            );
        }

        private async Task<ApiResult<User>> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAccountData>("account");
            try
            {
                var user = await _accountService.CreateAccount(data);
                return new ApiResult<User> { Data = user };
            }
            catch (Exception ex)
            {
                return new ApiResult<User> { Errors = new List<ApiError> {new ApiError {Message = ex.Message}} };
            }
        }

        private async Task<ApiResult<User>> LoginResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<LoginData>("login");
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

        private async Task<ApiResult<Order>> CreateOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateOrderData>("order");
            try
            {
                var order = await _orderService.CreateOrder(data);
                return new ApiResult<Order>{Data = order};
            }
            catch (Exception ex)
            {
                return new ApiResult<Order> { Errors = new List<ApiError> {new ApiError {Message = ex.Message}} };
            }
        }
    }
}