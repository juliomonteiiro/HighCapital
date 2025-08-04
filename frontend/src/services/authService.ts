import api from './api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },

    async refreshToken(): Promise<AuthResponse> {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('Refresh token não encontrado');
        }

        const response = await api.post<AuthResponse>('/auth/refresh', {
            refreshToken
        });
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    },

    getUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    },

    setAuthData(token: string, refreshToken: string, user: any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    },

    updateToken(newToken: string): void {
        localStorage.setItem('token', newToken);
    }
}; 