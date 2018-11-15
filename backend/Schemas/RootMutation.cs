using System;
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

        public RootMutation(IEfGraphQLService service, IAccountService accountService) : base(service)
        {
            _accountService = accountService;
            Name = "Mutation";
            
            Field<UserGraph>(
                "createAccount",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAccountInput>> {Name = "account"}
                ),
                resolve: CreateAccountResolveFn);
        }

        private async Task<User> CreateAccountResolveFn(ResolveFieldContext<object> context)
        {
            var data = context.GetArgument<CreateAccountData>("account");
            return await _accountService.CreateAccount(null);
        }
    }
}