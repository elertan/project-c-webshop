using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Schemas.Graphs;
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
            
            AddQueryConnectionField<ProductGraph, Product>(
                name: "products",
                resolve: ctx => db.Products);
            AddQueryConnectionField<ArtistGraph, Artist>(
                name: "artists",
                resolve: ctx => db.Artists);
            AddQueryConnectionField<TrackGraph, Track>(
                name: "tracks",
                resolve: ctx => db.Tracks);
            AddQueryConnectionField<AlbumGraph, Album>(
                name: "albums",
                resolve: ctx => db.Albums);
            AddQueryConnectionField<GenreGraph, Genre>(
                name: "genres",
                resolve: ctx => db.Genres);
            AddQueryConnectionField<CategoryGraph, Category>(
                name: "categories",
                resolve: ctx => db.Categories);
        }
    }
}