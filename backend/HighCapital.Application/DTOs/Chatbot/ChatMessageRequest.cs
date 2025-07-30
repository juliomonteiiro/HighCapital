using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Chatbot;

public class ChatMessageRequest
{
    [Required]
    [JsonPropertyName("chatbotId")]
    public int ChatbotId { get; set; }
    
    [Required, MaxLength(2000)]
    [JsonPropertyName("message")]
    public required string Message { get; set; }
}