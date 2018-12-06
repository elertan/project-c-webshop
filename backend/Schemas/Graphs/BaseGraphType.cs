using backend_datamodel.Models;
using GraphQL.EntityFramework;

namespace backend.Schemas.Graphs
{
    public abstract class BaseGraphType<T> : EfObjectGraphType<T> where T : BaseEntity
    {
        protected BaseGraphType(IEfGraphQLService efGraphQlService) : base(efGraphQlService)
        {
            Name = GetType().Name;
            
            Field(a => a.CreatedAt).Description("The moment the entity was created");
            Field(a => a.UpdatedAt, nullable: true).Description("The moment the entity was updated");
            Field(t => t.Id).Description("The id of the entity");
        }
    }
}