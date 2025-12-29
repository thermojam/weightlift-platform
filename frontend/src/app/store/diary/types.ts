export const ADD_TONNAGE_ENTRY = 'ADD_TONNAGE_ENTRY';
export const SET_TONNAGE_ENTRIES = 'SET_TONNAGE_ENTRIES';

export interface TonnageEntry {
    date: string;
    bench_press?: number;
    squat?: number;
    deadlift?: number;
    snatch?: number;
    clean_and_jerk?: number;
}

export interface DiaryState {
    entries: TonnageEntry[];
    loading: boolean;
    error: string | null;
}

interface AddTonnageEntryAction {
    type: typeof ADD_TONNAGE_ENTRY;
    payload: TonnageEntry;
}

interface SetTonnageEntriesAction {
    type: typeof SET_TONNAGE_ENTRIES;
    payload: TonnageEntry[];
}

export type DiaryActionTypes = AddTonnageEntryAction | SetTonnageEntriesAction;
