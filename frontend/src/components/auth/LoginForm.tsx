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
import type { LoginRequest } from '../../types';

interface LoginFormProps {
    onSubmit: (credentials: LoginRequest) => Promise<void>;
    onSwitchToRegister: () => void;
    loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
    onSubmit,
    onSwitchToRegister,
    loading = false,
}) => {
    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<LoginRequest>>({});
    const [submitError, setSubmitError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<LoginRequest> = {};

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
            setSubmitError(error.response?.data?.message || 'Erro ao fazer login');
        }
    };

    const handleInputChange = (field: keyof LoginRequest) => (
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
                    Entrar
                </Typography>

                <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
                    Faça login para acessar seus chatbots
                </Typography>

                {submitError && (
                    <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
                        {submitError}
                    </Alert>
                )}

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
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>

                <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        Não tem uma conta?{' '}
                        <Button
                            variant="text"
                            onClick={onSwitchToRegister}
                            disabled={loading}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            Cadastre-se
                        </Button>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};

export default LoginForm; 