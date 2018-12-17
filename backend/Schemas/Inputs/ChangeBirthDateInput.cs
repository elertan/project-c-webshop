using backend.Schemas.Inputs.Template;
using System;

namespace backend.Schemas.Inputs
{
    public class ChangeBirthDateData : AuthorizedData
    {
        public DateTime NewBirthDate { get; set; }
    }

    public class ChangeBirthDateInput : AuthorizedBaseInputTypeGraph<ChangeBirthDateData>
    {
        public ChangeBirthDateInput()
        {
            Field(x => x.NewBirthDate);
        }
    }
}
