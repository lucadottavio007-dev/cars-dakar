'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { DICTIONARY, Locale } from '@/lib/dictionary';

// Define the Button wrapper locally to match prototype or import if we made a generic one.
// We have MagneticButton. We can use it directly.
const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
    return (
        <MagneticButton
            onClick={onClick}
            variant={variant}
            className={className}
        >
            {children}
        </MagneticButton>
    );
};

const HeroSection = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang];
    const { scrollY } = useScroll();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const y = useTransform(scrollY, [0, 1000], [0, 200]);
    const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    poster="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2600&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                >
                    <source src="https://comeinnsenegal.com/videos/Cinematic_Luxury_Car_Night_Loop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950" />
            </motion.div>

            <div className="absolute bottom-8 right-8 z-30">
                <button
                    onClick={toggleMute}
                    className="p-3 bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-neutral-800/80 transition-all duration-300"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl">
                <span className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4 block">Dakar, Senegal</span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{t.home.hero_title}</h1>
                <p className="text-neutral-300 text-xl font-light mb-10">{t.home.hero_sub}</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href={`/${lang}/vente`}><Button>{t.home.cta_sales}</Button></Link>
                    <Link href={`/${lang}/location-chauffeur`}><Button variant="outline">{t.home.cta_rental}</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
