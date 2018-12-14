using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Schemas.Graphs;
using backend.Schemas.Inputs;
using backend.Services;
using backend.Utils;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas
{
    public class RootMutation : EfObjectGraphType<object>
    {
        private readonly IAccountService _accountService;
        private readonly IOrderService _orderService;

        public RootMutation(IEfGraphQLService service, IAccountService accountService, IOrderService orderService) :
            base(service)
        {
            _accountService = accountService;
            _orderService = orderService;
            Name = "Mutation";

            Field<ApiResultGraph<UserGraph, User>>(
                "register",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RegisterInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateAccountResolveFn));

            Field<ApiResultGraph<UserGraph, User>>(
                "login",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<LoginInput>> {Name = "data"}),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(LoginResolveFn));

            Field<ApiResultGraph<OrderGraph, Order>>(
                "createOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateOrderInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateOrderResolveFn)
            );

            Field<ApiResultGraph<OrderGraph, Order>>(
                "createAnonymousOrder",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAnonymousOrderInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(CreateAnonymousOrderResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "addToWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<AddToWishlistInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(AddToWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "removeFromWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<RemoveFromWishlistInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(RemoveFromWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "mergeWishlist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<MergeWishlistInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(MergeWishlistResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>>(
                "changePassword",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangePasswordInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangePasswordResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>> (
                "changeEmail",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangeEmailInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangeEmailResolveFn)
            );

            Field<ApiResultGraph<BooleanGraphType, bool>> (
                "changeName",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ChangeNameInput>> {Name = "data"}
                ),
                resolve: GraphQLFieldResolveUtils.WrapApiResultTryCatch(ChangeNameResolveFn)
            );

        }

        private async Task<ApiResult<User>> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RegisterData>("data");

            var user = await _accountService.Register(data);
            return new ApiResult<User> {Data = user};
        }

        private async Task<ApiResult<User>> LoginResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<LoginData>("data");

            var user = await _accountService.Login(data);
            return new ApiResult<User> {Data = user};
        }

        private async Task<ApiResult<Order>> CreateOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateOrderData>("data");

            var order = await _orderService.CreateOrder(data);
            return new ApiResult<Order> {Data = order};
        }

        private async Task<ApiResult<Order>> CreateAnonymousOrderResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAnonymousOrderData>("data");

            var order = await _orderService.CreateAnonymousOrder(data);
            return new ApiResult<Order> {Data = order};
        }

        private async Task<ApiResult<bool>> AddToWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<AddToWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.AddToWishlist(user.Id, data.ProductId);
            return new ApiResult<bool> {Data = true};
        }

        private async Task<ApiResult<bool>> RemoveFromWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RemoveFromWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.RemoveFromWishlist(user.Id, data.ProductId);
            return new ApiResult<bool> {Data = true};
        }

        private async Task<ApiResult<bool>> MergeWishlistResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<MergeWishlistData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.MergeWishlist(user.Id, data.LocalProducts);
            return new ApiResult<bool> {Data = true};
        }

        private async Task<ApiResult<bool>> ChangePasswordResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangePasswordData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangePassword(user.Id, data.CurrentPassword, data.NewPassword);
            return new ApiResult<bool> {Data = true};
        }
        
        private async Task<ApiResult<bool>> ChangeEmailResolveFn(ResolveFieldContext<object> context) 
        {
            var data = context.GetArgument<ChangeEmailData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangeEmail(user.Id, data.NewEmail);
            return new ApiResult<bool> {Data = true};
        }

        private async Task<ApiResult<bool>> ChangeNameResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<ChangeNameData>("data");
            var user = await _accountService.GetUserByToken(data.AuthToken);

            await _accountService.ChangeName(user.Id, data.NewFirstName, data.NewLastName);
            return new ApiResult<bool> {Data = true};
        }
    }
}