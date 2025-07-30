using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Message;

public class MessageResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("role")]
    public required string Role { get; set; }
    
    [JsonPropertyName("content")]
    public required string Content { get; set; }
    
    [JsonPropertyName("tokensUsed")]
    public int TokensUsed { get; set; }
    
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [JsonPropertyName("responseTime")]
    public string ResponseTime { get; set; } = string.Empty;
} 