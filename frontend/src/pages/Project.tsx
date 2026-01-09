import React from 'react';
import {motion} from 'framer-motion';
import {members} from '@/shared/consts/team';
import {ProfileCard} from '@/entities/User/ui/ProfileCard.tsx';

const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: {y: 20, opacity: 0},
    show: {y: 0, opacity: 1},
};

export const Project: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto hide-scrollbar -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="px-4 sm:px-6 lg:px-8 pb-8">
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        className="text-center mb-12 pt-4"
                    >
                        <h1 className="custom-title text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent mb-6">
                            Наша команда
                        </h1>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            Познакомьтесь с ведущими экспертами и идейными вдохновителями, которые делают наше сообщество уникальным.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {members.map((member, idx) => (
                            <motion.div variants={item} key={`${member.handle}-${idx}`}>
                                <ProfileCard member={member} index={idx}/>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
