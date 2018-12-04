using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas.Graphs
{
    public class ArtistGraph : BaseGraphType<Artist>
    {
        public ArtistGraph(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Field(a => a.Name, nullable: true).Description("The name of the artist.");
//            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");
            
            
            AddQueryConnectionField<ImageGraph, Image>(
                "images",
                resolve: ctx => db.Images.Where(e => e.ArtistId == ctx.Source.Id)
            );
            
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