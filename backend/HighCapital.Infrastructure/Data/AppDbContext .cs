using Microsoft.EntityFrameworkCore;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Enums;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HighCapital.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Chatbot> Chatbots { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Chatbot>()
                .Property(c => c.Model)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
