namespace backend_datamodel.Models.Crosstables
{
    public class OrderXProduct : BaseEntity
    {
        public Order Order { get; set; }
        public int OrderId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}