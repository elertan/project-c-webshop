using backend_datamodel.Models;

namespace backend.Schemas.Types
{
    public class CategoryGraph : BaseGraphType<Category>
    {
        public CategoryGraph(DatabaseContext db)
        {
            Field(e => e.Name);
            Field(e => e.ImageUrl);
            Field(e => e.SpotifyId);
        }
    }
}