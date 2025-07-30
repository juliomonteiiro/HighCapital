using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Auth;

public class LoginRequest
{
    [JsonPropertyName("email")]
    public required string Email { get; set; }
    
    [JsonPropertyName("password")]
    public required string Password { get; set; }
}