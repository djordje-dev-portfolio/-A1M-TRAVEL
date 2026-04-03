import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
  }, [location]);

  const aboutItems = useMemo(
    () => [
      { label: t("nav.letovanja"), href: "/letovanja", icon: "🏖️" },
      { label: t("nav.zimovanja"), href: "/zimovanja", icon: "⛷️" },
      { label: t("nav.izleti"), href: "/izleti", icon: "🚌" },
      { label: t("nav.oNama"), href: "/o-nama", icon: "ℹ️" },
    ],
    [t]
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                {/* Outer circle */}
                <circle cx="24" cy="24" r="23" fill="hsl(208,79%,22%)" stroke="#f5c01e" strokeWidth="1.5"/>
                {/* A letter - mountain peak shape */}
                <path d="M10 34 L19 14 L24 22 L29 14 L38 34" stroke="white" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
                {/* crossbar of A */}
                <path d="M14 28 L22 28" stroke="#f5c01e" strokeWidth="2" strokeLinecap="round"/>
                {/* 1 - stylized as airplane pointing up-right */}
                <path d="M24 22 L26.5 16" stroke="#f5c01e" strokeWidth="2" strokeLinecap="round"/>
                <path d="M25 19 L27.5 18.5 L26.5 21" stroke="#f5c01e" strokeWidth="1.2" strokeLinejoin="round" fill="#f5c01e"/>
                {/* M crossbar */}
                <path d="M30 28 L34 28" stroke="#f5c01e" strokeWidth="2" strokeLinecap="round"/>
                {/* star accent */}
                <circle cx="38" cy="11" r="2" fill="#f5c01e" opacity="0.9"/>
                <circle cx="34" cy="8" r="1.2" fill="#f5c01e" opacity="0.6"/>
                <circle cx="42" cy="15" r="1" fill="#f5c01e" opacity="0.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-sans font-black text-xl leading-tight tracking-wider ${scrolled || mobileOpen ? "text-gray-900" : "text-white"}`}>
                A1M <span className="text-yellow-400">Travel</span>
              </span>
              <span className={`text-xs tracking-widest uppercase font-medium ${scrolled || mobileOpen ? "text-gray-500" : "text-white/70"}`}>
                {t("nav.agency")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-yellow-400/20 ${scrolled ? "text-gray-700 hover:text-yellow-600" : "text-white hover:text-yellow-300"}`}>
              {t("nav.home")}
            </Link>

            {/* About Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-yellow-400/20 flex items-center gap-1 ${scrolled ? "text-gray-700 hover:text-yellow-600" : "text-white hover:text-yellow-300"}`}
              >
                {t("nav.about")}
                <svg className={`w-4 h-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {aboutItems.map((item) => (
                    <Link key={item.href} href={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-700 font-medium text-sm border-b border-gray-50 last:border-0"
                      onClick={() => setAboutOpen(false)}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/hoteli" className={`px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-yellow-400/20 ${scrolled ? "text-gray-700 hover:text-yellow-600" : "text-white hover:text-yellow-300"}`}>
              {t("nav.hotels")}
            </Link>

            <LanguageSwitcher scrolled={scrolled} />

            <Link href="/letovanja" className="ml-2 px-6 py-2.5 btn-gold text-sm">
              {t("nav.book")}
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className={`w-6 h-6 ${scrolled || mobileOpen ? "text-gray-900" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-gray-100">
            <Link href="/" className="block px-4 py-3 font-semibold text-gray-700 hover:text-yellow-600">{t("nav.home")}</Link>
            <div className="px-4 py-2 font-semibold text-gray-500 text-xs uppercase tracking-wider mt-2">{t("nav.about")}</div>
            {aboutItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-6 py-2.5 text-gray-700 hover:text-blue-700 font-medium text-sm">
                <span>{item.icon}</span>{item.label}
              </Link>
            ))}
            <Link href="/hoteli" className="block px-4 py-3 font-semibold text-gray-700 hover:text-yellow-600 border-t border-gray-100 mt-2">
              {t("nav.hotels")}
            </Link>
            <LanguageSwitcher scrolled mobile />
            <div className="px-4 mt-3">
              <Link href="/letovanja" className="block text-center px-6 py-3 btn-gold text-sm">{t("nav.bookMobile")}</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
