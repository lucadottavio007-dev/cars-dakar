'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import PremiumImage from './PremiumImage';
import { formatPrice } from '@/lib/data';
import { Locale } from '@/lib/dictionary';

// Define the interface for vehicle items
// This is a union or loose type to match the mixed data structure in the prototype
// Ideally, strict types should be defined in lib/data.ts
interface Vehicle {
    slug: string;
    brand: string;
    model: string;
    price?: number;
    year?: number;
    fuel?: string;
    mileage?: string;
    images?: string[]; // Sales
    image?: string | null; // Rental
    spec_line?: string;
    features?: string[];
    is_request?: boolean;
    wa_message?: string;
}

interface VehicleCardProps {
    item: Vehicle;
    type: 'sales' | 'rental';
    lang: Locale;
}

const VehicleCard = ({ item, type, lang }: VehicleCardProps) => {
    // Determine link target
    const href = `/${lang}/${type === 'sales' ? 'vente' : 'location-chauffeur'}/${item.slug}`; // Note: Rental details might not be a page, but in prototype it was clickable. If no page, maybe just a wrapper? 
    // Prototype handleCardClick: nav to /vente/slug etc.
    // For rental in prototype: handleCardClick triggers navigation to /location-chauffeur/slug? 
    // BUT the prototype Rental page doesn't seem to have a detail view logic in renderPage... 
    // Wait, renderPage:
    // if (path.startsWith('/vente/')) return <PageSalesDetail ... />;
    // if (path === '/location-chauffeur') return <PageRental ... />;
    // IT DOES NOT have rental detail page.
    // So clicking a rental card on Home -> goes to Rental Page?
    // User request: "Migrate ... into ... Next.js". 
    // I should check if rental cards on Home are meant to go to rental page or detail.
    // In prototype Home: handleCardClick triggers navigate to /lang/type/slug.
    // If type is rental -> /lang/location-chauffeur/slug.
    // But renderPage does not handle /location-chauffeur/slug.
    // So it might break or fallback to Home?
    // "default return <PageHome ... />"
    // So broken link in prototype?
    // I will make rental cards link to /location-chauffeur (the main page) for now, or anchor?
    // Or just keep the href as is and if it 404s, I'll fix later (Verification Phase).
    // Actually, I'll link to `/location-chauffeur` for rental.

    const targetLink = type === 'sales' ? href : `/${lang}/location-chauffeur`;

    const containerContent = (
        <div className="h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden relative">
                {type === 'sales' && item.images ? (
                    <img
                        src={item.images[0]}
                        alt={item.model}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <PremiumImage src={item.image || null} alt={item.model} isRequest={item.is_request} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">{item.brand}</p>
                        <h3 className="text-xl font-medium text-white">{item.model}</h3>
                    </div>
                    {type === 'sales' && item.price && (
                        <div className="text-right">
                            <p className="text-white font-light text-sm">{formatPrice(item.price)}</p>
                        </div>
                    )}
                </div>

                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <div className="pt-4 border-t border-neutral-800 flex justify-between text-neutral-400 text-xs uppercase tracking-wide">
                        {type === 'sales' ? (
                            <>
                                <span>{item.year}</span>
                                <span>{item.fuel}</span>
                                <span>{item.mileage}</span>
                            </>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {item.features?.map((f, i) => (
                                    <span key={i} className="px-2 py-1 border border-neutral-700 rounded-sm text-[10px] uppercase text-neutral-300">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // Wrap in Motion and Tilt
    return (
        <Link href={targetLink} className="block h-full">
            <TiltCard className="h-full group relative bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="h-full"
                >
                    {containerContent}
                </motion.div>
            </TiltCard>
        </Link>
    );
};

export default VehicleCard;
