import React from 'react';
import { motion } from 'framer-motion';
import { members } from '@/shared/consts/team';
import { ProfileCard } from '@/entities/User/ui/ProfileCard.tsx';

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
                    <ProfileCard key={`${member.handle}-${idx}`} member={member} index={idx} />
                ))}
            </div>
        </div>
    );
};
