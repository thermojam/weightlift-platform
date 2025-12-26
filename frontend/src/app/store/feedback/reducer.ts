import { FEEDBACK_ACTION_TYPES, type IFeedbackState } from './types';

const initialState: IFeedbackState = {
    feedbacks: [],
    isLoading: false,
    error: null,
};

export const feedbackReducer = (state = initialState, action: any): IFeedbackState => {
    switch (action.type) {
        case FEEDBACK_ACTION_TYPES.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case FEEDBACK_ACTION_TYPES.SET_ERROR:
            return { ...state, error: action.payload };
        case FEEDBACK_ACTION_TYPES.FETCH_FEEDBACKS_SUCCESS:
            return { ...state, feedbacks: action.payload };
        case FEEDBACK_ACTION_TYPES.DELETE_FEEDBACK_SUCCESS:
            return {
                ...state,
                feedbacks: state.feedbacks.filter((f) => f.id !== action.payload),
            };
        default:
            return state;
    }
};
