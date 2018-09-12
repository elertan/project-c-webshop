using System;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
  public class DatabaseContext : DbContext {
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options)
    {
    }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Track> Tracks { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<Artist> Artists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Fill with some test data!
      modelBuilder.Entity<Artist>().HasData(new {Id = 1, Name = "Marshmello"});
      modelBuilder.Entity<Track>().HasData(new {Id = 1, Name = "Happier", ArtistId = 1});
    }
  }
}