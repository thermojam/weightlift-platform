import type {FC} from 'react';
import {useSelector} from 'react-redux';
import type {RootState} from '@/app/store';
import {ProgressChart} from '@/widgets/ProgressChart';

export const ProgressSection: FC = () => {
    const diaryEntries = useSelector((state: RootState) => state.diary.entries);

    return (
        <div
            className="lg:col-span-3 bg-slate-800 p-6 rounded-lg shadow-lg border border-[#00aaff]/90 shadow-[#00aaff]/20">
            <h2 className="text-2xl font-bold text-[#00aaff] mb-4">График прогресса</h2>
            {diaryEntries.length > 0 ? (
                <ProgressChart data={diaryEntries}/>
            ) : (
                <div className="flex items-center justify-center text-center h-full">
                    <p className="text-slate-400">Ваш график прогресса появится здесь после ввода данных.</p>
                </div>
            )}
        </div>
    );
};
