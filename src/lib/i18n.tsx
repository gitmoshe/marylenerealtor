import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const LANGS = ["en", "fr", "es"] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = "marylene-lang";

/**
 * All site copy lives here. English is the complete source of truth.
 * French and Spanish cover navigation, hero, section headings, buttons and the
 * contact form; anything missing falls back to English automatically.
 */
export const translations = {
  en: {
    nav: {
      home: "Home",
      meet: "Meet Marylene",
      properties: "Properties",
      management: "Property Management",
      films: "Videos",
      riviera: "La Riviera",
      contact: "Contact",
      consultation: "Consultation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    hero: {
      overline: "Riviera Maya · Mexico",
      titleLine1: "Where the Caribbean",
      titleLine2: "Meets Home.",
      subtitle:
        "Luxury real estate, property management and life on the Mayan Riviera — guided in French, English & Spanish.",
      ctaPrimary: "Explore Properties",
      ctaSecondary: "Watch the Videos",
    },
    sections: {
      meetOverline: "Meet Marylene",
      meetLink: "Her story",
      filmsOverline: "Videos",
      filmsTitle: "Properties, in motion.",
      filmsLink: "View All Videos",
      selectedOverline: "Selected Residences",
      selectedTitle: "Featured properties.",
      selectedLink: "All Properties",
      rivieraOverline: "La Riviera",
      rivieraTitle: "A coast worth knowing properly.",
      rivieraCta: "Read the Guide",
      testimonialsOverline: "In Their Words",
      ctaOverline: "Private Advisory",
      ctaTitle: "Begin Your Riviera Story.",
      ctaButton: "Book a Private Consultation",
    },
    contact: {
      overline: "Contact",
      titleLine1: "Begin the",
      titleLine2: "conversation.",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      interestLegend: "I am interested in",
      buying: "Buying",
      selling: "Selling",
      managing: "Property management",
      investing: "Investing",
      languageLegend: "Preferred language",
      message: "Message",
      submit: "Send Message",
      success:
        "Thank you — your message has been received. You will hear back within one business day.",
      directOverline: "Direct",
      whatsapp: "WhatsApp",
      book: "Book a Consultation",
      errName: "Please enter your name",
      errEmail: "Please enter a valid email",
      errMessage: "Please add a short message",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      meet: "Rencontrer Marylene",
      properties: "Propriétés",
      management: "Gestion locative",
      films: "Vidéos",
      riviera: "La Riviera",
      contact: "Contact",
      consultation: "Consultation",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      language: "Langue",
    },
    hero: {
      overline: "Riviera Maya · Mexique",
      titleLine1: "Là où les Caraïbes",
      titleLine2: "deviennent un foyer.",
      subtitle:
        "Immobilier de prestige, gestion de biens et art de vivre sur la Riviera Maya — accompagné en français, anglais et espagnol.",
      ctaPrimary: "Découvrir les propriétés",
      ctaSecondary: "Voir les vidéos",
    },
    sections: {
      meetOverline: "Rencontrer Marylene",
      meetLink: "Son histoire",
      filmsOverline: "Vidéos",
      filmsTitle: "Les propriétés, en mouvement.",
      filmsLink: "Voir toutes les vidéos",
      selectedOverline: "Résidences sélectionnées",
      selectedTitle: "Propriétés à la une.",
      selectedLink: "Toutes les propriétés",
      rivieraOverline: "La Riviera",
      rivieraTitle: "Une côte que l'on gagne à connaître.",
      rivieraCta: "Lire le guide",
      testimonialsOverline: "En leurs mots",
      ctaOverline: "Conseil privé",
      ctaTitle: "Commencez votre histoire sur la Riviera.",
      ctaButton: "Réserver une consultation privée",
    },
    contact: {
      overline: "Contact",
      titleLine1: "Engageons la",
      titleLine2: "conversation.",
      name: "Nom",
      email: "Courriel",
      phone: "Téléphone (facultatif)",
      interestLegend: "Je suis intéressé par",
      buying: "Acheter",
      selling: "Vendre",
      managing: "Gestion de biens",
      investing: "Investir",
      languageLegend: "Langue préférée",
      message: "Message",
      submit: "Envoyer le message",
      success:
        "Merci — votre message a bien été reçu. Vous recevrez une réponse sous un jour ouvré.",
      directOverline: "Direct",
      whatsapp: "WhatsApp",
      book: "Réserver une consultation",
      errName: "Veuillez indiquer votre nom",
      errEmail: "Veuillez indiquer une adresse courriel valide",
      errMessage: "Veuillez ajouter un court message",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      meet: "Conoce a Marylene",
      properties: "Propiedades",
      management: "Administración de propiedades",
      films: "Videos",
      riviera: "La Riviera",
      contact: "Contacto",
      consultation: "Consulta",
      openMenu: "Abrir el menú",
      closeMenu: "Cerrar el menú",
      language: "Idioma",
    },
    hero: {
      overline: "Riviera Maya · México",
      titleLine1: "Donde el Caribe",
      titleLine2: "se vuelve hogar.",
      subtitle:
        "Bienes raíces de lujo, administración de propiedades y vida en la Riviera Maya — con asesoría en francés, inglés y español.",
      ctaPrimary: "Ver propiedades",
      ctaSecondary: "Ver los videos",
    },
    sections: {
      meetOverline: "Conoce a Marylene",
      meetLink: "Su historia",
      filmsOverline: "Videos",
      filmsTitle: "Las propiedades, en movimiento.",
      filmsLink: "Ver todos los videos",
      selectedOverline: "Residencias seleccionadas",
      selectedTitle: "Propiedades destacadas.",
      selectedLink: "Todas las propiedades",
      rivieraOverline: "La Riviera",
      rivieraTitle: "Una costa que vale la pena conocer bien.",
      rivieraCta: "Leer la guía",
      testimonialsOverline: "En sus palabras",
      ctaOverline: "Asesoría privada",
      ctaTitle: "Comience su historia en la Riviera.",
      ctaButton: "Reservar una consulta privada",
    },
    contact: {
      overline: "Contacto",
      titleLine1: "Comencemos la",
      titleLine2: "conversación.",
      name: "Nombre",
      email: "Correo electrónico",
      phone: "Teléfono (opcional)",
      interestLegend: "Me interesa",
      buying: "Comprar",
      selling: "Vender",
      managing: "Administración de propiedades",
      investing: "Invertir",
      languageLegend: "Idioma preferido",
      message: "Mensaje",
      submit: "Enviar mensaje",
      success:
        "Gracias — hemos recibido su mensaje. Recibirá una respuesta en un día hábil.",
      directOverline: "Directo",
      whatsapp: "WhatsApp",
      book: "Reservar una consulta",
      errName: "Por favor indique su nombre",
      errEmail: "Por favor indique un correo válido",
      errMessage: "Por favor añada un mensaje breve",
    },
  },
} as const;

type EN = typeof translations.en;
type Section = keyof EN;
export type TKey = {
  [S in Section]: `${S & string}.${keyof EN[S] & string}`;
}[Section];

function lookup(lang: Lang, key: string): string | undefined {
  const [section, entry] = key.split(".");
  const dict = translations[lang] as Record<string, Record<string, string>>;
  return dict?.[section]?.[entry];
}

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as readonly string[]).includes(stored)) {
      setLangState(stored as Lang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable — keep the in-memory choice */
    }
  }, []);

  const t = useCallback(
    (key: TKey) => lookup(lang, key) ?? lookup("en", key) ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
