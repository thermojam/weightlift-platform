import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export type Member = {
    name: string;
    handle: string;
    link?: string;
    avatar?: string;
    description: string;
};

interface ProfileCardProps {
    member: Member;
    index: number;
}

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

export const ProfileCard: React.FC<ProfileCardProps> = ({ member, index }) => {
    return (
        <motion.div
            custom={index}
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
    );
};
