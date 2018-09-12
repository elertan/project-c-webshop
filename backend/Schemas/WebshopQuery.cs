using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Schemas.Types;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas
{
    public class WebshopQuery : ObjectGraphType<object>
    {
        private readonly DatabaseContext _db;

        public WebshopQuery(DatabaseContext db)
        {
            _db = db;
            Name = "Query";

            Field<ArtistType>(
                "artist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> {Name = "id", Description = "id of the artist"}
                ),
                resolve: ctx => _db.Artists.FindAsync(ctx.GetArgument<int>("id"))
//                resolve: ctx => Task.FromResult(new Artist() { Id = 1, Name = "test"} )
            );
            Field<TrackType>(
                "track",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> {Name = "id", Description = "id of the track"}
                ),
                resolve: ctx => _db.Tracks.FindAsync(ctx.GetArgument<int>("id"))
            );
        }
    }
}