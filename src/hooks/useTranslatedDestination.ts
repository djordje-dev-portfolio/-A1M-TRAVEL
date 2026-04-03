import { useTranslation } from "react-i18next";
import type { DestinationDetail } from "@/components/DestinationDetailModal";

export function useTranslatedDestination(detail: (DestinationDetail & { destId?: string }) | null) {
  const { i18n, t } = useTranslation();
  const sr = i18n.language.startsWith("sr");

  function field(key: string): string {
    if (!detail) return "";
    const raw = (detail as Record<string, unknown>)[key];
    const fallback = raw == null ? "" : String(raw);
    if (sr || !detail.destId) return fallback;
    return t(`destinations.${detail.destId}.${key}`, { defaultValue: fallback });
  }

  function arrField(key: "facilities" | "includes" | "available"): string[] {
    if (!detail) return [];
    const raw = detail[key];
    if (!raw || !Array.isArray(raw)) return [];
    if (sr || !detail.destId) return raw as string[];
    const tr = t(`destinations.${detail.destId}.${key}`, { returnObjects: true });
    if (Array.isArray(tr) && tr.length > 0) return tr as string[];
    return raw as string[];
  }

  return { field, arrField, isSr: sr, lang: i18n.language };
}

/** Card list: translate short `desc` when `destId` is set (EN bundle; ES/EL fall back to EN). */
export function useDestLineString(id: string | undefined, field: string, fallback: string) {
  const { i18n, t } = useTranslation();
  if (i18n.language.startsWith("sr")) return fallback;
  if (!id) return fallback;
  return t(`destinations.${id}.${field}`, { defaultValue: fallback });
}
