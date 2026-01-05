import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeItem {
    text: string;
    icon: React.ReactElement<any>;
    color: string;
}

interface MarqueeProps {
    items: MarqueeItem[];
    speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, speed = 30 }) => {
    const marqueeItems = [...items, ...items];

    return (
        <div className="custom-title relative w-full overflow-hidden bg-neutral-900 py-3 md:py-8 shadow-lg cursor-pointer">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{
                    x: ['0%', '-50%'],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: 'linear',
                    },
                }}
            >
                {marqueeItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 inline-flex items-center justify-center mx-6 md:mx-8"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                    >
                        {React.cloneElement(item.icon, {
                            className: `mr-3 w-6 h-6 md:w-7 md:h-7 ${item.color}`,
                        })}
                        <span className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                            {item.text}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
        </div>
    );
};
