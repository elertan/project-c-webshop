using System;

namespace backend_datamodel.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        // Password is stored as a hash
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Token { get; set; }
        // This token will only be set if the user registers anonymously
        // (buys something from the store with only giving an email)
        public string AnonymousRegistrationToken { get; set; }
    }
}