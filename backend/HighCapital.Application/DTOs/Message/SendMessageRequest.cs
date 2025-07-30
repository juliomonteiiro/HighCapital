using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Message;

public class SendMessageRequest
{
    [Required]
    [MaxLength(2000, ErrorMessage = "Mensagem não pode exceder 2000 caracteres")]
    [JsonPropertyName("message")]
    public required string Message { get; set; }
} 