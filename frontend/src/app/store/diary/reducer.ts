import { ADD_TONNAGE_ENTRY, SET_TONNAGE_ENTRIES } from './types';
import type { DiaryState, DiaryActionTypes } from './types';

const initialState: DiaryState = {
    entries: [],
    loading: false,
    error: null,
};

export const diaryReducer = (state = initialState, action: DiaryActionTypes): DiaryState => {
    switch (action.type) {
        case ADD_TONNAGE_ENTRY:
            return {
                ...state,
                entries: [...state.entries, action.payload],
            };
        case SET_TONNAGE_ENTRIES:
            return {
                ...state,
                entries: action.payload,
            };
        default:
            return state;
    }
};
