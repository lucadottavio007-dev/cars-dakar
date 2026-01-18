'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { DICTIONARY, Locale } from '@/lib/dictionary';
import { CONTACT_CONFIG, getPhoneLink, getEmailLink, getWhatsAppLink } from '@/lib/contact';

const Button = ({ children, onClick, className = '' }: any) => {
    return (
        <MagneticButton
            onClick={onClick}
            className={className}
        >
            {children}
        </MagneticButton>
    );
};

const ContactScreen = ({ lang }: { lang: Locale }) => {
    const t = DICTIONARY[lang].contact;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        subject: false,
        message: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors = {
            name: !formData.name.trim(),
            phone: !formData.phone.trim(),
            email: !formData.email.trim(),
            subject: !formData.subject || formData.subject === "Subject" || formData.subject === "Objet de la demande",
            message: !formData.message.trim()
        };

        // Adjust validation for select if default value string differs
        if (!formData.subject) newErrors.subject = true;

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;

        // Build WhatsApp Message
        const labels = lang === 'fr' ? {
            intro: "Bonjour Cars Dakar, nouvelle demande via le site :",
            name: "Nom",
            phone: "Tél",
            email: "Email",
            subject: "Sujet",
            msg: "Message"
        } : {
            intro: "Hello Cars Dakar, new website inquiry:",
            name: "Name",
            phone: "Phone",
            email: "Email",
            subject: "Subject",
            msg: "Message"
        };

        const waText = `*${labels.intro}*\n\n` +
            `*${labels.name}:* ${formData.name}\n` +
            `*${labels.phone}:* ${formData.phone}\n` +
            `*${labels.email}:* ${formData.email}\n` +
            `*${labels.subject}:* ${formData.subject}\n\n` +
            `*${labels.msg}:* \n${formData.message}`;

        window.open(getWhatsAppLink(waText), '_blank');
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT: INFO & FORM */}
                    <div className="flex flex-col h-full">

                        {/* SECTION A: HERO / INTRO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{t.hero.eyebrow}</span>
                            <h1 className="text-4xl md:text-6xl text-white font-light tracking-tight mb-6 relative inline-block">
                                {t.hero.title}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute -bottom-2 left-0 h-[1px] bg-amber-500 opacity-60"
                                />
                            </h1>
                            <p className="text-neutral-400 text-lg font-light leading-relaxed mt-4">
                                {t.hero.subline}
                            </p>
                        </motion.div>

                        {/* SECTION C: CONTACT INFO & REASSURANCE */}
                        <div className="mb-12 space-y-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 border border-neutral-800 group-hover:border-amber-500/50 transition-colors"><Phone size={18} /></div>
                                    <div>
                                        <p className="text-neutral-500 text-xs uppercase mb-1 tracking-widest">Telephone</p>
                                        <a href={getPhoneLink()} className="text-white text-lg hover:text-amber-500 transition-colors">{CONTACT_CONFIG.PHONE.DISPLAY}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 border border-neutral-800 group-hover:border-amber-500/50 transition-colors"><Mail size={18} /></div>
                                    <div>
                                        <p className="text-neutral-500 text-xs uppercase mb-1 tracking-widest">Email</p>
                                        <a href={getEmailLink()} className="text-white text-lg hover:text-amber-500 transition-colors">{CONTACT_CONFIG.EMAIL}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 border border-neutral-800"><MapPin size={18} /></div>
                                    <div>
                                        <p className="text-neutral-500 text-xs uppercase mb-1 tracking-widest">Location</p>
                                        <p className="text-white text-lg">Corniche Ouest, Dakar</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reassurance Block */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pl-6 border-l border-amber-500/20 py-2"
                            >
                                <p className="text-neutral-400 text-sm font-light leading-relaxed italic">
                                    {t.reassurance}
                                </p>
                            </motion.div>
                        </div>

                        {/* SECTION D: FORM */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full bg-neutral-900 border p-4 text-white outline-none transition-colors rounded-sm text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500/50'}`}
                                        placeholder={t.form.name}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full bg-neutral-900 border p-4 text-white outline-none transition-colors rounded-sm text-sm ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500/50'}`}
                                        placeholder={t.form.phone}
                                    />
                                </div>
                            </div>

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full bg-neutral-900 border p-4 text-white outline-none transition-colors rounded-sm text-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500/50'}`}
                                placeholder={t.form.email}
                            />

                            <div className="relative">
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full bg-neutral-900 border p-4 text-neutral-300 outline-none transition-colors rounded-sm text-sm appearance-none cursor-pointer ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500/50'}`}
                                >
                                    <option value="" disabled>{t.form.subject}</option>
                                    {t.form.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                    <ChevronRight className="rotate-90" size={16} />
                                </div>
                            </div>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full bg-neutral-900 border p-4 text-white outline-none transition-colors rounded-sm text-sm min-h-[150px] resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500/50'}`}
                                placeholder={t.form.message}
                            />

                            <div className="flex flex-col gap-4 pt-4">
                                <Button className="w-full justify-center" onClick={handleSubmit}>{t.form.btn_primary}</Button>
                                <button
                                    type="button"
                                    onClick={() => window.open(getWhatsAppLink())}
                                    className="text-neutral-400 hover:text-white text-xs uppercase tracking-widest text-center transition-colors pb-1 border-b border-transparent hover:border-amber-500 inline-block mx-auto"
                                >
                                    {t.form.btn_secondary}
                                </button>
                            </div>
                        </form>

                    </div>

                    {/* RIGHT: ATMOSPHERIC VISUAL ANCHOR */}
                    <div className="lg:h-full lg:min-h-[800px] relative hidden lg:block rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20 z-10" />
                        <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay z-10" />
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src="https://i0.wp.com/rrcustomslondon.co.uk/wp-content/uploads/2025/04/Ambient.jpeg"
                            alt="Luxury Car Interior Night Ambient"
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>

                </div>

                {/* SECTION E: CLOSING SIGNATURE */}
                <div className="mt-32 text-center border-t border-neutral-900 pt-12">
                    <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-light">
                        {t.signature}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ContactScreen;
