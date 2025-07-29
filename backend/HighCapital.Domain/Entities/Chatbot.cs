using HighCapital.Domain.Enums;
using HighCapital.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Chatbot
{
    [Key]
    public Guid Id { get; set; }

    [ForeignKey("User")]
    public Guid UserId { get; set; }

    [Required, MaxLength(100)]
    public required string Name { get; set; }

    [MaxLength(300)]
    public string? Description { get; set; }

    [Required]
    public float Temperature { get; set; }

    [Required]
    public OpenAIModel Model { get; set; } = OpenAIModel.Gpt35Turbo;

    [Required]
    public int MaxTokens { get; set; } = 1024;

    public DateTime CreatedAt { get; set; }

    public required User User { get; set; }

    public required ICollection<Message> Messages { get; set; }
}
