using HighCapital.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HighCapital.Domain.Entities;

public class Chatbot
{
    public Chatbot()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        Messages = new List<Message>();
    }

    public Chatbot(string name, int userId, string context, OpenAIModel model = OpenAIModel.Gpt41Nano, float temperature = 0.7f, int maxTokens = 1024, string? description = null) : this()
    {
        Name = name;
        UserId = userId;
        Context = context;
        Model = model;
        Temperature = temperature;
        MaxTokens = maxTokens;
        Description = description;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int Id { get; set; }

    [ForeignKey("User")]
    [Column("user_id")]
    public int UserId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    [Column("description")]
    public string? Description { get; set; }

    [Required]
    [MaxLength(2000)]
    [Column("context")]
    public string Context { get; set; } = string.Empty;

    [Required]
    [Range(0.0, 2.0)]
    [Column("temperature")]
    public float Temperature { get; set; } = 0.7f;

    [Required]
    [Column("model")]
    public OpenAIModel Model { get; set; } = OpenAIModel.Gpt41Nano;

    [Required]
    [Range(1, 4096)]
    [Column("max_tokens")]
    public int MaxTokens { get; set; } = 1024;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    public User User { get; set; } = null!;
    public ICollection<Message> Messages { get; set; }

    public void Update(string name, string context, string? description, float temperature, OpenAIModel model, int maxTokens)
    {
        Name = name;
        Context = context;
        Description = description;
        Temperature = temperature;
        Model = model;
        MaxTokens = maxTokens;
        UpdatedAt = DateTime.UtcNow;
    }

    public void AddSystemMessage()
    {
        if (!Messages.Any(m => m.Role == "system"))
        {
            var systemMessage = new Message("system", Context, Id);
            Messages.Add(systemMessage);
        }
    }

    public int GetTotalMessages()
    {
        return Messages.Count(m => m.Role == "user" || m.Role == "assistant");
    }

    public int GetTotalTokensUsed()
    {
        return Messages.Sum(m => m.TokensUsed);
    }
}