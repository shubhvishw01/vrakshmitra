import { createContext, useContext, useState } from "react";
import hi from "../lang/hi.json";
import en from "../lang/en.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("hi");

  const t = lang === "hi" ? hi : en;

  const toggleLanguage = () => {
    setLang((prev) => (prev === "hi" ? "en" : "hi"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
