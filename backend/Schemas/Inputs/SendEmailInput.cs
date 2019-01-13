using System;
using GraphQL.Types;

namespace backend.Schemas.Inputs
{
    public class SendEmailData
    {
        public string Email { get; set; }
  
    }
    
    public class SendEmailInput : InputObjectGraphType<SendEmailData>
    {
        public SendEmailInput()
        {
            Name = "SendEmailInput";

            Field(e => e.Email);
         
        }
    }
}