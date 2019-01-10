using System;
using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class AddUserData : AuthorizedData
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
    
    public class AddUserDataInput : AuthorizedBaseInputTypeGraph<AddUserData>
    {
        public AddUserDataInput()
        {
            Field(x => x.Email);
            Field(x => x.Password);
            Field(x => x.Token);
            Field(x => x.Firstname);
            Field(x => x.Lastname);
            Field(x => x.DateOfBirth);
        }
    }
}