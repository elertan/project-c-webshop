using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
    
    // Many-to-many tables
    public DbSet<ArtistXTrack> ArtistXTracks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      
      // Many-to-many tables
      modelBuilder.Entity<ArtistXTrack>().HasKey(t => new {t.ArtistId, t.TrackId});

      var now = DateTime.Now;
      var tracks = new[]
      {
        new Track { Id = 1, Name = "Happier", CreatedAt = now },
        new Track { Id = 2, Name = "FRIENDS", CreatedAt = now },
        new Track { Id = 3, Name = "Ocean", CreatedAt = now },
        new Track { Id = 4, Name = "High on Life", CreatedAt = now },
      };
      var artists = new[]
      {
        new Artist { Id = 1, Name = "Marshmello", CreatedAt = now },
        new Artist { Id = 2, Name = "Bastille", CreatedAt = now },
        new Artist { Id = 3, Name = "Anne-Marie", CreatedAt = now },
        new Artist { Id = 4, Name = "Martin Garrix", CreatedAt = now },
        new Artist { Id = 5, Name = "Khalid", CreatedAt = now },
        new Artist { Id = 6, Name = "Bonn", CreatedAt = now },
      };

      var artistXTracks = new[]
      {
        new ArtistXTrack { TrackId = 1, ArtistId = 1 },
        new ArtistXTrack { TrackId = 1, ArtistId = 2 },
        new ArtistXTrack { TrackId = 2, ArtistId = 1 },
        new ArtistXTrack { TrackId = 2, ArtistId = 3 },
        new ArtistXTrack { TrackId = 3, ArtistId = 4 },
        new ArtistXTrack { TrackId = 3, ArtistId = 5 },
        new ArtistXTrack { TrackId = 4, ArtistId = 4 },
        new ArtistXTrack { TrackId = 4, ArtistId = 6 },
      };
      
      
      // Fill with some test data!
      modelBuilder.Entity<Track>().HasData(tracks);
      modelBuilder.Entity<Artist>().HasData(artists);
      modelBuilder.Entity<ArtistXTrack>().HasData(artistXTracks);
    }
    
    /// <summary>
    /// Automatically adds timestamps when mutating entities
    /// </summary>
    private void AddTimestamps()
    {
      var entities = ChangeTracker.Entries()
        .Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

      foreach (var entity in entities)
      {
        var now = DateTime.UtcNow; // current datetime

        if (entity.State == EntityState.Added)
        {
          ((BaseEntity)entity.Entity).CreatedAt = now;
        }
        ((BaseEntity)entity.Entity).UpdatedAt = now;
      }
    }
    
    public override int SaveChanges()
    {
      AddTimestamps();
      return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken token = default(CancellationToken))
    {
      AddTimestamps();
      return await base.SaveChangesAsync(true, token);
    }
  }
}