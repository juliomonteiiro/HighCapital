using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Interfaces;

public interface IOpenAIService
{
    Task<object> SendMessageAsync(Chatbot chatbot, List<Message> chatMessages);
} 