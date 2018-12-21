using System;
using backend_datamodel.Models;

namespace backend.Schemas.Exceptions
{
    public class NotAdminException : Exception
    {
        public NotAdminException(User user) : base($"Given user '{user.Email}' does not have administrative priveleges")
        {
            
        }
    }
}