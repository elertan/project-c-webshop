using backend_datamodel.Models;
using GraphQL.Types;

namespace backend.Schemas.Types
{
    public class BaseGraphType<T> : ObjectGraphType<T> where T : BaseEntity
    {
        public BaseGraphType()
        {
            Field(a => a.CreatedAt).Description("The moment the entity was created");
            Field(a => a.UpdatedAt, nullable: true).Description("The moment the entity was updated");
            Field(t => t.Id).Description("The id of the entity");
        }
    }
}