import { createContext, useState } from "react";

import * as translations from "../translations";
import useStorage from "../hooks/useStorage";

export const TranslationContext = createContext();
const fallback = "en";

const TranslationProvider = ({ children }) => {
  const storage = useStorage();
  const [language, setLang] = useState(storage.get("language") || "fr");

  const translate = (key, index = 1) => {
    const keys = key.split(".");

    // return translation or the last key;
    // which is the actual word or phrase to be translated
    return (
      translateNested(language, keys) ??
      translateNested(fallback, keys) ??
      keys[keys.length - index]
    );
  };

  const translateNested = (language, keys) => {
    try {
      return keys.reduce((prev, key) => {
        return prev[key];
      }, translations[language]);
    } catch (err) {}
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return;
    storage.set("language", lang);
    setLang(lang);
  };

  const context = { t: translate, language, setLanguage };

  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
