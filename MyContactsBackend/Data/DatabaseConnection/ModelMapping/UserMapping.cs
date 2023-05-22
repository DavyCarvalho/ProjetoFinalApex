using Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.DatabaseConnection.ModelMapping
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(user => user.Id);
            builder.Property(user => user.Id).ValueGeneratedOnAdd();

            builder.Property(user => user.Name).IsRequired();
            builder.Property(user => user.Email).IsRequired();
            builder.Property(user => user.Password).IsRequired();

            builder.HasMany(user => user.Contacts)
                .WithOne(contact => contact.User)
                .HasForeignKey(contact => contact.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
