using GraphQL.Types;

namespace backend.Schemas.Inputs
{
    public class BaseInputTypeGraph<T> : InputObjectGraphType<T>
    {
        public BaseInputTypeGraph()
        {
            Name = GetType().Name;
        }
    }
}