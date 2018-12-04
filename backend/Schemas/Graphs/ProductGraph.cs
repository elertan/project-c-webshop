using System;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Graphs
{
    public class ProductGraph : BaseGraphType<Product>
    {
        public ProductGraph(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Field<DecimalGraphType>(
                "price",
                resolve: ctx => Convert.ToDecimal(ctx.Source.Price)
            );

            // Can be null
            Field<TrackGraph>(
                "track",
                resolve: ctx => db.Tracks.FirstOrDefaultAsync(e => e.Product.Id == ctx.Source.Id));
            // Can be null
            Field<AlbumGraph>(
                "album",
                resolve: ctx => db.Albums.FirstOrDefaultAsync(e => e.Product.Id == ctx.Source.Id));
        }
    }
}