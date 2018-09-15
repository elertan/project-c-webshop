using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace backend.Models
{
    public class Artist : BaseEntity
    {
        public string Name { get; set; }
    }
}