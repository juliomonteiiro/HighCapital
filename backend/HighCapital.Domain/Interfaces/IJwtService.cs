using HighCapital.Domain.Entities;

namespace HighCapital.Domain.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateRefreshToken(User user);
    int? ValidateRefreshToken(string refreshToken);
} 