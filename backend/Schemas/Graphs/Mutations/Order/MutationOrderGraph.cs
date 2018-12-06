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
            
        }
        
    }
}