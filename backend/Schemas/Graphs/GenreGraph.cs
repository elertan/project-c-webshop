using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas.Types
{
    public class GenreGraph : BaseGraphType<Genre>
    {
        public GenreGraph(DatabaseContext db, IEfGraphQLService service) : base(service)
        {
            Field(e => e.Name);
        }
    }
}