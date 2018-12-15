using System;
using GraphQL.Types;

namespace backend.Schemas.Inputs
{
    public class RegisterData
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
    
    public class RegisterInput : InputObjectGraphType<RegisterData>
    {
        public RegisterInput()
        {
            Name = "RegisterInput";

            Field(e => e.Email);
            Field(e => e.Password);
            Field(e => e.Firstname);
            Field(e => e.Lastname);
            Field(e => e.DateOfBirth, nullable: true);
        }
    }
}