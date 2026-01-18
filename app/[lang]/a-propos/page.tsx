import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import AboutScreen from '@/components/screens/AboutScreen';

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang);

    return {
        title: t.about.seo.title,
        description: t.about.seo.description,
        alternates: {
            canonical: `/${lang}/a-propos`,
            languages: {
                fr: '/fr/a-propos',
                en: '/en/a-propos',
                'x-default': '/fr/a-propos',
            },
        },
    };
}

export default async function AboutPage({ params }: PageProps) {
    const { lang } = await params;

    return <AboutScreen lang={lang} />;
}
