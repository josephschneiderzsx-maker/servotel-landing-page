import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

export type Language = 'en' | 'es' | 'fr' | 'ht';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Attempt to detect browser language on mount
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'es', 'fr', 'ht'].includes(browserLang)) {
      setLanguage(browserLang as Language);
    } else if (browserLang === 'ht' || navigator.language === 'ht-HT') {
        // Special check for Haitian Creole codes if standard is different
        setLanguage('ht');
    }
  }, []);

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    // Fallback to English if translation is missing
    let fallback: any = translations['en'];
    let useFallback = false;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        useFallback = true;
      }
      
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        fallback = undefined;
      }
    }

    if (useFallback) return fallback !== undefined ? fallback : path;
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
