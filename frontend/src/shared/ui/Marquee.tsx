import React from 'react';

interface MarqueeItem {
    text: string;
    icon: React.ReactElement<any>;
    color: string;
}

interface MarqueeProps {
    items: MarqueeItem[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
    const marqueeItems = [...items, ...items];

    return (
        <div className="w-full overflow-hidden bg-neutral-900 py-3 md:py-4 shadow-lg">
            <div className="whitespace-nowrap animate-marquee">
                {marqueeItems.map((item, index) => (
                    <div key={index} className="inline-flex items-center mx-6 md:mx-8">
                        {React.cloneElement(item.icon, {
                            className: `mr-3 w-6 h-6 md:w-7 md:h-7 ${item.color}`
                        })}
                        <span className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
