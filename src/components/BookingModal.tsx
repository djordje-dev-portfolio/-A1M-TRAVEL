import { useState } from "react";
import { createBooking } from "../lib/api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
  price: string;
  destinationType?: string;
}

export default function BookingModal({ isOpen, onClose, destination, price, destinationType }: BookingModalProps) {
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
      setError(err.message || "Greška pri rezervaciji. Pokušajte ponovo.");
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
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Rezervacija Aranžmana</p>
          <h3 className="font-serif text-lg font-bold text-white">{destination}</h3>
          <p className="text-yellow-300 font-bold text-base mt-0.5">{price}</p>
        </div>

        {/* Progress */}
        {step < 3 && (
          <div className="flex gap-0 border-b border-gray-100">
            {["Podaci", "Pregled"].map((s, i) => (
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
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Rezervacija Potvrđena!</h3>
            <div className="bg-blue-50 rounded-2xl p-4 text-left mb-4 text-sm">
              <p className="text-gray-600"><strong>Broj rezervacije:</strong> <span className="text-blue-700 font-black">#{bookingId}</span></p>
              <p className="text-gray-600 mt-1"><strong>Destinacija:</strong> {destination}</p>
              <p className="text-gray-600 mt-1"><strong>Gosti:</strong> {form.guests}</p>
              <p className="text-gray-600 mt-1"><strong>Plaćanje:</strong> {form.payment === "card" ? "💳 Kreditna kartica" : "📋 Rezervacija"}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Potvrda je poslata na <strong className="text-blue-700">{form.email}</strong>. Kontaktiraćemo Vas u roku od 24h.
            </p>
            <button onClick={handleClose} className="w-full py-3 btn-gold text-sm font-bold">Zatvori</button>
          </div>
        ) : step === 2 ? (
          <div className="p-6">
            <h4 className="font-bold text-gray-900 mb-4">Pregled rezervacije</h4>
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm mb-6">
              <p><span className="text-gray-500">Destinacija:</span> <strong>{destination}</strong></p>
              <p><span className="text-gray-500">Ime:</span> <strong>{form.name}</strong></p>
              <p><span className="text-gray-500">Email:</span> <strong>{form.email}</strong></p>
              {form.phone && <p><span className="text-gray-500">Telefon:</span> <strong>{form.phone}</strong></p>}
              <p><span className="text-gray-500">Gosti:</span> <strong>{form.guests}</strong></p>
              {form.checkIn && <p><span className="text-gray-500">Dolazak:</span> <strong>{form.checkIn}</strong></p>}
              {form.checkOut && <p><span className="text-gray-500">Odlazak:</span> <strong>{form.checkOut}</strong></p>}
              <p><span className="text-gray-500">Plaćanje:</span> <strong>{form.payment === "card" ? "💳 Kartica" : "📋 Rezervacija"}</strong></p>
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm mb-4">⚠️ {error}</div>}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-gray-300 text-sm">
                ← Nazad
              </button>
              <button onClick={handleSubmit as any} disabled={loading}
                className="flex-1 py-3 btn-gold text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "⏳ Šaljem..." : "✅ Potvrdi Rezervaciju"}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Ime i prezime *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Marko Marković"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="marko@email.com"/>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Telefon</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="+381 60 ..."/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Dolazak</label>
                <input type="date" value={form.checkIn} onChange={e => setForm({...form, checkIn: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Odlazak</label>
                <input type="date" value={form.checkOut} onChange={e => setForm({...form, checkOut: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Broj gostiju</label>
                <select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"osoba":"osobe/a"}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Plaćanje</label>
                <select value={form.payment} onChange={e => setForm({...form, payment: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                  <option value="card">💳 Kartica</option>
                  <option value="reservation">📋 Rezervacija</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Napomena (opciono)</label>
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                rows={2} placeholder="Posebni zahtevi, pitanja..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
            </div>
            <button type="submit" className="w-full py-3.5 btn-gold font-bold text-sm mt-1">
              Dalje — Pregled rezervacije →
            </button>
            <p className="text-xs text-gray-400 text-center">Bez naknade · Besplatna promena termina · Sigurno plaćanje</p>
          </form>
        )}
      </div>
    </div>
  );
}
