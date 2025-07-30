using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
} 