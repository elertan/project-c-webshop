using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using MoreLinq.Extensions;

namespace backend.Schemas.Graphs.UserContext
{
    public class UserContextGraph : ObjectGraphType<User>
    {
        public UserContextGraph(DatabaseContext db)
        {
            Field<UserGraph>(
                name: "user",
                resolve: ctx => ctx.Source);

            FieldAsync<ListGraphType<OrderGraph>, List<Order>>(
                name: "orders",
                resolve: ctx => db.Orders.Where(x => x.UserId == ctx.Source.Id).ToListAsync()
            );
            
            FieldAsync<ListGraphType<ProductGraph>, List<Product>>(
                name: "boughtProducts",
                resolve: async ctx => {
                    // TODO: Make sure that products are bought!
                    // Get this users orders
                    var orderIds = await db.Orders.Where(x => x.UserId == ctx.Source.Id).Select(x => x.Id).ToListAsync();
                    // For all orders, get their cross table product ids
                    var productIds = await db.OrderXProducts.Where(x => orderIds.Contains(x.OrderId))
                        .Select(x => x.ProductId)
                        .Distinct()
                        .ToListAsync();
                    // Get all products for given orders
                    return await db.Products.Where(x => productIds.Contains(x.Id)).ToListAsync();
                }
            );
            
            
        }
    }
}