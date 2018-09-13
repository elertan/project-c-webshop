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
      
      // Many-to-many tables
      modelBuilder.Entity<ArtistXTrack>().HasKey(t => new {t.ArtistId, t.TrackId});

      var track = new Track {Id = 1, Name = "Happier", CreatedAt = DateTime.Now};
      var artist = new Artist {Id = 1, Name = "Marshmello", CreatedAt = DateTime.Now};

      var artistXTrack = new ArtistXTrack {ArtistId = 1, TrackId = 1};
      
      // Fill with some test data!
      modelBuilder.Entity<Track>().HasData(track);
      modelBuilder.Entity<Artist>().HasData(artist);
      modelBuilder.Entity<ArtistXTrack>().HasData(artistXTrack);
    }
  }
}