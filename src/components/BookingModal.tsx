import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createBooking } from "../lib/api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  price: string;
  destinationType?: string;
}

export default function BookingModal({ isOpen, onClose, destination, price, destinationType }: BookingModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", checkIn: "", checkOut: "",
    guests: "2", payment: "card", notes: "",
  });

  const handleClose = () => {
    setStep(1);
    setError("");
    setBookingId(null);
    setForm({ name: "", phone: "", email: "", checkIn: "", checkOut: "", guests: "2", payment: "card", notes: "" });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await createBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        destination,
        destinationType,
        guests: Number(form.guests),
        checkIn: form.checkIn || undefined,
        checkOut: form.checkOut || undefined,
        paymentMethod: form.payment,
        notes: form.notes || undefined,
      });
      setBookingId(result.booking.id);
      setStep(3);
    } catch (err: any) {
      setError(err.message || t("booking.error"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}/>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 rounded-t-3xl relative">
          <button onClick={handleClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors text-sm">
            ✕
          </button>
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">{t("booking.title")}</p>
          <h3 className="font-serif text-lg font-bold text-white">{destination}</h3>
          <p className="text-yellow-300 font-bold text-base mt-0.5">{price}</p>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div className="flex gap-0 border-b border-gray-100">
            {[t("booking.stepData"), t("booking.stepReview")].map((s, i) => (
              <div key={s} className={`flex-1 py-2 text-center text-xs font-bold ${step === i+1 ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-400"}`}>
                {i+1}. {s}
              </div>
            ))}
          </div>
        )}

        {step === 3 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{t("booking.confirmed")}</h3>
            <div className="bg-blue-50 rounded-2xl p-4 text-left mb-4 text-sm">
              <p className="text-gray-600"><strong>{t("booking.bookingNo")}</strong> <span className="text-blue-700 font-black">#{bookingId}</span></p>
              <p className="text-gray-600 mt-1"><strong>{t("booking.destination")}</strong> {destination}</p>
              <p className="text-gray-600 mt-1"><strong>{t("booking.guests")}</strong> {form.guests}</p>
              <p className="text-gray-600 mt-1"><strong>{t("booking.payment")}</strong> {form.payment === "card" ? `💳 ${t("booking.card")}` : `📋 ${t("booking.reservation")}`}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              {t("booking.emailSent")} <strong className="text-blue-700">{form.email}</strong>. {t("booking.contact24")}
            </p>
            <button onClick={handleClose} className="w-full py-3 btn-gold text-sm font-bold">{t("booking.close")}</button>
          </div>
        ) : step === 2 ? (
          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">{t("booking.reviewTitle")}</h4>
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm mb-6">
              <p><span className="text-gray-500">{t("booking.destination")}</span> <strong>{destination}</strong></p>
              <p><span className="text-gray-500">{t("booking.name")}:</span> <strong>{form.name}</strong></p>
              <p><span className="text-gray-500">{t("booking.email")}:</span> <strong>{form.email}</strong></p>
              {form.phone && <p><span className="text-gray-500">{t("booking.phone")}:</span> <strong>{form.phone}</strong></p>}
              <p><span className="text-gray-500">{t("booking.guests")}</span> <strong>{form.guests}</strong></p>
              {form.checkIn && <p><span className="text-gray-500">{t("booking.checkIn")}:</span> <strong>{form.checkIn}</strong></p>}
              {form.checkOut && <p><span className="text-gray-500">{t("booking.checkOut")}:</span> <strong>{form.checkOut}</strong></p>}
              <p><span className="text-gray-500">{t("booking.payment")}</span> <strong>{form.payment === "card" ? `💳 ${t("booking.card")}` : `📋 ${t("booking.reservation")}`}</strong></p>
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm mb-4">⚠️ {error}</div>}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-gray-300 text-sm">
                ← {t("booking.back")}
              </button>
              <button onClick={handleSubmit as any} disabled={loading}
                className="flex-1 py-3 btn-gold text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? `⏳ ${t("booking.sending")}` : `✅ ${t("booking.confirm")}`}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.name")} *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Marko Marković"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.email")} *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="marko@email.com"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.phone")}</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="+381 60 ..."/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.checkIn")}</label>
                <input type="date" value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.checkOut")}</label>
                <input type="date" value={form.checkOut} onChange={e => setForm({...form, checkOut: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.guestsLabel")}</label>
                <select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n}>{n === 1 ? t("booking.guest1") : t("booking.guestN", { count: n })}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.paymentLabel")}</label>
                <select value={form.payment} onChange={e => setForm({...form, payment: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  <option value="card">💳 {t("booking.card")}</option>
                  <option value="reservation">📋 {t("booking.reservation")}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">{t("booking.notes")}</label>
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                rows={2} placeholder={t("booking.notesPh")}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
            </div>
            <button type="submit" className="w-full py-3.5 btn-gold font-bold text-sm mt-1">
              {t("booking.next")}
            </button>
            <p className="text-xs text-gray-400 text-center">{t("booking.footerNote")}</p>
          </form>
        )}
      </div>
    </div>
  );
}
