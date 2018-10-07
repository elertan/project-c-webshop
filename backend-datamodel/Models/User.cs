namespace backend_datamodel.Models
{
    public class User : BaseEntity
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        // Password is stored as a hash
        public string Password { get; set; }
    }
}