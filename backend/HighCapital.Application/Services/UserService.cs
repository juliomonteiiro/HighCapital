using HighCapital.Application.DTOs.User;
using HighCapital.Application.Interfaces;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;

namespace HighCapital.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IChatbotRepository _chatbotRepository;

    public UserService(IUserRepository userRepository, IChatbotRepository chatbotRepository)
    {
        _userRepository = userRepository;
        _chatbotRepository = chatbotRepository;
    }

    public async Task<UserProfile> GetUserAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new Exception("Usuário não encontrado");

        var userChatbots = await _chatbotRepository.GetByUserIdAsync(userId);

        return new UserProfile
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt,
            TotalChatbots = userChatbots.Count()
        };
    }

    public async Task<UserProfile> UpdateUserAsync(int userId, UpdateUserRequest request)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new Exception("Usuário não encontrado");

        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null && existingUser.Id != userId)
            throw new Exception("Email já cadastrado");

        user.Update(request.Name, request.Email);
        await _userRepository.UpdateAsync(user);

        var userChatbots = await _chatbotRepository.GetByUserIdAsync(userId);

        return new UserProfile
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt,
            TotalChatbots = userChatbots.Count()
        };
    }

    public async Task DeleteUserAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new Exception("Usuário não encontrado");

        await _userRepository.DeleteAsync(userId);
    }

    public async Task<IEnumerable<UserList>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        var userDtos = new List<UserList>();

        foreach (var user in users)
        {
            var userChatbots = await _chatbotRepository.GetByUserIdAsync(user.Id);
            userDtos.Add(new UserList
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                TotalChatbots = userChatbots.Count()
            });
        }

        return userDtos;
    }

    public async Task UpdatePasswordAsync(int userId, UpdateUserPasswordRequest request)
    {
        var user = await _userRepository.GetByIdAsync(userId)
            ?? throw new Exception("Usuário não encontrado");

        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
            throw new Exception("Senha atual incorreta");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);
    }
}
