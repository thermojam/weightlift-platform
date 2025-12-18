import type { Dispatch } from 'redux';
import { apiClient } from '@/apiClient';

export interface IUser {
    id: string;
    login: string;
    role: string;
    isActive: boolean;
    registeredAt: string;
}

export const fetchUsers = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await apiClient.get('/users');
            return { success: true, users: response.data.data };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка загрузки пользователей';
            return { success: false, error };
        }
    };
};

export const updateUser = (id: string, role: number) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await apiClient.patch(`/users/${id}`, { role });
            return { success: true, user: response.data.data };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка обновления пользователя';
            return { success: false, error };
        }
    };
};

export const deleteUser = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            await apiClient.delete(`/users/${id}`);
            return { success: true };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка удаления пользователя';
            return { success: false, error };
        }
    };
};

export const fetchRoles = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await apiClient.get('/users/roles');
            return { success: true, roles: response.data.data };
        } catch (e: any) {
            const error = e.response?.data?.error || 'Ошибка загрузки ролей';
            return { success: false, error };
        }
    };
};

