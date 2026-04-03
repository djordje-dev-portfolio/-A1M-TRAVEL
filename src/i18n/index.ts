import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enBase from "./locales/en.json";
import esBase from "./locales/es.json";
import elBase from "./locales/el.json";
import srBase from "./locales/sr.json";
import pagesEn from "./locales/pages-en.json";
import pagesSr from "./locales/pages-sr.json";
import pagesEs from "./locales/pages-es.json";
import pagesEl from "./locales/pages-el.json";
import { destinationsEn } from "./destinationsContent";
import { destinationsMetaEn } from "./destinationsMetaEn";

function mergeDestinationBundles(
  base: Record<string, Record<string, unknown>>,
  extra: Record<string, Record<string, unknown>>
): Record<string, Record<string, unknown>> {
  const ids = new Set([...Object.keys(base), ...Object.keys(extra)]);
  const out: Record<string, Record<string, unknown>> = {};
  for (const id of ids) {
    out[id] = { ...(base[id] || {}), ...(extra[id] || {}) };
  }
  return out;
}

function deepMerge(a: Record<string, unknown>, b: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...a };
  for (const k of Object.keys(b)) {
    const bv = b[k];
    const av = a[k];
    if (
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv) &&
      av &&
      typeof av === "object" &&
      !Array.isArray(av)
    ) {
      out[k] = deepMerge(av as Record<string, unknown>, bv as Record<string, unknown>);
    } else {
      out[k] = bv;
    }
  }
  return out;
}

const en = deepMerge(enBase as Record<string, unknown>, pagesEn as Record<string, unknown>) as Record<
  string,
  unknown
>;
en.destinations = mergeDestinationBundles(
  destinationsEn as Record<string, Record<string, unknown>>,
  destinationsMetaEn as Record<string, Record<string, unknown>>
);

const sr = deepMerge(deepMerge(srBase as Record<string, unknown>, pagesEn as Record<string, unknown>), pagesSr as Record<string, unknown>);
const es = deepMerge(deepMerge(esBase as Record<string, unknown>, pagesEn as Record<string, unknown>), pagesEs as Record<string, unknown>);
const el = deepMerge(deepMerge(elBase as Record<string, unknown>, pagesEn as Record<string, unknown>), pagesEl as Record<string, unknown>);

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      el: { translation: el },
      sr: { translation: sr },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es", "el", "sr"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "a1m-lang",
    },
  });

export default i18n;
