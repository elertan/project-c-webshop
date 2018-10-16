using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ArtistGraph : BaseGraphType<Artist>
    {
        public ArtistGraph(DatabaseContext db)
        {
            Name = "Artist";

            
            Field(a => a.Name, nullable: true).Description("The name of the artist.");
            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");

            Field<ListGraphType<TrackGraph>>(
                "tracks",
                resolve: ctx => db.ArtistXTracks.Where(e => e.ArtistId == ctx.Source.Id).Select(e => e.Track)
            );
            Field<ListGraphType<AlbumGraph>>(
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