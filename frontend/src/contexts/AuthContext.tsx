import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { LoginRequest, RegisterRequest } from '../types';

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (userData: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const token = authService.getToken();
            const userData = authService.getUser();

            if (token && userData) {
                setUser(userData);
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            const response = await authService.login(credentials);
            authService.setAuthData(response.token, response.refreshToken, {
                name: response.name,
                email: response.email
            });
            setUser({ name: response.name, email: response.email });
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: RegisterRequest) => {
        try {
            const response = await authService.register(userData);
            authService.setAuthData(response.token, response.refreshToken, {
                name: response.name,
                email: response.email
            });
            setUser({ name: response.name, email: response.email });
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 