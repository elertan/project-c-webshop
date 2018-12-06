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
        public RootMutation(IEfGraphQLService service) : base(service)
        {
            Name = "Mutation";

            Field<AuthGraph>("auth");
            Field<Graphs.Mutations.Order.MutationOrderGraph>("order");
        }
    }
}