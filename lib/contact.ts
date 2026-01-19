export const CONTACT_CONFIG = {
    PHONE: {
        DISPLAY: "+221 76 817 75 71",
        E164: "221768177571",
    },
    EMAIL: "sevendigitsdkr@gmail.com",
} as const;

export const getWhatsAppLink = (text?: string) => {
    const base = `https://wa.me/${CONTACT_CONFIG.PHONE.E164}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

export const getPhoneLink = () => `tel:+${CONTACT_CONFIG.PHONE.E164}`;
export const getEmailLink = () => `mailto:${CONTACT_CONFIG.EMAIL}`;
