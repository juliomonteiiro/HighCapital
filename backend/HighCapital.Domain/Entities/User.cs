using System.ComponentModel.DataAnnotations;

namespace HighCapital.Domain.Entities;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public required string Name { get; set; }

    [Required, MaxLength(150)]
    public required string Email { get; set; }

    [Required]
    public required string PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; }

    public required ICollection<Chatbot> Chatbots { get; set; }
}
