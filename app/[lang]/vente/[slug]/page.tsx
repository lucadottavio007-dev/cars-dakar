import React from 'react';
import { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';
import SalesDetailScreen from '@/components/screens/SalesDetailScreen';
import { SALES_VEHICLES } from '@/lib/data';

interface PageProps {
    params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];
    const locales = ['fr', 'en'];

    for (const lang of locales) {
        for (const car of SALES_VEHICLES) {
            params.push({ lang, slug: car.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const t = getDictionary(lang);
    const car = SALES_VEHICLES.find(c => c.slug === slug);

    if (!car) {
        return {
            title: t.sales.detail_seo.fallback_title,
            description: t.sales.detail_seo.fallback_desc,
        };
    }

    const brand = car.brand;
    const model = car.model;
    const year = car.year;
    const fuel = car.fuel;
    const mileage = car.mileage;

    let title = t.sales.detail_seo.title_pattern
        .replace('{Brand}', brand)
        .replace('{Model}', model)
        .replace('{Year}', year.toString());

    let description = t.sales.detail_seo.description_pattern
        .replace('{Brand}', brand)
        .replace('{Model}', model)
        .replace('{Year}', year.toString())
        .replace('{Fuel}', fuel)
        .replace('{Mileage}', mileage);

    return {
        title,
        description,
        alternates: {
            canonical: `/${lang}/vente/${slug}`,
            languages: {
                fr: `/fr/vente/${slug}`,
                en: `/en/vente/${slug}`,
                'x-default': `/fr/vente/${slug}`,
            },
        },
    };
}

export default async function SalesDetailPage({ params }: PageProps) {
    const { lang, slug } = await params;

    return <SalesDetailScreen lang={lang} slug={slug} />;
}
