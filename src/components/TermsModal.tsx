import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TermsModalProps {
  trigger: React.ReactNode;
}

export default function TermsModal({ trigger }: TermsModalProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer hover:text-yellow-400 transition-colors">
        {trigger}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="bg-[hsl(208,79%,27%)] px-8 py-6 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">A1M Travel</p>
                <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                  {t("terms.title")}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-3xl leading-none transition-colors ml-6 flex-shrink-0"
                aria-label={t("terms.close")}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto px-8 py-8 text-gray-700 text-sm leading-relaxed space-y-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-red-800 font-bold text-base mb-1">⚠️ {t("terms.warnTitle")}</p>
                <p className="text-red-700">{t("terms.warnBody")}</p>
              </div>

              {(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"] as const).map((k) => (
                <Section key={k} title={t(`terms.${k}t`)}>
                  <p>{t(`terms.${k}p`)}</p>
                </Section>
              ))}

              <div className="border-t border-gray-200 pt-6 text-xs text-gray-400">
                <p>{t("terms.footer")}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-4 flex justify-end flex-shrink-0 bg-gray-50">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="bg-[hsl(208,79%,27%)] text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-[hsl(208,79%,22%)] transition-colors text-sm"
              >
                {t("terms.accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 text-base mb-3 pb-2 border-b border-gray-100">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
