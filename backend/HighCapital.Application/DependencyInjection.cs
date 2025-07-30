using HighCapital.Application.Interfaces;
using HighCapital.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace HighCapital.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IChatbotService, ChatbotService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }
} 