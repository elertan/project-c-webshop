using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Services;
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Graphs.Mutations.Auth
{
    public class AuthGraph : ObjectGraphType<object>
    {
        private readonly IAccountService _accountService;

        public AuthGraph(IAccountService accountService)
        {
            _accountService = accountService;
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
            
        }
        
        private async Task<ApiResult<User>> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<RegisterData>("account");
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
    }
}