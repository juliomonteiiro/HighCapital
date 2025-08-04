export const chatbotValidationRules = {
    name: (value: string) => {
        if (!value || !value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        if (value.trim().length > 100) return 'Nome deve ter no máximo 100 caracteres';
        return undefined;
    },

    description: (value: string) => {
        if (value && value.trim().length > 500) return 'Descrição deve ter no máximo 500 caracteres';
        return undefined;
    },

    context: (value: string) => {
        if (!value || !value.trim()) return 'Contexto é obrigatório';
        if (value.trim().length < 10) return 'Contexto deve ter pelo menos 10 caracteres';
        if (value.trim().length > 2000) return 'Contexto deve ter no máximo 2000 caracteres';
        return undefined;
    },

    temperature: (value: number) => {
        if (typeof value !== 'number') return 'Temperatura deve ser um número';
        if (value < 0 || value > 2) return 'Temperatura deve estar entre 0 e 2';
        return undefined;
    },

    model: (value: string) => {
        if (!value) return 'Modelo é obrigatório';
        const validModels = ['Gpt35Turbo', 'Gpt4', 'Gpt4Turbo', 'Gpt4o', 'Gpt41Mini', 'Gpt41Nano'];
        if (!validModels.includes(value)) return 'Modelo inválido';
        return undefined;
    },

    maxTokens: (value: number) => {
        if (!value || typeof value !== 'number') return 'Máximo de tokens é obrigatório';
        if (value < 1 || value > 4096) return 'Máximo de tokens deve estar entre 1 e 4096';
        return undefined;
    },
};

export const authValidationRules = {
    name: (value: string) => {
        if (!value || !value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return undefined;
    },

    email: (value: string) => {
        if (!value || !value.trim()) return 'Email é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
        return undefined;
    },

    password: (value: string) => {
        if (!value || !value.trim()) return 'Senha é obrigatória';
        if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
        return undefined;
    },
};

export const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}; 