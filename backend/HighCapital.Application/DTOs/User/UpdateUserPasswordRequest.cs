using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.User;

public class UpdateUserPasswordRequest
{
    [Required]
    [JsonPropertyName("currentPassword")]
    public required string CurrentPassword { get; set; }

    [Required, MinLength(6)]
    [JsonPropertyName("newPassword")]
    public required string NewPassword { get; set; }
} 