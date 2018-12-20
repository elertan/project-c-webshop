using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class UpdateUserData : AuthorizedData
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Token { get; set; }
        public string DateOfBirth { get; set; }
    }
    
    public class UpdateUserDataInput : AuthorizedBaseInputTypeGraph<UpdateUserData>
    {
        public UpdateUserDataInput()
        {
            Field(x => x.UserId, nullable: false);
            Field(x => x.Email, nullable: true);
            Field(x => x.Password, nullable: true);
            Field(x => x.Firstname, nullable: true);
            Field(x => x.Lastname, nullable: true);
            Field(x => x.Token, nullable: true);
            Field(x => x.DateOfBirth, nullable: true);
        }
    }
}