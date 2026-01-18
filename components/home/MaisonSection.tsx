'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Key, UserCheck, Star } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import { DICTIONARY, Locale } from '@/lib/dictionary';

const MaisonSection = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].maison;

    const icons = [Key, UserCheck, Star];

    return (
        <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-12 md:py-20 px-6 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">{t.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
                            {t.title}
                        </h2>
                        <div className="text-neutral-400 text-lg font-light space-y-4 leading-relaxed max-w-lg">
                            <p>{t.p1}</p>
                            <p>{t.p2}</p>
                            <p>{t.p3}</p>
                        </div>
                        <div className="mt-4 pt-8 border-t border-neutral-800">
                            <span className="text-white font-medium tracking-wider text-sm uppercase">{t.signature}</span>
                        </div>
                    </motion.div>

                    {/* Right: Trust Metrics & Standards */}
                    <div className="space-y-12">

                        {/* Chips */}
                        <div className="flex flex-wrap gap-3">
                            {t.metrics.map((metric, idx) => (
                                <span key={idx} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400 text-xs uppercase tracking-wider hover:border-amber-500/30 transition-colors">
                                    {metric}
                                </span>
                            ))}
                        </div>

                        {/* Standards Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            {t.cards.map((card, idx) => {
                                const Icon = icons[idx]; // Simplified mapping since we know the order or we can look up if needed.
                                // Or better: update DICTIONARY to not have icon (non-serializable) or map it here.
                                // In data.ts I removed icons from dictionary to avoid client/server issues? 
                                // Wait, dictionary.ts has icons imported. It works because it is used in client components here.
                                // But passing React components (icons) via props from server component (if Dictionary is used in server) might be tricky?
                                // Actually `getDictionary` returns the object. If used in Client Comp, it's fine.
                                // However, Dictionary in `lib` imports `lucide-react`.

                                return (
                                    <TiltCard key={idx} className="h-full">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                                            className="flex items-start gap-5 p-6 border border-neutral-800/50 bg-neutral-900/30 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
                                        >
                                            <div className="p-3 bg-neutral-950 rounded-full border border-neutral-800 text-amber-500">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-medium uppercase tracking-wide text-sm mb-1">{card.title}</h3>
                                                <p className="text-neutral-500 text-sm font-light">{card.desc}</p>
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MaisonSection;
