using GraphQL.Types;

namespace backend.Inputs
{
    public class BaseInputTypeGraph<T> : InputObjectGraphType<T>
    {
        public BaseInputTypeGraph()
        {
            Name = GetType().Name;
        }
    }
}