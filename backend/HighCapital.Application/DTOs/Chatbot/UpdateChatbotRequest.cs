using HighCapital.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Chatbot;

public class UpdateChatbotRequest
{
    [Required, MaxLength(100)]
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [MaxLength(500)]
    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [Required, MaxLength(2000)]
    [JsonPropertyName("context")]
    public required string Context { get; set; }

    [Range(0.0, 2.0)]
    [JsonPropertyName("temperature")]
    public float Temperature { get; set; } = 0.7f;

    [Range(1, 4096)]
    [JsonPropertyName("maxTokens")]
    public int MaxTokens { get; set; } = 1024;

    [JsonPropertyName("model")]
    public OpenAIModel Model { get; set; } = OpenAIModel.Gpt35Turbo;
} 