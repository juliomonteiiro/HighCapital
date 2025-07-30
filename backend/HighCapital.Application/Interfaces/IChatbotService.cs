using HighCapital.Application.DTOs.Chatbot;
using HighCapital.Application.DTOs.Message;

namespace HighCapital.Application.Interfaces;

public interface IChatbotService
{
    Task<int> CreateChatbotAsync(CreateChatbotRequest request, int userId);
    Task<ChatMessageResponse> SendMessageAsync(ChatMessageRequest request);
    Task<ChatbotResponse> GetChatbotAsync(int chatbotId);
    Task<IEnumerable<ChatbotResponse>> GetUserChatbotsAsync(int userId);
    Task<IEnumerable<MessageResponse>> GetChatbotMessagesAsync(int chatbotId);
    Task<ChatbotResponse> UpdateChatbotAsync(int chatbotId, UpdateChatbotRequest request, int userId);
    Task DeleteChatbotAsync(int chatbotId, int userId);
}