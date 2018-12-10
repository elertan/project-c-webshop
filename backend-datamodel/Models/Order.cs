using System.Collections.Generic;
using backend_datamodel.Models.Crosstables;

namespace backend_datamodel.Models
{
    public class Order : BaseEntity
    {
        public User User { get; set; }
        public int UserId { get; set; }
        
        public Invoice Invoice { get; set; }
        public int? InvoiceId { get; set; }
        
        public IList<OrderXProduct> OrderXProducts { get; set; }
    }
}