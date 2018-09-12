using System;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
  public class DatabaseContext : DbContext {
    public DbSet<Product> Products { get; set; }
  }
}