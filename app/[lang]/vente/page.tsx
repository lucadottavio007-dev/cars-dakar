import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import SalesScreen from '@/components/screens/SalesScreen';

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang);

    return {
        title: t.sales.seo.title,
        description: t.sales.seo.description,
        alternates: {
            canonical: `/${lang}/vente`,
            languages: {
                fr: '/fr/vente',
                en: '/en/vente',
                'x-default': '/fr/vente',
            },
        },
    };
}

export default async function SalesPage({ params }: PageProps) {
    const { lang } = await params;

    return <SalesScreen lang={lang} />;
}
