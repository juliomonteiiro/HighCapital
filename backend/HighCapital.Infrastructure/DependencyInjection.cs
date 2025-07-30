using HighCapital.Domain.Interfaces;
using HighCapital.Infrastructure.Auth;
using HighCapital.Infrastructure.Data;
using HighCapital.Infrastructure.OpenAI;
using HighCapital.Infrastructure.Repositories.Implementations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HighCapital.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IChatbotRepository, ChatbotRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();

        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IOpenAIService, OpenAIService>();

        services.AddHttpClient<OpenAIService>();

        return services;
    }
} 