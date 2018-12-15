namespace backend.Schemas.Inputs.Template
{
    public class AuthorizedData
    {
        public string AuthToken { get; set; }
    }
    
    public class AuthorizedBaseInputTypeGraph<T> : BaseInputTypeGraph<T> where T : AuthorizedData
    {
        public AuthorizedBaseInputTypeGraph()
        {
            Field(x => x.AuthToken);
        }
    }
}