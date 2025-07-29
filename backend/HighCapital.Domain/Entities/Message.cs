using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HighCapital.Domain.Entities;

public class Message
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey("Chatbot")]
    public Guid ChatbotId { get; set; }

    [Required, MaxLength(10)]
    public required string Role { get; set; }

    [Required]
    public required string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public required Chatbot Chatbot { get; set; }
}
