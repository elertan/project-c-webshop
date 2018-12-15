using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class ChangeEmailData : AuthorizedData
    {
        public string NewEmail { get; set; }
    }

    public class ChangeEmailInput : AuthorizedBaseInputTypeGraph<ChangeEmailData>
    {
        public ChangeEmailInput()
        {
            Field(x => x.NewEmail);
        }
    }
}