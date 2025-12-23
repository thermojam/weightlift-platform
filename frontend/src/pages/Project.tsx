import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import { motion } from 'framer-motion';

type Member = {
    name: string;
    handle: string;
    link?: string;
    avatar?: string;
    description: string;
};

const members: Member[] = [
    {
        name: 'Андрей Павлухин',
        handle: '@Weightlifting1989',
        link: 'https://t.me/Weightlifting1989',
        avatar: 'https://yt3.googleusercontent.com/f2RsrRclaF6dhvB18fSQ9JwwTiKtnxlzO4qRnfhamy4mBQTRPRxQEdZf8FqDxUexWTOK8mXmCcE=s900-c-k-c0x00ffffff-no-rj',
        description:
            'Опытный специалист с многолетней практикой в области спортивных тренировок и реабилитации. Помогает каждому участнику достигать личных целей, разрабатывая индивидуальные программы и поддерживая мотивацию на всех этапах.',
    },
    {
        name: 'Салим Харьковский',
        handle: '@MagicPower268',
        link: 'https://t.me/MagicPower268',
        avatar: 'https://sun1-18.userapi.com/s/v1/ig2/0Jx87EYYeKYqqKCaOi0FzvO1c92He6QAL737wBF3I3JzjPaH8-9Kgz6Y61CijzlL1emSSlK21Nzp8Atte2UwGxiF.jpg?quality=95&crop=317,856,480,480&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480&ava=1&cs=240x240',
        description:
            'Эксперт в области физиологии и адаптации организма к нагрузкам. Руководит научными исследованиями, анализирует данные и внедряет инновационные методики для повышения эффективности тренировочного процесса.',
    },
    {
        name: 'Борис Мирочник',
        handle: '@borismir',
        link: 'https://t.me/borismir',
        avatar: 'https://n1s2.hsmedia.ru/90/3b/22/903b22377693cf410b6017621ea0ad23/672x807_0xac120003_6051663381566117512.jpg',
        description:
            'Креативный организатор и координатор проектов, отвечающий за создание и продвижение контента. Обеспечивает качественную коммуникацию между командой и аудиторией, помогает реализовывать идеи от концепции до результата.',
    },
    {
        name: 'Артем Морозов',
        handle: '@AKartsol',
        link: 'https://t.me/AKartsol',
        avatar: 'https://i.ytimg.com/vi/saKm7JTat6g/hqdefault.jpg',
        description:
            'Профессиональный спортсмен с впечатляющими достижениями в своей дисциплине. Постоянно совершенствует свои навыки и делится опытом, вдохновляя сообщество на активный образ жизни и целеустремлённость.',
    },
    {
        name: 'Кристина Штангер',
        handle: '@mariadsm',
        link: 'https://t.me/mariadsm',
        avatar: 'https://i.ytimg.com/vi/Duvs7UnBU7w/hqdefault.jpg',
        description:
            'Энергичная и целеустремлённая спортсменка, которая сочетает профессионализм и искреннюю любовь к спорту. Делится своими тренировочными методиками и мотивирует других достигать баланса между телом и духом.',
    },
    {
        name: 'Арсений Лифтер',
        handle: '@lifter',
        link: 'https://t.me/lifter',
        avatar: 'https://i.ytimg.com/vi/tABzJLlfXW0/hqdefault.jpg',
        description:
            'Перспективный атлет, известный своей упорной работой и стремлением к новым вершинам. Активно участвует в соревнованиях и поддерживает дух командного взаимодействия. Один из самых эффективных атлетов нашего сообщества.',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.3,
            duration: 0.5,
        },
    }),
};

export const Project: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100 mb-4 tracking-tight">
                    Наша команда
                </h1>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    Познакомьтесь с ведущими экспертами и идейными вдохновителями, которые делают наше сообщество уникальным.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {members.map((member, idx) => (
                    <motion.div
                        key={`${member.handle}-${idx}`}
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg shadow-black/40 flex flex-col hover:border-[#00aaff] transition-colors duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full border-2 border-[#00aaff]" />
                            <div className="flex flex-col">
                                <span className="text-slate-100 font-bold text-lg">{member.name}</span>
                                {member.link ? (
                                    <a
                                        href={member.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[#00aaff] flex items-center gap-1.5 text-sm hover:underline w-fit"
                                    >
                                        <FaTelegram size={16} /> {member.handle}
                                    </a>
                                ) : (
                                    <span className="text-slate-400 text-sm">{member.handle}</span>
                                )}
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed flex-grow">{member.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
