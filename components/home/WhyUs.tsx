'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Clock, Check } from 'lucide-react';
import { DICTIONARY, Locale } from '@/lib/dictionary';

const WhyUs = ({ lang }: { lang: Locale }) => {
    const tSec = DICTIONARY[lang].sections;

    // Pillars data is static but localized text is in logic in prototype.
    const pillars = [
        { icon: Shield, fr: "Véhicules Impeccables", en: "Impeccable Vehicles", desc: "Inspection rigoureuse 150 points." },
        { icon: Star, fr: "Service VIP", en: "VIP Service", desc: "Une expérience client sur-mesure." },
        { icon: Clock, fr: "Ponctualité Absolue", en: "Absolute Punctuality", desc: "Votre temps est précieux." },
        { icon: Check, fr: "Transparence", en: "Transparency", desc: "Prix clairs, sans frais cachés." }
    ];

    return (
        <section className="py-12 md:py-20 bg-neutral-900 border-y border-neutral-800 px-6 relative z-10">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <span className="text-amber-500 text-xs uppercase tracking-[0.2em]">{tSec.why_us_eyebrow}</span>
                    <h2 className="text-3xl md:text-4xl text-white font-light mt-4">{tSec.why_us}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-500">
                                    <Icon className="text-white group-hover:text-black transition-colors" size={24} />
                                </div>
                                <h3 className="text-white text-lg font-medium mb-2">{lang === 'fr' ? pillar.fr : pillar.en}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
