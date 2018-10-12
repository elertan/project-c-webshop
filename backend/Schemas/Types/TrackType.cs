using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class TrackType : BaseGraphType<Track>
    {
        public TrackType(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Track";
            
            Field(t => t.Name, nullable: true).Description("The name of the track.");
            Field(t => t.SpotifyId).Description("The Id that is used on Spotify's database");
            Field(t => t.Explicit).Description("Is this track an explicit release?");
            Field(t => t.DurationMs).Description("The duration of the track in milliseconds");
            Field(t => t.PreviewUrl, nullable: true).Description("The preview url of this track, can be null");

            AddNavigationField<ArtistType, Artist>(
                "artists",
                resolve: ctx => db.ArtistXTracks.Where(e => e.TrackId == ctx.Source.Id).Select(e => e.Artist)
            );
            AddNavigationField<AlbumType, Album>(
                "albums",
                resolve: ctx => db.AlbumXTracks.Where(e => e.TrackId == ctx.Source.Id).Select(e => e.Album)
            );
        }
    }
}