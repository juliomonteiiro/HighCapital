import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import type { LoginRequest, RegisterRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useColors } from '../hooks/useColors';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const colors = useColors();

    const handleLogin = async (credentials: LoginRequest) => {
        setLoading(true);
        try {
            await login(credentials);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (userData: RegisterRequest) => {
        setLoading(true);
        try {
            await register(userData);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    padding: 6,
                    borderRadius: 2.5,
                    boxShadow: colors.shadow.card,
                    background: colors.backgroundGradient,
                    border: `1px solid ${colors.border.light}`,
                    width: '100%',
                    maxWidth: 600,
                }}
            >
                {isLogin ? (
                    <LoginForm
                        onSubmit={handleLogin}
                        onSwitchToRegister={() => setIsLogin(false)}
                        loading={loading}
                    />
                ) : (
                    <RegisterForm
                        onSubmit={handleRegister}
                        onSwitchToLogin={() => setIsLogin(true)}
                        loading={loading}
                    />
                )}
            </Paper>
        </Container>
    );
};

export default AuthPage; 