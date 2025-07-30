using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Interfaces;

public interface IMessageRepository
{
    Task<Message?> GetByIdAsync(int id);
    Task<IEnumerable<Message>> GetByChatbotIdAsync(int chatbotId);
    Task AddAsync(Message message);
    Task UpdateAsync(Message message);
    Task DeleteAsync(int id);
    Task<IEnumerable<Message>> GetAllAsync();
}
