'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Phone } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { SALES_VEHICLES, formatPrice } from '@/lib/data';

const Button = ({ children, onClick, className = '' }: any) => {
    return (
        <MagneticButton
            onClick={onClick}
            className={className}
        >
            {children}
        </MagneticButton>
    );
};

const SalesDetailScreen = ({ lang, slug }: { lang: Locale; slug: string }) => {
    const t = DICTIONARY[lang];
    const car = SALES_VEHICLES.find(v => v.slug === slug);

    if (!car) return <div className="pt-40 text-center text-white">Véhicule introuvable</div>;

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <Link href={`/${lang}/vente`} className="gap-2 text-neutral-400 hover:text-white mb-8 text-xs uppercase tracking-widest inline-flex items-center">
                    <ChevronRight className="rotate-180" size={14} /> {t.common.back}
                </Link>

                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-4">
                        <div className="aspect-[4/3] w-full bg-neutral-900 overflow-hidden text-neutral-500 flex items-center justify-center">
                            {car.images && car.images[0] ? (
                                <img src={car.images[0]} className="w-full h-full object-cover" alt={car.model} />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        {/* Gallery thumbnails could go here if available */}
                    </div>

                    <div>
                        <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">{car.brand}</span>
                        <h1 className="text-4xl md:text-5xl text-white font-light mt-2 mb-6">{car.model}</h1>
                        {car.price && <p className="text-3xl text-white mb-8 pb-8 border-b border-neutral-800">{formatPrice(car.price)}</p>}

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
                            {[
                                { label: "Year", val: car.year },
                                { label: "Mileage", val: car.mileage },
                                { label: "Fuel", val: car.fuel },
                                { label: "Transmission", val: car.transmission },
                                { label: "Power", val: car.power },
                                { label: "Color", val: car.color },
                            ].map((spec, i) => (
                                <div key={i}>
                                    <p className="text-neutral-500 text-xs uppercase mb-1">{spec.label}</p>
                                    <p className="text-white">{spec.val}</p>
                                </div>
                            ))}
                        </div>

                        <Link href={`/${lang}/contact`}>
                            <Button className="w-full flex justify-center items-center gap-2">
                                <Phone size={18} /> {t.sales.contact_btn}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesDetailScreen;
