using backend.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class TrackType : ObjectGraphType<Track>
    {
        public TrackType()
        {
            Name = "Track";

            Field(t => t.Id).Description("The id of the track.");
            Field(t => t.Name, nullable: true).Description("The name of the track.");

//            Field<ListGraphType<CharacterInterface>>(
//                "friends",
//                resolve: context => data.GetFriends(context.Source)
//            );
//            Field<ListGraphType<EpisodeEnum>>("appearsIn", "Which movie they appear in.");

            Field(t => t.Artist, type: typeof(ArtistType), nullable: true).Description("The artist of the track.");
        }
    }
}