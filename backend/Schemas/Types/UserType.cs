using backend_datamodel.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Schemas.Types
{
    public class UserType : BaseGraphType<User>
    {
        public UserType(DbContext db)
        {
            Name = "User";

            Field(u => u.Email).Description("The email of the user");
            Field(u => u.Firstname).Description("The firstname of the user");
            Field(u => u.Lastname).Description("The lastname of the user");
            Field(u => u.Password).Description("The hashed password of the user");
        }
    }
}