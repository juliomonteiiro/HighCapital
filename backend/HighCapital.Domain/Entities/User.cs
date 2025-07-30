using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HighCapital.Domain.Entities;

public class User
{
    public User()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Chatbots = new List<Chatbot>();
    }

    public User(string name, string email, string passwordHash) : this()
    {
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(150)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("password_hash")]
    public string PasswordHash { get; set; } = string.Empty;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    public ICollection<Chatbot> Chatbots { get; set; } = new List<Chatbot>();

    public void Update(string name, string email)
    {
        Name = name;
        Email = email;
        UpdatedAt = DateTime.UtcNow;
    }
}
