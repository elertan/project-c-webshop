using System.Collections.Generic;
using System.Linq;
using backend_datamodel.Models;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using MoreLinq.Extensions;

namespace backend.Schemas.Graphs.UserContext
{
    public class AdminContextGraph : UserContextGraph
    {
        public AdminContextGraph(DatabaseContext db) : base(db)
        {
            FieldAsync<ListGraphType<UserGraph>>(
                "users",
                resolve: async ctx => await db.Users.ToListAsync()
            );
        }
    }
}