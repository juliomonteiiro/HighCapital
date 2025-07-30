using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.User;

public class UpdateUserRequest
{
    [Required, MaxLength(100)]
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [Required, MaxLength(150)]
    [EmailAddress]
    [JsonPropertyName("email")]
    public required string Email { get; set; }
} 