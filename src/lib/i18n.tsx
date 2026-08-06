import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGS, type Dict, type Lang } from "./i18n-types";
import { commonDict } from "./i18n/dict.common";
import { homeDict } from "./i18n/dict.home";
import { aboutDict } from "./i18n/dict.about";
import { propertiesDict } from "./i18n/dict.properties";
import { portfolioDict } from "./i18n/dict.portfolio";
import { managementDict } from "./i18n/dict.management";
import { filmsDict } from "./i18n/dict.films";
import { rivieraDict } from "./i18n/dict.riviera";
import { detailDict } from "./i18n/dict.detail";

export { LANGS };
export type { Lang };

const STORAGE_KEY = "marylene-lang";

const dicts: Dict[] = [
  commonDict,
  homeDict,
  aboutDict,
  propertiesDict,
  portfolioDict,
  managementDict,
  filmsDict,
  rivieraDict,
  detailDict,
];

function merge(lang: Lang): Record<string, string> {
  return Object.assign({}, ...dicts.map((d) => d[lang]));
}

export const translations: Record<Lang, Record<string, string>> = {
  en: merge("en"),
  fr: merge("fr"),
  es: merge("es"),
};

/** Dotted translation key, e.g. "nav.home" or "home.services.buy.title". */
export type TKey = string;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
  /** Pick a value from a per-language record, falling back to English. */
  pick: <T>(byLang: Partial<Record<Lang, T>>) => T | undefined;
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
    (key: TKey) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    [lang],
  );

  const pick = useCallback(
    <T,>(byLang: Partial<Record<Lang, T>>) => byLang[lang] ?? byLang.en,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
