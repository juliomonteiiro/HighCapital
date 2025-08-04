using HighCapital.Domain.Enums;
using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Chatbot;

public class ChatbotResponse
{
    [JsonPropertyName("id")]
    public int Id { get; set; }
    
    [JsonPropertyName("name")]
    public required string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string? Description { get; set; }
    
    [JsonPropertyName("context")]
    public required string Context { get; set; }
    
    [JsonPropertyName("temperature")]
    public float Temperature { get; set; }
    
    [JsonPropertyName("model")]
    public OpenAIModel Model { get; set; }
    
    [JsonPropertyName("maxTokens")]
    public int MaxTokens { get; set; }
    
    [JsonPropertyName("createdAt")]
    public DateTime CreatedAt { get; set; }
    
    [JsonPropertyName("updatedAt")]
    public DateTime UpdatedAt { get; set; }
    
    [JsonPropertyName("totalMessages")]
    public int TotalMessages { get; set; }
    
    [JsonPropertyName("totalTokensUsed")]
    public int TotalTokensUsed { get; set; }
    
    [JsonPropertyName("userMessages")]
    public int UserMessages { get; set; }
    
    [JsonPropertyName("assistantMessages")]
    public int AssistantMessages { get; set; }
    
    [JsonPropertyName("averageResponseTime")]
    public int AverageResponseTime { get; set; }
    
    [JsonPropertyName("userId")]
    public int UserId { get; set; }
} 