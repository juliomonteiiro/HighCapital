using HighCapital.Domain.Entities;
using HighCapital.Domain.Enums;
using Xunit;

namespace HighCapital.Tests;

public class EntityTests
{
    [Fact]
    public void User_Constructor_ShouldSetDefaultValues()
    {
        var user = new User();

        Assert.Equal(DateTime.UtcNow.Date, user.CreatedAt.Date);
        Assert.Equal(DateTime.UtcNow.Date, user.UpdatedAt.Date);
        Assert.NotNull(user.Chatbots);
        Assert.Empty(user.Chatbots);
    }

    [Fact]
    public void User_ConstructorWithParameters_ShouldSetProperties()
    {
        var name = "Test User";
        var email = "test@test.com";
        var passwordHash = "hashedPassword";

        var user = new User(name, email, passwordHash);

        Assert.Equal(name, user.Name);
        Assert.Equal(email, user.Email);
        Assert.Equal(passwordHash, user.PasswordHash);
        Assert.Equal(DateTime.UtcNow.Date, user.CreatedAt.Date);
        Assert.Equal(DateTime.UtcNow.Date, user.UpdatedAt.Date);
    }

    [Fact]
    public void User_Update_ShouldUpdatePropertiesAndTimestamp()
    {
        var user = new User("Original", "original@test.com", "hash");
        var originalUpdatedAt = user.UpdatedAt;
        
        var newName = "Updated Name";
        var newEmail = "updated@test.com";

        user.Update(newName, newEmail);

        Assert.Equal(newName, user.Name);
        Assert.Equal(newEmail, user.Email);
        Assert.True(user.UpdatedAt > originalUpdatedAt);
    }

    [Fact]
    public void Chatbot_Constructor_ShouldSetDefaultValues()
    {
        var chatbot = new Chatbot();

        Assert.Equal(DateTime.UtcNow.Date, chatbot.CreatedAt.Date);
        Assert.Equal(DateTime.UtcNow.Date, chatbot.UpdatedAt.Date);
        Assert.NotNull(chatbot.Messages);
        Assert.Empty(chatbot.Messages);
        Assert.Equal(OpenAIModel.Gpt41Nano, chatbot.Model);
        Assert.Equal(0.7f, chatbot.Temperature);
        Assert.Equal(1024, chatbot.MaxTokens);
    }

    [Fact]
    public void Chatbot_ConstructorWithParameters_ShouldSetProperties()
    {
        var name = "Test Chatbot";
        var userId = 1;
        var context = "You are a helpful assistant";
        var model = OpenAIModel.Gpt41Mini;
        var temperature = 0.8f;
        var maxTokens = 2048;
        var description = "Test description";

        var chatbot = new Chatbot(name, userId, context, model, temperature, maxTokens, description);

        Assert.Equal(name, chatbot.Name);
        Assert.Equal(userId, chatbot.UserId);
        Assert.Equal(context, chatbot.Context);
        Assert.Equal(model, chatbot.Model);
        Assert.Equal(temperature, chatbot.Temperature);
        Assert.Equal(maxTokens, chatbot.MaxTokens);
        Assert.Equal(description, chatbot.Description);
    }

    [Fact]
    public void Chatbot_Update_ShouldUpdatePropertiesAndTimestamp()
    {
        var chatbot = new Chatbot("Original", 1, "Original Context");
        var originalUpdatedAt = chatbot.UpdatedAt;
        
        var newName = "Updated";
        var newContext = "Updated Context";
        var newDescription = "Updated Description";
        var newTemperature = 0.9f;
        var newModel = OpenAIModel.Gpt41Mini;
        var newMaxTokens = 4096;

        chatbot.Update(newName, newContext, newDescription, newTemperature, newModel, newMaxTokens);

        Assert.Equal(newName, chatbot.Name);
        Assert.Equal(newContext, chatbot.Context);
        Assert.Equal(newDescription, chatbot.Description);
        Assert.Equal(newTemperature, chatbot.Temperature);
        Assert.Equal(newModel, chatbot.Model);
        Assert.Equal(newMaxTokens, chatbot.MaxTokens);
        Assert.True(chatbot.UpdatedAt > originalUpdatedAt);
    }

    [Fact]
    public void Chatbot_GetTotalMessages_ShouldReturnCorrectCount()
    {
        var chatbot = new Chatbot("Test", 1, "Context");
        chatbot.Messages.Add(new Domain.Entities.Message("system", "System message", chatbot.Id));
        chatbot.Messages.Add(new Domain.Entities.Message("user", "User message", chatbot.Id));
        chatbot.Messages.Add(new Domain.Entities.Message("assistant", "Assistant message", chatbot.Id));
        chatbot.Messages.Add(new Domain.Entities.Message("user", "Another user message", chatbot.Id));

        var totalMessages = chatbot.GetTotalMessages();

        Assert.Equal(3, totalMessages);
    }

    [Fact]
    public void Chatbot_GetTotalTokensUsed_ShouldReturnCorrectSum()
    {
        var chatbot = new Chatbot("Test", 1, "Context");
        chatbot.Messages.Add(new Domain.Entities.Message("user", "Message 1", chatbot.Id, 10));
        chatbot.Messages.Add(new Domain.Entities.Message("assistant", "Message 2", chatbot.Id, 20));
        chatbot.Messages.Add(new Domain.Entities.Message("user", "Message 3", chatbot.Id, 15));

        var totalTokens = chatbot.GetTotalTokensUsed();

        Assert.Equal(45, totalTokens);
    }

    [Fact]
    public void Message_Constructor_ShouldSetDefaultValues()
    {
        var message = new Domain.Entities.Message();

        Assert.Equal(DateTime.UtcNow.Date, message.CreatedAt.Date);
        Assert.Equal(DateTime.UtcNow.Date, message.UpdatedAt.Date);
        Assert.Equal(0, message.TokensUsed);
        Assert.Equal(0, message.ResponseTime);
    }

    [Fact]
    public void Message_ConstructorWithParameters_ShouldSetProperties()
    {
        var role = "user";
        var content = "Hello, world!";
        var chatbotId = 1;
        var tokensUsed = 10;
        var responseTime = 500;

        var message = new Domain.Entities.Message(role, content, chatbotId, tokensUsed, responseTime);

        Assert.Equal(role, message.Role);
        Assert.Equal(content, message.Content);
        Assert.Equal(chatbotId, message.ChatbotId);
        Assert.Equal(tokensUsed, message.TokensUsed);
        Assert.Equal(responseTime, message.ResponseTime);
    }
} 