using backend_datamodel.Models;

namespace backend.Schemas.Types
{
    public class GenreGraph : BaseGraphType<Genre>
    {
        public GenreGraph(DatabaseContext db)
        {
            Field(e => e.Name);
        }
    }
}