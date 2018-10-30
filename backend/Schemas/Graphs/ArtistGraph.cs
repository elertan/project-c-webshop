using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ArtistGraph : BaseGraphType<Artist>
    {
        public ArtistGraph(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Artist";

            
            Field(a => a.Name, nullable: true).Description("The name of the artist.");
            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");
            
            AddQueryConnectionField<TrackGraph, Track>(
                "tracks",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id)
                    .Join(
                        db.Tracks,
                        e => e.TrackId,
                        e => e.Id,
                        (_, e) => e
                    )
            );

            AddQueryConnectionField<AlbumGraph, Album>(
                "albums",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id)
                    .Join(
                        db.AlbumXTracks,
                        e => e.TrackId,
                        e => e.TrackId,
                        (_, e) => e
                    )
                    .Join(db.Albums,
                        e => e.AlbumId,
                        e => e.Id,
                        (_, album) => album
                    )
            );
        }
    }
}