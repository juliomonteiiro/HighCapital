export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5211/api';

export const OPENAI_MODELS = {
    GPT_35_TURBO: 'Gpt35Turbo',
    GPT_4: 'Gpt4',
    GPT_4_TURBO: 'Gpt4Turbo',
    GPT_4O: 'Gpt4o',
    GPT_41_MINI: 'Gpt41Mini',
    GPT_41_NANO: 'Gpt41Nano',
} as const;

export const MODEL_LABELS = {
    [OPENAI_MODELS.GPT_35_TURBO]: 'GPT-3.5 Turbo',
    [OPENAI_MODELS.GPT_4]: 'GPT-4',
    [OPENAI_MODELS.GPT_4_TURBO]: 'GPT-4 Turbo',
    [OPENAI_MODELS.GPT_4O]: 'GPT-4o',
    [OPENAI_MODELS.GPT_41_MINI]: 'GPT-4o Mini',
    [OPENAI_MODELS.GPT_41_NANO]: 'GPT-4o Nano',
} as const;

export const SLIDER_MARKS = {
    temperature: [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
    ],
    maxTokens: [
        { value: 1, label: '1' },
        { value: 1024, label: '1024' },
        { value: 2048, label: '2048' },
        { value: 4096, label: '4096' },
    ],
};

export const FORM_LIMITS = {
    name: { min: 2, max: 100 },
    description: { max: 500 },
    context: { min: 10, max: 2000 },
    temperature: { min: 0, max: 2 },
    maxTokens: { min: 1, max: 4096 },
} as const;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    CHAT: '/chat',
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user_data',
} as const; 