using HighCapital.Application.DTOs.User;

namespace HighCapital.Application.Interfaces;

public interface IUserService
{
    Task<UserProfile> GetUserAsync(int userId);
    Task<UserProfile> UpdateUserAsync(int userId, UpdateUserRequest request);
    Task DeleteUserAsync(int userId);
    Task<IEnumerable<UserList>> GetAllUsersAsync();
    Task UpdatePasswordAsync(int userId, UpdateUserPasswordRequest request);
}
