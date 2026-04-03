import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CopyrightModalProps {
  trigger: React.ReactNode;
}

export default function CopyrightModal({ trigger }: CopyrightModalProps) {
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden">
            <div className="bg-[hsl(208,79%,27%)] px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">A1M Travel</p>
                <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                  {t("copyright.title")}
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-3xl leading-none transition-colors ml-6"
                aria-label={t("copyright.closeBtn")}
                type="button"
              >
                ×
              </button>
            </div>

            <div className="px-8 py-8 text-gray-600 text-sm leading-relaxed space-y-5">
              <div className="text-center">
                <p className="text-5xl mb-4">©</p>
                <p className="text-2xl font-bold text-gray-900">
                  © {new Date().getFullYear()} A1M Travel
                </p>
                <p className="text-gray-500 mt-1">{t("copyright.subtitle")}</p>
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-3">
                <p>{t("copyright.p1")}</p>
                <p>{t("copyright.p2")}</p>
                <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
                  <p><span className="font-semibold text-gray-700">{t("copyright.owner")}</span> {t("copyright.ownerVal")}</p>
                  <p><span className="font-semibold text-gray-700">{t("copyright.contact")}</span> {t("copyright.contactVal")}</p>
                  <p><span className="font-semibold text-gray-700">{t("copyright.phone")}</span> {t("copyright.phoneVal")}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-4 flex justify-end bg-gray-50">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="bg-[hsl(208,79%,27%)] text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-[hsl(208,79%,22%)] transition-colors text-sm"
              >
                {t("copyright.closeBtn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
