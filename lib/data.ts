export const SALES_VEHICLES = [
    {
        slug: 'range-rover-autobiography-lwb-2024',
        brand: "Range Rover",
        model: "Autobiography LWB",
        year: 2024,
        price: 115000000,
        mileage: "0 km",
        fuel: "Essence",
        transmission: "Auto",
        power: "530 ch",
        color: "Santorini Black",
        condition: "Neuf",
        type: "SUV",
        images: ["https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=1000&auto=format&fit=crop"],
        options: ["Executive Class Rear Seats", "Meridian Signature Sound", "24-way heated and cooled massage seats"]
    },
    {
        slug: 'mercedes-s-class-580-2023',
        brand: "Mercedes-Benz",
        model: "S-Class 580",
        year: 2023,
        price: 95000000,
        mileage: "12,000 km",
        fuel: "Essence",
        transmission: "Auto",
        power: "503 ch",
        color: "Obsidian Black",
        condition: "Occasion Certifiée",
        type: "Berline",
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop"],
        options: ["MBUX Hyperscreen", "Burmester 4D", "Rear Axle Steering"]
    },
    {
        slug: 'porsche-cayenne-coupe-2023',
        brand: "Porsche",
        model: "Cayenne Coupé",
        year: 2023,
        price: 88000000,
        mileage: "5,400 km",
        fuel: "Hybrid",
        transmission: "Auto",
        power: "462 ch",
        color: "Quarzite Grey",
        condition: "Occasion Très Récente",
        type: "SUV",
        images: ["https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop"],
        options: ["Sport Chrono Package", "22-inch RS Spyder wheels", "Adaptive Air Suspension"]
    }
];

export const RENTAL_VEHICLES = [
    {
        slug: 'jeep-compass-suv-premium',
        brand: "Jeep",
        model: "Compass",
        type: "SUV Premium",
        spec_line: "SUV premium • 1–4 passagers + bagages",
        image: "https://comeinnsenegal.com/images/03.jpg",
        features: ["CLIMATISÉ", "CONFORT PREMIUM", "AIBD / BUSINESS"],
        wa_message: "Bonjour Cars Dakar, je souhaite réserver la Jeep Compass (SUV Premium) avec chauffeur. Dates souhaitées : ____ au ____. Merci."
    },
    {
        slug: 'hyundai-sonata-berline-premium',
        brand: "Hyundai",
        model: "Sonata",
        type: "Berline Premium",
        spec_line: "Berline premium • silencieuse & élégante",
        image: "https://comeinnsenegal.com/images/04.jpg",
        features: ["SILENCIEUSE", "CONFORT ARRIÈRE", "CORPORATE"],
        wa_message: "Bonjour Cars Dakar, je souhaite réserver la Hyundai Sonata (Berline Premium) avec chauffeur. Dates souhaitées : ____ au ____. Merci."
    },
    {
        slug: 'ssangyong-korando-pickup',
        brand: "SsangYong",
        model: "Korando",
        type: "Pick-up Pro",
        spec_line: "Pick-up robuste • sur demande",
        image: null, // Triggers placeholder logic
        is_request: true,
        features: ["ROBUSTE", "HORS DAKAR", "LOGISTIQUE"],
        wa_message: "Bonjour Cars Dakar, je souhaite une disponibilité pour le Pick-up Korando (sur demande) avec chauffeur. Dates souhaitées : ____ au ____. Merci."
    }
];

export const RENTAL_RATES = {
    transfer: 25000,
    day_dakar: 35000,
    outside_dakar: 60000,
    extra_day: 50000
};

export const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
