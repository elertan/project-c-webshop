using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ArtistType : ObjectGraphType<Artist>
    {
        public ArtistType(DatabaseContext db)
        {
            Name = "Artist";

            Field(a => a.CreatedAt).Description("The moment the entity was created");
            Field(a => a.UpdatedAt, nullable: true).Description("The moment the entity was updated");

            Field(a => a.Id).Description("The id of the artist.");
            Field(a => a.Name, nullable: true).Description("The name of the artist.");

            Field<ListGraphType<TrackType>>(
                "tracks",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id).Select(e => e.Track)
            );
        }
    }
}