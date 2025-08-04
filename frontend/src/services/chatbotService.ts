import api from './api';
import type {
    Chatbot,
    CreateChatbotRequest,
    UpdateChatbotRequest,
    ChatMessageResponse,
    SendMessageRequest,
    Message
} from '../types';

export const chatbotService = {
    async getChatbots(): Promise<Chatbot[]> {
        const response = await api.get<Chatbot[]>('/chatbots');
        return response.data;
    },

    async getChatbot(id: number): Promise<Chatbot> {
        const response = await api.get<Chatbot>(`/chatbots/${id}`);
        return response.data;
    },

    async createChatbot(data: CreateChatbotRequest): Promise<number> {
        const response = await api.post<number>('/chatbots', data);
        return response.data;
    },

    async updateChatbot(id: number, data: UpdateChatbotRequest): Promise<Chatbot> {
        const response = await api.put<Chatbot>(`/chatbots/${id}`, data);
        return response.data;
    },

    async deleteChatbot(id: number): Promise<void> {
        await api.delete(`/chatbots/${id}`);
    },

    async getMessages(chatbotId: number): Promise<Message[]> {
        const response = await api.get<Message[]>(`/messages/${chatbotId}`);
        return response.data;
    },

    async sendMessage(chatbotId: number, message: string): Promise<ChatMessageResponse> {
        const request: SendMessageRequest = { message };
        const response = await api.post<ChatMessageResponse>(`/messages/${chatbotId}`, request);
        return response.data;
    }
}; 