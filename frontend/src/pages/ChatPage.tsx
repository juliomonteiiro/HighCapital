import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ChatbotDashboard from '../components/chatbot/ChatbotDashboard';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessages from '../components/chat/ChatMessages';
import ChatInput from '../components/chat/ChatInput';
import { useChat } from '../hooks/useChat';

const ChatPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [newMessage, setNewMessage] = useState('');
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('dashboard') === 'true') {
            setShowDashboard(true);
            navigate(`/chat/${id}`, { replace: true });
        }
    }, [location.search, id, navigate]);

    const { chatbot, messages, loading, sending, error, sendMessage, messagesEndRef } = useChat(parseInt(id!));

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !chatbot) return;

        const messageToSend = newMessage.trim();
        setNewMessage('');
        await sendMessage(messageToSend);
    };

    if (loading) {
        return <LoadingSpinner fullHeight />;
    }

    if (!chatbot) {
        return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Alert severity="error">Chatbot não encontrado</Alert>
            </Box>
        );
    }

    if (showDashboard) {
        return (
            <ChatbotDashboard
                chatbot={chatbot}
                messages={messages}
                showBackButton={true}
                onBack={() => {
                    setShowDashboard(false);
                    setTimeout(() => {
                        if (messagesEndRef.current) {
                            messagesEndRef.current.scrollIntoView({
                                behavior: 'instant',
                                block: 'end',
                                inline: 'nearest'
                            });
                        }
                    }, 100);
                }}
            />
        );
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <ChatHeader
                    chatbot={chatbot}
                    onBack={() => navigate('/')}
                    onShowDashboard={() => setShowDashboard(true)}
                />

                <ChatMessages
                    messages={messages}
                    chatbot={chatbot}
                    error={error}
                    messagesEndRef={messagesEndRef}
                    sending={sending}
                />

                <ChatInput
                        value={newMessage}
                    onChange={setNewMessage}
                    onSend={handleSendMessage}
                        disabled={sending}
                />
            </Box>
        </Box>
    );
};

export default ChatPage; 