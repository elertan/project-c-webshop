namespace backend_datamodel.Models.Crosstables
{
    public class Wishlist_UserXProduct : BaseEntity
    {
        public User User { get; set; }
        public int UserId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}