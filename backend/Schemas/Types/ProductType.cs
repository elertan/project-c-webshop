using System;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Types
{
    public class ProductType : BaseGraphType<Product>
    {
        public ProductType(DatabaseContext db)
        {
            Name = "Product";

            Field<DecimalGraphType>(
                "price",
                resolve: ctx => Convert.ToDecimal(ctx.Source.Price)
            );

            // Can be null
            Field<TrackType>(
                "track",
                resolve: ctx => db.Tracks.Where(t => t.Product.Id == ctx.Source.Id).FirstOrDefaultAsync());
            // Can be null
            Field<AlbumType>(
                "album",
                resolve: ctx => db.Albums.Where(a => a.Product.Id == ctx.Source.Id).FirstOrDefaultAsync());
        }
    }
}