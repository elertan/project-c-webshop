using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Types;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas
{
    public class RootQuery : EfObjectGraphType<object>
    {
        public RootQuery(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Query";
            
            AddQueryField<ProductGraph, Product>(
                name: "products",
                resolve: ctx => db.Products);
            AddQueryField<ArtistGraph, Artist>(
                name: "artists",
                resolve: ctx => db.Artists);
            AddQueryField<TrackGraph, Track>(
                name: "tracks",
                resolve: ctx => db.Tracks);
            AddQueryField<AlbumGraph, Album>(
                name: "albums",
                resolve: ctx => db.Albums);
            AddQueryField<GenreGraph, Genre>(
                name: "genres",
                resolve: ctx => db.Genres);
            AddQueryField<CategoryGraph, Category>(
                name: "categories",
                resolve: ctx => db.Categories);
        }
    }
}