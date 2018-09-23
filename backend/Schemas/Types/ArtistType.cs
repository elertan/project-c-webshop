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
            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");

            Field<ListGraphType<TrackType>>(
                "tracks",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id).Select(e => e.Track)
            );
            Field<ListGraphType<AlbumType>>(
                "albums",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id)
                    .Join(db.AlbumXTracks,
                        artistXTrack => artistXTrack.TrackId,
                        albumXTrack => albumXTrack.TrackId,
                        ((artistXT, albumXT) => new {artistXT, albumXT}))
                    .Join(db.Albums,
                        lastResult => lastResult.albumXT.AlbumId,
                        album => album.Id,
                        (lastResult, album) => album)
                .Select(album => album)
            );
        }
    }
}