using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class AlbumType : BaseGraphType<Album>
    {
        public AlbumType(DatabaseContext db, IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
           
            Field(a => a.Name, nullable: true).Description("The name of the track.");
            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");
            Field(a => a.Label).Description("The label that released this album");
            Field(a => a.Popularity).Description("The popularity of the song on a scale from 1-100");
            Field(a => a.AlbumType).Description("The type of album, either 'single' or 'album'");

            // TODO: Attempted to use AddQueryField without success, since that introduces
            // a bunch of independent queries (VERY SLOW).
            // Need to find a way to remove the Select part to use a single query
            AddNavigationField<TrackType, Track>(
                name: "tracks",
                resolve: ctx => db.AlbumXTracks.Where(e => e.AlbumId == ctx.Source.Id).Select(e => e.Track)
            );
        }
    }
}