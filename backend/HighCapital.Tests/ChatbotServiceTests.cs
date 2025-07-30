using HighCapital.Application.DTOs.Chatbot;
using HighCapital.Application.DTOs.Message;
using HighCapital.Application.Services;
using HighCapital.Domain.Entities;
using HighCapital.Domain.Enums;
using HighCapital.Domain.Interfaces;
using Moq;
using Xunit;

namespace HighCapital.Tests;

public class ChatbotServiceTests
{
    private readonly Mock<IChatbotRepository> _chatbotRepositoryMock;
    private readonly Mock<IMessageRepository> _messageRepositoryMock;
    private readonly Mock<IOpenAIService> _openAIServiceMock;
    private readonly ChatbotService _chatbotService;

    public ChatbotServiceTests()
    {
        _chatbotRepositoryMock = new Mock<IChatbotRepository>();
        _messageRepositoryMock = new Mock<IMessageRepository>();
        _openAIServiceMock = new Mock<IOpenAIService>();
        
        _chatbotService = new ChatbotService(
            _chatbotRepositoryMock.Object,
            _messageRepositoryMock.Object,
            _openAIServiceMock.Object
        );
    }

    [Fact]
    public async Task CreateChatbotAsync_ShouldCreateChatbotAndSystemMessage()
    {
        var request = new CreateChatbotRequest
        {
            Name = "Test Chatbot",
            Description = "Test Description",
            Context = "You are a helpful assistant",
            Temperature = 0.7f,
            MaxTokens = 1024,
            Model = OpenAIModel.Gpt41Nano
        };
        var userId = 1;

        _chatbotRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Chatbot>()))
            .Callback<Chatbot>(chatbot => chatbot.Id = 1);

        var result = await _chatbotService.CreateChatbotAsync(request, userId);

        _chatbotRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Chatbot>()), Times.Once);
        _messageRepositoryMock.Verify(x => x.AddAsync(It.Is<Domain.Entities.Message>(m => 
            m.Role == "system" && 
            m.Content == request.Context && 
            m.ChatbotId == result)), Times.Once);
        
        Assert.True(result > 0);
    }

    [Fact]
    public async Task GetChatbotAsync_WithValidId_ShouldReturnChatbot()
    {
        var chatbotId = 1;
        var chatbot = new Chatbot("Test", 1, "Context");
        chatbot.Id = chatbotId;
        
        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync(chatbot);

        var result = await _chatbotService.GetChatbotAsync(chatbotId);

        Assert.NotNull(result);
        Assert.Equal(chatbotId, result.Id);
        Assert.Equal(chatbot.Name, result.Name);
    }

    [Fact]
    public async Task GetChatbotAsync_WithInvalidId_ShouldThrowException()
    {
        var chatbotId = 999;
        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync((Chatbot?)null);

        await Assert.ThrowsAsync<Exception>(() => 
            _chatbotService.GetChatbotAsync(chatbotId));
    }

    [Fact]
    public async Task GetUserChatbotsAsync_ShouldReturnUserChatbots()
    {
        var userId = 1;
        var chatbots = new List<Chatbot>
        {
            new Chatbot("Chatbot 1", userId, "Context 1") { Id = 1 },
            new Chatbot("Chatbot 2", userId, "Context 2") { Id = 2 }
        };

        _chatbotRepositoryMock.Setup(x => x.GetByUserIdAsync(userId))
            .ReturnsAsync(chatbots);

        var result = await _chatbotService.GetUserChatbotsAsync(userId);

        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.All(result, c => Assert.Equal(userId, c.UserId));
    }

    [Fact]
    public async Task UpdateChatbotAsync_WithValidOwner_ShouldUpdateChatbot()
    {
        var chatbotId = 1;
        var userId = 1;
        var chatbot = new Chatbot("Original", userId, "Original Context") { Id = chatbotId };
        
        var request = new UpdateChatbotRequest
        {
            Name = "Updated",
            Description = "Updated Description",
            Context = "Updated Context",
            Temperature = 0.8f,
            Model = OpenAIModel.Gpt41Mini,
            MaxTokens = 2048
        };

        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync(chatbot);

        var result = await _chatbotService.UpdateChatbotAsync(chatbotId, request, userId);

        Assert.NotNull(result);
        Assert.Equal(request.Name, result.Name);
        Assert.Equal(request.Description, result.Description);
        Assert.Equal(request.Context, result.Context);
        Assert.Equal(request.Temperature, result.Temperature);
        Assert.Equal(request.Model, result.Model);
        Assert.Equal(request.MaxTokens, result.MaxTokens);
        
        _chatbotRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Chatbot>()), Times.Once);
    }

    [Fact]
    public async Task UpdateChatbotAsync_WithInvalidOwner_ShouldThrowException()
    {
        var chatbotId = 1;
        var userId = 1;
        var ownerId = 2;
        var chatbot = new Chatbot("Test", ownerId, "Context") { Id = chatbotId };
        
        var request = new UpdateChatbotRequest
        {
            Name = "Updated",
            Context = "Updated Context",
            Temperature = 0.7f,
            Model = OpenAIModel.Gpt41Nano,
            MaxTokens = 1024
        };

        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync(chatbot);

        await Assert.ThrowsAsync<Exception>(() => 
            _chatbotService.UpdateChatbotAsync(chatbotId, request, userId));
    }

    [Fact]
    public async Task DeleteChatbotAsync_WithValidOwner_ShouldDeleteChatbot()
    {
        var chatbotId = 1;
        var userId = 1;
        var chatbot = new Chatbot("Test", userId, "Context") { Id = chatbotId };

        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync(chatbot);

        await _chatbotService.DeleteChatbotAsync(chatbotId, userId);

        _chatbotRepositoryMock.Verify(x => x.DeleteAsync(chatbotId), Times.Once);
    }

    [Fact]
    public async Task DeleteChatbotAsync_WithInvalidOwner_ShouldThrowException()
    {
        var chatbotId = 1;
        var userId = 1;
        var ownerId = 2;
        var chatbot = new Chatbot("Test", ownerId, "Context") { Id = chatbotId };

        _chatbotRepositoryMock.Setup(x => x.GetByIdAsync(chatbotId))
            .ReturnsAsync(chatbot);

        await Assert.ThrowsAsync<Exception>(() => 
            _chatbotService.DeleteChatbotAsync(chatbotId, userId));
    }

    [Fact]
    public async Task GetChatbotMessagesAsync_ShouldReturnMessages()
    {
        var chatbotId = 1;
        var messages = new List<Domain.Entities.Message>
        {
            new Domain.Entities.Message("user", "Hello", chatbotId) { Id = 1 },
            new Domain.Entities.Message("assistant", "Hi there!", chatbotId) { Id = 2 }
        };

        _messageRepositoryMock.Setup(x => x.GetByChatbotIdAsync(chatbotId))
            .ReturnsAsync(messages);

        var result = await _chatbotService.GetChatbotMessagesAsync(chatbotId);

        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.All(result, m => Assert.True(m.Id > 0));
    }
} 