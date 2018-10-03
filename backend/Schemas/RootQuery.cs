using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Types;
using backend_datamodel.Models;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas
{
    public class RootQuery : ObjectGraphType<object>
    {
        public RootQuery(DatabaseContext db)
        {
            Name = "Query";
            
            
            Field<ListGraphType<ProductType>>(
                "products",
                resolve: ctx => db.Products.ToArrayAsync()
            );
            Field<ListGraphType<ArtistType>>(
                "artists",
                resolve: ctx => db.Artists.ToArrayAsync()
            );
            Field<ListGraphType<TrackType>>(
                "tracks",
                resolve: ctx => db.Tracks.ToArrayAsync()
            );
            Field<ListGraphType<AlbumType>>(
                "albums",
                resolve: ctx => db.Albums.ToArrayAsync()
            );

            Field<ProductType>(
                "product",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id", Description = "id of the product"}
                ),
                resolve: ctx => db.Products.FindAsync(ctx.GetArgument<int>("id"))
            );
            Field<ArtistType>(
                "artist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> {Name = "id", Description = "id of the artist"}
                ),
                resolve: ctx => db.Artists.FindAsync(ctx.GetArgument<int>("id"))
            );
            Field<TrackType>(
                "track",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> {Name = "id", Description = "id of the track"}
                ),
                resolve: ctx => db.Tracks.FindAsync(ctx.GetArgument<int>("id"))
            );
            Field<AlbumType>(
                "album",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> {Name = "id", Description = "id of the album"}),
                resolve: ctx => db.Albums.FindAsync(ctx.GetArgument<int>("id")));
        }
    }
}