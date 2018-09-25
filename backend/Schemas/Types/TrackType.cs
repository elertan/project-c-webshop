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
            Field(t => t.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(t => t.SpotifyId).Description("The Id that is used on Spotify's database");
            Field(t => t.Explicit).Description("Is this track an explicit release?");
            Field(t => t.DurationMs).Description("The duration of the track in milliseconds");
            Field(t => t.PreviewUrl, nullable: true).Description("The preview url of this track, can be null");

            Field<ListGraphType<ArtistType>>(
                "artists",
                resolve: ctx => db.ArtistXTracks.Where(e => e.TrackId == ctx.Source.Id).Select(e => e.Artist)
            );
            Field<ListGraphType<AlbumType>>(
                "albums",
                resolve: ctx => db.AlbumXTracks.Where(e => e.TrackId == ctx.Source.Id).Select(e => e.Album)
            );
        }
    }
}