import { useState } from "react";

import * as translations from "../translations";
import useStorage from "./useStorage";

const useTranslation = () => {
  const storage = useStorage();
  const [language, setLang] = useState(storage.get("language") || "en");

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

  return { t: translate, language, setLanguage };
};

export default useTranslation;
