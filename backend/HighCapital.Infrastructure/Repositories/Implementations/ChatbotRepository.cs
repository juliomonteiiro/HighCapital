using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;
using HighCapital.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HighCapital.Infrastructure.Repositories.Implementations;

public class ChatbotRepository : IChatbotRepository
{
    private readonly AppDbContext _context;

    public ChatbotRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Chatbot?> GetByIdAsync(int id)
    {
        return await _context.Chatbots
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Chatbot>> GetByUserIdAsync(int userId)
    {
        return await _context.Chatbots
            .Where(c => c.UserId == userId)
            .ToListAsync();
    }

    public async Task AddAsync(Chatbot chatbot)
    {
        await _context.Chatbots.AddAsync(chatbot);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Chatbot chatbot)
    {
        _context.Chatbots.Update(chatbot);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var chatbot = await _context.Chatbots.FindAsync(id);
        if (chatbot != null)
        {
            _context.Chatbots.Remove(chatbot);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Chatbot>> GetAllAsync()
    {
        return await _context.Chatbots.ToListAsync();
    }
}
