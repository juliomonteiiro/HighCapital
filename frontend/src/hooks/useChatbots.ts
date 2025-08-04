import { useState, useEffect } from 'react';
import { chatbotService } from '../services/chatbotService';
import type { Chatbot, CreateChatbotRequest, UpdateChatbotRequest } from '../types';

export const useChatbots = () => {
    const [chatbots, setChatbots] = useState<Chatbot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const loadChatbots = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await chatbotService.getChatbots();
            setChatbots(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar chatbots');
        } finally {
            setLoading(false);
        }
    };

    const createChatbot = async (data: CreateChatbotRequest) => {
        try {
            await chatbotService.createChatbot(data);
            await loadChatbots();
        } catch (err: any) {
            throw err;
        }
    };

    const updateChatbot = async (id: number, data: UpdateChatbotRequest) => {
        try {
            await chatbotService.updateChatbot(id, data);
            await loadChatbots();
        } catch (err: any) {
            throw err;
        }
    };

    const deleteChatbot = async (id: number) => {
        try {
            await chatbotService.deleteChatbot(id);
            await loadChatbots();
        } catch (err: any) {
            throw err;
        }
    };

    useEffect(() => {
        loadChatbots();
    }, []);

    return {
        chatbots,
        loading,
        error,
        loadChatbots,
        createChatbot,
        updateChatbot,
        deleteChatbot,
    };
}; 