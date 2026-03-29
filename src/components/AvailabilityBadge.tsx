const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDateStr(s: string): Date | null {
  const m = s.match(/^([A-Za-z]{3})\s+(\d+)/);
  if (!m || !(m[1] in MONTHS)) return null;
  const month = MONTHS[m[1]];
  const day = parseInt(m[2]);
  const today = new Date();
  const d = new Date(today.getFullYear(), month, day);
  // If date is more than 90 days in the past, it refers to next year
  if (today.getTime() - d.getTime() > 90 * 24 * 60 * 60 * 1000) {
    d.setFullYear(d.getFullYear() + 1);
  }
  return d;
}

export function isFutureDate(s: string): boolean {
  if (/tokom|cele|godišnje|stalno/i.test(s)) return true;
  const d = parseDateStr(s);
  return d !== null && d >= new Date();
}

export type AvailStatus = "available" | "limited" | "full" | "always";

export function getAvailabilityStatus(dates: string[]): { status: AvailStatus; futureCount: number; nextDate: string | null } {
  if (!dates || dates.length === 0) return { status: "full", futureCount: 0, nextDate: null };

  const alwaysOpen = dates.some(s => /tokom|cele|godišnje|stalno/i.test(s));
  if (alwaysOpen) return { status: "always", futureCount: dates.length, nextDate: dates[0] };

  const future = dates.filter(isFutureDate);
  if (future.length === 0)  return { status: "full",      futureCount: 0,             nextDate: null };
  if (future.length === 1)  return { status: "limited",   futureCount: 1,             nextDate: future[0] };
                            return { status: "available", futureCount: future.length, nextDate: future[0] };
}

interface AvailabilityBadgeProps {
  dates: string[];
  size?: "sm" | "md";
}

export default function AvailabilityBadge({ dates, size = "md" }: AvailabilityBadgeProps) {
  const { status } = getAvailabilityStatus(dates);

  const cfg = {
    available: { dot: "bg-green-400",  text: "text-green-800",  bg: "bg-green-100/90",  label: "Slobodni termini" },
    limited:   { dot: "bg-orange-400", text: "text-orange-800", bg: "bg-orange-100/90", label: "Poslednji termin" },
    full:      { dot: "bg-red-400",    text: "text-red-800",    bg: "bg-red-100/90",    label: "Popunjeno" },
    always:    { dot: "bg-blue-400",   text: "text-blue-800",   bg: "bg-blue-100/90",   label: "Dostupno" },
  }[status];

  const px   = size === "sm" ? "px-2.5 py-1"   : "px-3 py-1.5";
  const text = size === "sm" ? "text-[11px]"    : "text-xs";
  const dot  = size === "sm" ? "w-1.5 h-1.5"   : "w-2 h-2";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold ${px} ${text} ${cfg.bg} ${cfg.text}`}>
      <span className={`rounded-full flex-shrink-0 ${dot} ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
}

interface AvailabilityDatesProps {
  dates: string[];
  max?: number;
}

export function AvailabilityDates({ dates, max = 5 }: AvailabilityDatesProps) {
  const { status } = getAvailabilityStatus(dates);
  if (status === "always") {
    return (
      <div className="flex flex-wrap gap-2">
        {dates.map(d => (
          <span key={d} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
            📅 {d}
          </span>
        ))}
      </div>
    );
  }

  const shown = dates.slice(0, max);
  const rest  = dates.length - shown.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map(d => {
        const future = isFutureDate(d);
        return (
          <span
            key={d}
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border transition-colors ${
              future
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-50 text-gray-400 border-gray-200 line-through"
            }`}
          >
            {future ? "📅" : "✗"} {d}
          </span>
        );
      })}
      {rest > 0 && (
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold border bg-gray-50 text-gray-500 border-gray-200">
          +{rest} više
        </span>
      )}
    </div>
  );
}
