import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');
    const toggle = () => setLang((prev) => (prev === 'en' ? 'tr' : 'en'));
    return (
        <LanguageContext.Provider value={{ lang, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}

// Helper: pass { en: "...", tr: "..." } → returns current
export function useT() {
    const { lang } = useLang();
    return (obj) => (typeof obj === 'object' && obj !== null ? obj[lang] || obj.en : obj);
}
