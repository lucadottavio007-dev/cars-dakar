'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { DICTIONARY, Locale } from '@/lib/dictionary';

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
    return (
        <MagneticButton
            onClick={onClick}
            variant={variant}
            className={className}
        >
            {children}
        </MagneticButton>
    );
};

const AboutScreen = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].about;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

            {/* SECTION A: HERO EDITORIAL */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{t.hero.eyebrow}</span>
                        <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-6 relative inline-block">
                            {t.hero.title}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 h-[2px] bg-amber-500"
                            />
                        </h1>
                        <h3 className="text-xl text-white font-medium mb-8">{t.hero.subline}</h3>
                        <div className="space-y-6 text-neutral-400 font-light leading-relaxed">
                            <p>{t.hero.p1}</p>
                            <p>{t.hero.p2}</p>
                            <p className="text-white font-medium">{t.hero.p3}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative h-[600px] w-full rounded-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop"
                            alt="Luxury Car Interior"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* SECTION B: VALUES */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.values.items.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.5)" }}
                            className="p-8 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-colors duration-300"
                        >
                            <h3 className="text-2xl text-white font-light mb-4">{value.title}</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* SECTION C: STANDARDS */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl text-white font-light tracking-tight sticky top-32">{t.standards.title}</h2>
                    </div>
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {t.standards.items.map((item, idx) => {
                            const Icon = item.icon as React.ElementType;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-4 p-4 border border-neutral-800 hover:bg-neutral-900 transition-colors"
                                >
                                    <Icon className="text-amber-500 shrink-0" size={20} />
                                    <span className="text-neutral-300 text-sm font-medium uppercase tracking-wide">{item.label}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* SECTION D: CHAUFFEUR & CONCIERGE */}
            <div className="container mx-auto max-w-6xl mb-32 bg-neutral-900 border border-neutral-800 p-12 lg:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                <div className="relative z-10 mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl text-white font-light mb-6">{t.services.title}</h2>
                    <p className="text-neutral-400 text-lg font-light">{t.services.desc}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    {t.services.tiles.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5, rotate: 1 }}
                            className="aspect-square bg-neutral-950 border border-neutral-800 flex items-center justify-center p-6 text-center hover:border-amber-500/30 transition-colors cursor-default"
                        >
                            <span className="text-white font-medium tracking-wide">{service}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* SECTION E: CTA */}
            <div className="container mx-auto max-w-4xl text-center pb-20">
                <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.cta.text}</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link href={`/${lang}/contact`}>
                        <Button>
                            {t.cta.btn_wa}
                        </Button>
                    </Link>
                    <div className="hidden md:block w-px bg-neutral-800" />
                    <Link href={`/${lang}/location-chauffeur`}>
                        <Button variant="outline">
                            {t.cta.btn_fleet}
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default AboutScreen;
