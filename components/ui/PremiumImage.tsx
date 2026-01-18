'use client';

import React, { useState } from 'react';

interface PremiumImageProps {
    src: string | null;
    alt: string;
    isRequest?: boolean;
}

const PremiumImage = ({ src, alt, isRequest }: PremiumImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
            {/* Skeleton / Loading State */}
            {isLoading && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse z-10" />
            )}

            {/* Badge for "Sur Demande" */}
            {isRequest && (
                <div className="absolute top-3 right-3 z-20 px-3 py-1 bg-neutral-950/80 backdrop-blur-md border border-amber-500/50 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                    Sur demande
                </div>
            )}

            {/* Image or Placeholder */}
            {error || !src ? (
                <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                    <span className="text-neutral-700 font-bold tracking-widest uppercase text-xs">Cars Dakar Exclusive</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => { setError(true); setIsLoading(false); }}
                />
            )}
        </div>
    );
};

export default PremiumImage;
