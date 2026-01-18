'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search, FileCheck, Eye, Gauge, Check, Key } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { SALES_VEHICLES, formatPrice } from '@/lib/data';

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

const SalesScreen = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].sales;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

            {/* SECTION A: HERO / POSITIONING */}
            <div className="container mx-auto max-w-6xl mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{t.hero.eyebrow}</span>
                    <h1 className="text-4xl md:text-6xl text-white font-light tracking-tight mb-6 relative inline-block">
                        {t.hero.title}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-2 left-0 h-[1px] bg-amber-500 opacity-60"
                        />
                    </h1>
                    <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        {t.hero.subline}
                    </p>
                </motion.div>
            </div>

            {/* SECTION B: INTRO TO COLLECTION */}
            <div className="container mx-auto max-w-6xl mb-12 flex flex-col md:flex-row justify-between items-end border-b border-neutral-900 pb-8">
                <div>
                    <h2 className="text-3xl text-white font-light mb-2">{t.intro.title}</h2>
                    <p className="text-neutral-500 text-sm max-w-lg">{t.intro.desc}</p>
                </div>
                <div className="mt-6 md:mt-0">
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">{SALES_VEHICLES.length} VEHICLES</span>
                </div>
            </div>

            {/* SECTION C: VEHICLE GRID (CORE) */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SALES_VEHICLES.map((car, idx) => (
                        <Link
                            key={idx}
                            href={`/${lang}/vente/${car.slug}`}
                            className="block h-full"
                        >
                            <TiltCard className="group bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 h-full">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={car.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={car.model} />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-amber-500 text-xs font-bold uppercase">{car.brand}</span>
                                            <h3 className="text-white text-xl">{car.model}</h3>
                                        </div>
                                        <span className="text-neutral-400 text-sm">{car.year}</span>
                                    </div>
                                    <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                                        <span className="text-white font-medium">{formatPrice(car.price)}</span>
                                        <ArrowRight size={16} className="text-neutral-500 group-hover:text-amber-500 transition-colors" />
                                    </div>
                                </div>
                            </TiltCard>
                        </Link>
                    ))}
                </div>
            </div>

            {/* SECTION D: THE STANDARD */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-900 pt-16">
                    <div>
                        <h2 className="text-3xl text-white font-light mb-6">{t.standard.title}</h2>
                        <div className="w-12 h-[2px] bg-amber-500 mb-8" />
                    </div>
                    <div className="text-neutral-400 font-light space-y-6 text-lg leading-relaxed">
                        <p>{t.standard.p1}</p>
                        <p>{t.standard.p2}</p>
                    </div>
                </div>
            </div>

            {/* SECTION E: PROCESS */}
            <div className="bg-neutral-900/30 border-y border-neutral-900 py-24 mb-32">
                <div className="container mx-auto max-w-6xl">
                    <h3 className="text-2xl text-white font-light text-center mb-16">{t.process.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {t.process.steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:border-amber-500/50 transition-colors">
                                        <Icon className="text-neutral-400 group-hover:text-amber-500 transition-colors" size={20} />
                                    </div>
                                    <h4 className="text-white text-sm font-medium mb-1">{step.title}</h4>
                                    <p className="text-neutral-500 text-xs">{step.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* SECTION F & G: SELL & SOURCE */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Sell Block */}
                    <TiltCard className="bg-neutral-900 border border-neutral-800 p-12 flex flex-col items-start justify-between h-full">
                        <div className="mb-8">
                            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Particuliers & Pros</span>
                            <h3 className="text-3xl text-white font-light mb-4">{t.sell.title}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed">{t.sell.desc}</p>
                        </div>
                        <Link href={`/${lang}/contact`}>
                            <Button variant="outline">
                                {t.sell.cta}
                            </Button>
                        </Link>
                    </TiltCard>

                    {/* Source Block */}
                    <TiltCard className="bg-neutral-900 border border-neutral-800 p-12 flex flex-col items-start justify-between h-full">
                        <div className="mb-8">
                            <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Conciergerie</span>
                            <h3 className="text-3xl text-white font-light mb-4">{t.source.title}</h3>
                            <p className="text-neutral-400 font-light leading-relaxed">{t.source.desc}</p>
                        </div>
                        <Link href={`/${lang}/contact`}>
                            <Button variant="outline">
                                {t.source.cta}
                            </Button>
                        </Link>
                    </TiltCard>

                </div>
            </div>

            {/* SECTION H: FINAL CTA */}
            <div className="container mx-auto max-w-4xl text-center pb-20">
                <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.final_cta.text}</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Button onClick={() => {
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}>
                        {t.final_cta.btn_view}
                    </Button>
                    <div className="hidden md:block w-px bg-neutral-800" />
                    <Link href={`/${lang}/contact`}>
                        <Button variant="outline">
                            {t.final_cta.btn_contact}
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default SalesScreen;
