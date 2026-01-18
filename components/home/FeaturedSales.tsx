'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import VehicleCard from '@/components/ui/VehicleCard';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { SALES_VEHICLES } from '@/lib/data';

const FeaturedSales = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang];
    const tSec = DICTIONARY[lang].sections;

    return (
        <section className="py-12 md:py-20 bg-neutral-950 px-6 relative z-10">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl text-white font-light">
                        {tSec.featured_sales}
                    </h2>
                    <Link href={`/${lang}/vente`}>
                        <div className="px-6 py-3 border border-neutral-700 text-white hover:border-amber-500 hover:text-amber-500 hover:bg-neutral-900 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                            {t.common.learn_more} <ChevronRight size={14} />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SALES_VEHICLES.slice(0, 3).map(car => (
                        <VehicleCard key={car.slug} item={car} type="sales" lang={lang} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSales;
