import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme } from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useColors } from '../../hooks/useColors';
import { formatTime } from '../../utils/validation';
import type { Message, Chatbot } from '../../types';

interface ChatMessageProps {
    message: Message;
    chatbot: Chatbot;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, chatbot }) => {
    const theme = useTheme();
    const colors = useColors();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
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
                    background: message.role === 'user'
                        ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                        : theme.palette.background.paper,
                    color: message.role === 'user'
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                    marginLeft: message.role === 'user' ? 'auto' : 0,
                    marginRight: message.role === 'user' ? 0 : 'auto',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            background: message.role === 'user'
                                ? colors.border.avatar
                                : theme.palette.primary.main,
                        }}
                    >
                        {message.role === 'user' ? <Person sx={{ fontSize: 16 }} /> : <SmartToy sx={{ fontSize: 16 }} />}
                    </Avatar>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {message.role === 'user' ? 'Você' : chatbot.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {formatTime(message.createdAt)}
                    </Typography>
                </Box>
                <Box sx={{
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        margin: '8px 0 4px 0',
                        fontWeight: 600,
                        color: 'inherit',
                    },
                    '& p': {
                        margin: '4px 0',
                        lineHeight: 1.5,
                    },
                    '& ul, & ol': {
                        margin: '4px 0',
                        paddingLeft: '20px',
                    },
                    '& li': {
                        margin: '2px 0',
                    },
                    '& code': {
                        background: colors.overlay.lightGray,
                        padding: '2px 4px',
                        borderRadius: '4px',
                        fontSize: '0.9em',
                        fontFamily: 'monospace',
                    },
                    '& pre': {
                        background: colors.overlay.lightGray,
                        padding: '12px',
                        borderRadius: '8px',
                        overflow: 'auto',
                        margin: '8px 0',
                        '& code': {
                            background: 'transparent',
                            padding: 0,
                        },
                    },
                    '& blockquote': {
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        margin: '8px 0',
                        paddingLeft: '12px',
                        fontStyle: 'italic',
                        opacity: 0.8,
                    },
                    '& table': {
                        borderCollapse: 'collapse',
                        width: '100%',
                        margin: '8px 0',
                    },
                    '& th, & td': {
                        border: `1px solid ${theme.palette.divider}`,
                        padding: '8px',
                        textAlign: 'left',
                    },
                    '& th': {
                        background: colors.overlay.lightGray,
                        fontWeight: 600,
                    },
                }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                </Box>
            </Paper>
        </Box>
    );
};

export default ChatMessage; 