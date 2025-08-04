import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import ChatbotDashboard from '../components/chatbot/ChatbotDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useChat } from '../hooks/useChat';

const DashboardPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { chatbot, messages, loading, error } = useChat(parseInt(id!));

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

    if (error) {
        return (
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <ChatbotDashboard
            chatbot={chatbot}
            messages={messages}
            showBackButton={true}
        />
    );
};

export default DashboardPage; 