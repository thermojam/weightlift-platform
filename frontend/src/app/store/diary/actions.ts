import { ADD_TONNAGE_ENTRY, SET_TONNAGE_ENTRIES } from './types';
import type { TonnageEntry, DiaryActionTypes } from './types';

export const addTonnageEntry = (entry: TonnageEntry): DiaryActionTypes => ({
    type: ADD_TONNAGE_ENTRY,
    payload: entry,
});

export const setTonnageEntries = (entries: TonnageEntry[]): DiaryActionTypes => ({
    type: SET_TONNAGE_ENTRIES,
    payload: entries,
});
