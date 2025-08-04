import React from 'react';
import { Box, Typography, IconButton, Chip, useTheme } from '@mui/material';
import { ArrowBack, SmartToy, BarChart } from '@mui/icons-material';
import { useColors } from '../../hooks/useColors';
import { MODEL_LABELS } from '../../utils/constants';
import type { Chatbot } from '../../types';

interface ChatHeaderProps {
    chatbot: Chatbot;
    onBack: () => void;
    onShowDashboard: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatbot, onBack, onShowDashboard }) => {
    const theme = useTheme();
    const colors = useColors();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '16px 24px',
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                boxShadow: colors.shadow.small,
            }}
        >
            <IconButton onClick={onBack} size="small">
                <ArrowBack />
            </IconButton>

            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                    {chatbot.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {chatbot.description || 'Chatbot personalizado'}
                </Typography>
            </Box>

            <Chip
                icon={<SmartToy />}
                label={MODEL_LABELS[chatbot.model as keyof typeof MODEL_LABELS] || chatbot.model}
                size="small"
                variant="outlined"
            />

            <IconButton
                onClick={onShowDashboard}
                sx={{
                    backgroundColor: colors.overlay.primary,
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: colors.overlay.secondary,
                    }
                }}
            >
                <BarChart />
            </IconButton>
        </Box>
    );
};

export default ChatHeader; 