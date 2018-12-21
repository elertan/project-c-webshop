using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class DeleteUserData : AuthorizedData
    {
        public int UserId { get; set; }
    }
    
    public class DeleteUserDataInput : AuthorizedBaseInputTypeGraph<DeleteUserData>
    {
        public DeleteUserDataInput()
        {
            Field(x => x.UserId);
        }
    }
}