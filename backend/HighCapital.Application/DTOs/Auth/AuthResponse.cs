using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Auth;

public class AuthResponse
{
    [JsonPropertyName("token")]
    public required string Token { get; set; }
    
    [JsonPropertyName("refreshToken")]
    public required string RefreshToken { get; set; }
    
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("email")]
    public required string Email { get; set; }
}
