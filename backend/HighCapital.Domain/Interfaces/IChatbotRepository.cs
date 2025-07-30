using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Interfaces;

public interface IChatbotRepository
{
    Task<Chatbot?> GetByIdAsync(int id);
    Task<IEnumerable<Chatbot>> GetByUserIdAsync(int userId);
    Task AddAsync(Chatbot chatbot);
    Task UpdateAsync(Chatbot chatbot);
    Task DeleteAsync(int id);
    Task<IEnumerable<Chatbot>> GetAllAsync();
}
