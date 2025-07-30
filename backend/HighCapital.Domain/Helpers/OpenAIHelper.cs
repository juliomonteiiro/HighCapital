using HighCapital.Domain.Enums;

namespace HighCapital.Domain.Helpers;

public static class OpenAIModelHelper
{
    public static string GetOpenAIModelName(OpenAIModel model)
    {
        return model switch
        {
            OpenAIModel.Gpt35Turbo => "gpt-3.5-turbo",
            OpenAIModel.Gpt4 => "gpt-4",
            OpenAIModel.Gpt4Turbo => "gpt-4-turbo",
            OpenAIModel.Gpt4o => "gpt-4o",
            OpenAIModel.Gpt41Mini => "gpt-4.1-mini",
            OpenAIModel.Gpt41Nano => "gpt-4.1-nano",
            _ => throw new ArgumentOutOfRangeException(nameof(model), model, "Modelo OpenAI não suportado")
        };
    }
}
