using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Graphs.UserContext
{
    public class UserContextGraph : ObjectGraphType<User>
    {
        public UserContextGraph()
        {
            Field<UserGraph>(
                name: "user",
                resolve: ctx => ctx.Source);
        }
    }
}