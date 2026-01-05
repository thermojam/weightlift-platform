import {useState} from 'react';
import type {FC, ChangeEvent} from 'react';
import {useAppDispatch} from '@/app/store';
import {addTonnageEntry} from '@/app/store/diary/actions';
import type {TonnageEntry} from '@/app/store/diary/types';
import {Button, Input} from "@/shared/ui";
import {addTonnage} from '@/shared/api';

const exercises = [
    {name: 'bench_press', label: 'Жим лежа'},
    {name: 'squat', label: 'Приседания'},
    {name: 'deadlift', label: 'Становая тяга'},
    {name: 'snatch', label: 'Рывок'},
    {name: 'clean_and_jerk', label: 'Толчок'},
] as const;

type ExerciseName = typeof exercises[number]['name'];

export const TonnageForm: FC = () => {
    const dispatch = useAppDispatch();
    const [tonnage, setTonnage] = useState<Partial<Record<ExerciseName, number>>>({});
    const [isSubmitting, setIsSubmitting] = useState<Partial<Record<ExerciseName, boolean>>>({});

    const handleTonnageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target as { name: ExerciseName; value: string };
        setTonnage(prev => ({...prev, [name]: value ? Number(value) : undefined}));
    };

    const handleSingleTonnageSubmit = async (exerciseName: ExerciseName) => {
        const value = tonnage[exerciseName];
        if (!value) return;

        setIsSubmitting(prev => ({...prev, [exerciseName]: true}));

        const newEntry: TonnageEntry = {
            date: new Date().toISOString(),
            [exerciseName]: value,
        };

        try {
            const savedEntry = await addTonnage(newEntry);
            dispatch(addTonnageEntry(savedEntry));
            setTonnage(prev => ({...prev, [exerciseName]: undefined}));
        } catch (error) {
            console.error("Ошибка при сохранении показателя:", error);
        } finally {
            setIsSubmitting(prev => ({...prev, [exerciseName]: false}));
        }
    };

    return (
        <div
            className="lg:col-span-2 bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg border border-[#00aaff]/90 shadow-[#00aaff]/20">
            <h2 className="text-2xl font-bold text-[#00aaff] mb-4">Дневные показатели</h2>
            <div className="space-y-4">
                {exercises.map(ex => (
                    <div key={ex.name}>
                        <label htmlFor={ex.name} className="block text-sm font-medium text-slate-300 mb-1">{ex.label}</label>
                        <div className="grid grid-cols-[1fr_auto] gap-x-2">
                            <Input
                                className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                variant="form"
                                type="number"
                                id={ex.name}
                                name={ex.name}
                                value={tonnage[ex.name] || ''}
                                onChange={handleTonnageChange}
                                placeholder="Тоннаж (кг)"
                                disabled={isSubmitting[ex.name]}
                            />
                            <Button
                                variant="outline"
                                onClick={() => handleSingleTonnageSubmit(ex.name)}
                                disabled={!tonnage[ex.name] || isSubmitting[ex.name]}
                            >
                                {isSubmitting[ex.name] ? '...' : '✓'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
