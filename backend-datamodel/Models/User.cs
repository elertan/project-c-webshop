namespace backend_datamodel.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        // Password is stored as a hash
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Token { get; set; }
    }
}