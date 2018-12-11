using System.Collections.Generic;
using backend_datamodel.Models.Crosstables;

namespace backend_datamodel.Models
{
    public class Product : BaseEntity
    {
        public float Price { get; set; }
        public IList<OrderXProduct> OrderXProducts { get; set; }
    }
}