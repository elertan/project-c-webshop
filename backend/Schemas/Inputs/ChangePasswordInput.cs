using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class ChangePasswordData : AuthorizedData
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
    
    public class ChangePasswordInput : AuthorizedBaseInputTypeGraph<ChangePasswordData>
    {
        public ChangePasswordInput()
        {
            Field(x => x.CurrentPassword);
            Field(x => x.NewPassword);
        }
    }
}