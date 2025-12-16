import { createContext, useContext, useEffect, useState } from "react";
import hi from "../lang/hi.json";
import en from "../lang/en.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 👇 refresh ke baad bhi language yaad rahe
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "hi");

  const t = lang === "hi" ? hi : en;

  const toggleLanguage = () => {
    const newLang = lang === "hi" ? "en" : "hi";
    setLang(newLang);
    localStorage.setItem("lang", newLang); // 👈 save
  };

  // optional safety
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ t, lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
