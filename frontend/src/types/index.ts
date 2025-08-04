export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserRequest {
    name: string;
    email: string;
}

export interface UpdateUserPasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface Chatbot {
    id: number;
    userId: number;
    name: string;
    description?: string;
    context: string;
    temperature: number;
    model: string;
    maxTokens: number;
    createdAt: string;
    updatedAt: string;
    totalMessages?: number;
    totalTokensUsed?: number;
    userMessages?: number;
    assistantMessages?: number;
    averageResponseTime?: number;
}

export interface Message {
    id: number;
    chatbotId: number;
    role: 'user' | 'assistant' | 'system';
    content: string;
    tokensUsed: number;
    responseTime: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface CreateChatbotRequest {
    name: string;
    description?: string;
    context: string;
    temperature: number;
    model: string;
    maxTokens: number;
}

export interface UpdateChatbotRequest {
    name: string;
    description?: string;
    context: string;
    temperature: number;
    model: string;
    maxTokens: number;
}

export interface ChatMessageRequest {
    chatbotId: number;
    message: string;
}

export interface ChatMessageResponse {
    response: string;
    responseTime: string;
    totalTime: number;
}

export interface SendMessageRequest {
    message: string;
} 