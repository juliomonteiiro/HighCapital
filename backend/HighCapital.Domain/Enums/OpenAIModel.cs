using System.Text.Json.Serialization;

namespace HighCapital.Domain.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OpenAIModel
{
    Gpt35Turbo,
    Gpt4,
    Gpt4Turbo,
    Gpt4o,
    Gpt41Mini,
    Gpt41Nano
}
