using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using backend_datamodel.Models.Crosstables;
using Microsoft.EntityFrameworkCore;

namespace backend_datamodel.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Image> Images { get; set; }

        // Many-to-many tables
        public DbSet<ArtistXTrack> ArtistXTracks { get; set; }
        public DbSet<AlbumXTrack> AlbumXTracks { get; set; }
        public DbSet<OrderXProduct> OrderXProducts { get; set; }
        public DbSet<AlbumXCategory> AlbumXCategories { get; set; }
        public DbSet<Wishlist_UserXProduct> WishlistUserXProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cross ArtistXTrack
            modelBuilder.Entity<ArtistXTrack>().HasKey(at => new {at.ArtistId, at.TrackId});
            modelBuilder.Entity<ArtistXTrack>()
                .HasOne(at => at.Artist)
                .WithMany(a => a.ArtistXTracks)
                .HasForeignKey(at => at.ArtistId);
            modelBuilder.Entity<ArtistXTrack>()
                .HasOne(at => at.Track)
                .WithMany(t => t.ArtistXTracks)
                .HasForeignKey(at => at.TrackId);

            // Cross AlbumXTrack
            modelBuilder.Entity<AlbumXTrack>().HasKey(at => new {at.AlbumId, at.TrackId});
            modelBuilder.Entity<AlbumXTrack>()
                .HasOne(at => at.Album)
                .WithMany(a => a.AlbumXTracks)
                .HasForeignKey(at => at.AlbumId);
            modelBuilder.Entity<AlbumXTrack>()
                .HasOne(at => at.Track)
                .WithMany(t => t.AlbumXTracks)
                .HasForeignKey(at => at.TrackId);

            // Cross OrderXProduct
            modelBuilder.Entity<OrderXProduct>().HasKey(op => new {op.OrderId, op.ProductId});
            modelBuilder.Entity<OrderXProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderXProducts)
                .HasForeignKey(op => op.ProductId);
            modelBuilder.Entity<OrderXProduct>()
                .HasOne(op => op.Order)
                .WithMany(p => p.OrderXProducts)
                .HasForeignKey(op => op.OrderId);

            // Cross AlbumXCategory
            modelBuilder.Entity<AlbumXCategory>().HasKey(x => new {x.CategoryId, x.AlbumId});
            modelBuilder.Entity<AlbumXCategory>()
                .HasOne(x => x.Category)
                .WithMany(x => x.AlbumXCategories)
                .HasForeignKey(x => x.CategoryId);
            modelBuilder.Entity<AlbumXCategory>()
                .HasOne(x => x.Album)
                .WithMany(x => x.AlbumXCategories)
                .HasForeignKey(x => x.AlbumId);
        }

        /// <summary>
        /// Automatically adds timestamps when mutating entities
        /// </summary>
        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries()
                .Where(x => x.Entity is BaseEntity &&
                            (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entity in entities)
            {
                var now = DateTime.UtcNow; // current datetime

                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity) entity.Entity).CreatedAt = now;
                }
                else if (entity.State == EntityState.Modified)
                {
                    ((BaseEntity) entity.Entity).UpdatedAt = now;
                }
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