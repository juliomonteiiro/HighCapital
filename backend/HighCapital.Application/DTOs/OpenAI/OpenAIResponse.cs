namespace HighCapital.Application.DTOs.OpenAI;

public class OpenAIResponse
{
    public required string Content { get; set; }
    public int PromptTokens { get; set; }
    public int CompletionTokens { get; set; }
    public int TotalTokens { get; set; }
} 