import type { TFunction } from "i18next";

/** Formats "7 noći" / "5 noći" — keeps Serbian copy for `sr` locale. */
export function formatNights(nights: string | undefined, t: TFunction, lang: string): string {
  if (!nights) return "";
  if (lang.startsWith("sr")) return nights;
  const m = nights.match(/^(\d+)\s*noć/i);
  if (m) {
    const n = parseInt(m[1], 10);
    return t("common.nights", { count: n });
  }
  return nights;
}

/** "1 dan" → translated day count */
export function formatDuration(duration: string | undefined, t: TFunction, lang: string): string {
  if (!duration) return "";
  if (lang.startsWith("sr")) return duration;
  const m = duration.match(/^(\d+)\s*dan/i);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n === 1) return t("common.oneDay");
    return t("common.days", { count: n });
  }
  return duration;
}
