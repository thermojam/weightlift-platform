import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TonnageEntry } from '@/app/store/diary/types';

interface ProgressChartProps {
    data: TonnageEntry[];
}

const exerciseColors: { [key: string]: string } = {
    bench_press: '#8884d8',
    squat: '#82ca9d',
    deadlift: '#ffc658',
    snatch: '#ff8042',
    clean_and_jerk: '#00C49F',
};

const exercises = [
    { name: 'bench_press', label: 'Жим лежа' },
    { name: 'squat', label: 'Приседания' },
    { name: 'deadlift', label: 'Становая тяга' },
    { name: 'snatch', label: 'Рывок' },
    { name: 'clean_and_jerk', label: 'Толчок' },
];

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    const formattedData = data.map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString('ru-RU'),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={formattedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis dataKey="date" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip
                    contentStyle={{ backgroundColor: '#2D3748', border: '1px solid #4A5568', color: '#E2E8F0' }}
                    labelStyle={{ color: '#E2E8F0' }}
                />
                <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                {exercises.map(ex => (
                    <Line
                        key={ex.name}
                        type="monotone"
                        dataKey={ex.name}
                        name={ex.label}
                        stroke={exerciseColors[ex.name]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
