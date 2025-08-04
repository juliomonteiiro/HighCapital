import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import type { UserProfile, UpdateUserRequest, UpdateUserPasswordRequest } from '../types';

export const useUser = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await userService.getProfile();
            setProfile(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao carregar perfil');
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (data: UpdateUserRequest) => {
        try {
            setLoading(true);
            const updatedProfile = await userService.updateProfile(data);
            setProfile(updatedProfile);
            return updatedProfile;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (data: UpdateUserPasswordRequest) => {
        try {
            setLoading(true);
            const result = await userService.updatePassword(data);
            return result;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async () => {
        try {
            setLoading(true);
            if (!profile?.id) {
                throw new Error('ID do usuário não encontrado');
            }
            const result = await userService.deleteAccount(profile.id);
            return result;
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return {
        profile,
        loading,
        error,
        loadProfile,
        updateProfile,
        updatePassword,
        deleteAccount,
    };
}; 