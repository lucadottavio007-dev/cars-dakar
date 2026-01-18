'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'outline';
}

const MagneticButton = ({ children, onClick, className = "", variant = 'primary' }: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.2;
        const moveY = (e.clientY - centerY) * 0.2;
        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const base = "relative px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors duration-300 font-sans cursor-pointer";
    const styles = variant === 'primary'
        ? "bg-amber-500 text-black hover:bg-amber-400"
        : "border border-neutral-700 text-white hover:border-amber-500 hover:text-amber-500";

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`${base} ${styles} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;
