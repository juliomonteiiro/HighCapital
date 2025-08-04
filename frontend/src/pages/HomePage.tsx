import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Alert,
    Button,
} from '@mui/material';
import {
    Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Chatbot, CreateChatbotRequest, UpdateChatbotRequest } from '../types';
import Header from '../components/common/Header';
import ChatbotCard from '../components/chatbot/ChatbotCard';
import ChatbotForm from '../components/chatbot/ChatbotForm';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useChatbots } from '../hooks/useChatbots';

const HomePage: React.FC = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingChatbot, setEditingChatbot] = useState<Chatbot | undefined>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [chatbotToDelete, setChatbotToDelete] = useState<Chatbot | null>(null);
    const [formLoading, setFormLoading] = useState(false);

    const navigate = useNavigate();
    const { chatbots, loading, error, createChatbot, updateChatbot, deleteChatbot } = useChatbots();

    const handleCreateChatbot = async (data: CreateChatbotRequest) => {
        try {
            setFormLoading(true);
            await createChatbot(data);
        } catch (err: any) {
            (err);
            throw err;
        } finally {
            setFormLoading(false);
        }
    };

    const handleUpdateChatbot = async (data: UpdateChatbotRequest) => {
        if (!editingChatbot) return;

        try {
            setFormLoading(true);
            await updateChatbot(editingChatbot.id, data);
        } catch (err: any) {
            (err);
            throw err;
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteChatbot = async () => {
        if (!chatbotToDelete) return;

        try {
            await deleteChatbot(chatbotToDelete.id);
        } catch (err: any) {
            (err);
        } finally {
            setDeleteDialogOpen(false);
            setChatbotToDelete(null);
        }
    };

    const handleEdit = (chatbot: Chatbot) => {
        setEditingChatbot(chatbot);
        setFormOpen(true);
    };

    const handleChat = (id: number) => {
        navigate(`/chat/${id}`);
    };

    const handleDashboard = (id: number) => {
        navigate(`/dashboard/${id}`);
    };

    const handleDelete = (id: number) => {
        const chatbot = chatbots.find(c => c.id === id);
        if (chatbot) {
            setChatbotToDelete(chatbot);
            setDeleteDialogOpen(true);
        }
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setEditingChatbot(undefined);
    };

    const handleFormSubmit = async (data: CreateChatbotRequest | UpdateChatbotRequest) => {
        if (editingChatbot) {
            await handleUpdateChatbot(data as UpdateChatbotRequest);
        } else {
            await handleCreateChatbot(data as CreateChatbotRequest);
        }
        handleFormClose();
    };

    if (loading) {
        return <LoadingSpinner fullHeight />;
    }

    return (
        <Box>
            <Header />

            <Container
                sx={{
                    padding: 3,
                    maxWidth: '100% !important'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Meus Chatbots
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Gerencie seus chatbots personalizados
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setFormOpen(true)}
                        sx={{
                            borderRadius: 2,
                            height: 48,
                            fontWeight: 600,
                            textTransform: 'none',
                            fontSize: 16,
                        }}
                    >
                        Novo Chatbot
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ marginBottom: 3, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                {chatbots.length === 0 ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            padding: 6
                        }}
                    >
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Nenhum chatbot encontrado
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                            Crie seu primeiro chatbot para começar
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setFormOpen(true)}
                            sx={{
                                borderRadius: 2,
                                height: 48,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: 16,
                            }}
                        >
                            Criar Primeiro Chatbot
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: 3,
                            marginTop: 3,
                        }}
                    >
                        {chatbots.map((chatbot) => (
                            <ChatbotCard
                                key={chatbot.id}
                                chatbot={chatbot}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onChat={handleChat}
                                onDashboard={handleDashboard}
                            />
                        ))}
                    </Box>
                )}
            </Container>

            <ChatbotForm
                open={formOpen}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                chatbot={editingChatbot}
                loading={formLoading}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Deletar Chatbot"
                message={`Tem certeza que deseja deletar o chatbot "${chatbotToDelete?.name}"? Esta ação não pode ser desfeita.`}
                confirmText="Deletar"
                cancelText="Cancelar"
                onConfirm={handleDeleteChatbot}
                onCancel={() => {
                    setDeleteDialogOpen(false);
                    setChatbotToDelete(null);
                }}
                severity="error"
            />
        </Box>
    );
};

export default HomePage; 