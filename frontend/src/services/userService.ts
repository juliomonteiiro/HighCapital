import api from './api';
import type { UserProfile, UpdateUserRequest, UpdateUserPasswordRequest } from '../types';

export const userService = {
    async getProfile(): Promise<UserProfile> {
        const response = await api.get<UserProfile>('/users/profile');
        return response.data;
    },

    async updateProfile(data: UpdateUserRequest): Promise<UserProfile> {
        const response = await api.put<UserProfile>('/users/profile', data);
        return response.data;
    },

    async updatePassword(data: UpdateUserPasswordRequest): Promise<{ message: string }> {
        await api.put('/users/profile/password', data);
        return { message: 'Senha atualizada com sucesso' };
    },

    async getUsers(): Promise<UserProfile[]> {
        const response = await api.get<UserProfile[]>('/users');
        return response.data;
    },

    async deleteAccount(userId: number): Promise<{ message: string }> {
        await api.delete(`/users/${userId}`);
        return { message: 'Conta removida com sucesso' };
    },
}; 