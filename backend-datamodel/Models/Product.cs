using System.Collections.Generic;

namespace backend_datamodel.Models
{
    public class Product : BaseEntity
    {
        public float Price { get; set; }
        public IList<OrderXProduct> OrderXProducts { get; set; }
    }
}