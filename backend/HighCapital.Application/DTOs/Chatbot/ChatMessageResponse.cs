using System.Text.Json.Serialization;

namespace HighCapital.Application.DTOs.Chatbot;

public class ChatMessageResponse
{
    [JsonPropertyName("response")]
    public required string Response { get; set; }
    
    [JsonPropertyName("responseTime")]
    public string ResponseTime { get; set; } = string.Empty;
    
    [JsonPropertyName("totalTime")]
    public int TotalTime { get; set; }
}