import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import RentalScreen from '@/components/screens/RentalScreen';

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang);

    return {
        title: t.rental.seo.title,
        description: t.rental.seo.description,
        alternates: {
            canonical: `/${lang}/location-chauffeur`,
            languages: {
                fr: '/fr/location-chauffeur',
                en: '/en/location-chauffeur',
                'x-default': '/fr/location-chauffeur',
            },
        },
    };
}

export default async function RentalPage({ params }: PageProps) {
    const { lang } = await params;

    return <RentalScreen lang={lang} />;
}
