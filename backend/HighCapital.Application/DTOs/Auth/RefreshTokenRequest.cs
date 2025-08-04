using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Auth;

public class RefreshTokenRequest
{
    [JsonPropertyName("refreshToken")]
    public required string RefreshToken { get; set; }
} 