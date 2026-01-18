import React from 'react';
import { Locale } from '@/lib/dictionary';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CursorAura from '@/components/ui/CursorAura';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import SmoothScroll from '@/components/ui/SmoothScroll';

type Props = {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
    return [{ lang: "fr" }, { lang: "en" }];
}

export default async function Layout({ children, params }: Props) {
    const { lang } = await params;

    return (
        <>
            <NoiseOverlay />
            <CursorAura />
            <SmoothScroll />
            <Header lang={lang as Locale} />
            <main className="relative z-10 min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
