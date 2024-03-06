using BrewFolioServer.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace BrewFolioServer.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Brewery> Breweries { get; set; }
        public DbSet<BreweryStatus> BreweryStatuses { get; set; }
        public DbSet<BreweryType> BreweryTypes { get; set; }
        public DbSet<Beer> Beers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Brewery>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LongName).IsRequired().HasMaxLength(100);
                entity.HasOne(e => e.Type).WithMany().HasForeignKey("TypeId");
                entity.HasOne(e => e.Status).WithMany().HasForeignKey("StatusId");
                entity.Property(e => e.Visited).HasColumnType("bit");
                entity.HasMany(e => e.Beers).WithOne(b => b.Brewery);
            });

            modelBuilder.Entity<BreweryStatus>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<BreweryType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Beer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.HasOne(e => e.Brewery).WithMany(b => b.Beers).HasForeignKey("BreweryId");
            });
        }
    }
}
