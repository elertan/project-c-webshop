using System.Linq;
using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas.Types
{
    public class CategoryGraph : BaseGraphType<Category>
    {
        public CategoryGraph(DatabaseContext db, IEfGraphQLService service) : base(service)
        {
            Field(e => e.Name);
//            Field(e => e.ImageUrl);
            Field(e => e.SpotifyId);
            
            AddQueryConnectionField<ImageGraph, Image>(
                "images",
                resolve: ctx => db.Images.Where(e => e.CategoryId == ctx.Source.Id)
            );
        }
    }
}