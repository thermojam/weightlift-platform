import { useEffect } from 'react';
import type React from 'react';
import { AdminLayout } from '@/widgets/AdminLayout';
import { useAppDispatch } from '@/app/store';
import { setTonnageEntries } from '@/app/store/diary/actions';
import { getTonnage } from '@/shared/api';
import { TonnageForm } from '@/features/tonnage-form';
import { ProgressSection } from '@/widgets/ProgressSection';
import { AiAssistant } from '@/widgets/AiAssistant';

export const Diary: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchTonnage = async () => {
            const data = await getTonnage();
            dispatch(setTonnageEntries(data));
        };
        fetchTonnage();
    }, [dispatch]);

    return (
        <AdminLayout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 text-center">Дневник тренировок</h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <TonnageForm />
                    <ProgressSection />
                    <AiAssistant />
                </div>
            </div>
        </AdminLayout>
    );
};
