using System;
using backend_datamodel.Models;

namespace backend.Schemas.Exceptions
{
    public class EmailHasKnownUserException : Exception, IApiErrorable
    {
        public User User { get; }

        public EmailHasKnownUserException(User user) : base("A user with that email is already registered, login instead.")
        {
            User = user;
        }

        public ApiError ToApiError()
        {
            return new ApiError
            {
                Message = Message,
                Data = User
            };
        }
    }
}