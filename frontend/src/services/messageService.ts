import api from './api';
import type { Message, ChatMessageResponse } from '../types';

export const messageService = {
    async getMessages(chatbotId: number): Promise<Message[]> {
        const response = await api.get<Message[]>(`/messages/${chatbotId}`);
        return response.data;
    },

    async sendMessage(chatbotId: number, message: string): Promise<ChatMessageResponse> {
        const response = await api.post<ChatMessageResponse>(`/messages/${chatbotId}`, { message });
        return response.data;
    },

    async getMessageStats(chatbotId: number): Promise<{
        totalMessages: number;
        userMessages: number;
        assistantMessages: number;
        totalTokens: number;
        averageResponseTime: number;
    }> {
        const messages = await this.getMessages(chatbotId);

        const userMessages = messages.filter(msg => msg.role === 'user').length;
        const assistantMessages = messages.filter(msg => msg.role === 'assistant').length;
        const totalTokens = messages.reduce((sum, msg) => sum + msg.tokensUsed, 0);
        const avgResponseTime = messages.length > 0
            ? messages.reduce((sum, msg) => sum + msg.responseTime, 0) / messages.length
            : 0;

        return {
            totalMessages: messages.length,
            userMessages,
            assistantMessages,
            totalTokens,
            averageResponseTime: Math.round(avgResponseTime),
        };
    },
}; 