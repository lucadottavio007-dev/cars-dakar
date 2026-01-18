import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import HeroSection from '@/components/home/Hero';
import MaisonSection from '@/components/home/MaisonSection';
import ConciergeSection from '@/components/home/ConciergeSection';
import FeaturedSales from '@/components/home/FeaturedSales';
import WhyUs from '@/components/home/WhyUs';

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang);

    return {
        title: t.home.seo.title,
        description: t.home.seo.description,
        alternates: {
            canonical: `/${lang}`,
            languages: {
                fr: '/fr',
                en: '/en',
                'x-default': '/fr',
            },
        },
    };
}

export default async function Home({ params }: PageProps) {
    const { lang } = await params;

    return (
        <>
            <HeroSection lang={lang} />
            <MaisonSection lang={lang} />
            <ConciergeSection lang={lang} />
            <FeaturedSales lang={lang} />
            <WhyUs lang={lang} />
        </>
    );
}
