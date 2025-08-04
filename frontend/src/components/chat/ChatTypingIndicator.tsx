import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import { useColors } from '../../hooks/useColors';
import type { Chatbot } from '../../types';

interface ChatTypingIndicatorProps {
    chatbot: Chatbot;
}

const ChatTypingIndicator: React.FC<ChatTypingIndicatorProps> = ({ chatbot }) => {
    const theme = useTheme();
    const colors = useColors();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginBottom: 2,
            }}
        >
            <Paper
                sx={{
                    maxWidth: '70%',
                    minWidth: 200,
                    padding: '12px 16px',
                    borderRadius: 2,
                    boxShadow: colors.shadow.small,
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            background: theme.palette.primary.main,
                        }}
                    >
                        <SmartToy sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {chatbot.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        digitando...
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            animation: 'typing 1.4s infinite ease-in-out',
                            '&:nth-of-type(1)': {
                                animationDelay: '-0.32s',
                            },
                            '&:nth-of-type(2)': {
                                animationDelay: '-0.16s',
                            },
                            '@keyframes typing': {
                                '0%, 80%, 100%': {
                                    transform: 'scale(0.8)',
                                    opacity: 0.5,
                                },
                                '40%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            animation: 'typing 1.4s infinite ease-in-out',
                            '&:nth-of-type(1)': {
                                animationDelay: '-0.32s',
                            },
                            '&:nth-of-type(2)': {
                                animationDelay: '-0.16s',
                            },
                            '@keyframes typing': {
                                '0%, 80%, 100%': {
                                    transform: 'scale(0.8)',
                                    opacity: 0.5,
                                },
                                '40%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            animation: 'typing 1.4s infinite ease-in-out',
                            '&:nth-of-type(1)': {
                                animationDelay: '-0.32s',
                            },
                            '&:nth-of-type(2)': {
                                animationDelay: '-0.16s',
                            },
                            '@keyframes typing': {
                                '0%, 80%, 100%': {
                                    transform: 'scale(0.8)',
                                    opacity: 0.5,
                                },
                                '40%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatTypingIndicator; 