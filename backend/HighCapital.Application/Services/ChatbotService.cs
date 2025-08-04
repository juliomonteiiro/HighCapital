using HighCapital.Application.DTOs.Chatbot;
using HighCapital.Application.DTOs.Message;
using HighCapital.Application.DTOs.OpenAI;
using HighCapital.Application.Interfaces;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;

namespace HighCapital.Application.Services;

public class ChatbotService : IChatbotService
{
    private readonly IChatbotRepository _chatbotRepository;
    private readonly IMessageRepository _messageRepository;
    private readonly IOpenAIService _openAIService;

    public ChatbotService(
        IChatbotRepository chatbotRepository,
        IMessageRepository messageRepository,
        IOpenAIService openAIService)
    {
        _chatbotRepository = chatbotRepository;
        _messageRepository = messageRepository;
        _openAIService = openAIService;
    }

    public async Task<int> CreateChatbotAsync(CreateChatbotRequest request, int userId)
    {
        var chatbot = new Chatbot(
            request.Name,
            userId,
            request.Context,
            request.Model,
            request.Temperature,
            request.MaxTokens,
            request.Description
        );

        await _chatbotRepository.AddAsync(chatbot);

        var systemMessage = new Domain.Entities.Message("system", request.Context, chatbot.Id);
        await _messageRepository.AddAsync(systemMessage);

        return chatbot.Id;
    }

    public async Task<ChatMessageResponse> SendMessageAsync(ChatMessageRequest request)
    {
        var startTime = DateTime.Now;
        
        var chatbot = await _chatbotRepository.GetByIdAsync(request.ChatbotId)
            ?? throw new Exception("Chatbot não encontrado");

        var userMessage = new Domain.Entities.Message("user", request.Message, chatbot.Id);
        await _messageRepository.AddAsync(userMessage);

        var messages = await _messageRepository.GetByChatbotIdAsync(chatbot.Id);
        var messagesList = messages.ToList();

        var responseStartTime = DateTime.Now;
        var openAIResponse = (OpenAIResponse)await _openAIService.SendMessageAsync(chatbot, messagesList);
        var responseTime = (int)(DateTime.Now - responseStartTime).TotalMilliseconds;

        var assistantMessage = new Domain.Entities.Message("assistant", openAIResponse.Content, chatbot.Id, openAIResponse.TotalTokens, responseTime);
        await _messageRepository.AddAsync(assistantMessage);

        return new ChatMessageResponse 
        { 
            Response = openAIResponse.Content,
            ResponseTime = FormatResponseTime(responseTime),
            TotalTime = (int)(DateTime.Now - startTime).TotalMilliseconds
        };
    }

    public async Task<ChatbotResponse> GetChatbotAsync(int chatbotId)
    {
        var chatbot = await _chatbotRepository.GetByIdAsync(chatbotId)
            ?? throw new Exception("Chatbot não encontrado");

        // Busca mensagens para calcular estatísticas
        var messages = await _messageRepository.GetByChatbotIdAsync(chatbot.Id);
        var messagesList = messages.ToList();
        
        var userMessages = messagesList.Count(m => m.Role == "user");
        var assistantMessages = messagesList.Count(m => m.Role == "assistant");
        var totalTokens = messagesList.Sum(m => m.TokensUsed);
        
        var assistantMessagesWithTime = messagesList.Where(m => m.Role == "assistant" && m.ResponseTime > 0).ToList();
        var avgResponseTime = assistantMessagesWithTime.Count > 0 
            ? assistantMessagesWithTime.Average(m => m.ResponseTime) 
            : 0;

        return new ChatbotResponse
        {
            Id = chatbot.Id,
            Name = chatbot.Name,
            Description = chatbot.Description,
            Context = chatbot.Context,
            Temperature = chatbot.Temperature,
            Model = chatbot.Model,
            MaxTokens = chatbot.MaxTokens,
            CreatedAt = chatbot.CreatedAt,
            UpdatedAt = chatbot.UpdatedAt,
            TotalMessages = userMessages + assistantMessages,
            TotalTokensUsed = totalTokens,
            UserId = chatbot.UserId,
            UserMessages = userMessages,
            AssistantMessages = assistantMessages,
            AverageResponseTime = (int)avgResponseTime
        };
    }

    public async Task<IEnumerable<ChatbotResponse>> GetUserChatbotsAsync(int userId)
    {
        var chatbots = await _chatbotRepository.GetByUserIdAsync(userId);
        
        var chatbotResponses = new List<ChatbotResponse>();
        
        foreach (var chatbot in chatbots)
        {
            var messages = await _messageRepository.GetByChatbotIdAsync(chatbot.Id);
            var messagesList = messages.ToList();
            
            var userMessages = messagesList.Count(m => m.Role == "user");
            var assistantMessages = messagesList.Count(m => m.Role == "assistant");
            var totalTokens = messagesList.Sum(m => m.TokensUsed);
            
            var assistantMessagesWithTime = messagesList.Where(m => m.Role == "assistant" && m.ResponseTime > 0).ToList();
            var avgResponseTime = assistantMessagesWithTime.Count > 0 
                ? assistantMessagesWithTime.Average(m => m.ResponseTime) 
                : 0;
            
            chatbotResponses.Add(new ChatbotResponse
            {
                Id = chatbot.Id,
                Name = chatbot.Name,
                Description = chatbot.Description,
                Context = chatbot.Context,
                Temperature = chatbot.Temperature,
                Model = chatbot.Model,
                MaxTokens = chatbot.MaxTokens,
                CreatedAt = chatbot.CreatedAt,
                UpdatedAt = chatbot.UpdatedAt,
                TotalMessages = userMessages + assistantMessages,
                TotalTokensUsed = totalTokens,
                UserId = chatbot.UserId,
                UserMessages = userMessages,
                AssistantMessages = assistantMessages,
                AverageResponseTime = (int)avgResponseTime
            });
        }
        
        return chatbotResponses;
    }

    public async Task<IEnumerable<MessageResponse>> GetChatbotMessagesAsync(int chatbotId)
    {
        var messages = await _messageRepository.GetByChatbotIdAsync(chatbotId);
        
        return messages.Select(m => new MessageResponse
        {
            Id = m.Id,
            Role = m.Role,
            Content = m.Content,
            TokensUsed = m.TokensUsed,
            ResponseTime = FormatResponseTime(m.ResponseTime),
            CreatedAt = m.CreatedAt
        });
    }

    public async Task<ChatbotResponse> UpdateChatbotAsync(int chatbotId, UpdateChatbotRequest request, int userId)
    {
        var chatbot = await _chatbotRepository.GetByIdAsync(chatbotId)
            ?? throw new Exception("Chatbot não encontrado");

        if (chatbot.UserId != userId)
            throw new Exception("Acesso negado: chatbot não pertence ao usuário");

        chatbot.Update(
            request.Name,
            request.Context,
            request.Description,
            request.Temperature,
            request.Model,
            request.MaxTokens
        );

        await _chatbotRepository.UpdateAsync(chatbot);

        var messages = await _messageRepository.GetByChatbotIdAsync(chatbot.Id);
        var messagesList = messages.ToList();
        
        var userMessages = messagesList.Count(m => m.Role == "user");
        var assistantMessages = messagesList.Count(m => m.Role == "assistant");
        var totalTokens = messagesList.Sum(m => m.TokensUsed);
        
        var assistantMessagesWithTime = messagesList.Where(m => m.Role == "assistant" && m.ResponseTime > 0).ToList();
        var avgResponseTime = assistantMessagesWithTime.Count > 0 
            ? assistantMessagesWithTime.Average(m => m.ResponseTime) 
            : 0;

        return new ChatbotResponse
        {
            Id = chatbot.Id,
            Name = chatbot.Name,
            Description = chatbot.Description,
            Context = chatbot.Context,
            Temperature = chatbot.Temperature,
            Model = chatbot.Model,
            MaxTokens = chatbot.MaxTokens,
            CreatedAt = chatbot.CreatedAt,
            UpdatedAt = chatbot.UpdatedAt,
            TotalMessages = userMessages + assistantMessages,
            TotalTokensUsed = totalTokens,
            UserId = chatbot.UserId,
            UserMessages = userMessages,
            AssistantMessages = assistantMessages,
            AverageResponseTime = (int)avgResponseTime
        };
    }

    public async Task DeleteChatbotAsync(int chatbotId, int userId)
    {
        var chatbot = await _chatbotRepository.GetByIdAsync(chatbotId)
            ?? throw new Exception("Chatbot não encontrado");

        if (chatbot.UserId != userId)
            throw new Exception("Acesso negado: chatbot não pertence ao usuário");

        await _chatbotRepository.DeleteAsync(chatbotId);
    }

    private static string FormatResponseTime(int milliseconds)
    {
        if (milliseconds == 0) return "0ms";
        
        if (milliseconds < 1000)
            return $"{milliseconds}ms";
        
        var seconds = milliseconds / 1000.0;
        return $"{seconds:F1}s";
    }
}
