using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas.Types
{
    public class ImageGraph : BaseGraphType<Image>
    {
        public ImageGraph(DatabaseContext db, IEfGraphQLService service) : base(service)
        {
            Field(e => e.Url);
            Field(e => e.Height, nullable: true);
            Field(e => e.Width, nullable: true);
        }
    }
}