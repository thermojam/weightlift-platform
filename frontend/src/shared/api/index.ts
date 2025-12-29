import axios from 'axios';
import type {TonnageEntry} from '@/app/store/diary/types';

export const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const TONNAGE_API_URL = '/tonnage';

export const getTonnage = async () => {
    const response = await apiClient.get(TONNAGE_API_URL);
    return response.data;
};

export const addTonnage = async (entry: TonnageEntry) => {
    const response = await apiClient.post(TONNAGE_API_URL, entry);
    return response.data;
};

const AI_API_URL = '/ai';

export const getAiResponse = async (message: string) => {
    const response = await apiClient.post(AI_API_URL, {message});
    return response.data;
};

