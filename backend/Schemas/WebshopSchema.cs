using GraphQL;
using GraphQL.Types;

namespace backend.Schemas
{
    public class WebshopSchema : Schema
    {
        public WebshopSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<WebshopQuery>();
//            Mutation = resolver.Resolve<StarWarsMutation>();
        }
    }
}