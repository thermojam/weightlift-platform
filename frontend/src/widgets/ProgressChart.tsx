import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {TonnageEntry} from '@/app/store/diary/types';

interface ProgressChartProps {
    data: TonnageEntry[];
}


const exerciseConfig: { [key: string]: { color: string; yAxisId: 'left' | 'right' } } = {
    bench_press: {color: '#00aaff', yAxisId: 'left'},
    squat: {color: '#22ff76', yAxisId: 'left'},
    deadlift: {color: '#ffa907', yAxisId: 'left'},
    snatch: {color: '#ff0985', yAxisId: 'left'},
    clean_and_jerk: {color: '#8d00c2', yAxisId: 'right'},
};

const exercises = [
    {name: 'bench_press', label: 'Жим лежа'},
    {name: 'squat', label: 'Приседания'},
    {name: 'deadlift', label: 'Становая тяга'},
    {name: 'snatch', label: 'Рывок'},
    {name: 'clean_and_jerk', label: 'Толчок'},
];

export const ProgressChart: React.FC<ProgressChartProps> = ({data}) => {
    const allTimestamps = [...new Set(data.map(entry => new Date(entry.date).getTime()))];

    allTimestamps.sort((a, b) => a - b);

    const formattedData = allTimestamps.map(time => {
        const point: { [key: string]: any } = {time};

        const entriesAtThisTime = data.filter(e => new Date(e.date).getTime() === time);

        entriesAtThisTime.forEach(entry => {
            for (const ex of exercises) {
                if (entry[ex.name as keyof TonnageEntry]) {
                    point[ex.name] = entry[ex.name as keyof TonnageEntry];
                }
            }
        });

        return point;
    });

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={formattedData}
                margin={{top: 15, right: 30, left: 20,}}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568"/>
                <XAxis
                    dataKey="time"
                    domain={['dataMin', 'dataMax']}
                    stroke="#A0AEC0"
                    tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                />
                <YAxis yAxisId="left" stroke="#A0AEC0"/>
                <YAxis yAxisId="right" orientation="right" stroke="#A0AEC0"/>
                <Tooltip
                    contentStyle={{backgroundColor: '#2D3748', border: '1px solid #4A5568'}}
                    labelStyle={{color: '#E2E8F0', fontWeight: 'bold'}}
                    labelFormatter={(label) => `Время: ${new Date(label).toLocaleString('ru-RU')}`}
                />
                <Legend wrapperStyle={{color: '#E2E8F0', paddingTop: '20px'}}
                        formatter={(value) => <span style={{color: '#E2E8F0'}}>{value}</span>}

                />
                {exercises.map(ex => (
                    <Line
                        key={ex.name}
                        yAxisId={exerciseConfig[ex.name].yAxisId}
                        type="monotone"
                        dataKey={ex.name}
                        name={ex.label}
                        stroke={exerciseConfig[ex.name].color}
                        strokeWidth={3}
                        dot={{r: 4}}
                        activeDot={{r: 8}}
                        connectNulls={true}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};
