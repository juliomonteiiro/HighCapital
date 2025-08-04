import { useState, useEffect, useRef } from 'react';
import { chatbotService } from '../services/chatbotService';
import type { Chatbot, Message } from '../types';

export const useChat = (chatbotId: number) => {
    const [chatbot, setChatbot] = useState<Chatbot | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const loadChatbotAndMessages = async () => {
        try {
            setLoading(true);
            setError('');

            const [chatbotData, messagesData] = await Promise.all([
                chatbotService.getChatbot(chatbotId),
                chatbotService.getMessages(chatbotId)
            ]);

            setChatbot(chatbotData);
            const filteredMessages = messagesData
                .filter(msg => msg.role !== 'system')
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

            setMessages(filteredMessages);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar chat');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (messageContent: string) => {
        if (!chatbot) return;

        const messageToSend = messageContent.trim();
        setSending(true);

        try {
            const userMessage: Message = {
                id: Date.now(),
                chatbotId: chatbot.id,
                role: 'user',
                content: messageToSend,
                tokensUsed: 0,
                responseTime: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setMessages(prev => [...prev, userMessage]);

            const response = await chatbotService.sendMessage(chatbot.id, messageToSend);

            const assistantMessage: Message = {
                id: Date.now() + 1,
                chatbotId: chatbot.id,
                role: 'assistant',
                content: response.response,
                tokensUsed: 0,
                responseTime: response.totalTime || 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao enviar mensagem');
            setMessages(prev => prev.filter(msg => msg.content !== messageToSend));
        } finally {
            setSending(false);
        }
    };

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'instant',
                block: 'end',
                inline: 'nearest'
            });
        }
    };

    useEffect(() => {
        if (chatbotId) {
            loadChatbotAndMessages();
        }
    }, [chatbotId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return {
        chatbot,
        messages,
        loading,
        sending,
        error,
        sendMessage,
        messagesEndRef,
    };
}; 