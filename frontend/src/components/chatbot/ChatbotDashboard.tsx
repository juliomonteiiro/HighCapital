import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    useTheme,
    IconButton,
    Paper,
} from '@mui/material';
import {
    AccessTime,
    Message as MessageIcon,
    Token,
    TrendingUp,
    ArrowBack,
    SmartToy,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Chatbot, Message } from '../../types';
import { MODEL_LABELS } from '../../utils/constants';
import { useColors } from '../../hooks/useColors';

interface ChatbotDashboardProps {
    chatbot: Chatbot;
    messages: Message[];
    showBackButton?: boolean;
    onBack?: () => void;
}

const ChatbotDashboard: React.FC<ChatbotDashboardProps> = ({
    chatbot,
    messages,
    showBackButton = false,
    onBack
}) => {
    const theme = useTheme();
    const colors = useColors();
    const navigate = useNavigate();

    const totalMessages = chatbot.totalMessages || messages.length;
    const userMessages = chatbot.userMessages || messages.filter(msg => msg.role === 'user').length;
    const assistantMessages = chatbot.assistantMessages || messages.filter(msg => msg.role === 'assistant').length;

    const totalTokensUsed = chatbot.totalTokensUsed || messages.reduce((sum, msg) => sum + msg.tokensUsed, 0);

    const avgResponseTime = chatbot.averageResponseTime || 0;

    const stats = [
        {
            title: 'Total de Mensagens',
            value: totalMessages,
            icon: <MessageIcon />,
            color: theme.palette.primary.main,
            subtitle: `${userMessages} usuário • ${assistantMessages} chatbot`
        },
        {
            title: 'Tokens Utilizados',
            value: totalTokensUsed.toLocaleString(),
            icon: <Token />,
            color: theme.palette.secondary.main,
            subtitle: 'Total consumido'
        },
        {
            title: 'Tempo Médio',
            value: avgResponseTime > 0 ? `${Math.round(avgResponseTime)}ms` : 'N/A',
            icon: <AccessTime />,
            color: theme.palette.info.main,
            subtitle: 'Tempo de resposta'
        },
        {
            title: 'Taxa de Resposta',
            value: userMessages > 0 ? `${Math.round((assistantMessages / userMessages) * 100)}%` : '0%',
            icon: <TrendingUp />,
            color: theme.palette.success.main,
            subtitle: 'Eficiência do chatbot'
        }
    ];

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/');
        }
    };

    return (
        <Box sx={{ background: theme.palette.background.default, minHeight: '100vh' }}>
            <Paper
                elevation={0}
                sx={{
                    padding: '16px 24px',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper,
                    boxShadow: colors.shadow.small,
                    marginBottom: 3,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {showBackButton && (
                        <IconButton
                            onClick={handleBack}
                            size="small"
                            sx={{
                                backgroundColor: colors.overlay.primary,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: colors.overlay.secondary,
                                }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    )}

                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        }}
                    >
                        <SmartToy />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                            Dashboard - {chatbot.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Estatísticas e métricas do chatbot
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ padding: 3 }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                    gap: 3
                }}>
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            sx={{
                                height: '100%',
                                background: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: colors.shadow.small,
                                transition: theme.transitions.create(['transform', 'box-shadow']),
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: colors.shadow.large,
                                },
                            }}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <Avatar
                                    sx={{
                                        background: stat.color,
                                        width: 48,
                                        height: 48,
                                        marginBottom: 2,
                                        margin: '0 auto 16px auto',
                                    }}
                                >
                                    {stat.icon}
                                </Avatar>
                                <Typography variant="h4" component="div" gutterBottom>
                                    {stat.value}
                                </Typography>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {stat.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {stat.subtitle}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Informações do Modelo
                    </Typography>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <Chip
                            label={`Modelo: ${MODEL_LABELS[chatbot.model as keyof typeof MODEL_LABELS] || chatbot.model}`}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip
                            label={`Temperatura: ${chatbot.temperature}`}
                            color="secondary"
                            variant="outlined"
                        />
                        <Chip
                            label={`Max Tokens: ${chatbot.maxTokens.toLocaleString()}`}
                            color="info"
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatbotDashboard; 