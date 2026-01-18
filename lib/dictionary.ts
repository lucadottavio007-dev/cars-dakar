import {
    Plane, Clock, Map as MapIcon, Briefcase,
    Search, FileCheck, Eye, Gauge, Check, Key,
    UserCheck, Star, Shield, Zap, Lock
} from 'lucide-react';

export const DICTIONARY = {
    fr: {
        meta: {
            // Keeping existing meta for reference, but new SEO block will be used by pages
            home_title: "Location Voiture Luxe Dakar & Vente Prestige | CARSDAKAR",
            home_desc: "Leader de la location de voiture avec chauffeur et vente de véhicules de luxe à Dakar. Service VIP, transfert AIBD, et flotte premium.",
        },
        nav: { home: "ACCUEIL", sales: "VENTE", rental: "LOCATION", about: "À PROPOS", contact: "CONTACT" },
        common: {
            price: "Prix",
            contact_us: "Nous Contacter",
            learn_more: "En savoir plus",
            back: "Retour",
            request: "Demander",
            per_day: "/ jour"
        },
        home: {
            seo: {
                title: "Cars Dakar | Location avec chauffeur & Vente de voitures de luxe",
                description: "Location premium avec chauffeur à Dakar (AIBD, VIP, corporate) et vente de véhicules de prestige. Service discret, ponctuel, haut de gamme."
            },
            hero_title: "L'Excellence Automobile à Dakar",
            hero_sub: "Vente de voitures de prestige & location avec chauffeur dédié.",
            cta_sales: "VENTE DE VÉHICULES",
            cta_rental: "LOCATION AVEC CHAUFFEUR"
        },
        maison: {
            eyebrow: "CARSDAKAR — Luxury Motors",
            title: "Le luxe automobile, en version confidentielle.",
            p1: "Une sélection exclusive de véhicules d'exception, proposée à la vente pour les passionnés exigeants.",
            p2: "Des expériences avec chauffeur conçues pour les dirigeants, les invités VIP et le tourisme haut de gamme.",
            p3: "Discrétion, ponctualité, confort et excellence à Dakar et au-delà.",
            signature: "Discrétion. Ponctualité. Excellence.",
            metrics: ["Parc sélectionné & contrôlé", "Chauffeurs professionnels", "Dakar • AIBD • Longue distance", "Service corporate & VIP"],
            cards: [
                { title: "Véhicules impeccables", desc: "Inspection rigoureuse & confort absolu.", icon: Key },
                { title: "Chauffeurs & protocole", desc: "Tenue irréprochable, conduite fluide.", icon: UserCheck },
                { title: "Expérience premium", desc: "Ponctualité, assistance, sérénité.", icon: Star }
            ]
        },
        concierge: {
            eyebrow: "Services sur-mesure",
            title: "Conciergerie & Chauffeur Privé",
            intro: "Des services premium pensés pour les dirigeants, les invités VIP et les séjours haut de gamme.",
            cards: [
                {
                    title: "Transfert AIBD VIP",
                    desc: "Accueil, prise en charge fluide, confort immédiat dès l’atterrissage.",
                    detail: "25 000 FCFA",
                    action: "Demander",
                    icon: Plane
                },
                {
                    title: "Mise à disposition — Dakar",
                    desc: "Un chauffeur dédié, une voiture impeccable, une journée sans contraintes.",
                    detail: "35 000 FCFA",
                    action: "Demander",
                    icon: Clock
                },
                {
                    title: "Longue distance / Hors Dakar",
                    desc: "Voyagez sereinement, avec un service constant, même sur longues distances.",
                    detail: "60 000 FCFA",
                    action: "Demander",
                    icon: MapIcon
                },
                {
                    title: "Corporate & Événements",
                    desc: "Protocole, discrétion, fiabilité — pour entreprises, mariages et événements.",
                    detail: "Sur demande",
                    action: "Demander",
                    icon: Briefcase
                }
            ]
        },
        sections: {
            featured_sales: "Vente de véhicules de luxe",
            featured_rental: "Location avec chauffeur",
            why_us: "L'Expérience Premium",
            why_us_eyebrow: "Expertise Irréprochable"
        },
        sales: {
            seo: {
                title: "Vente | Voitures de luxe à Dakar – Sélection Cars Dakar",
                description: "Découvrez notre sélection de véhicules de prestige disponibles à Dakar : SUV, berlines et modèles exclusifs. Contrôle rigoureux et transaction sécurisée."
            },
            detail_seo: {
                title_pattern: "{Brand} {Model} {Year} | Vente – Cars Dakar",
                description_pattern: "{Brand} {Model} {Year} à Dakar. {Fuel}, {Mileage}. Contactez Cars Dakar sur WhatsApp pour disponibilité, prix et visite.",
                fallback_title: "Véhicule de Luxe | Cars Dakar",
                fallback_desc: "Découvrez ce véhicule d'exception chez Cars Dakar."
            },
            hero: {
                eyebrow: "VENTE",
                title: "Une sélection exclusive.",
                subline: "Chaque véhicule présenté est disponible immédiatement, rigoureusement contrôlé, et prêt à prendre la route."
            },
            intro: {
                title: "La collection Cars Dakar",
                desc: "Une flotte en constante évolution, curée selon nos standards d'excellence. Des modèles rares aux classiques intemporels, validés par nos experts."
            },
            grid: {
                filter_all: "Tout voir",
                cta_view: "Voir détails"
            },
            standard: {
                title: "Le standard Cars Dakar",
                p1: "Cars Dakar n'est pas une simple plateforme de mise en relation. Nous agissons en tant que tiers de confiance, garantissant la transparence et la sécurité de chaque transaction.",
                p2: "Que vous achetiez un véhicule de notre stock ou que vous nous confiez la vente du vôtre, nous appliquons le même niveau d'exigence : historique limpide, état mécanique irréprochable et conformité administrative."
            },
            process: {
                title: "Sélection & Validation",
                steps: [
                    { title: "Identification", desc: "Sourcing ciblé ou réception de mandat.", icon: Search },
                    { title: "Analyse", desc: "Cohérence du marché et historique.", icon: FileCheck },
                    { title: "Inspection", desc: "Contrôle visuel et mécanique strict.", icon: Eye },
                    { title: "Essai", desc: "Test routier complet.", icon: Gauge },
                    { title: "Validation", desc: "Certification Cars Dakar.", icon: Check },
                    { title: "Livraison", desc: "Remise des clés et documents.", icon: Key }
                ]
            },
            sell: {
                title: "Vendre via Cars Dakar",
                desc: "Confiez-nous la vente de votre véhicule. Nous gérons la qualification des acheteurs, les visites et la sécurisation financière, en toute discrétion.",
                cta: "Proposer un véhicule à la vente"
            },
            source: {
                title: "Recherche Personnalisée",
                desc: "Vous ne trouvez pas le modèle exact que vous cherchez ? Notre service de conciergerie automobile source pour vous le véhicule idéal, à Dakar ou à l'international.",
                cta: "Lancer une recherche sur mesure"
            },
            final_cta: {
                text: "L'excellence automobile, sans compromis.",
                btn_view: "Voir les véhicules disponibles",
                btn_contact: "Contacter sur WhatsApp"
            },
            contact_btn: "Contacter pour ce véhicule"
        },
        rental: {
            seo: {
                title: "Location avec chauffeur | Service premium à Dakar (AIBD & VIP)",
                description: "Chauffeur privé à Dakar : transferts AIBD, journées business, événements et longues distances. Véhicules premium, discrétion et confort."
            },
            hero: {
                eyebrow: "SERVICE CHAUFFEUR",
                title: "Votre chauffeur privé à Dakar",
                subline: "Un service de voiture avec chauffeur premium, alliant élégance, sécurité et discrétion absolue.",
                chips: ["Chauffeurs professionnels", "Véhicules premium", "Discrétion", "24h/24"]
            },
            fleet: {
                title: "Notre flotte",
                subline: "Une sélection de véhicules premium avec chauffeur."
            },
            experience: {
                title: "Une expérience de transport premium",
                p1: "Plus qu'un simple déplacement, nous offrons une bulle de sérénité au cœur de Dakar.",
                p2: "Nos chauffeurs maîtrisent parfaitement la ville, les protocoles VIP et les impératifs de ponctualité.",
                p3: "Disponible pour vos transferts AIBD, vos rendez-vous d'affaires ou vos voyages longue distance."
            },
            comfort: {
                title: "Confort, Sécurité & Excellence",
                cards: [
                    { title: "Chauffeurs professionnels", desc: "Formés, élégants et discrets.", icon: UserCheck },
                    { title: "Véhicules premium", desc: "État neuf, propreté irréprochable.", icon: Star },
                    { title: "Discrétion & sérénité", desc: "Confidentialité totale garantie.", icon: Shield },
                    { title: "Adaptabilité", desc: "Sur mesure pour tous vos besoins.", icon: Clock }
                ],
                features_title: "Standards de nos véhicules",
                features: ["Véhicules neufs ou récents", "Climatisation complète & intérieur premium", "Grands coffres pour bagages", "Conduite souple et silencieuse"]
            },
            rates_title: "Grille Tarifaire (Tout compris)",
            rates_intro: "Tarifs clairs, sans surprise.",
            book_btn: "RÉSERVER MAINTENANT",
            col_service: "Service",
            col_rate: "Tarif (FCFA)",
            service_transfer: "Transfert AIBD ↔ Dakar",
            service_day: "Mise à disposition (Dakar, 10h)",
            service_outside: "Hors Dakar / Régions",
            service_extra: "Jour supplémentaire",
            use_cases: {
                title: "Idéal pour",
                items: ["Transfert AIBD ↔ Dakar", "Journées avec chauffeur", "Déplacements professionnels", "Accueil de clients & partenaires", "Événements privés", "Déplacements hors Dakar"]
            },
            final_cta: {
                text: "Voyagez avec l'esprit libre. Nous nous occupons du reste.",
                btn_book: "RÉSERVER UN VÉHICULE",
                btn_wa: "Contacter sur WhatsApp"
            }
        },
        about: {
            seo: {
                title: "À propos | Cars Dakar – Mobilité de prestige, discrétion & excellence",
                description: "Cars Dakar incarne une mobilité haut de gamme au Sénégal : vente de véhicules sélectionnés et service chauffeur VIP. Standards élevés, sécurité, ponctualité."
            },
            hero: {
                eyebrow: "À PROPOS",
                title: "Cars Dakar",
                subline: "L'art du transport de prestige à Dakar.",
                p1: "Plus qu'un service de transport, Cars Dakar incarne une vision exigeante de la mobilité au Sénégal. Nous servons une clientèle d'élite composée de dirigeants, de diplomates et de passionnés d'automobile qui ne transigent pas sur la qualité.",
                p2: "De la vente de véhicules rigoureusement sélectionnés à la mise à disposition de chauffeurs formés au protocole, chaque interaction est pensée pour offrir sérénité, sécurité et confort absolu.",
                p3: "Votre temps est précieux. Votre sécurité est non-négociable. Nous sommes là pour garantir les deux.",
            },
            values: {
                title: "Nos Valeurs",
                items: [
                    { title: "Discrétion", desc: "Une confidentialité absolue pour vos déplacements privés et professionnels. Nos équipes respectent votre espace et votre vie privée." },
                    { title: "Ponctualité", desc: "Le respect de votre agenda est notre priorité. Nos chauffeurs anticipent les trajets pour garantir une précision à la minute." },
                    { title: "Excellence", desc: "Des véhicules impeccables, une conduite souple, et un sens du service qui dépasse les attentes standards." }
                ]
            },
            standards: {
                title: "Nos Standards",
                items: [
                    { label: "Véhicules sélectionnés & contrôlés", icon: Check },
                    { label: "Entretien strict & suivi régulier", icon: Zap },
                    { label: "Confort premium & propreté irréprochable", icon: Star },
                    { label: "Chauffeurs formés, discrets, expérimentés", icon: UserCheck },
                    { label: "Conduite souple & sécurisée", icon: Shield },
                    { label: "Confidentialité & protocole VIP", icon: Lock },
                ]
            },
            services: {
                title: "Chauffeur Privé & Conciergerie",
                desc: "Une expertise logistique pour tous vos besoins de mobilité, du transfert aéroport aux missions de longue durée.",
                tiles: ["Transfert AIBD", "Mise à disposition Dakar", "Longue distance", "Corporate & Événements"]
            },
            cta: {
                text: "Un service discret. Une présence impeccable.",
                btn_wa: "Contacter sur WhatsApp",
                btn_fleet: "Découvrir la flotte"
            }
        },
        contact: {
            title: "Contactez-nous",
            form_name: "Votre Nom",
            form_msg: "Votre Message",
            send: "Envoyer",
            whatsapp: "WhatsApp Direct",
            seo: {
                title: "Contact | Cars Dakar – Vente & Location premium à Dakar",
                description: "Contactez Cars Dakar pour une demande de vente, location avec chauffeur ou recherche sur mesure. Réponse rapide, discrète et personnalisée."
            },
            hero: {
                eyebrow: "CONTACT",
                title: "Contactez-nous",
                subline: "Un échange discret, clair et personnalisé — selon vos besoins."
            },
            reassurance: "Chaque demande est traitée avec attention et confidentialité. Qu’il s’agisse d’une vente, d’une location avec chauffeur ou d’une recherche spécifique, notre équipe vous répond avec précision et discrétion.",
            form: {
                name: "Nom & Prénom",
                phone: "Téléphone",
                email: "Adresse email",
                subject: "Objet de la demande",
                message: "Décrivez votre besoin (vente, location avec chauffeur, recherche spécifique…)",
                btn_primary: "ENVOYER",
                btn_secondary: "WhatsApp — réponse rapide",
                options: ["Vente", "Location avec chauffeur", "Autre"]
            },
            signature: "Cars Dakar — disponibilité, clarté et exigence."
        }
    },
    en: {
        meta: {
            home_title: "Luxury Car Rental Dakar & Prestige Sales | CARSDAKAR",
            home_desc: "Leading luxury car rental with chauffeur and prestige vehicle sales in Dakar. VIP service, AIBD transfer, and premium fleet.",
        },
        nav: { home: "HOME", sales: "CAR DEALER", rental: "CAR RENTAL", about: "ABOUT", contact: "CONTACT" },
        common: {
            price: "Price",
            contact_us: "Contact Us",
            learn_more: "Learn More",
            back: "Back",
            request: "Request",
            per_day: "/ day"
        },
        home: {
            seo: {
                title: "Cars Dakar | Chauffeur Car Rental & Luxury Car Sales in Dakar",
                description: "Premium chauffeur-driven car rental in Dakar (AIBD, VIP, corporate) and luxury car sales. Discreet, punctual, high-end service."
            },
            hero_title: "Automotive Excellence in Dakar",
            hero_sub: "Prestige car sales & dedicated chauffeur services.",
            cta_sales: "VEHICLE SALES",
            cta_rental: "CHAUFFEUR SERVICES"
        },
        maison: {
            eyebrow: "CARSDAKAR — Luxury Motors",
            title: "Luxury, delivered with discretion.",
            p1: "A curated selection of exceptional vehicles for sale, for the most demanding enthusiasts.",
            p2: "Private chauffeur experiences designed for executives, VIP guests, and premium tourism.",
            p3: "Discretion, punctuality, comfort, and excellence in Dakar and beyond.",
            signature: "Discretion. Punctuality. Excellence.",
            metrics: ["Selected & Controlled Fleet", "Professional Chauffeurs", "Dakar • AIBD • Long Distance", "Corporate & VIP Service"],
            cards: [
                { title: "Impeccable Vehicles", desc: "Rigorous inspection & absolute comfort.", icon: Key },
                { title: "Chauffeurs & Protocol", desc: "Impeccable attire, smooth driving.", icon: UserCheck },
                { title: "Premium Experience", desc: "Punctuality, assistance, peace of mind.", icon: Star }
            ]
        },
        concierge: {
            eyebrow: "Tailored services",
            title: "Concierge & Private Chauffeur",
            intro: "Premium services built for executives, VIP guests, and high-end travel.",
            cards: [
                {
                    title: "AIBD VIP Transfer",
                    desc: "Seamless pickup, instant comfort from the moment you land.",
                    detail: "25,000 FCFA",
                    action: "Request",
                    icon: Plane
                },
                {
                    title: "Day Chauffeur — Dakar",
                    desc: "A dedicated driver and immaculate vehicle, all day long.",
                    detail: "35,000 FCFA",
                    action: "Request",
                    icon: Clock
                },
                {
                    title: "Out of Dakar / Long Distance",
                    desc: "Travel safely with consistent premium service over long distances.",
                    detail: "60,000 FCFA",
                    action: "Request",
                    icon: MapIcon
                },
                {
                    title: "Corporate & Events",
                    desc: "Protocol, discretion, reliability — for companies and special events.",
                    detail: "On request",
                    action: "Request",
                    icon: Briefcase
                }
            ]
        },
        sections: {
            featured_sales: "Luxury Car Sales",
            featured_rental: "Chauffeur Services",
            why_us: "The Premium Experience",
            why_us_eyebrow: "Impeccable Expertise"
        },
        sales: {
            seo: {
                title: "Car Dealer | Luxury Cars for Sale in Dakar – Cars Dakar Selection",
                description: "Explore our curated selection of luxury vehicles available in Dakar: SUVs, sedans, exclusive models. Strict inspection and secure transactions."
            },
            detail_seo: {
                title_pattern: "{Brand} {Model} {Year} | For Sale – Cars Dakar",
                description_pattern: "{Brand} {Model} {Year} in Dakar. {Fuel}, {Mileage}. Contact Cars Dakar on WhatsApp for availability, pricing and viewing.",
                fallback_title: "Luxury Vehicle | Cars Dakar",
                fallback_desc: "Discover this exceptional vehicle at Cars Dakar."
            },
            hero: {
                eyebrow: "CAR DEALER",
                title: "An exclusive selection.",
                subline: "Every vehicle presented is available immediately, strictly controlled, and ready for the road."
            },
            intro: {
                title: "The Cars Dakar Collection",
                desc: "A constantly evolving fleet, curated to our standards of excellence. From rare models to timeless classics, validated by our experts."
            },
            grid: {
                filter_all: "View All",
                cta_view: "View Details"
            },
            standard: {
                title: "The Cars Dakar Standard",
                p1: "Cars Dakar is not a simple listing platform. We act as a trusted third party, guaranteeing the transparency and security of every transaction.",
                p2: "Whether you are buying a vehicle from our stock or entrusting us with the sale of yours, we apply the same level of requirement: clear history, impeccable mechanical condition, and administrative compliance."
            },
            process: {
                title: "Selection & Validation",
                steps: [
                    { title: "Identification", desc: "Targeted sourcing or mandate receipt.", icon: Search },
                    { title: "Analysis", desc: "Market coherence and history.", icon: FileCheck },
                    { title: "Inspection", desc: "Strict visual and mechanical check.", icon: Eye },
                    { title: "Test Drive", desc: "Complete road test.", icon: Gauge },
                    { title: "Validation", desc: "Cars Dakar Certification.", icon: Check },
                    { title: "Handover", desc: "Keys and documents delivery.", icon: Key }
                ]
            },
            sell: {
                title: "Sell with Cars Dakar",
                desc: "Entrust us with the sale of your vehicle. We handle buyer qualification, viewings, and financial security, with complete discretion.",
                cta: "Propose a vehicle for sale"
            },
            source: {
                title: "Custom Sourcing",
                desc: "Can't find the exact model you're looking for? Our automotive concierge service sources the ideal vehicle for you, in Dakar or internationally.",
                cta: "Start a custom search"
            },
            final_cta: {
                text: "Automotive excellence, without compromise.",
                btn_view: "View available vehicles",
                btn_contact: "Contact on WhatsApp"
            },
            contact_btn: "Contact for this vehicle"
        },
        rental: {
            seo: {
                title: "Chauffeur Service | Premium Car Rental in Dakar (AIBD & VIP)",
                description: "Private chauffeur in Dakar: AIBD transfers, business days, events and long distance. Premium vehicles, discretion, comfort and safety."
            },
            hero: {
                eyebrow: "CHAUFFEUR SERVICE",
                title: "Your private chauffeur in Dakar",
                subline: "Premium chauffeur-driven car service, elegance, safety, discretion.",
                chips: ["Professional Chauffeurs", "Premium Vehicles", "Discretion", "24/7"]
            },
            fleet: {
                title: "Our Fleet",
                subline: "A curated selection of chauffeur-driven vehicles."
            },
            experience: {
                title: "A premium transportation experience",
                p1: "More than just a ride, we offer a bubble of serenity in the heart of Dakar.",
                p2: "Our chauffeurs perfectly master the city, VIP protocols, and punctuality imperatives.",
                p3: "Available for your AIBD transfers, business meetings, or long-distance travel."
            },
            comfort: {
                title: "Comfort, Safety & Excellence",
                cards: [
                    { title: "Professional Chauffeurs", desc: "Trained, elegant, and discreet.", icon: UserCheck },
                    { title: "Premium Vehicles", desc: "Like new condition, immaculate cleanliness.", icon: Star },
                    { title: "Discretion & Serenity", desc: "Total confidentiality guaranteed.", icon: Shield },
                    { title: "Adaptability", desc: "Tailored to all your needs.", icon: Clock }
                ],
                features_title: "Vehicle Standards",
                features: ["New or recent vehicles", "Full air conditioning & premium interior", "Large luggage capacity", "Smooth and quiet driving"]
            },
            rates_title: "Rate Card (All inclusive)",
            rates_intro: "Clear pricing, no surprises.",
            book_btn: "BOOK NOW",
            col_service: "Service",
            col_rate: "Rate (FCFA)",
            service_transfer: "Transfer AIBD ↔ Dakar",
            service_day: "Full Day Disposal (Dakar, 10h)",
            service_outside: "Outside Dakar / Regions",
            service_extra: "Extra Day",
            use_cases: {
                title: "Ideal for",
                items: ["AIBD ↔ Dakar Transfer", "Chauffeur Days", "Business Travel", "Client & Partner Welcome", "Private Events", "Travel Outside Dakar"]
            },
            final_cta: {
                text: "Travel with peace of mind. We take care of the rest.",
                btn_book: "BOOK OUR SERVICES",
                btn_wa: "Contact on WhatsApp"
            }
        },
        about: {
            seo: {
                title: "About | Cars Dakar – Prestige Mobility, Discretion & Excellence",
                description: "Cars Dakar delivers premium mobility in Senegal: curated vehicle sales and VIP chauffeur service. High standards, safety, punctuality and comfort."
            },
            hero: {
                eyebrow: "ABOUT",
                title: "Cars Dakar",
                subline: "The art of prestige transport in Dakar.",
                p1: "More than a transport service, Cars Dakar embodies a demanding vision of mobility in Senegal. We serve an elite clientele of executives, diplomats, and automotive enthusiasts who do not compromise on quality.",
                p2: "From rigorously selected vehicle sales to protocol-trained chauffeurs, every interaction is designed to offer serenity, security, and absolute comfort.",
                p3: "Your time is precious. Your security is non-negotiable. We are here to guarantee both.",
            },
            values: {
                title: "Our Values",
                items: [
                    { title: "Discrétion", desc: "Une confidentialité absolue pour vos déplacements privés et professionnels. Nos équipes respectent votre espace et votre vie privée." }, // Missing translation in source, keeping French
                    { title: "Ponctualité", desc: "Le respect de votre agenda est notre priorité. Nos chauffeurs anticipent les trajets pour garantir une précision à la minute." },
                    { title: "Excellence", desc: "Des véhicules impeccables, une conduite souple, et un sens du service qui dépasse les attentes standards." }
                ]
            },
            standards: {
                title: "Our Standards",
                items: [
                    { label: "Selected & Controlled Vehicles", icon: Check },
                    { label: "Strict Maintenance & Follow-up", icon: Zap },
                    { label: "Premium Comfort & Immaculate Cleanliness", icon: Star },
                    { label: "Trained, Discreet, Experienced Chauffeurs", icon: UserCheck },
                    { label: "Smooth & Secure Driving", icon: Shield },
                    { label: "Confidentiality & VIP Protocol", icon: Lock },
                ]
            },
            services: {
                title: "Private Chauffeur & Concierge",
                desc: "Logistical expertise for all your mobility needs, from airport transfers to long-term assignments.",
                tiles: ["AIBD Transfer", "Dakar Disposal", "Long Distance", "Corporate & Events"]
            },
            cta: {
                text: "A discreet service. An impeccable presence.",
                btn_wa: "Contact on WhatsApp",
                btn_fleet: "Discover the Fleet"
            }
        },
        contact: {
            title: "Contact Us",
            form_name: "Your Name",
            form_msg: "Your Message",
            send: "Send",
            whatsapp: "WhatsApp Direct",
            seo: {
                title: "Contact | Cars Dakar – Luxury Sales & Chauffeur Services in Dakar",
                description: "Contact Cars Dakar for luxury car sales, chauffeur service, or custom sourcing. Fast, discreet, and personalized reply."
            },
            hero: {
                eyebrow: "CONTACT",
                title: "Contactez-nous", // Source used French
                subline: "A discreet, clear and personalized conversation."
            },
            reassurance: "Every request is handled with care and confidentiality. Whether it concerns sales, chauffeur services or a specific request, our team responds with precision and discretion.",
            form: {
                name: "Name",
                phone: "Phone",
                email: "Email Address",
                subject: "Subject",
                message: "Describe your needs (sales, chauffeur rental, specific request...)",
                btn_primary: "SEND",
                btn_secondary: "WhatsApp — Quick Reply",
                options: ["Vente", "Location avec chauffeur", "Autre"]
            },
            signature: "Cars Dakar — disponibilité, clarté et exigence."
        }
    }
};

export type Locale = 'fr' | 'en';
export const getDictionary = (lang: Locale) => DICTIONARY[lang];
