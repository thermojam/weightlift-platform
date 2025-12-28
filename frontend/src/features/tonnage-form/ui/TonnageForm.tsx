import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useAppDispatch } from '@/app/store';
import { addTonnageEntry } from '@/app/store/diary/actions';
import type { TonnageEntry } from '@/app/store/diary/types';
import { addTonnage } from '@/shared/api';

const exercises = [
    { name: 'bench_press', label: 'Жим лежа' },
    { name: 'squat', label: 'Приседания' },
    { name: 'deadlift', label: 'Становая тяга' },
    { name: 'snatch', label: 'Рывок' },
    { name: 'clean_and_jerk', label: 'Толчок' },
] as const;

type ExerciseName = typeof exercises[number]['name'];

export const TonnageForm: FC = () => {
    const dispatch = useAppDispatch();
    const [tonnage, setTonnage] = useState<Partial<Record<ExerciseName, number>>>({});
    const [isSubmitting, setIsSubmitting] = useState<Partial<Record<ExerciseName, boolean>>>({});

    const handleTonnageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: ExerciseName; value: string };
        setTonnage(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    };

    const handleSingleTonnageSubmit = async (exerciseName: ExerciseName) => {
        const value = tonnage[exerciseName];
        if (!value) return;

        setIsSubmitting(prev => ({ ...prev, [exerciseName]: true }));

        const newEntry: TonnageEntry = {
            date: new Date().toISOString(),
            [exerciseName]: value,
        };

        try {
            const savedEntry = await addTonnage(newEntry);
            dispatch(addTonnageEntry(savedEntry));
            setTonnage(prev => ({ ...prev, [exerciseName]: undefined }));
        } catch (error) {
            console.error("Ошибка при сохранении показателя:", error);
        } finally {
            setIsSubmitting(prev => ({ ...prev, [exerciseName]: false }));
        }
    };

    return (
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Дневные показатели</h2>
            <div className="space-y-4">
                {exercises.map(ex => (
                    <div key={ex.name}>
                        <label htmlFor={ex.name} className="block text-sm font-medium text-slate-300">{ex.label}</label>
                        <div className="mt-1 flex">
                            <input
                                type="number"
                                id={ex.name}
                                name={ex.name}
                                value={tonnage[ex.name] || ''}
                                onChange={handleTonnageChange}
                                placeholder="Тоннаж (кг)"
                                className="block w-full bg-slate-700 border border-slate-600 rounded-l-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                disabled={isSubmitting[ex.name]}
                            />
                            <button
                                onClick={() => handleSingleTonnageSubmit(ex.name)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!tonnage[ex.name] || isSubmitting[ex.name]}
                            >
                                {isSubmitting[ex.name] ? '...' : '✓'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
