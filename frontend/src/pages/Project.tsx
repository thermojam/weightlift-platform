import React from 'react';
import { FaTelegram } from 'react-icons/fa';

type Member = {
    name: string;
    handle: string;
    link?: string;
    avatar?: string;
    description: string;
};

const members: Member[] = [
    {
        name: 'Андрей Павлючин',
        handle: '@Weightlifting1989',
        link: 'https://t.me/Weightlifting1989',
        description:
            'Опытный специалист с многолетней практикой в области спортивных тренировок и реабилитации. Помогает каждому участнику достигать личных целей, разрабатывая индивидуальные программы и поддерживая мотивацию на всех этапах.',
    },
    {
        name: 'Салим Харьяковский',
        handle: '@MagicPower268',
        link: 'https://t.me/MagicPower268',
        description:
            'Эксперт в области физиологии и адаптации организма к нагрузкам. Руководит научными исследованиями, анализирует данные и внедряет инновационные методики для повышения эффективности тренировочного процесса.',
    },
    {
        name: 'Борис Мирочник',
        handle: '@borismir',
        link: 'https://t.me/borismir',
        description:
            'Креативный организатор и координатор проектов, отвечающий за создание и продвижение контента. Обеспечивает качественную коммуникацию между командой и аудиторией, помогает реализовывать идеи от концепции до результата.',
    },
    {
        name: 'Артем Морозов',
        handle: '@AKartsol',
        link: 'https://t.me/AKartsol',
        description:
            'Профессиональный спортсмен с впечатляющими достижениями в своей дисциплине. Постоянно совершенствует свои навыки и делится опытом, вдохновляя сообщество на активный образ жизни и целеустремлённость.',
    },
    {
        name: 'Кристина Штангер',
        handle: '@mariadsm',
        link: 'https://t.me/mariadsm',
        description:
            'Энергичная и целеустремлённая спортсменка, которая сочетает профессионализм и искреннюю любовь к спорту. Делится своими тренировочными методиками и мотивирует других достигать баланса между телом и духом.',
    },
    {
        name: 'Арсений Лифтер',
        handle: '@lifter',
        link: 'https://t.me/lifter',
        description:
            'Перспективный атлет, известный своей упорной работой и стремлением к новым вершинам. Активно участвует в соревнованиях и поддерживает дух командного взаимодействия. Один из самых эффективных атлетов нашего сообщества.',
    },
];

export const Project: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                    Познакомьтесь с нашими ведущими экспертами и вдохновляющими участниками, которые делают наше сообщество живым и уникальным.
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, idx) => (
                    <div
                        key={`${member.handle}-${idx}`}
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg shadow-black/30"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 font-semibold">
                                {member.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-slate-100 font-semibold text-sm">{member.name}</span>
                                {member.link ? (
                                    <a
                                        href={member.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#00aaff] flex items-center gap-1 text-xs hover:underline"
                                    >
                                        <FaTelegram size={14} /> {member.handle}
                                    </a>
                                ) : (
                                    <span className="text-slate-400 text-xs">{member.handle}</span>
                                )}
                            </div>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed">{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
