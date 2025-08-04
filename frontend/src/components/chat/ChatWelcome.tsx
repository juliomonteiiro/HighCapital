import React from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import type { Chatbot } from '../../types';

interface ChatWelcomeProps {
    chatbot: Chatbot;
}

const ChatWelcome: React.FC<ChatWelcomeProps> = ({ chatbot }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 2,
            }}
        >
            <Avatar
                sx={{
                    width: 64,
                    height: 64,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
            >
                <SmartToy sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h6" color="text.primary">
                Olá! Eu sou {chatbot.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                {chatbot.description || 'Como posso ajudá-lo hoje?'}
            </Typography>
        </Box>
    );
};

export default ChatWelcome; 