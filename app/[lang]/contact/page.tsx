import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import ContactScreen from '@/components/screens/ContactScreen';

interface PageProps {
    params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = getDictionary(lang);

    return {
        title: t.contact.seo.title,
        description: t.contact.seo.description,
        alternates: {
            canonical: `/${lang}/contact`,
            languages: {
                fr: '/fr/contact',
                en: '/en/contact',
                'x-default': '/fr/contact',
            },
        },
    };
}

export default async function ContactPage({ params }: PageProps) {
    const { lang } = await params;

    return <ContactScreen lang={lang} />;
}
