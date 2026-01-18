'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import PremiumImage from '@/components/ui/PremiumImage';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { RENTAL_VEHICLES, RENTAL_RATES, formatPrice } from '@/lib/data';

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

const RentalScreen = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].rental;
    const common = DICTIONARY[lang].common;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

            {/* SECTION A: HERO */}
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
                    <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        {t.hero.subline}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {t.hero.chips.map((chip, idx) => (
                            <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (idx * 0.1) }}
                                className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-300 uppercase tracking-wider"
                            >
                                {chip}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* SECTION B: OUR FLEET (CORE) */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="mb-12 border-b border-neutral-900 pb-8">
                    <h2 className="text-3xl text-white font-light mb-2">{t.fleet.title}</h2>
                    <p className="text-neutral-500 text-sm max-w-lg">{t.fleet.subline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {RENTAL_VEHICLES.map((car, idx) => (
                        <TiltCard key={idx} className="bg-neutral-900 border border-neutral-800 h-full group flex flex-col justify-between">
                            <div>
                                <div className="aspect-video overflow-hidden relative">
                                    <PremiumImage src={car.image || null} alt={car.model} isRequest={car.is_request} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80 pointer-events-none" />
                                </div>
                                <div className="p-6 pb-0">
                                    <div className="mb-2">
                                        <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{car.brand}</span>
                                        <h4 className="text-white text-lg font-medium">{car.model}</h4>
                                        <p className="text-neutral-400 text-xs mt-1 italic">{car.spec_line}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {car.features?.map((f, i) => (
                                            <span key={i} className="text-[10px] uppercase border border-neutral-700 text-neutral-400 px-2 py-1 rounded-sm">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <Link href={`/${lang}/contact`}>
                                    <Button variant="outline" className="w-full text-xs">
                                        {t.book_btn}
                                    </Button>
                                </Link>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>

            {/* SECTION C: EXPERIENCE */}
            <div className="container mx-auto max-w-6xl mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-900 pt-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl text-white font-light mb-6">{t.experience.title}</h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "60px" }}
                            className="h-[2px] bg-amber-500 mb-8"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-neutral-400 font-light space-y-6 text-lg leading-relaxed"
                    >
                        <p>{t.experience.p1}</p>
                        <p>{t.experience.p2}</p>
                        <p className="text-white">{t.experience.p3}</p>
                    </motion.div>
                </div>
            </div>

            {/* SECTION D: COMFORT & EXCELLENCE */}
            <div className="bg-neutral-900/30 border-y border-neutral-900 py-24 mb-32">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {t.comfort.cards.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -2 }}
                                        className="p-6 bg-neutral-950 border border-neutral-800"
                                    >
                                        <Icon className="text-amber-500 mb-4" size={24} />
                                        <h4 className="text-white text-sm font-medium mb-2 uppercase tracking-wide">{item.title}</h4>
                                        <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Vehicle Features List */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-2xl text-white font-light mb-8">{t.comfort.features_title}</h3>
                            <ul className="space-y-6">
                                {t.comfort.features.map((feat, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 text-neutral-300 font-light"
                                    >
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                        {feat}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION E: PRICING TABLE */}
            <div className="container mx-auto max-w-4xl mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl text-white font-light mb-2">{t.rates_title}</h2>
                    <p className="text-neutral-500 text-sm">{t.rates_intro}</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12">
                    <div className="space-y-6">
                        {[
                            { label: t.service_transfer, price: RENTAL_RATES.transfer },
                            { label: t.service_day, price: RENTAL_RATES.day_dakar },
                            { label: t.service_outside, price: RENTAL_RATES.outside_dakar },
                            { label: t.service_extra, price: RENTAL_RATES.extra_day },
                        ].map((rate, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex justify-between items-center py-4 border-b border-neutral-800 last:border-0"
                            >
                                <span className="text-neutral-300">{rate.label}</span>
                                <span className="text-white font-bold text-lg">{formatPrice(rate.price)}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION F: USE CASES */}
            <div className="container mx-auto max-w-4xl mb-32 text-center">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 block">{t.use_cases.title}</span>
                <div className="flex flex-wrap justify-center gap-4">
                    {t.use_cases.items.map((useCase, idx) => (
                        <span key={idx} className="px-6 py-3 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm font-light tracking-wide rounded-sm">
                            {useCase}
                        </span>
                    ))}
                </div>
            </div>

            {/* SECTION G: FINAL CTA */}
            <div className="container mx-auto max-w-4xl text-center pb-20">
                <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.final_cta.text}</h3>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link href={`/${lang}/contact`}>
                        <Button>
                            {t.final_cta.btn_book}
                        </Button>
                    </Link>
                    <div className="hidden md:block w-px bg-neutral-800" />
                    <Link href={`/${lang}/contact`}>
                        <Button variant="outline">
                            {t.final_cta.btn_wa}
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default RentalScreen;
