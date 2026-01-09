import React from 'react';
import {FaTelegram} from 'react-icons/fa';

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

export const ProfileCard: React.FC<ProfileCardProps> = ({member}) => {
    return (
        <div
            className="group bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 hover:border-cyan-400/50 hover:shadow-cyan-400/10 transition-all duration-300 h-full flex flex-col p-6"
        >
            <div className="flex items-center gap-4 mb-5">
                <img src={member.avatar} alt={member.name}
                     className="w-16 h-16 rounded-full border-2  border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300"/>
                <div>
                    <h3 className="text-slate-100 font-bold text-lg">{member.name}</h3>
                    {member.link ? (
                        <a
                            href={member.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 flex items-center gap-1.5 text-sm hover:underline w-fit"
                        >
                            <FaTelegram size={16}/> {member.handle}
                        </a>
                    ) : (
                        <span className="text-slate-400 text-sm">{member.handle}</span>
                    )}
                </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed flex-grow">{member.description}</p>
        </div>
    );
};
