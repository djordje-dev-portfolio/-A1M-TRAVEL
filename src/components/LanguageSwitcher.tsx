import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "el", label: "Ελληνικά" },
  { code: "sr", label: "Srpski" },
] as const;

type Props = {
  scrolled: boolean;
  mobile?: boolean;
};

export default function LanguageSwitcher({ scrolled, mobile }: Props) {
  const { i18n, t } = useTranslation();
  const code = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  return (
    <label
      className={`flex items-center gap-2 ${mobile ? "px-4 py-3 border-t border-gray-100 mt-2" : ""}`}
    >
      <span
        className={`text-xs font-semibold uppercase tracking-wide whitespace-nowrap ${
          scrolled || mobile ? "text-gray-600" : "text-white/85"
        }`}
      >
        {t("language.label")}
      </span>
      <select
        value={LANGS.some((l) => l.code === code) ? code : "en"}
        onChange={(e) => void i18n.changeLanguage(e.target.value)}
        aria-label={t("language.label")}
        className={`text-sm font-medium rounded-lg border px-2 py-1.5 pr-7 max-w-[140px] focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
          scrolled || mobile
            ? "bg-white border-gray-200 text-gray-800"
            : "bg-white/15 border-white/30 text-white backdrop-blur-sm"
        }`}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
