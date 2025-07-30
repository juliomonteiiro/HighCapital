using HighCapital.Application.DTOs.User;
using HighCapital.Application.Services;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;
using Moq;
using Xunit;

namespace HighCapital.Tests;

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IChatbotRepository> _chatbotRepositoryMock;
    private readonly UserService _userService;

    public UserServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _chatbotRepositoryMock = new Mock<IChatbotRepository>();
        _userService = new UserService(_userRepositoryMock.Object, _chatbotRepositoryMock.Object);
    }

    [Fact]
    public async Task GetUserAsync_WithValidId_ShouldReturnUser()
    {
        var userId = 1;
        var user = new User("Test User", "test@test.com", "hashedPassword") { Id = userId };
        var chatbots = new List<Chatbot>();

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync(user);
        _chatbotRepositoryMock.Setup(x => x.GetByUserIdAsync(userId))
            .ReturnsAsync(chatbots);

        var result = await _userService.GetUserAsync(userId);

        Assert.NotNull(result);
        Assert.Equal(userId, result.Id);
        Assert.Equal(user.Name, result.Name);
        Assert.Equal(user.Email, result.Email);
    }

    [Fact]
    public async Task GetUserAsync_WithInvalidId_ShouldThrowException()
    {
        var userId = 999;
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync((User?)null);

        await Assert.ThrowsAsync<Exception>(() => 
            _userService.GetUserAsync(userId));
    }

    [Fact]
    public async Task GetAllUsersAsync_ShouldReturnAllUsers()
    {
        var users = new List<User>
        {
            new User("User 1", "user1@test.com", "hash1") { Id = 1 },
            new User("User 2", "user2@test.com", "hash2") { Id = 2 },
            new User("User 3", "user3@test.com", "hash3") { Id = 3 }
        };

        _userRepositoryMock.Setup(x => x.GetAllAsync())
            .ReturnsAsync(users);
        _chatbotRepositoryMock.Setup(x => x.GetByUserIdAsync(It.IsAny<int>()))
            .ReturnsAsync(new List<Chatbot>());

        var result = await _userService.GetAllUsersAsync();

        Assert.NotNull(result);
        Assert.Equal(3, result.Count());
        Assert.All(result, u => Assert.True(u.Id > 0));
    }

    [Fact]
    public async Task UpdateUserAsync_WithValidId_ShouldUpdateUser()
    {
        var userId = 1;
        var user = new User("Original", "original@test.com", "hash") { Id = userId };
        var chatbots = new List<Chatbot>();
        
        var request = new UpdateUserRequest
        {
            Name = "Updated Name",
            Email = "updated@test.com"
        };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync(user);
        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync((User?)null);
        _chatbotRepositoryMock.Setup(x => x.GetByUserIdAsync(userId))
            .ReturnsAsync(chatbots);

        var result = await _userService.UpdateUserAsync(userId, request);

        Assert.NotNull(result);
        Assert.Equal(request.Name, result.Name);
        Assert.Equal(request.Email, result.Email);
        
        _userRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public async Task UpdateUserAsync_WithInvalidId_ShouldThrowException()
    {
        var userId = 999;
        var request = new UpdateUserRequest
        {
            Name = "Updated",
            Email = "updated@test.com"
        };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync((User?)null);

        await Assert.ThrowsAsync<Exception>(() => 
            _userService.UpdateUserAsync(userId, request));
    }

    [Fact]
    public async Task DeleteUserAsync_WithValidId_ShouldDeleteUser()
    {
        var userId = 1;
        var user = new User("Test", "test@test.com", "hash") { Id = userId };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync(user);

        await _userService.DeleteUserAsync(userId);

        _userRepositoryMock.Verify(x => x.DeleteAsync(userId), Times.Once);
    }

    [Fact]
    public async Task DeleteUserAsync_WithInvalidId_ShouldThrowException()
    {
        var userId = 999;
        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync((User?)null);

        await Assert.ThrowsAsync<Exception>(() => 
            _userService.DeleteUserAsync(userId));
    }

    [Fact]
    public async Task UpdatePasswordAsync_WithValidCurrentPassword_ShouldUpdatePassword()
    {
        var userId = 1;
        var currentPassword = "currentPassword";
        var newPassword = "newPassword";
        var hashedCurrentPassword = BCrypt.Net.BCrypt.HashPassword(currentPassword);
        
        var user = new User("Test", "test@test.com", hashedCurrentPassword) { Id = userId };

        var request = new UpdateUserPasswordRequest
        {
            CurrentPassword = currentPassword,
            NewPassword = newPassword
        };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync(user);

        await _userService.UpdatePasswordAsync(userId, request);

        _userRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public async Task UpdatePasswordAsync_WithInvalidCurrentPassword_ShouldThrowException()
    {
        var userId = 1;
        var currentPassword = "currentPassword";
        var wrongPassword = "wrongPassword";
        var hashedCurrentPassword = BCrypt.Net.BCrypt.HashPassword(currentPassword);
        
        var user = new User("Test", "test@test.com", hashedCurrentPassword) { Id = userId };

        var request = new UpdateUserPasswordRequest
        {
            CurrentPassword = wrongPassword,
            NewPassword = "newPassword"
        };

        _userRepositoryMock.Setup(x => x.GetByIdAsync(userId))
            .ReturnsAsync(user);

        await Assert.ThrowsAsync<Exception>(() => 
            _userService.UpdatePasswordAsync(userId, request));
    }
} 