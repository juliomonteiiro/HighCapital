using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.User;

public class UserProfile
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("email")]
    public required string Email { get; set; }
    
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; }
    
    [JsonPropertyName("totalChatbots")]
    public int TotalChatbots { get; set; }
} 