using System;

namespace backend.Schemas.Exceptions
{
    public class UserNotFoundForAuthTokenException : Exception
    {
        public string Token { get; }

        public UserNotFoundForAuthTokenException(string token) : base($"User not found for token '{token}'")
        {
            Token = token;
        }
    }
}