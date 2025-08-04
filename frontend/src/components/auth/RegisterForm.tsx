import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { RegisterRequest } from '../../types';

interface RegisterFormProps {
    onSubmit: (userData: RegisterRequest) => Promise<void>;
    onSwitchToLogin: () => void;
    loading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    onSubmit,
    onSwitchToLogin,
    loading = false,
}) => {
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<RegisterRequest>>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterRequest> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Senha é obrigatória';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            return;
        }

        try {
            await onSubmit(formData);
        } catch (error: any) {
            setSubmitError(error.response?.data?.message || 'Erro ao fazer cadastro');
        }
    };

    const handleInputChange = (field: keyof RegisterRequest) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h4" component="h1" textAlign="center" fontWeight={600} sx={{ mb: 1 }}>
                    Cadastre-se
                </Typography>

                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
                    Crie sua conta para começar a usar chatbots
                </Typography>

                {submitError && (
                    <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
                        {submitError}
                    </Alert>
                )}

                <TextField
                    label="Nome"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                        mb: 2,
                    }}
                />

                <TextField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                        mb: 2,
                    }}
                />

                <TextField
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                    disabled={loading}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    disabled={loading}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                        mb: 3,
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                        borderRadius: 2,
                        height: 48,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: 16,
                        mb: 2,
                    }}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>

                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Já tem uma conta?{' '}
                        <Button
                            variant="text"
                            onClick={onSwitchToLogin}
                            disabled={loading}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            Faça login
                        </Button>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};

export default RegisterForm; 