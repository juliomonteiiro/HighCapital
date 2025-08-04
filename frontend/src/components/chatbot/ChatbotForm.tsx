import React, { useEffect, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Typography,
    Alert,
    Box,
    useTheme,
} from '@mui/material';
import type { Chatbot, CreateChatbotRequest, UpdateChatbotRequest } from '../../types';
import { useColors } from '../../hooks/useColors';
import { useForm } from '../../hooks/useForm';
import { chatbotValidationRules } from '../../utils/validation';
import { OPENAI_MODELS, MODEL_LABELS, SLIDER_MARKS, FORM_LIMITS } from '../../utils/constants';

interface ChatbotFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateChatbotRequest | UpdateChatbotRequest) => Promise<void>;
    chatbot?: Chatbot;
    loading?: boolean;
}

const initialFormData: CreateChatbotRequest = {
    name: '',
    description: '',
    context: '',
    temperature: 0.7,
    model: OPENAI_MODELS.GPT_41_MINI,
    maxTokens: 1024,
};

const ChatbotForm: React.FC<ChatbotFormProps> = ({
    open,
    onClose,
    onSubmit,
    chatbot,
    loading = false,
}) => {
    const theme = useTheme();
    const colors = useColors();
    const isEditing = !!chatbot;
    const previousOpenRef = useRef(open);
    const previousChatbotIdRef = useRef(chatbot?.id);

    const {
        formData,
        errors,
        submitError,
        setFormData,
        setSubmitError,
        validateForm,
        handleInputChange,
        handleSelectChange,
        handleSliderChange,
        resetForm,
    } = useForm<CreateChatbotRequest>(initialFormData, chatbotValidationRules);

    useEffect(() => {
        if (open && (!previousOpenRef.current || previousChatbotIdRef.current !== chatbot?.id)) {
            if (chatbot) {
                setFormData({
                    name: chatbot.name || '',
                    description: chatbot.description || '',
                    context: chatbot.context || '',
                    temperature: chatbot.temperature || 0.7,
                    model: chatbot.model || OPENAI_MODELS.GPT_41_MINI,
                    maxTokens: chatbot.maxTokens || 1024,
                });
            } else {
                resetForm();
            }
        }

        previousOpenRef.current = open;
        previousChatbotIdRef.current = chatbot?.id;
    }, [chatbot?.id, open, chatbot, setFormData, resetForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        try {
            const submitData: CreateChatbotRequest = {
                name: formData.name.trim(),
                description: formData.description?.trim() || '',
                context: formData.context.trim(),
                temperature: Number(formData.temperature),
                model: formData.model,
                maxTokens: Number(formData.maxTokens),
            };

            await onSubmit(submitData);

            if (!isEditing) {
                resetForm();
            }

            onClose();
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                'Erro ao salvar chatbot';
            setSubmitError(errorMessage);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                }}
            >
                {isEditing ? 'Editar Chatbot' : 'Criar Novo Chatbot'}
            </DialogTitle>

            <DialogContent sx={{ padding: 3 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {submitError && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            {submitError}
                        </Alert>
                    )}

                    <TextField
                        label="Nome do Chatbot"
                        placeholder="Digite o nome do seu chatbot"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        disabled={loading}
                        required
                        inputProps={{
                            maxLength: FORM_LIMITS.name.max,
                        }}
                        sx={{
                            marginTop: 1,
                            '& .MuiOutlinedInput-root': {
                                background: colors.background,
                                '&:hover': {
                                    background: colors.backgroundTertiary,
                                },
                                '&.Mui-focused': {
                                    background: colors.background,
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Descrição (opcional)"
                        placeholder="Descreva o propósito do seu chatbot"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                        error={!!errors.description}
                        helperText={errors.description}
                        fullWidth
                        multiline
                        rows={2}
                        disabled={loading}
                        inputProps={{
                            maxLength: FORM_LIMITS.description.max,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: colors.background,
                                '&:hover': {
                                    background: colors.backgroundTertiary,
                                },
                                '&.Mui-focused': {
                                    background: colors.background,
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Contexto"
                        placeholder="Ex: Você é um assistente especializado em vendas de produtos esportivos..."
                        value={formData.context}
                        onChange={handleInputChange('context')}
                        error={!!errors.context}
                        helperText={errors.context || 'Instruções para o comportamento do chatbot'}
                        fullWidth
                        multiline
                        rows={4}
                        disabled={loading}
                        required
                        inputProps={{
                            maxLength: FORM_LIMITS.context.max,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                background: colors.background,
                                '&:hover': {
                                    background: colors.backgroundTertiary,
                                },
                                '&.Mui-focused': {
                                    background: colors.background,
                                },
                            },
                        }}
                    />

                    <FormControl fullWidth disabled={loading} error={!!errors.model}>
                        <InputLabel>Modelo</InputLabel>
                        <Select
                            value={formData.model}
                            onChange={handleSelectChange('model')}
                            label="Modelo"
                        >
                            {Object.entries(MODEL_LABELS).map(([value, label]) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.model && (
                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                {errors.model}
                            </Typography>
                        )}
                    </FormControl>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Temperatura: {formData.temperature}
                        </Typography>
                        <Slider
                            value={formData.temperature}
                            onChange={handleSliderChange('temperature')}
                            min={FORM_LIMITS.temperature.min}
                            max={FORM_LIMITS.temperature.max}
                            step={0.1}
                            marks={SLIDER_MARKS.temperature}
                            disabled={loading}
                        />
                        <Typography variant="caption" color="text.secondary">
                            Valores mais baixos = respostas mais focadas, Valores mais altos = respostas mais criativas
                        </Typography>
                        {errors.temperature && (
                            <Typography variant="caption" color="error">
                                {errors.temperature}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Máximo de Tokens: {formData.maxTokens}
                        </Typography>
                        <Slider
                            value={formData.maxTokens}
                            onChange={handleSliderChange('maxTokens')}
                            min={FORM_LIMITS.maxTokens.min}
                            max={FORM_LIMITS.maxTokens.max}
                            step={1}
                            marks={SLIDER_MARKS.maxTokens}
                            disabled={loading}
                        />
                        {errors.maxTokens && (
                            <Typography variant="caption" color="error">
                                {errors.maxTokens}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ padding: 2, gap: 1.5 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    disabled={loading}
                    sx={{
                        borderRadius: 1.5,
                        height: 40,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: 14,
                        minWidth: 100,
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        '&:hover': {
                            borderColor: theme.palette.error.dark,
                            backgroundColor: colors.state.error.background.light,
                        }
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        borderRadius: 1.5,
                        height: 40,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: 14,
                        minWidth: 100,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        }
                    }}
                >
                    {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatbotForm;