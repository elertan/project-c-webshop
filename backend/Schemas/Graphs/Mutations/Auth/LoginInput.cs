using GraphQL.Types;

namespace backend.Schemas.Graphs.Mutations.Auth
{
    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
    public class LoginInput : InputObjectGraphType<LoginData>
    {
        public LoginInput()
        {
            Name = "LoginInput";

            Field(e => e.Email);
            Field(e => e.Password);
        }
    }
}