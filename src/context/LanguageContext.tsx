import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Language, LocalizedString } from '../types';
import { translations, getDirection } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  localize: (text: LocalizedString) => string;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      return saved;
    }
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'ar') return 'ar';
    return 'en';
  });

  const direction = getDirection(language);

  useEffect(() => {
    // Update document direction and lang
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    localStorage.setItem('language', language);
  }, [language, direction]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['en'][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return text;
  }, [language]);

  const localize = useCallback((text: LocalizedString): string => {
    return text[language] || text.en;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
