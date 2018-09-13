using System.Collections.Generic;
using backend.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class TrackType : ObjectGraphType<Track>
    {
        public TrackType(DatabaseContext db)
        {
            Name = "Track";

            Field(t => t.Id).Description("The id of the track.");
            Field(t => t.Name, nullable: true).Description("The name of the track.");

            Field<ListGraphType<ArtistType>>(
                "artists",
                resolve: ctx => new List<Artist> { new Artist { Id = 666, Name = "Marsh lik aan me mello" }, new Artist { Id = 1337, Name = "Bastille"} }//ctx.Source.Artists
            );

//            Field<ListGraphType<CharacterInterface>>(
//                "friends",
//                resolve: context => data.GetFriends(context.Source)
//            );
//            Field<ListGraphType<EpisodeEnum>>("appearsIn", "Which movie they appear in.");

//            Field(t => t.Artist, type: typeof(ArtistType), nullable: true).Description("The artist of the track.");
        }
    }
}