import axios from 'axios';
import type { TonnageEntry } from '@/app/store/diary/types';

// 1. Централизованный экземпляр axios
export const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// 2. Сервис для работы с тоннажем
const TONNAGE_API_URL = '/tonnage';

export const getTonnage = async () => {
    const response = await apiClient.get(TONNAGE_API_URL);
    return response.data;
};

export const addTonnage = async (entry: TonnageEntry) => {
    const response = await apiClient.post(TONNAGE_API_URL, entry);
    return response.data;
};

// 3. Сервис для работы с ИИ
const AI_API_URL = '/ai';

export const getAiResponse = async (message: string) => {
    const response = await apiClient.post(AI_API_URL, { message });
    return response.data;
};

