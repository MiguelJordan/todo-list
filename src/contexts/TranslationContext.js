import { createContext, useState } from "react";

import * as translations from "../translations";
import useStorage from "../hooks/useStorage";

export const TrContext = createContext();

const TrCProvider = ({ children }) => {
  const storage = useStorage();
  const [language, setLang] = useState(storage.get("language") || "fr");
  console.log("Ran", language);

  const translate = (key) => {
    const keys = key.split(".");

    // return translation or the last key;
    // which is the actual word or phrase to be translated
    return translateNested(keys) ?? keys[keys.length - 1];
  };

  const translateNested = (keys) => {
    return keys.reduce((prev, key) => {
      return prev[key];
    }, translations[language]);
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return;
    storage.set("language", lang);
    setLang(lang);
  };

  const context = { t: translate, language, setLanguage };

  return <TrContext.Provider value={context}>{children}</TrContext.Provider>;
};

export default TrCProvider;
