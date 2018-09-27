namespace backend_datamodel.Models
{
    public class Payment : BaseEntity
    {
        public Invoice Invoice { get; set; }
        public PaymentState PaymentState { get; set; }
    }
}