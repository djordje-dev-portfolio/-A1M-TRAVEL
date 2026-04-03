import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import TermsModal from "./TermsModal";
import CopyrightModal from "./CopyrightModal";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center border border-yellow-400/50">
                <span className="text-yellow-400 font-black text-sm tracking-wider">A1M</span>
              </div>
              <div>
                <p className="font-sans font-black text-xl text-white tracking-wider">A1M <span className="text-yellow-400">Travel</span></p>
                <p className="text-xs text-gray-400 tracking-widest">{t("footer.agency")}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("footer.blurb")}
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "Instagram", "TikTok"].map(s => (
                <div key={s} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-gray-300 hover:text-gray-900">{s[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">{t("footer.offer")}</h4>
            <ul className="space-y-2.5">
              {[
                [t("footer.letovanja"), "/letovanja"],
                [t("footer.zimovanja"), "/zimovanja"],
                [t("footer.izleti"), "/izleti"],
                [t("footer.hoteli"), "/hoteli"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Jovana Cvijića 22<br/>15300 Loznica, Srbija</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:A1Mtravel@email.com" className="hover:text-yellow-400 transition-colors">A1Mtravel@email.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+381 15 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Pon–Pet: 08:00–20:00<br/>Sub: 09:00–16:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} A1M Travel. {t("footer.rights")}</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/o-nama" className="hover:text-yellow-400 transition-colors">{t("footer.oNama")}</Link>
            <TermsModal trigger={t("footer.terms")} />
            <CopyrightModal trigger={t("footer.copyrightTrigger")} />
          </div>
        </div>
      </div>
    </footer>
  );
}
