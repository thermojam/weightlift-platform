import { useState, useEffect } from 'react';
import type { FC, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useAppDispatch } from '@/app/store';
import type { RootState } from '@/app/store';
import { addTonnageEntry, setTonnageEntries } from '@/app/store/diary/actions';
import type { TonnageEntry } from '@/app/store/diary/types';
import { ProgressChart } from '@/widgets/ProgressChart';
import { getAiResponse } from '@/shared/api';
import { getTonnage, addTonnage } from '@/shared/api';

const exercises = [
    { name: 'bench_press', label: 'Жим лежа' },
    { name: 'squat', label: 'Приседания' },
    { name: 'deadlift', label: 'Становая тяга' },
    { name: 'snatch', label: 'Рывок' },
    { name: 'clean_and_jerk', label: 'Толчок' },
];

export const Diary: FC = () => {
    const dispatch = useAppDispatch();
    const diaryEntries = useSelector((state: RootState) => state.diary.entries);
    const [tonnage, setTonnage] = useState<Partial<Pick<TonnageEntry, 'bench_press' | 'squat' | 'deadlift' | 'snatch' | 'clean_and_jerk'>>>({});
    const [aiMessage, setAiMessage] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTonnage = async () => {
            const data = await getTonnage();
            dispatch(setTonnageEntries(data));
        };
        fetchTonnage();
    }, [dispatch]);

    const handleTonnageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTonnage(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    };

    const handleTonnageSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newEntry: TonnageEntry = {
            date: new Date().toISOString(),
            ...tonnage
        };
        const savedEntry = await addTonnage(newEntry);
        dispatch(addTonnageEntry(savedEntry));
        setTonnage({}); // Reset form after submission
    };

    const handleAiMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAiMessage(e.target.value);
    };

    const handleAiSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setAiResponse('');
        try {
            const response = await getAiResponse(aiMessage);
            setAiResponse(response.choices[0].message.content);
        } catch (error) {
            console.error(error);
            setAiResponse('Ошибка получения ответа от ИИ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Дневник тренировок</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Tonnage Form */}
                    <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">Дневные показатели</h2>
                        <form onSubmit={handleTonnageSubmit} className="space-y-4">
                            {exercises.map(ex => (
                                <div key={ex.name}>
                                    <label htmlFor={ex.name} className="block text-sm font-medium text-slate-300">{ex.label}</label>
                                    <input
                                        type="number"
                                        id={ex.name}
                                        name={ex.name}
                                        value={tonnage[ex.name as keyof typeof tonnage] || ''}
                                        onChange={handleTonnageChange}
                                        placeholder="Введите тоннаж (кг)"
                                        className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-6"
                            >
                                Сохранить
                            </button>
                        </form>
                    </div>

                    {/* Progress Graph */}
                    <div className="lg:col-span-3 bg-slate-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">График прогресса</h2>
                        {diaryEntries.length > 0 ? (
                            <ProgressChart data={diaryEntries} />
                        ) : (
                            <div className="flex items-center justify-center text-center h-full">
                                <p className="text-slate-400">Ваш график прогресса появится здесь после ввода данных.</p>
                            </div>
                        )}
                    </div>

                    {/* AI Assistant */}
                    <div className="lg:col-span-5 bg-slate-800 p-6 rounded-lg shadow-lg mt-8">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">ИИ Ассистент</h2>
                        <div className="h-64 bg-slate-900/50 rounded-lg p-4 flex flex-col">
                            <div className="flex-grow overflow-y-auto mb-4">
                                {isLoading ? (
                                    <p className="text-slate-400">ИИ-ассистент думает...</p>
                                ) : aiResponse ? (
                                    <p className="text-slate-400">{aiResponse}</p>
                                ) : (
                                    <p className="text-slate-400">Задайте свой вопрос по болгарской методике...</p>
                                )}
                            </div>
                            <form onSubmit={handleAiSubmit} className="mt-auto flex">
                                <input
                                    type="text"
                                    value={aiMessage}
                                    onChange={handleAiMessageChange}
                                    placeholder="Введите ваше сообщение..."
                                    className="flex-grow bg-slate-700 border border-slate-600 rounded-l-lg py-2 px-3 text-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '...' : 'Отправить'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
