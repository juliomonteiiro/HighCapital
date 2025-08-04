import React from 'react';
import { Box, Alert, useTheme } from '@mui/material';
import ChatMessage from './ChatMessage';
import ChatWelcome from './ChatWelcome';
import ChatTypingIndicator from './ChatTypingIndicator';
import type { Message, Chatbot } from '../../types';

interface ChatMessagesProps {
    messages: Message[];
    chatbot: Chatbot;
    error?: string;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
    sending?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, chatbot, error, messagesEndRef, sending = false }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                flex: 1,
                overflowY: 'auto',
                padding: 2,
                background: theme.palette.background.default,
            }}
        >
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}

            {messages.length === 0 ? (
                <ChatWelcome chatbot={chatbot} />
            ) : (
                <>
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} chatbot={chatbot} />
                    ))}
                    {sending && <ChatTypingIndicator chatbot={chatbot} />}
                </>
            )}
            <div ref={messagesEndRef} />
        </Box>
    );
};

export default ChatMessages; 