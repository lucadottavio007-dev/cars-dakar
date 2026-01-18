'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import VehicleCard from '@/components/ui/VehicleCard';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { RENTAL_VEHICLES } from '@/lib/data';

// Helper to map index to potentially different card contents if needed, 
// but here we just map the cards from dictionary.
const ConciergeSection = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].concierge;
    const tSec = DICTIONARY[lang].sections;
    const tCommon = DICTIONARY[lang].common;

    return (
        <section className="bg-neutral-900 py-12 md:py-20 px-6 border-t border-neutral-800 relative z-10">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] block mb-4">{t.eyebrow}</span>
                    <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-6">{t.title}</h2>
                    <p className="text-neutral-400 text-lg font-light">{t.intro}</p>
                </div>

                {/* --- RENTAL SECTION (Integrated) --- */}
                <div className="mb-24 border-b border-neutral-800 pb-16">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl md:text-4xl text-white font-light">
                            {tSec.featured_rental}
                        </h2>
                        <Link href={`/${lang}/location-chauffeur`} className="text-neutral-400 hover:text-amber-500 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
                            <div className="px-6 py-3 border border-neutral-700 text-white hover:border-amber-500 hover:text-amber-500 hover:bg-neutral-900 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                                {tCommon.learn_more} <ChevronRight size={14} />
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                        {RENTAL_VEHICLES.slice(0, 3).map(car => (
                            <VehicleCard key={car.slug} item={car} type="rental" lang={lang} />
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {t.cards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <TiltCard key={idx} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    className="group p-8 md:p-10 border border-neutral-800 bg-neutral-950 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between min-h-[260px] h-full"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl text-white font-medium mb-3">{card.title}</h3>
                                            <p className="text-neutral-500 font-light text-sm leading-relaxed max-w-xs">{card.desc}</p>
                                        </div>
                                        <Icon className="text-neutral-700 group-hover:text-amber-500 transition-colors" size={24} />
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-neutral-900 flex justify-between items-end">
                                        <span className="text-white text-sm font-medium tracking-wide">{card.detail}</span>
                                        <button className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white flex items-center gap-2 transition-colors">
                                            {card.action} <ChevronRight size={12} className="text-amber-500" />
                                        </button>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default ConciergeSection;
