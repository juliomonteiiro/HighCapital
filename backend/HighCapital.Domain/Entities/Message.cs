using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HighCapital.Domain.Entities;
    
public class Message
{
    public Message()
    {
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
        TokensUsed = 0;
        ResponseTime = 0;
    }

    public Message(string role, string content, int chatbotId, int tokensUsed = 0, int responseTime = 0) : this()
    {
        Role = role;
        Content = content;
        ChatbotId = chatbotId;
        TokensUsed = tokensUsed;
        ResponseTime = responseTime;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public int Id { get; set; }

    [ForeignKey("Chatbot")]
    [Column("chatbot_id")]
    public int ChatbotId { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression("^(user|assistant|system)$")]
    [Column("role")]
    public string Role { get; set; } = string.Empty;

    [Required]
    [MaxLength(4000)]
    [Column("content")]
    public string Content { get; set; } = string.Empty;

    [Column("tokens_used")]
    public int TokensUsed { get; set; } = 0;

    [Column("response_time")]
    public int ResponseTime { get; set; } = 0;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; }

    public Chatbot Chatbot { get; set; } = null!;
}