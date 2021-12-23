import { useState } from "react";

import * as translations from "../translations";
import useStorage from "./useStorage";

const useTranslation = () => {
  const storage = useStorage();
  const [language, setLang] = useState(storage.get("language") || "en");

  const translate = (key) => {
    const keys = key.split(".");

    return translateNested(keys) ?? key;
  };

  const translateNested = (keys) => {
    return keys.reduce((prev, key) => {
      return prev[key];
    }, translations[language]);
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) {
      storage.set("language", "en");
    } else {
      storage.set("language", lang);
    }

    setLang(storage.get("language"));
  };

  return { t: translate, setLanguage };
};

export default useTranslation;
