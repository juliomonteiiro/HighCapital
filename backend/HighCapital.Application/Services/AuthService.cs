using HighCapital.Application.DTOs.Auth;
using HighCapital.Application.Interfaces;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;

namespace HighCapital.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;

    public AuthService(IUserRepository userRepository, IJwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
            throw new Exception("Email já cadastrado");

        var newUser = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        await _userRepository.AddAsync(newUser);

        var token = _jwtService.GenerateToken(newUser);

        return new AuthResponse
        {
            Token = token,
            Name = newUser.Name,
            Email = newUser.Email
        };
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            throw new Exception("Credenciais inválidas");

        var token = _jwtService.GenerateToken(user);

        return new AuthResponse
        {
            Token = token,
            Name = user.Name,
            Email = user.Email
        };
    }
}
