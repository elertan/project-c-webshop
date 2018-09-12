using backend.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class ArtistType : ObjectGraphType<Artist>
    {
        public ArtistType()
        {
            Name = "Artist";

            Field(a => a.Id).Description("The id of the artist.");
            Field(a => a.Name, nullable: true).Description("The name of the artist.");

//            Field<ListGraphType<CharacterInterface>>(
//                "friends",
//                resolve: context => data.GetFriends(context.Source)
//            );
//            Field<ListGraphType<EpisodeEnum>>("appearsIn", "Which movie they appear in.");

//            Field(t => t.Artist, nullable: true).Description("The artist of the track.");
        }
    }
}