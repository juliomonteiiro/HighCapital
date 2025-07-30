using HighCapital.Application.DTOs.Auth;
using HighCapital.Application.Services;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Interfaces;
using Moq;
using Xunit;

namespace HighCapital.Tests;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IJwtService> _jwtServiceMock;
    private readonly AuthService _authService;

    public AuthServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _jwtServiceMock = new Mock<IJwtService>();
        _authService = new AuthService(_userRepositoryMock.Object, _jwtServiceMock.Object);
    }

    [Fact]
    public async Task RegisterAsync_WithValidData_ShouldCreateUserAndReturnToken()
    {
        var request = new RegisterRequest
        {
            Name = "Test User",
            Email = "test@test.com",
            Password = "password123"
        };

        var expectedToken = "jwt_token_here";

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync((User?)null);

        _userRepositoryMock.Setup(x => x.AddAsync(It.IsAny<User>()))
            .Callback<User>(user => user.Id = 1);

        _jwtServiceMock.Setup(x => x.GenerateToken(It.IsAny<User>()))
            .Returns(expectedToken);

        var result = await _authService.RegisterAsync(request);

        Assert.NotNull(result);
        Assert.Equal(expectedToken, result.Token);
        Assert.Equal(request.Name, result.Name);
        Assert.Equal(request.Email, result.Email);

        _userRepositoryMock.Verify(x => x.AddAsync(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public async Task RegisterAsync_WithExistingEmail_ShouldThrowException()
    {
        var request = new RegisterRequest
        {
            Name = "Test User",
            Email = "existing@test.com",
            Password = "password123"
        };

        var existingUser = new User("Existing", request.Email, "hash") { Id = 1 };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync(existingUser);

        await Assert.ThrowsAsync<Exception>(() => 
            _authService.RegisterAsync(request));
    }

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ShouldReturnToken()
    {
        var request = new LoginRequest
        {
            Email = "test@test.com",
            Password = "password123"
        };

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
        var user = new User("Test User", request.Email, hashedPassword) { Id = 1 };
        var expectedToken = "jwt_token_here";

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync(user);

        _jwtServiceMock.Setup(x => x.GenerateToken(user))
            .Returns(expectedToken);

        var result = await _authService.LoginAsync(request);

        Assert.NotNull(result);
        Assert.Equal(expectedToken, result.Token);
        Assert.Equal(user.Name, result.Name);
        Assert.Equal(user.Email, result.Email);
    }

    [Fact]
    public async Task LoginAsync_WithInvalidEmail_ShouldThrowException()
    {
        var request = new LoginRequest
        {
            Email = "nonexistent@test.com",
            Password = "password123"
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync((User?)null);

        await Assert.ThrowsAsync<Exception>(() => 
            _authService.LoginAsync(request));
    }

    [Fact]
    public async Task LoginAsync_WithInvalidPassword_ShouldThrowException()
    {
        var request = new LoginRequest
        {
            Email = "test@test.com",
            Password = "wrongpassword"
        };

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword("correctpassword");
        var user = new User("Test User", request.Email, hashedPassword) { Id = 1 };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync(user);

        await Assert.ThrowsAsync<Exception>(() => 
            _authService.LoginAsync(request));
    }

    [Fact]
    public async Task RegisterAsync_ShouldHashPassword()
    {
        var request = new RegisterRequest
        {
            Name = "Test User",
            Email = "test@test.com",
            Password = "password123"
        };

        _userRepositoryMock.Setup(x => x.GetByEmailAsync(request.Email))
            .ReturnsAsync((User?)null);

        _jwtServiceMock.Setup(x => x.GenerateToken(It.IsAny<User>()))
            .Returns("token");

        await _authService.RegisterAsync(request);

        _userRepositoryMock.Verify(x => x.AddAsync(It.IsAny<User>()), Times.Once);
    }
} 