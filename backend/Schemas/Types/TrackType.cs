using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class TrackType : ObjectGraphType<Track>
    {
        public TrackType(DatabaseContext db)
        {
            Name = "Track";
            
            Field(a => a.CreatedAt).Description("The moment the entity was created");
            Field(a => a.UpdatedAt, nullable: true).Description("The moment the entity was updated");

            Field(t => t.Id).Description("The id of the track.");
            Field(t => t.Name, nullable: true).Description("The name of the track.");

            Field<ListGraphType<ArtistType>>(
                "artists",
                resolve: ctx => db.ArtistXTracks.Where(e => e.TrackId == ctx.Source.Id).Select(e => e.Artist)
            );
        }
    }
}