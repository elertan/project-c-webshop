using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Types
{
    public class TrackGraph : BaseGraphType<Track>
    {
        public TrackGraph(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = "Track";
            
            Field(t => t.Name, nullable: true).Description("The name of the track.");
            Field(t => t.SpotifyId).Description("The Id that is used on Spotify's database");
            Field(t => t.Explicit).Description("Is this track an explicit release?");
            Field(t => t.DurationMs).Description("The duration of the track in milliseconds");
            Field(t => t.PreviewUrl, nullable: true).Description("The preview url of this track, can be null");

            Field<ProductGraph>(
                "product",
                resolve: ctx => db.Products.FirstOrDefaultAsync(e => e.Id == ctx.Source.ProductId)
            );
            
            AddQueryConnectionField<ArtistGraph, Artist>(
                "artists",
                resolve: ctx => db.ArtistXTracks.Where(e => e.TrackId == ctx.Source.Id).Join(
                        db.Artists,
                        e => e.ArtistId,
                        e => e.Id,
                        (_, artist) => artist
                    )
            );
            AddQueryConnectionField<AlbumGraph, Album>(
                "albums",
                resolve: ctx => db.AlbumXTracks.Where(e => e.TrackId == ctx.Source.Id).Join(
                    db.Albums,
                    e => e.AlbumId,
                    e => e.Id,
                    (_, album) => album
                )
            );
        }
    }
}