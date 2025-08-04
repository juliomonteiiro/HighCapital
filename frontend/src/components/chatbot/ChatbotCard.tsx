import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
    useTheme,
} from '@mui/material';
import {
    Edit,
    Delete,
    Message,
    BarChart,
} from '@mui/icons-material';
import type { Chatbot } from '../../types';
import { MODEL_LABELS } from '../../utils/constants';
import { useColors } from '../../hooks/useColors';

interface ChatbotCardProps {
    chatbot: Chatbot;
    onEdit: (chatbot: Chatbot) => void;
    onDelete: (id: number) => void;
    onChat: (id: number) => void;
    onDashboard?: (id: number) => void;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({ chatbot, onEdit, onDelete, onChat, onDashboard }) => {
    const theme = useTheme();
    const colors = useColors();

    return (
        <Card
            sx={{
                border: `1px solid ${theme.palette.divider}`,
                transition: theme.transitions.create(['transform', 'box-shadow']),
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: colors.shadow.large,
                },
            }}
        >
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '8px 12px',
                        background: colors.state.info.background.light,
                        border: `1px solid ${colors.state.info.hover.light}`,
                        borderRadius: 1,
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="caption" fontWeight={500}>
                        {MODEL_LABELS[chatbot.model as keyof typeof MODEL_LABELS] || chatbot.model}
                    </Typography>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    {chatbot.name}
                </Typography>

                {chatbot.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2, lineHeight: 1.5 }}>
                        {chatbot.description}
                    </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 1.5, marginBottom: 2, flexWrap: 'wrap' }}>
                    {chatbot.totalMessages !== undefined && (
                        <Chip
                            label={`${chatbot.totalMessages} mensagens`}
                            size="small"
                            sx={{
                                background: colors.state.success.background.light,
                                color: theme.palette.secondary.main,
                                border: `1px solid ${colors.state.success.hover.light}`,
                                '& .MuiChip-label': {
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                },
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, marginBottom: 2, flexWrap: 'wrap' }}>
                    <Chip
                        label={`Temp: ${chatbot.temperature}`}
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: '0.7rem',
                            height: 24,
                            '& .MuiChip-label': {
                                fontSize: '0.7rem',
                            },
                        }}
                    />
                    <Chip
                        label={`Max: ${chatbot.maxTokens.toLocaleString()}`}
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize: '0.7rem',
                            height: 24,
                            '& .MuiChip-label': {
                                fontSize: '0.7rem',
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <IconButton
                        onClick={() => onChat(chatbot.id)}
                        size="small"
                        sx={{
                            backgroundColor: colors.overlay.primary,
                            color: theme.palette.primary.main,
                            transition: theme.transitions.create(['transform', 'background-color']),
                            '&:hover': {
                                backgroundColor: colors.overlay.secondary,
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        <Message />
                    </IconButton>

                    {onDashboard && (
                        <IconButton
                            onClick={() => onDashboard(chatbot.id)}
                            size="small"
                            sx={{
                                backgroundColor: colors.state.info.background.light,
                                color: theme.palette.info.main,
                                transition: theme.transitions.create(['transform', 'background-color']),
                                '&:hover': {
                                    backgroundColor: colors.state.info.hover.light,
                                    transform: 'scale(1.05)',
                                }
                            }}
                        >
                            <BarChart />
                        </IconButton>
                    )}

                    <IconButton
                        onClick={() => onEdit(chatbot)}
                        size="small"
                        sx={{
                            backgroundColor: colors.state.warning.background.light,
                            color: theme.palette.warning.main,
                            transition: theme.transitions.create(['transform', 'background-color']),
                            '&:hover': {
                                backgroundColor: colors.state.warning.hover.light,
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        <Edit />
                    </IconButton>

                    <IconButton
                        onClick={() => onDelete(chatbot.id)}
                        size="small"
                        sx={{
                            backgroundColor: colors.state.error.hover.light,
                            color: theme.palette.error.main,
                            transition: theme.transitions.create(['transform', 'background-color']),
                            '&:hover': {
                                backgroundColor: colors.state.error.active.light,
                                transform: 'scale(1.05)',
                            }
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ChatbotCard; 