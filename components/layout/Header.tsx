'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/dictionary';

// Sub-component for Nav Links
const NavLink = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void }) => {
    return (
        <Link href={href} onClick={onClick} className="relative group flex flex-col items-center justify-center px-1 h-full">
            <motion.span
                className="text-xs font-medium tracking-widest uppercase relative z-10"
                initial={{ color: "rgba(255, 255, 255, 0.8)" }}
                animate={{
                    color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)",
                    y: isActive ? -1 : 0
                }}
                whileHover={{
                    color: "#FFFFFF",
                    y: -1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {label}
            </motion.span>

            {/* Amber Underline Slide */}
            <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-amber-500 origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0
                }}
                whileHover={{
                    scaleX: 1,
                    opacity: 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </Link>
    );
};

const Header = ({ lang }: { lang: Locale }) => {
    const dictionary = getDictionary(lang);
    const t = dictionary.nav;
    const pathname = usePathname();
    const router = useRouter(); // Although standard Link is preferred, we use this for programmatic stuff if needed

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLinks = (l: Locale) => [
        { label: t.home, path: `/${l}` },
        { label: t.sales, path: `/${l}/vente` },
        { label: t.rental, path: `/${l}/location-chauffeur` },
        { label: t.about, path: `/${l}/a-propos` },
        { label: t.contact, path: `/${l}/contact` }
    ];

    const switchLang = () => {
        const newLang = lang === 'fr' ? 'en' : 'fr';
        // Replace the first segment of the path
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
        return newPath;
    };

    // Check active state
    // Simplistic: if pathname exactly matches or starts with path (except root)
    const checkActive = (path: string) => {
        if (path === `/${lang}` && pathname === `/${lang}`) return true;
        if (path !== `/${lang}` && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isOpen ? 'bg-neutral-950/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'} py-6`}>
            {/* Scroll Progress Hairline */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500 opacity-60 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <div className="container mx-auto px-6 flex justify-between items-center relative">
                <Link href={`/${lang}`} className="cursor-pointer group">
                    <span className="text-2xl font-bold text-white tracking-tighter group-hover:text-amber-500 transition-colors">CARS<span className="text-amber-500">DAKAR</span></span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {getLinks(lang).map(link => (
                        <NavLink
                            key={link.path}
                            href={link.path}
                            label={link.label}
                            isActive={checkActive(link.path)}
                        />
                    ))}
                    <Link
                        href={switchLang()}
                        className="ml-4 flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white uppercase border border-neutral-800 px-2 py-1 rounded transition-all"
                    >
                        <Globe size={10} /> {lang}
                    </Link>
                </div>

                {/* Mobile */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '100vh', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-neutral-950 absolute top-full left-0 w-full flex flex-col items-center justify-center gap-8 py-12"
                    >
                        {getLinks(lang).map(link => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-sm uppercase tracking-widest text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href={switchLang()} onClick={() => setIsOpen(false)} className="text-amber-500 mt-4 text-sm font-bold">
                            {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
