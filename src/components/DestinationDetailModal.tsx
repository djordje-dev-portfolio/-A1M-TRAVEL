import BookingModal from "./BookingModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTranslatedDestination } from "@/hooks/useTranslatedDestination";
import { formatNights } from "@/lib/i18nFormat";

export interface DestinationDetail {
  destId?: string;
  name: string;
  price: string;
  badge?: string;
  nights?: string;
  stars?: number;
  rating?: number;
  img: string;
  gallery?: string[];
  destinationType?: string;
  location: string;
  aboutDestination: string;
  aboutHotel: string;
  rooms?: string;
  facilities?: string[];
  beach?: string;
  includes: string[];
  available: string[];
  tip?: string;
}

interface Props {
  detail: DestinationDetail | null;
  onClose: () => void;
}

export default function DestinationDetailModal({ detail, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const { field, arrField } = useTranslatedDestination(detail);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!detail) return null;

  const images = [detail.img, ...(detail.gallery || [])];
  const title = field("name");
  const badge = field("badge");
  const location = field("location");
  const nightsLabel = formatNights(detail.nights, t, i18n.language);
  const aboutDestination = field("aboutDestination");
  const aboutHotel = field("aboutHotel");
  const rooms = field("rooms");
  const tip = field("tip");
  const beach = field("beach");
  const facilities = arrField("facilities");
  const includes = arrField("includes");
  const available = arrField("available");

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">

          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
            <img src={images[activeImg]} alt={title} className="w-full h-full object-cover transition-all duration-500"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors text-sm backdrop-blur-sm">
              ✕
            </button>

            {/* Badge + Stars */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {badge && <span className="badge-gold text-xs">{badge}</span>}
              {detail.stars && (
                <span className="bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-bold text-yellow-600">
                  {"⭐".repeat(Math.min(detail.stars, 5))}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">{title}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                {nightsLabel && <span className="text-white/80 text-sm">⏱️ {nightsLabel}</span>}
                {detail.rating && <span className="text-yellow-300 font-bold text-sm">⭐ {detail.rating}/5.0</span>}
                <span className="text-white/80 text-sm">📍 {location}</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-yellow-400 scale-110" : "border-white/50"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover"/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-7">

            {/* Price + Book */}
            <div className="flex items-center justify-between bg-blue-50 rounded-2xl px-5 py-4">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t("detail.pricePerPerson")}</p>
                <p className="text-3xl font-black text-blue-800">{t("home.from")} {detail.price}</p>
              </div>
              <button onClick={() => setBookingOpen(true)} className="btn-gold px-6 py-3 font-bold text-sm rounded-xl">
                {t("detail.book")}
              </button>
            </div>

            {/* O destinaciji */}
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-400 rounded-full inline-block"/>
                {t("detail.aboutDest")}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{aboutDestination}</p>
              {detail.beach && (
                <div className="mt-3 bg-blue-50 rounded-xl p-3 text-sm text-blue-800">
                  🏖️ <strong>{t("detail.beach")}</strong> {beach}
                </div>
              )}
            </div>

            {/* O hotelu / smeštaju */}
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-yellow-400 rounded-full inline-block"/>
                {t("detail.stay")}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{aboutHotel}</p>
              {detail.rooms && (
                <div className="mt-3 bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
                  🛏️ <strong>{t("detail.rooms")}</strong> {rooms}
                </div>
              )}
            </div>

            {/* Sadržaji */}
            {facilities.length > 0 && (
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 bg-yellow-400 rounded-full inline-block"/>
                  {t("detail.facilities")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {facilities.map(f => (
                    <span key={f} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Uključeno */}
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-green-400 rounded-full inline-block"/>
                {t("detail.included")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {includes.map(i => (
                  <span key={i} className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1.5 rounded-full font-semibold">
                    ✓ {i}
                  </span>
                ))}
              </div>
            </div>

            {/* Slobodni termini */}
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-400 rounded-full inline-block"/>
                {t("detail.dates")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {available.map(dt => (
                  <span key={dt} className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-4 py-1.5 rounded-full font-semibold">
                    📅 {dt}
                  </span>
                ))}
              </div>
            </div>

            {/* Tip */}
            {detail.tip && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-bold text-yellow-800 text-sm mb-1">{t("detail.agencyTip")}</p>
                  <p className="text-yellow-700 text-sm">{tip}</p>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-gray-300 text-sm transition-colors">
                {t("detail.close")}
              </button>
              <button onClick={() => setBookingOpen(true)} className="flex-1 py-3 btn-gold font-bold text-sm rounded-xl">
                🌴 {t("detail.bookNow")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        destination={title}
        price={`${t("home.from")} ${detail.price}`}
        destinationType={detail.destinationType}
      />
    </>
  );
}
