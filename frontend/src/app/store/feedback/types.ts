export interface IFeedback {
    id: string;
    fullName: string;
    phone: string;
    city: string;
    discipline: 'weightlifting' | 'powerlifting';
    height: number;
    weight: number;
    gender: 'male' | 'female';
    createdAt: string;
}

export interface IFeedbackState {
    feedbacks: IFeedback[];
    isLoading: boolean;
    error: string | null;
}

export const FEEDBACK_ACTION_TYPES = {
    FETCH_FEEDBACKS_SUCCESS: 'FETCH_FEEDBACKS_SUCCESS',
    DELETE_FEEDBACK_SUCCESS: 'DELETE_FEEDBACK_SUCCESS',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
} as const;
