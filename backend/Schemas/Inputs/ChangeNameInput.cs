using backend.Schemas.Inputs.Template;

namespace backend.Schemas.Inputs
{
    public class ChangeNameData : AuthorizedData
    {
        public string NewFirstName { get; set; }
        public string NewLastName { get; set; }
    }

    public class ChangeNameInput : AuthorizedBaseInputTypeGraph<ChangeNameData>
    {
        public ChangeNameInput() 
        {
            Field(x => x.NewFirstName);
            Field(x => x.NewLastName);
        }
    }
}