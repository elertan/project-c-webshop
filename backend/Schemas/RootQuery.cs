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
            
            AddQueryField<ProductType, Product>(
                name: "products",
                resolve: ctx => db.Products);
            AddQueryField<ArtistType, Artist>(
                name: "artists",
                resolve: ctx => db.Artists);
            AddQueryField<TrackType, Track>(
                name: "tracks",
                resolve: ctx => db.Tracks);
            AddQueryField<AlbumType, Album>(
                name: "albums",
                resolve: ctx => db.Albums);
        }
    }
}