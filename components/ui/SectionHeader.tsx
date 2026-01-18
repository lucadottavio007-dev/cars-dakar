import React from 'react';

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    subtitle?: string;
}

const SectionHeader = ({ eyebrow, title, subtitle }: SectionHeaderProps) => (
    <div className="mb-16">
        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] block mb-4">{eyebrow}</span>
        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">{title}</h1>
        {subtitle && <p className="text-neutral-400 text-lg font-light max-w-2xl">{subtitle}</p>}
    </div>
);

export default SectionHeader;
