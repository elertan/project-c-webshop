using System;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Types
{
    public class ProductGraph : BaseGraphType<Product>
    {
        public ProductGraph(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Product";

            Field<DecimalGraphType>(
                "price",
                resolve: ctx => Convert.ToDecimal(ctx.Source.Price)
            );

            // Can be null
            Field<TrackGraph>(
                "track",
                resolve: ctx => db.Tracks.Where(t => t.Product.Id == ctx.Source.Id).FirstOrDefaultAsync());
            // Can be null
            Field<AlbumGraph>(
                "album",
                resolve: ctx => db.Albums.Where(a => a.Product.Id == ctx.Source.Id).FirstOrDefaultAsync());
        }
    }
}