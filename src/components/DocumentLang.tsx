import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const HTML_LANG: Record<string, string> = {
  en: "en",
  es: "es",
  el: "el",
  sr: "sr-Latn",
};

export default function DocumentLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const sync = () => {
      const code = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
      document.documentElement.lang = HTML_LANG[code] || code;
    };
    sync();
    i18n.on("languageChanged", sync);
    return () => {
      i18n.off("languageChanged", sync);
    };
  }, [i18n]);

  return null;
}
