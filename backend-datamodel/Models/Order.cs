using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Order : BaseEntity
    {
        public User User { get; set; }
        public Invoice Invoice { get; set; }
        public IList<OrderXProduct> OrderXProducts { get; set; }
    }
}