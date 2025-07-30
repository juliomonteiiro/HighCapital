using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using HighCapital.Domain.Helpers;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;
using HighCapital.Application.DTOs.OpenAI;
using Microsoft.Extensions.Configuration;

namespace HighCapital.Infrastructure.OpenAI;

public class OpenAIService : IOpenAIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public OpenAIService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;

        var apiKey = _configuration["OpenAI:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("Chave da API da OpenAI não configurada");

        _httpClient.BaseAddress = new Uri("https://api.openai.com/v1/");
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    }

    public async Task<object> SendMessageAsync(Chatbot chatbot, List<Message> chatMessages)
    {
        var modelName = OpenAIModelHelper.GetOpenAIModelName(chatbot.Model);

        var messagesPayload = chatMessages.Select(m => new
        {
            role = m.Role.ToLower(),
            content = m.Content
        }).ToList();

        var requestBody = new
        {
            model = modelName,
            messages = messagesPayload,
            temperature = chatbot.Temperature,
            max_tokens = chatbot.MaxTokens
        };

        var content = new StringContent(
            JsonSerializer.Serialize(requestBody),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync("chat/completions", content);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Erro na OpenAI: {response.StatusCode} - {error}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();
        using var jsonDoc = JsonDocument.Parse(responseContent);

        var root = jsonDoc.RootElement;
        var usage = root.GetProperty("usage");
        var choices = root.GetProperty("choices");

        var message = choices[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return new OpenAIResponse
        {
            Content = message ?? "[Resposta vazia da OpenAI]",
            PromptTokens = usage.GetProperty("prompt_tokens").GetInt32(),
            CompletionTokens = usage.GetProperty("completion_tokens").GetInt32(),
            TotalTokens = usage.GetProperty("total_tokens").GetInt32()
        };
    }
}
