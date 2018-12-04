using GraphQL.Types;

namespace backend.Schemas.Graphs.Mutations
{
    public class BaseInputTypeGraph<T> : InputObjectGraphType<T>
    {
        public BaseInputTypeGraph()
        {
            Name = GetType().Name;
        }
    }
}