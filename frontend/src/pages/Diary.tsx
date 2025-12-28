import { useState, useEffect } from 'react';
import type { FC, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useAppDispatch } from '@/app/store';
import type { RootState } from '@/app/store';
import { addTonnageEntry, setTonnageEntries } from '@/app/store/diary/actions';
import { Input, Button } from "@/shared/ui";
import type { TonnageEntry } from '@/app/store/diary/types';
import { ProgressChart } from '@/widgets/ProgressChart';
import { getAiResponse, getTonnage, addTonnage } from '@/shared/api';

const exercises = [
    { name: 'bench_press', label: 'Жим лежа' },
    { name: 'squat', label: 'Приседания' },
    { name: 'deadlift', label: 'Становая тяга' },
    { name: 'snatch', label: 'Рывок' },
    { name: 'clean_and_jerk', label: 'Толчок' },
] as const;

type ExerciseName = typeof exercises[number]['name'];

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export const Diary: FC = () => {
    const dispatch = useAppDispatch();
    const diaryEntries = useSelector((state: RootState) => state.diary.entries);
    const [tonnage, setTonnage] = useState<Partial<Record<ExerciseName, number>>>({});
    const user = useSelector((state: RootState) => state.auth.user);
    const [aiMessage, setAiMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState<Partial<Record<ExerciseName, boolean>>>({});

    useEffect(() => {
        const fetchTonnage = async () => {
            const data = await getTonnage();
            dispatch(setTonnageEntries(data));
        };
        fetchTonnage();
    }, [dispatch]);

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
    const handleAiMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAiMessage(e.target.value);
    };

    const handleAiSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!aiMessage.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: aiMessage };
        setChatHistory(prev => [...prev, userMessage]);
        setAiMessage('');
        setIsLoading(true);

        try {
            const response = await getAiResponse(aiMessage);
            const aiMessageText = response.choices[0].message.content;
            const aiResponseMessage: ChatMessage = { sender: 'ai', text: aiMessageText };
            setChatHistory(prev => [...prev, aiResponseMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { sender: 'ai', text: 'Ошибка получения ответа от ИИ' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const welcomeMessage = user ? `${user.login}, какие вопросы являются самыми актуальными, важными и обсуждаемыми в данный момент?` : 'Какие вопросы являются самыми актуальными, важными и обсуждаемыми в данный момент?';


    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Дневник тренировок</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg border border-[#00aaff]/90 shadow-2xl shadow-[#00aaff]/20">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">Дневные показатели</h2>
                        <div className="space-y-4">
                            {exercises.map(ex => (
                                <div key={ex.name}>
                                    <label htmlFor={ex.name} className="block text-sm font-medium text-slate-300">{ex.label}</label>
                                    <div className="mt-1 flex gap-2">
                                        <Input
                                            variant="form"
                                            type="number"
                                            id={ex.name}
                                            name={ex.name}
                                            value={tonnage[ex.name] || ''}
                                            onChange={handleTonnageChange}
                                            placeholder="Тоннаж (кг)"
                                            className="block w-full shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-blue-600 focus:border-blue-600 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            disabled={isSubmitting[ex.name]}
                                        />
                                        <button
                                            onClick={() => handleSingleTonnageSubmit(ex.name)}
                                            className="bg-[#00aaff] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!tonnage[ex.name] || isSubmitting[ex.name]}
                                        >
                                            {isSubmitting[ex.name] ? '...' : '✓'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3 bg-slate-800 p-6 rounded-lg shadow-lg border border-[#00aaff]/90 shadow-[#00aaff]/20">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">График прогресса</h2>
                        {diaryEntries.length > 0 ? (
                            <ProgressChart data={diaryEntries} />
                        ) : (
                            <div className="flex items-center justify-center text-center h-full">
                                <p className="text-slate-400">Ваш график прогресса появится здесь после ввода данных.</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 bg-slate-800 p-6 rounded-lg shadow-lg mt-8 border border-[#00aaff]/90 shadow-[#00aaff]/20">
                        <h2 className="text-2xl font-bold text-slate-100 mb-4">Ассистент</h2>
                        <div className="h-96 bg-slate-900/50 rounded-lg p-4 flex flex-col">
                            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                                {chatHistory.length === 0 ? (
                                    <p className="text-slate-400">{welcomeMessage}</p>
                                ) : (
                                    chatHistory.map((msg, index) => (
                                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <p className={`max-w-8/12 rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                                                {msg.text}
                                            </p>
                                        </div>
                                    ))
                                )}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <p className="max-w-prose rounded-lg px-4 py-2 bg-slate-700 text-slate-300">
                                            ассистент думает...
                                        </p>
                                    </div>
                                )}
                            </div>
                            <form onSubmit={handleAiSubmit} className="mt-auto gap-2 flex">
                                <Input
                                    variant="form"
                                    type="text"
                                    value={aiMessage}
                                    onChange={handleAiMessageChange}
                                    placeholder="Введите ваше сообщение..."
                                    disabled={isLoading}
                                />
                                <Button
                                    variant="outline"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '...' : 'Отправить'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
