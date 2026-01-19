import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import {
  Menu, X, ChevronRight, Phone, Mail, MapPin,
  Disc, Shield, Filter, ArrowRight, Star, Check,
  Globe, Plane, Briefcase, Clock, Map as MapIcon,
  UserCheck, Key, Lock, Zap, Search, FileCheck, Eye,
  Gauge, Send, Volume2, VolumeX
} from 'lucide-react';

/* =============================================================================
   PACK C: MICRO-INTERACTIONS & EFFECTS
   ============================================================================= */

// 3) Cursor Aura (Luxury Halo)
const CursorAura = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 150); // Center the 300px circle
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-0 mix-blend-screen"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(0,0,0,0) 70%)',
      }}
    />
  );
};

// 4) Grain / Noise Overlay
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// 6) 3D Tilt Interaction Wrapper
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 2) Magnetic Button Wrapper
const MagneticButton = ({ children, onClick, className = "", variant = 'primary' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
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

  const base = "relative px-6 py-3 uppercase tracking-widest text-xs font-bold transition-colors duration-300 font-['Montserrat']";
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

// Premium Image Component with Fallback & Skeleton
const PremiumImage = ({ src, alt, isRequest }) => {
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

/* =============================================================================
   1. MOCK DATA LAYER
   ============================================================================= */

const SALES_VEHICLES = [
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

const RENTAL_VEHICLES = [
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

const RENTAL_RATES = {
  transfer: 25000,
  day_dakar: 35000,
  outside_dakar: 60000,
  extra_day: 50000
};

const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + " FCFA";

/* =============================================================================
   2. I18N DICTIONARY
   ============================================================================= */

const DICTIONARY = {
  fr: {
    meta: {
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
        { title: "Véhicules impeccables", desc: "Inspection rigoureuse & confort absolu." },
        { title: "Chauffeurs & protocole", desc: "Tenue irréprochable, conduite fluide." },
        { title: "Expérience premium", desc: "Ponctualité, assistance, sérénité." }
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
      why_us_eyebrow: "Expertise Irréprochable" // Nouveau texte FR
    },
    sales: {
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
      }
    },
    rental: {
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
      hero_title: "Automotive Excellence in Dakar",
      hero_sub: "Prestige car sales & dedicated chauffeur services.",
      cta_sales: "VEHICLE SALES",
      cta_rental: "CHAUFFEUR SERVICES"
    },
    sales: {
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
      }
    },
    rental: {
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
          { title: "Discretion", desc: "Absolute confidentiality for your private and professional journeys. Our teams respect your space and privacy." },
          { title: "Punctuality", desc: "Respecting your schedule is our priority. Our chauffeurs anticipate routes to guarantee precision to the minute." },
          { title: "Excellence", desc: "Immaculate vehicles, smooth driving, and a sense of service that exceeds standard expectations." }
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
      hero: {
        eyebrow: "CONTACT",
        title: "Contactez-nous",
        subline: "A discreet, clear and personalized conversation."
      },
      reassurance: "Every request is handled with care and confidentiality. Whether it concerns sales, chauffeur services or a specific request, our team responds with precision and discretion.",
      form: {
        name: "Name",
        phone: "Phone",
        email: "Email Address",
        subject: "Subject",
        message: "Describe your needs (sales, chauffeur rental, specific request...)",
        btn_primary: "ENVOYER",
        btn_secondary: "WhatsApp — Quick Reply",
        options: ["Vente", "Location avec chauffeur", "Autre"]
      },
      signature: "Cars Dakar — disponibilité, clarté et exigence."
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
        { title: "Impeccable Vehicles", desc: "Rigorous inspection & absolute comfort." },
        { title: "Chauffeurs & Protocol", desc: "Impeccable attire, smooth driving." },
        { title: "Premium Experience", desc: "Punctuality, assistance, peace of mind." }
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
      why_us_eyebrow: "Impeccable Expertise" // Nouveau texte EN
    }
  }
};

const PILLARS = [
  { icon: Shield, fr: "Véhicules Impeccables", en: "Impeccable Vehicles", desc: "Inspection rigoureuse 150 points." },
  { icon: Star, fr: "Service VIP", en: "VIP Service", desc: "Une expérience client sur-mesure." },
  { icon: Clock, fr: "Ponctualité Absolue", en: "Absolute Punctuality", desc: "Votre temps est précieux." },
  { icon: Check, fr: "Transparence", en: "Transparency", desc: "Prix clairs, sans frais cachés." }
];

function Gauge(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
  )
}

/* =============================================================================
   3. SHARED COMPONENTS
   ============================================================================= */

// Mock de Link pour le SPA
const Link = ({ href, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    const event = new CustomEvent('navigate', { detail: href });
    window.dispatchEvent(event);
  };
  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// Menu Hover Animation Component
const NavLink = ({ href, label, isActive, onClick }) => {
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

// PACK C: Updated Magnetic Button
const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
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

const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="mb-16">
    <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] block mb-4">{eyebrow}</span>
    <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">{title}</h1>
    {subtitle && <p className="text-neutral-400 text-lg font-light max-w-2xl">{subtitle}</p>}
  </div>
);

// PACK C: Updated Header with Scroll Progress
const Header = ({ lang, setLang, currentRoute }) => {
  const t = DICTIONARY[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll(); // PACK C: Scroll Progress

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinks = (l) => [
    { label: t.home, path: `/${l}` },
    { label: t.sales, path: `/${l}/vente` },
    { label: t.rental, path: `/${l}/location-chauffeur` },
    { label: t.about, path: `/${l}/a-propos` },
    { label: t.contact, path: `/${l}/contact` }
  ];

  const switchLang = () => lang === 'fr' ? 'en' : 'fr';

  // Helper to check active state for sub-routes
  const checkActive = (path) => {
    if (path === `/${lang}` && currentRoute === `/${lang}`) return true;
    if (path !== `/${lang}` && currentRoute.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || isOpen ? 'bg-neutral-950/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'} py-6`}>
      {/* PACK C: Progress Hairline */}
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
            href={`/${switchLang()}${currentRoute.substring(3)}`}
            onClick={() => setLang(switchLang())}
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
            <button onClick={() => { setLang(switchLang()); setIsOpen(false); }} className="text-amber-500 mt-4 text-sm font-bold">
              {lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* =============================================================================
   4. PAGES (Simulation de app/[lang]/...)
   ============================================================================= */

// --- Home Components ---

const MaisonSection = ({ lang }) => {
  const t = DICTIONARY[lang].maison;

  return (
    <section className="bg-gradient-to-b from-neutral-950 to-neutral-900 py-12 md:py-20 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Brand Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">{t.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              {t.title}
            </h2>
            <div className="text-neutral-400 text-lg font-light space-y-4 leading-relaxed max-w-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>
            <div className="mt-4 pt-8 border-t border-neutral-800">
              <span className="text-white font-medium tracking-wider text-sm uppercase">{t.signature}</span>
            </div>
          </motion.div>

          {/* Right: Trust Metrics & Standards */}
          <div className="space-y-12">

            {/* Chips */}
            <div className="flex flex-wrap gap-3">
              {t.metrics.map((metric, idx) => (
                <span key={idx} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-400 text-xs uppercase tracking-wider hover:border-amber-500/30 transition-colors">
                  {metric}
                </span>
              ))}
            </div>

            {/* Standards Cards */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Key, ...t.cards[0] },
                { icon: UserCheck, ...t.cards[1] },
                { icon: Star, ...t.cards[2] }
              ].map((card, idx) => (
                // PACK C: Tilt Interaction on Service Cards
                <TiltCard key={idx} className="h-full">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="flex items-start gap-5 p-6 border border-neutral-800/50 bg-neutral-900/30 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
                  >
                    <div className="p-3 bg-neutral-950 rounded-full border border-neutral-800 text-amber-500">
                      <card.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium uppercase tracking-wide text-sm mb-1">{card.title}</h3>
                      <p className="text-neutral-500 text-sm font-light">{card.desc}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ConciergeSection = ({ lang, onSelect }) => {
  const t = DICTIONARY[lang].concierge;
  const tSec = DICTIONARY[lang].sections;
  const tCommon = DICTIONARY[lang].common;

  return (
    <section className="bg-neutral-900 py-12 md:py-20 px-6 border-t border-neutral-800 relative z-10">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] block mb-4">{t.eyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-6">{t.title}</h2>
          <p className="text-neutral-400 text-lg font-light">{t.intro}</p>
        </div>

        {/* --- MOVED RENTAL SECTION --- */}
        <div className="mb-24 border-b border-neutral-800 pb-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl text-white font-light">
              {tSec.featured_rental}
            </h2>
            <Link href={`/${lang}/location-chauffeur`} className="text-neutral-400 hover:text-amber-500 flex items-center gap-2 text-sm uppercase tracking-widest transition-colors">
              <div className="px-6 py-3 border border-neutral-700 text-white hover:border-amber-500 hover:text-amber-500 hover:bg-neutral-900 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                {tCommon.learn_more} <ChevronRight size={14} />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RENTAL_VEHICLES.slice(0, 3).map(car => (
              <VehicleCard key={car.slug} item={car} type="rental" lang={lang} onSelect={onSelect} />
            ))}
          </div>
        </div>
        {/* --- END MOVED RENTAL SECTION --- */}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.cards.map((card, idx) => (
            // PACK C: Tilt Interaction on Concierge Cards
            <TiltCard key={idx} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group p-8 md:p-10 border border-neutral-800 bg-neutral-950 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between min-h-[260px] h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl text-white font-medium mb-3">{card.title}</h3>
                    <p className="text-neutral-500 font-light text-sm leading-relaxed max-w-xs">{card.desc}</p>
                  </div>
                  <card.icon className="text-neutral-700 group-hover:text-amber-500 transition-colors" size={24} />
                </div>

                <div className="mt-auto pt-6 border-t border-neutral-900 flex justify-between items-end">
                  <span className="text-white text-sm font-medium tracking-wide">{card.detail}</span>
                  <button className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-white flex items-center gap-2 transition-colors">
                    {card.action} <ChevronRight size={12} className="text-amber-500" />
                  </button>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const VehicleCard = ({ item, type, lang, onSelect }) => {
  return (
    // PACK C: Tilt Interaction on Vehicle Cards
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="group relative bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
        onClick={() => onSelect(item, type)}
      >
        <div className="aspect-[4/3] overflow-hidden relative">
          {type === 'sales' ? (
            <img
              src={item.images[0]}
              alt={item.model}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <PremiumImage src={item.image} alt={item.model} isRequest={item.is_request} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        <div className="p-6 flex-1 flex flex-col justify-end">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">{item.brand}</p>
              <h3 className="text-xl font-medium text-white">{item.model}</h3>
            </div>
            {type === 'sales' && (
              <div className="text-right">
                <p className="text-white font-light text-sm">{formatPrice(item.price)}</p>
              </div>
            )}
          </div>

          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
            <div className="pt-4 border-t border-neutral-800 flex justify-between text-neutral-400 text-xs uppercase tracking-wide">
              {type === 'sales' ? (
                <>
                  <span>{item.year}</span>
                  <span>{item.fuel}</span>
                  <span>{item.mileage}</span>
                </>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {item.features?.map((f, i) => (
                    <span key={i} className="px-2 py-1 border border-neutral-700 rounded-sm text-[10px] uppercase text-neutral-300">
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

// --- Page d'Accueil ---
const PageHome = ({ lang }) => {
  const t = DICTIONARY[lang];
  const tSec = DICTIONARY[lang].sections;
  const { scrollY } = useScroll();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Toggle Mute Handler
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // PACK C: Hero Parallax
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

  // Custom navigation handler for the card click since VehicleCard uses a custom onClick prop in this simulated version
  const handleCardClick = (item, type) => {
    // Trigger navigation event
    const event = new CustomEvent('navigate', { detail: `/${lang}/${type === 'sales' ? 'vente' : 'location-chauffeur'}/${item.slug}` });
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* PACK C: Parallax on Hero Video */}
        <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            // Keeping the previous high-quality image as poster/fallback
            poster="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2600&auto=format&fit=crop"
            className="w-full h-full object-cover"
          >
            {/* NEW: Custom Video URL */}
            <source src="https://comeinnsenegal.com/videos/Cinematic_Luxury_Car_Night_Loop.mp4" type="video/mp4" />

            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950" />
        </motion.div>

        {/* Sound Toggle Button */}
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

      {/* SECTION 1: MAISON */}
      <MaisonSection lang={lang} />

      {/* SECTION 2: CONCIERGE & RENTAL (Moved Rental here) */}
      <ConciergeSection lang={lang} onSelect={handleCardClick} />

      {/* Featured Sales */}
      {/* ADJUSTED SPACING: Reduced from py-24 to py-12 md:py-20 */}
      <section className="py-12 md:py-20 bg-neutral-950 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl text-white font-light">
              {tSec.featured_sales}
            </h2>
            <Link href={`/${lang}/vente`}>
              <div className="px-6 py-3 border border-neutral-700 text-white hover:border-amber-500 hover:text-amber-500 hover:bg-neutral-900 uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                {t.common.learn_more} <ChevronRight size={14} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SALES_VEHICLES.slice(0, 3).map(car => (
              <VehicleCard key={car.slug} item={car} type="sales" lang={lang} onSelect={handleCardClick} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      {/* ADJUSTED SPACING: Reduced from py-24 to py-12 md:py-20 */}
      <section className="py-12 md:py-20 bg-neutral-900 border-y border-neutral-800 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 text-xs uppercase tracking-[0.2em]">{tSec.why_us_eyebrow}</span>
            <h2 className="text-3xl md:text-4xl text-white font-light mt-4">{tSec.why_us}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors duration-500">
                    <Icon className="text-white group-hover:text-black transition-colors" size={24} />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">{lang === 'fr' ? pillar.fr : pillar.en}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

    </>
  );
};

// --- Page Vente (Listing) ---
const PageSales = ({ lang }) => {
  const t = DICTIONARY[lang].sales;
  const tSec = DICTIONARY[lang].sections;

  // Custom navigation handler for the card click
  const handleCardClick = (item, type) => {
    const event = new CustomEvent('navigate', { detail: `/${lang}/${type === 'sales' ? 'vente' : 'location-chauffeur'}/${item.slug}` });
    window.dispatchEvent(event);
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

      {/* SECTION A: HERO / POSITIONING */}
      <div className="container mx-auto max-w-6xl mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            {t.hero.subline}
          </p>
        </motion.div>
      </div>

      {/* SECTION B: INTRO TO COLLECTION */}
      <div className="container mx-auto max-w-6xl mb-12 flex flex-col md:flex-row justify-between items-end border-b border-neutral-900 pb-8">
        <div>
          <h2 className="text-3xl text-white font-light mb-2">{t.intro.title}</h2>
          <p className="text-neutral-500 text-sm max-w-lg">{t.intro.desc}</p>
        </div>
        <div className="mt-6 md:mt-0">
          {/* Placeholder for filter/sort actions if needed later */}
          <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">{SALES_VEHICLES.length} VEHICLES</span>
        </div>
      </div>

      {/* SECTION C: VEHICLE GRID (CORE) */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SALES_VEHICLES.map((car, idx) => (
            <Link
              key={idx}
              href={`/${lang}/vente/${car.slug}`}
              className="block h-full"
            >
              <TiltCard className="group bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={car.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-amber-500 text-xs font-bold uppercase">{car.brand}</span>
                      <h3 className="text-white text-xl">{car.model}</h3>
                    </div>
                    <span className="text-neutral-400 text-sm">{car.year}</span>
                  </div>
                  <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                    <span className="text-white font-medium">{formatPrice(car.price)}</span>
                    <ArrowRight size={16} className="text-neutral-500 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION D: THE STANDARD */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-900 pt-16">
          <div>
            <h2 className="text-3xl text-white font-light mb-6">{t.standard.title}</h2>
            <div className="w-12 h-[2px] bg-amber-500 mb-8" />
          </div>
          <div className="text-neutral-400 font-light space-y-6 text-lg leading-relaxed">
            <p>{t.standard.p1}</p>
            <p>{t.standard.p2}</p>
          </div>
        </div>
      </div>

      {/* SECTION E: PROCESS */}
      <div className="bg-neutral-900/30 border-y border-neutral-900 py-24 mb-32">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl text-white font-light text-center mb-16">{t.process.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {t.process.steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4 group-hover:border-amber-500/50 transition-colors">
                    <Icon className="text-neutral-400 group-hover:text-amber-500 transition-colors" size={20} />
                  </div>
                  <h4 className="text-white text-sm font-medium mb-1">{step.title}</h4>
                  <p className="text-neutral-500 text-xs">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* SECTION F & G: SELL & SOURCE (SPLIT) */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Sell Block */}
          <TiltCard className="bg-neutral-900 border border-neutral-800 p-12 flex flex-col items-start justify-between h-full">
            <div className="mb-8">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Particuliers & Pros</span>
              <h3 className="text-3xl text-white font-light mb-4">{t.sell.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">{t.sell.desc}</p>
            </div>
            <Button variant="outline" onClick={() => window.open('https://wa.me/221768177571')}>
              {t.sell.cta}
            </Button>
          </TiltCard>

          {/* Source Block */}
          <TiltCard className="bg-neutral-900 border border-neutral-800 p-12 flex flex-col items-start justify-between h-full">
            <div className="mb-8">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 block">Conciergerie</span>
              <h3 className="text-3xl text-white font-light mb-4">{t.source.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">{t.source.desc}</p>
            </div>
            <Button variant="outline" onClick={() => window.open('https://wa.me/221768177571')}>
              {t.source.cta}
            </Button>
          </TiltCard>

        </div>
      </div>

      {/* SECTION H: FINAL CTA */}
      <div className="container mx-auto max-w-4xl text-center pb-20">
        <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.final_cta.text}</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Button onClick={() => {
            // Scroll to grid
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}>
            {t.final_cta.btn_view}
          </Button>
          <div className="hidden md:block w-px bg-neutral-800" />
          <Button variant="outline" onClick={() => window.open('https://wa.me/221768177571')}>
            {t.final_cta.btn_contact}
          </Button>
        </div>
      </div>

    </div>
  );
};

// --- Page Vente (Détail) ---
const PageSalesDetail = ({ lang, slug }) => {
  const t = DICTIONARY[lang];
  const car = SALES_VEHICLES.find(v => v.slug === slug);

  if (!car) return <div className="pt-40 text-center text-white">Véhicule introuvable</div>;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">
      <div className="container mx-auto">
        <Link href={`/${lang}/vente`} className="flex items-center gap-2 text-neutral-400 hover:text-white mb-8 text-xs uppercase tracking-widest inline-flex">
          <ChevronRight className="rotate-180" size={14} /> {t.common.back}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
              <img src={car.images[0]} className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">{car.brand}</span>
            <h1 className="text-4xl md:text-5xl text-white font-light mt-2 mb-6">{car.model}</h1>
            <p className="text-3xl text-white mb-8 pb-8 border-b border-neutral-800">{formatPrice(car.price)}</p>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-12">
              {[
                { label: "Year", val: car.year },
                { label: "Mileage", val: car.mileage },
                { label: "Fuel", val: car.fuel },
                { label: "Transmission", val: car.transmission },
                { label: "Power", val: car.power },
                { label: "Color", val: car.color },
              ].map((spec, i) => (
                <div key={i}>
                  <p className="text-neutral-500 text-xs uppercase mb-1">{spec.label}</p>
                  <p className="text-white">{spec.val}</p>
                </div>
              ))}
            </div>

            <Button onClick={() => window.open(`https://wa.me/221768177571?text=I am interested in ${car.brand} ${car.model}`)} className="w-full flex justify-center items-center gap-2">
              <Phone size={18} /> {t.sales.contact_btn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page Location (NEW) ---
const PageRental = ({ lang }) => {
  const t = DICTIONARY[lang].rental;
  const common = DICTIONARY[lang].common;

  // Custom navigation handler for the card click
  const handleCardClick = (item, type) => {
    // Trigger specific action if needed
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

      {/* SECTION A: HERO */}
      <div className="container mx-auto max-w-6xl mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {t.hero.subline}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {t.hero.chips.map((chip, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-300 uppercase tracking-wider"
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SECTION B: OUR FLEET (CORE) */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="mb-12 border-b border-neutral-900 pb-8">
          <h2 className="text-3xl text-white font-light mb-2">{t.fleet.title}</h2>
          <p className="text-neutral-500 text-sm max-w-lg">{t.fleet.subline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RENTAL_VEHICLES.map((car, idx) => (
            <TiltCard key={idx} className="bg-neutral-900 border border-neutral-800 h-full group flex flex-col justify-between">
              <div>
                <div className="aspect-video overflow-hidden relative">
                  <PremiumImage src={car.image} alt={car.model} isRequest={car.is_request} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
                <div className="p-6 pb-0">
                  <div className="mb-2">
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">{car.brand}</span>
                    <h4 className="text-white text-lg font-medium">{car.model}</h4>
                    <p className="text-neutral-400 text-xs mt-1 italic">{car.spec_line}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((f, i) => (
                      <span key={i} className="text-[10px] uppercase border border-neutral-700 text-neutral-400 px-2 py-1 rounded-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" className="w-full text-xs" onClick={() => window.open(`https://wa.me/221768177571?text=${encodeURIComponent(car.wa_message)}`)}>
                  {t.book_btn}
                </Button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* SECTION C: EXPERIENCE */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-neutral-900 pt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl text-white font-light mb-6">{t.experience.title}</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              className="h-[2px] bg-amber-500 mb-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-neutral-400 font-light space-y-6 text-lg leading-relaxed"
          >
            <p>{t.experience.p1}</p>
            <p>{t.experience.p2}</p>
            <p className="text-white">{t.experience.p3}</p>
          </motion.div>
        </div>
      </div>

      {/* SECTION D: COMFORT & EXCELLENCE */}
      <div className="bg-neutral-900/30 border-y border-neutral-900 py-24 mb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.comfort.cards.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="p-6 bg-neutral-950 border border-neutral-800"
                  >
                    <Icon className="text-amber-500 mb-4" size={24} />
                    <h4 className="text-white text-sm font-medium mb-2 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Vehicle Features List */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl text-white font-light mb-8">{t.comfort.features_title}</h3>
              <ul className="space-y-6">
                {t.comfort.features.map((feat, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-neutral-300 font-light"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    {feat}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION E: PRICING TABLE */}
      <div className="container mx-auto max-w-4xl mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-white font-light mb-2">{t.rates_title}</h2>
          <p className="text-neutral-500 text-sm">{t.rates_intro}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12">
          <div className="space-y-6">
            {[
              { label: t.service_transfer, price: RENTAL_RATES.transfer },
              { label: t.service_day, price: RENTAL_RATES.day_dakar },
              { label: t.service_outside, price: RENTAL_RATES.outside_dakar },
              { label: t.service_extra, price: RENTAL_RATES.extra_day },
            ].map((rate, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-center py-4 border-b border-neutral-800 last:border-0"
              >
                <span className="text-neutral-300">{rate.label}</span>
                <span className="text-white font-bold text-lg">{formatPrice(rate.price)}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION F: USE CASES */}
      <div className="container mx-auto max-w-4xl mb-32 text-center">
        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 block">{t.use_cases.title}</span>
        <div className="flex flex-wrap justify-center gap-4">
          {t.use_cases.items.map((useCase, idx) => (
            <span key={idx} className="px-6 py-3 border border-neutral-800 bg-neutral-900/50 text-neutral-300 text-sm font-light tracking-wide rounded-sm">
              {useCase}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION G: FINAL CTA */}
      <div className="container mx-auto max-w-4xl text-center pb-20">
        <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.final_cta.text}</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Button onClick={() => {
            // Updated link: Point to Contact page instead of WhatsApp
            const event = new CustomEvent('navigate', { detail: `/${lang}/contact` });
            window.dispatchEvent(event);
          }}>
            {t.final_cta.btn_book}
          </Button>
          <div className="hidden md:block w-px bg-neutral-800" />
          <Button variant="outline" onClick={() => window.open('https://wa.me/221765457270')}>
            {t.final_cta.btn_wa}
          </Button>
        </div>
      </div>

    </div>
  );
};

// --- Page À Propos ---
const PageAbout = ({ lang }) => {
  const t = DICTIONARY[lang].about;

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-neutral-950 relative z-10">

      {/* SECTION A: HERO EDITORIAL */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">{t.hero.eyebrow}</span>
            <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-6 relative inline-block">
              {t.hero.title}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-[2px] bg-amber-500"
              />
            </h1>
            <h3 className="text-xl text-white font-medium mb-8">{t.hero.subline}</h3>
            <div className="space-y-6 text-neutral-400 font-light leading-relaxed">
              <p>{t.hero.p1}</p>
              <p>{t.hero.p2}</p>
              <p className="text-white font-medium">{t.hero.p3}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop"
              alt="Luxury Car Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* SECTION B: VALUES */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.values.items.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(245, 158, 11, 0.5)" }}
              className="p-8 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-colors duration-300"
            >
              <h3 className="text-2xl text-white font-light mb-4">{value.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION C: STANDARDS */}
      <div className="container mx-auto max-w-6xl mb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl text-white font-light tracking-tight sticky top-32">{t.standards.title}</h2>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.standards.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 p-4 border border-neutral-800 hover:bg-neutral-900 transition-colors"
                >
                  <Icon className="text-amber-500 shrink-0" size={20} />
                  <span className="text-neutral-300 text-sm font-medium uppercase tracking-wide">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION D: CHAUFFEUR & CONCIERGE */}
      <div className="container mx-auto max-w-6xl mb-32 bg-neutral-900 border border-neutral-800 p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
        <div className="relative z-10 mb-12 max-w-2xl">
          <h2 className="text-3xl md:text-4xl text-white font-light mb-6">{t.services.title}</h2>
          <p className="text-neutral-400 text-lg font-light">{t.services.desc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {t.services.tiles.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, rotate: 1 }}
              className="aspect-square bg-neutral-950 border border-neutral-800 flex items-center justify-center p-6 text-center hover:border-amber-500/30 transition-colors cursor-default"
            >
              <span className="text-white font-medium tracking-wide">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION E: CTA */}
      <div className="container mx-auto max-w-4xl text-center pb-20">
        <h3 className="text-2xl text-white font-light mb-10 tracking-wide">{t.cta.text}</h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Button onClick={() => window.open('https://wa.me/221765457270')}>
            {t.cta.btn_wa}
          </Button>
          <div className="hidden md:block w-px bg-neutral-800" />
          <Button variant="outline" onClick={() => {
            const event = new CustomEvent('navigate', { detail: `/${lang}/location-chauffeur` });
            window.dispatchEvent(event);
          }}>
            {t.cta.btn_fleet}
          </Button>
        </div>
      </div>

    </div>
  );
};

// --- Page Contact (REDESIGNED) ---
const PageContact = ({ lang }) => {
  const t = DICTIONARY[lang].contact;

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
                    <a href="tel:+221765457270" className="text-white text-lg hover:text-amber-500 transition-colors">+221 76 545 72 70</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 border border-neutral-800 group-hover:border-amber-500/50 transition-colors"><Mail size={18} /></div>
                  <div>
                    <p className="text-neutral-500 text-xs uppercase mb-1 tracking-widest">Email</p>
                    <a href="mailto:contact@carsdakar.sn" className="text-white text-lg hover:text-amber-500 transition-colors">contact@carsdakar.sn</a>
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-amber-500/50 focus:bg-neutral-900 outline-none transition-colors rounded-sm text-sm" placeholder={t.form.name} />
                </div>
                <div className="space-y-2">
                  <input type="tel" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-amber-500/50 focus:bg-neutral-900 outline-none transition-colors rounded-sm text-sm" placeholder={t.form.phone} />
                </div>
              </div>

              <input type="email" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-amber-500/50 focus:bg-neutral-900 outline-none transition-colors rounded-sm text-sm" placeholder={t.form.email} />

              <div className="relative">
                <select
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 text-neutral-300 focus:border-amber-500/50 focus:bg-neutral-900 outline-none transition-colors rounded-sm text-sm appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>{t.form.subject}</option>
                  {t.form.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <ChevronRight className="rotate-90" size={16} />
                </div>
              </div>

              <textarea className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-amber-500/50 focus:bg-neutral-900 outline-none transition-colors rounded-sm text-sm min-h-[150px] resize-none" placeholder={t.form.message} />

              <div className="flex flex-col gap-4 pt-4">
                <Button className="w-full justify-center">{t.form.btn_primary}</Button>
                <button
                  type="button"
                  onClick={() => window.open('https://wa.me/221765457270')}
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
              // Updated image with the new direct link provided
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

/* =============================================================================
   5. MAIN APP ROUTER SIMULATION
   ============================================================================= */

export default function App() {
  const [route, setRoute] = useState('/fr');
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    // PACK C: Smooth Scrolling (Lenis) Fallback
    // Since we are in a preview env without dependencies, this is just to show structure.
    // In production, you would uncomment the import and ensure 'lenis' is installed.
    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
        });
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        console.log("Lenis not loaded (preview mode)");
      }
    };
    initLenis();

    const handleNav = (e) => {
      setRoute(e.detail);
      const newLang = e.detail.split('/')[1];
      if (newLang) setLang(newLang);
      window.scrollTo(0, 0);
    };
    window.addEventListener('navigate', handleNav);
    return () => window.removeEventListener('navigate', handleNav);
  }, []);

  const renderPage = () => {
    const path = route.substring(3) || '/';

    if (path === '/' || path === '') return <PageHome lang={lang} />;
    if (path === '/vente') return <PageSales lang={lang} />;
    if (path.startsWith('/vente/')) return <PageSalesDetail lang={lang} slug={path.split('/vente/')[1]} />;
    if (path === '/location-chauffeur') return <PageRental lang={lang} />;
    if (path === '/a-propos') return <PageAbout lang={lang} />;
    if (path === '/contact') return <PageContact lang={lang} />;

    return <PageHome lang={lang} />;
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-['Montserrat'] selection:bg-amber-500 selection:text-black overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');
        :root, body, html { font-family: 'Montserrat', sans-serif; cursor: default; }
      `}</style>

      {/* PACK C: Global Effects */}
      <NoiseOverlay />
      <CursorAura />

      <Header lang={lang} setLang={(l) => {
        setLang(l);
      }} currentRoute={route} />

      <AnimatePresence mode="wait">
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10" // Ensure content is above noise
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <footer className="bg-black py-12 border-t border-neutral-900 text-center relative z-10">
        <div className="container mx-auto px-6">
          <span className="text-2xl font-bold text-white tracking-tighter block mb-4">CARS<span className="text-amber-500">DAKAR</span></span>
          <p className="text-neutral-500 text-sm">© 2026 Luxury Motors Senegal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}