"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations, type Lang, type T } from "./translations";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  T: T;
}

const LangContext = createContext<LangContextValue>({
  lang: "de",
  setLang: () => {},
  T: translations.de,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const stored = localStorage.getItem("pb_lang") as Lang;
    if (stored === "en" || stored === "de") setLangState(stored);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("pb_lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, T: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
