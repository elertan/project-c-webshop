using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Graphs
{
    public class OrderGraph : BaseGraphType<Order>
    {
        private readonly DatabaseContext _db;

        public OrderGraph(IEfGraphQLService efGraphQlService, DatabaseContext db) : base(efGraphQlService)
        {
            _db = db;
            
            Field<UserGraph>("user", resolve: ctx => ctx.Source.User);
            FieldAsync<ListGraphType<ProductGraph>, List<Product>>("products",
                resolve: ctx => db.OrderXProducts
                    .Where(x => x.OrderId == ctx.Source.Id)
                    .Join(db.Products,
                        e => e.ProductId,
                        e => e.Id,
                        (x, product) => product)
                    .ToListAsync()
            );
        }
    }
}