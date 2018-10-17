using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class AlbumGraph : BaseGraphType<Album>
    {
        public AlbumGraph(DatabaseContext db, IEfGraphQLService service) : base(service)
        {
           
            Field(a => a.Name, nullable: true).Description("The name of the track.");
            Field(a => a.ImageUrl, nullable: true).Description("An image that represents the artist");
            Field(a => a.SpotifyId).Description("The Id that is used on Spotify's database");
            Field(a => a.Label).Description("The label that released this album");
            Field(a => a.Popularity).Description("The popularity of the song on a scale from 1-100");
            Field(a => a.AlbumType).Description("The type of album, either 'single' or 'album'");
            
            
            Field<ListGraphType<TrackGraph>>(
                "tracks",
                resolve: ctx => db.AlbumXTracks.Where(e => e.AlbumId == ctx.Source.Id).Select(e => e.Track)
            );
        }
    }
}