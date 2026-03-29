import { useState, useEffect } from "react";
import { adminLogin, getBookings, updateBookingStatus, deleteBooking, getDestinations, addDestination, updateDestination, deleteDestination } from "../lib/api";

const TOKEN_KEY = "a1m_admin_token";

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: "Na čekanju", color: "text-yellow-700", bg: "bg-yellow-100" },
  confirmed: { label: "Potvrđeno",  color: "text-green-700",  bg: "bg-green-100" },
  cancelled: { label: "Otkazano",   color: "text-red-700",    bg: "bg-red-100" },
  completed: { label: "Završeno",   color: "text-blue-700",   bg: "bg-blue-100" },
};
const DEST_TYPES = ["letovanje", "zimovanje", "izlet", "hotel"];
const TYPE_ICONS: Record<string, string> = { letovanje: "🏖️", zimovanje: "⛷️", izlet: "🚌", hotel: "🏨" };

const EMPTY_FORM = { type: "letovanje", name: "", description: "", price: "", imageUrl: "", badge: "", nights: "", stars: 4, rating: 4.5, availableDates: "", includes: "" };

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"bookings" | "destinations" | "prices">("bookings");

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [destLoading, setDestLoading] = useState(false);

  const [showDestForm, setShowDestForm] = useState(false);
  const [editDest, setEditDest] = useState<any | null>(null);
  const [destForm, setDestForm] = useState({ ...EMPTY_FORM });

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQ, setSearchQ] = useState("");

  const [editingPrice, setEditingPrice] = useState<number | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);

  const isLoggedIn = !!token;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const t = await adminLogin(password);
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => { localStorage.removeItem(TOKEN_KEY); setToken(""); };

  const loadBookings = async () => {
    setBookingsLoading(true);
    try {
      setBookings(await getBookings(token));
    } catch {
      handleLogout();
    } finally {
      setBookingsLoading(false);
    }
  };

  const loadDestinations = async () => {
    setDestLoading(true);
    try {
      setDestinations(await getDestinations());
    } finally {
      setDestLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    loadBookings();
    loadDestinations();
  }, [isLoggedIn]);

  const handleStatusChange = async (id: number, status: string) => {
    await updateBookingStatus(token, id, status);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Obrisati rezervaciju?")) return;
    await deleteBooking(token, id);
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const openAddDest = () => {
    setEditDest(null);
    setDestForm({ ...EMPTY_FORM });
    setShowDestForm(true);
  };

  const openEditDest = (d: any) => {
    setEditDest(d);
    setDestForm({ type: d.type, name: d.name, description: d.description || "", price: d.price || "", imageUrl: d.imageUrl || "", badge: d.badge || "", nights: d.nights || "", stars: d.stars || 4, rating: parseFloat(d.rating) || 4.5, availableDates: d.availableDates || "", includes: d.includes || "" });
    setShowDestForm(true);
    setTab("destinations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDest = async () => {
    try {
      if (editDest) {
        const updated = await updateDestination(token, editDest.id, destForm);
        setDestinations(prev => prev.map(d => d.id === editDest.id ? updated : d));
      } else {
        const added = await addDestination(token, destForm);
        setDestinations(prev => [added, ...prev]);
      }
      setShowDestForm(false);
      setEditDest(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteDest = async (id: number) => {
    if (!confirm("Obrisati destinaciju?")) return;
    await deleteDestination(token, id);
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const handleSavePrice = async (id: number) => {
    const val = priceInput.trim();
    if (!val) return;
    const price = val.includes("€") ? val : `${val}€`;
    const updated = await updateDestination(token, id, { price });
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, price: updated.price } : d));
    setEditingPrice(null);
  };

  const filteredBookings = bookings.filter(b => {
    if (filterType !== "all" && b.destinationType !== filterType) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (searchQ && ![b.name, b.email, b.destination, b.phone].join(" ").toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    revenue: bookings.filter(b => b.status === "confirmed").length * 320,
  };

  const exportCSV = () => {
    const rows = [["ID", "Ime", "Email", "Telefon", "Destinacija", "Tip", "Gosti", "Dolazak", "Odlazak", "Status", "Napomena", "Datum"]];
    filteredBookings.forEach(b => rows.push([b.id, b.name, b.email, b.phone || "", b.destination, b.destinationType || "", b.guests, b.checkIn || "", b.checkOut || "", b.status, b.notes || "", new Date(b.createdAt).toLocaleString("sr-RS")]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
    a.download = `rezervacije-${new Date().toISOString().split("T")[0]}.csv`; a.click();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[hsl(208,79%,27%)] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-400 shadow-lg">
              <span className="text-yellow-400 font-black text-sm tracking-wider">A1M</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">A1M Travel — Upravljanje sistemom</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Admin lozinka</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                placeholder="••••••••" autoFocus/>
            </div>
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
                ⚠️ {loginError}
              </div>
            )}
            <button type="submit" disabled={loginLoading}
              className="w-full py-3.5 bg-[hsl(208,79%,27%)] hover:bg-[hsl(208,79%,22%)] text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60">
              {loginLoading ? "⏳ Prijavljivanje..." : "🔐 Prijavi Se"}
            </button>
          </form>
          <p className="text-xs text-gray-300 text-center mt-6">Pristup isključivo za administratore</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[hsl(208,79%,27%)] text-white px-6 py-4 flex items-center justify-between shadow-xl sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center shadow">
            <span className="text-blue-900 font-black text-xs">A1M</span>
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide">A1M Travel — Admin Panel</p>
            <p className="text-blue-300 text-xs">{new Date().toLocaleDateString("sr-RS", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-xs font-bold transition-colors">
          🚪 Odjavi Se
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 pb-0">
        {[
          { label: "Ukupno rezervacija", value: stats.total,     icon: "📋", color: "bg-blue-600",   sub: "sve rezervacije" },
          { label: "Na čekanju",         value: stats.pending,   icon: "⏳", color: "bg-yellow-500", sub: "čekaju potvrdu" },
          { label: "Potvrđeno",          value: stats.confirmed, icon: "✅", color: "bg-green-600",  sub: "aktivne" },
          { label: "Destinacije",        value: destinations.length, icon: "🌍", color: "bg-purple-600", sub: "u bazi" },
        ].map(s => (
          <div key={s.label} className={`${s.color} text-white rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-black">{s.value}</p>
                <p className="text-white/70 text-xs mt-1">{s.sub}</p>
              </div>
              <span className="text-2xl opacity-80">{s.icon}</span>
            </div>
            <p className="text-white/80 text-xs mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 pt-6">
        <div className="flex gap-1 bg-white rounded-2xl shadow-sm p-1 border border-gray-100 w-fit">
          {([
            { key: "bookings",     icon: "📋", label: `Rezervacije (${bookings.length})` },
            { key: "destinations", icon: "🌍", label: `Destinacije (${destinations.length})` },
            { key: "prices",       icon: "💰", label: "Upravljanje cenama" },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 font-semibold text-sm rounded-xl transition-all ${tab === t.key ? "bg-[hsl(208,79%,27%)] text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────── BOOKINGS TAB ─────────── */}
      {tab === "bookings" && (
        <div className="p-6 space-y-4">
          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
              placeholder="🔍  Pretraži po imenu, emailu, destinaciji..."
              className="flex-1 min-w-60 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400"/>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
              <option value="all">Svi statusi</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400">
              <option value="all">Svi tipovi</option>
              {DEST_TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
            <button onClick={loadBookings} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
              🔄 Osveži
            </button>
            <button onClick={exportCSV} className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold hover:bg-green-100 transition-colors">
              📥 Export CSV
            </button>
          </div>

          {/* Count */}
          <p className="text-xs text-gray-400 px-1">Prikazano {filteredBookings.length} od {bookings.length} rezervacija</p>

          {bookingsLoading ? (
            <div className="text-center py-24 text-gray-400"><p className="text-4xl mb-3">⏳</p><p>Učitavanje rezervacija...</p></div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-24 text-gray-400"><p className="text-4xl mb-3">📋</p><p className="font-medium">Nema rezervacija za prikaz</p></div>
          ) : (
            <div className="space-y-3">
              {filteredBookings.map(b => {
                const sl = STATUS_LABELS[b.status] || STATUS_LABELS.pending;
                const isExp = expandedBooking === b.id;
                return (
                  <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Main row */}
                    <div className="p-5 flex flex-wrap items-start gap-4">
                      {/* Left info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-black text-gray-400 text-sm">#{b.id}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${sl.bg} ${sl.color}`}>{sl.label}</span>
                          {b.destinationType && (
                            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                              {TYPE_ICONS[b.destinationType]} {b.destinationType}
                            </span>
                          )}
                          <span className="text-xs text-gray-400 ml-auto">{new Date(b.createdAt).toLocaleString("sr-RS")}</span>
                        </div>
                        <p className="font-bold text-gray-900 text-base">{b.name}</p>
                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                          <a href={`mailto:${b.email}`} className="hover:text-blue-600 transition-colors">✉️ {b.email}</a>
                          {b.phone && <span>📞 {b.phone}</span>}
                        </div>
                        <p className="text-sm font-semibold text-[hsl(208,79%,27%)] mt-2">🌴 {b.destination}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                          {b.checkIn  && <span>📅 Dolazak: <strong className="text-gray-600">{b.checkIn}</strong></span>}
                          {b.checkOut && <span>📅 Polazak: <strong className="text-gray-600">{b.checkOut}</strong></span>}
                          <span>👥 Gosti: <strong className="text-gray-600">{b.guests}</strong></span>
                          <span>{b.paymentMethod === "card" ? "💳 Kartica" : "📋 Rezervacija"}</span>
                        </div>
                        {b.notes && <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5 mt-2 inline-block">📝 {b.notes}</p>}
                      </div>

                      {/* Right controls */}
                      <div className="flex flex-col gap-2 min-w-36">
                        <label className="text-xs text-gray-400 font-bold uppercase">Status</label>
                        <select value={b.status} onChange={e => handleStatusChange(b.id, e.target.value)}
                          className="border-2 border-gray-100 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-blue-400 bg-white">
                          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                        </select>
                        <button onClick={() => setExpandedBooking(isExp ? null : b.id)}
                          className="py-2 border-2 border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-blue-200 hover:text-blue-600 transition-colors">
                          {isExp ? "▲ Sakrij" : "▼ Detalji"}
                        </button>
                        <button onClick={() => handleDeleteBooking(b.id)}
                          className="py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">
                          🗑️ Obriši
                        </button>
                      </div>
                    </div>

                    {/* Expanded */}
                    {isExp && (
                      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-xs text-gray-500 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div><p className="font-bold text-gray-700 mb-0.5">ID Rezervacije</p><p>#{b.id}</p></div>
                        <div><p className="font-bold text-gray-700 mb-0.5">Kreirana</p><p>{new Date(b.createdAt).toLocaleString("sr-RS")}</p></div>
                        <div><p className="font-bold text-gray-700 mb-0.5">Plaćanje</p><p>{b.paymentMethod === "card" ? "Kreditna kartica" : "Rezervacija"}</p></div>
                        <div><p className="font-bold text-gray-700 mb-0.5">Tip aranžmana</p><p>{b.destinationType || "—"}</p></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─────────── DESTINATIONS TAB ─────────── */}
      {tab === "destinations" && (
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">Destinacije <span className="text-gray-400 font-normal text-base">({destinations.length})</span></h2>
            <button onClick={openAddDest} className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm rounded-xl transition-colors shadow">
              ➕ Nova Destinacija
            </button>
          </div>

          {/* Add / Edit Form */}
          {showDestForm && (
            <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg p-6">
              <h3 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
                {editDest ? "✏️ Izmeni destinaciju" : "➕ Nova destinacija"}
                <span className="text-xs font-normal text-gray-400 ml-auto">* Obavezna polja</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Tip aranžmana">
                  <select value={destForm.type} onChange={e => setDestForm({...destForm, type: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                    {DEST_TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </Field>
                <Field label="Naziv *">
                  <input value={destForm.name} onChange={e => setDestForm({...destForm, name: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="npr. Grčka — Krf, Hotel Dassia"/>
                </Field>
                <Field label="Cena (npr. 299€)" extra="*">
                  <input value={destForm.price} onChange={e => setDestForm({...destForm, price: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="299€"/>
                </Field>
                <Field label="Badge / Tip usluge">
                  <input value={destForm.badge} onChange={e => setDestForm({...destForm, badge: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="All Inclusive, Polupansion..."/>
                </Field>
                <Field label="Trajanje">
                  <input value={destForm.nights} onChange={e => setDestForm({...destForm, nights: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="7 noći / 1 dan"/>
                </Field>
                <Field label="Zvezdice (1–5)">
                  <input type="number" min={1} max={5} value={destForm.stars} onChange={e => setDestForm({...destForm, stars: Number(e.target.value)})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"/>
                </Field>
                <Field label="URL slike" span={2}>
                  <input value={destForm.imageUrl} onChange={e => setDestForm({...destForm, imageUrl: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="https://images.unsplash.com/...?w=600&q=80"/>
                  {destForm.imageUrl && <img src={destForm.imageUrl} className="mt-2 rounded-xl h-24 object-cover w-full" onError={e => (e.target as HTMLImageElement).style.display = "none"}/>}
                </Field>
                <Field label="Opis" span={2}>
                  <textarea value={destForm.description} onChange={e => setDestForm({...destForm, description: e.target.value})}
                    rows={2} className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 resize-none"
                    placeholder="Kratki opis destinacije za karticama..."/>
                </Field>
                <Field label="Slobodni termini (odvojeno sa |)" span={2}>
                  <input value={destForm.availableDates} onChange={e => setDestForm({...destForm, availableDates: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="Jun 1–8|Jul 1–8|Aug 1–8"/>
                </Field>
                <Field label="Uključeno u cenu (odvojeno sa |)" span={2}>
                  <input value={destForm.includes} onChange={e => setDestForm({...destForm, includes: e.target.value})}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
                    placeholder="All Inclusive|Transfer|Charter let|Animacija"/>
                </Field>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowDestForm(false); setEditDest(null); }}
                  className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-600 text-sm hover:border-gray-300 transition-colors">
                  Otkaži
                </button>
                <button onClick={handleSaveDest}
                  className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm rounded-xl transition-colors shadow">
                  {editDest ? "💾 Sačuvaj izmene" : "➕ Dodaj destinaciju"}
                </button>
              </div>
            </div>
          )}

          {destLoading ? (
            <div className="text-center py-24 text-gray-400"><p className="text-4xl mb-3">⏳</p><p>Učitavanje...</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {destinations.map(d => (
                <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {d.imageUrl
                    ? <img src={d.imageUrl} alt={d.name} className="w-full h-36 object-cover"/>
                    : <div className="w-full h-20 bg-gray-100 flex items-center justify-center text-3xl">{TYPE_ICONS[d.type] || "🌍"}</div>
                  }
                  <div className="p-4">
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold">{TYPE_ICONS[d.type]} {d.type}</span>
                      {d.badge && <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full font-bold">{d.badge}</span>}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{d.name}</h3>
                    <p className="text-[hsl(208,79%,27%)] font-black text-lg mt-1">{d.price || "—"}</p>
                    {d.nights && <p className="text-xs text-gray-400">{d.nights}</p>}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => openEditDest(d)} className="flex-1 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors">
                        ✏️ Izmeni
                      </button>
                      <button onClick={() => handleDeleteDest(d.id)} className="py-2 px-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─────────── PRICES TAB ─────────── */}
      {tab === "prices" && (
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800 flex items-start gap-3">
            <span className="text-xl mt-0.5">💡</span>
            <div>
              <p className="font-bold mb-0.5">Brzo uređivanje cena</p>
              <p className="text-blue-700">Klikni na cenu bilo koje destinacije da je odmah izmeniš — bez otvaranja cele forme.</p>
            </div>
          </div>

          {DEST_TYPES.map(type => {
            const group = destinations.filter(d => d.type === type);
            if (group.length === 0) return null;
            return (
              <div key={type} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
                  <span className="text-lg">{TYPE_ICONS[type]}</span>
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                  <span className="text-xs text-gray-400 ml-auto">{group.length} destinacija</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {group.map(d => (
                    <div key={d.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                      {d.imageUrl
                        ? <img src={d.imageUrl} alt={d.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0"/>
                        : <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">{TYPE_ICONS[type]}</div>
                      }
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{d.name}</p>
                        <p className="text-xs text-gray-400">{d.nights || "—"} {d.badge && `· ${d.badge}`}</p>
                      </div>

                      {/* Price editor */}
                      {editingPrice === d.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            value={priceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleSavePrice(d.id); if (e.key === "Escape") setEditingPrice(null); }}
                            className="border-2 border-blue-400 rounded-xl px-3 py-1.5 text-sm font-bold w-28 focus:outline-none text-center"
                            autoFocus
                            placeholder="299€"
                          />
                          <button onClick={() => handleSavePrice(d.id)} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                          </button>
                          <button onClick={() => setEditingPrice(null)} className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingPrice(d.id); setPriceInput(d.price?.replace("€", "") || ""); }}
                          className="flex items-center gap-2 bg-gray-50 hover:bg-yellow-50 border-2 border-gray-100 hover:border-yellow-300 rounded-xl px-4 py-2 transition-all group"
                        >
                          <span className="font-black text-[hsl(208,79%,27%)] text-base">{d.price || "—"}</span>
                          <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children, span, extra }: { label: string; children: React.ReactNode; span?: number; extra?: string }) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
        {label} {extra && <span className="text-red-400">{extra}</span>}
      </label>
      {children}
    </div>
  );
}
