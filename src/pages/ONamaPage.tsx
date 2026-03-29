export default function ONamaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="Agency office" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-blue-950/70"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
          <h1 className="font-serif text-5xl font-bold text-white mb-3">O Nama</h1>
          <p className="text-blue-100 text-lg">Vaš pouzdani partner za nezaboravna putovanja</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Story + Team */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-lg">A</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">Naša Priča</h2>
              </div>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>A1M Travel je osnovana sa jednom jasnom misijom — da svakom putniku pruži <strong>nezaboravno iskustvo</strong> bez brige i komplikacija. Naš tim iskusnih travel eksperata brižljivo bira svaki aranžman, vodeći računa o kvalitetu, ceni i autentičnosti iskustva.</p>
                <p>Smješteni u srcu Loznice, koristimo naše decenijsko iskustvo i mrežu partnera širom sveta da vam ponudimo <strong>ekskluzivne ponude</strong> koje ne možete naći nigde drugde. Od sunčanih mediteranskih plaža do alpskih ski-staza i egzotičnih azijskih destinacija — mi smo tu za vas u svakom koraku.</p>
                <p>Ponosimo se <strong>transparentnim cenama</strong>, personalnim pristupom i podrškom 24/7. Svaki putnik za nas nije samo klijent — to je osoba kojoj verujemo san o savršenom odmoru.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "15+", label: "Godina iskustva" },
                { value: "50k+", label: "Zadovoljnih putnika" },
                { value: "80+", label: "Destinacija" },
                { value: "200+", label: "Partnera" },
              ].map(s => (
                <div key={s.label} className="bg-blue-800 rounded-2xl p-4 text-center text-white">
                  <p className="font-serif font-bold text-2xl text-yellow-400">{s.value}</p>
                  <p className="text-blue-200 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Team */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Naš Tim</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { name: "Marija Jovanović", role: "Direktor Agencije", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", exp: "12 god. iskustva" },
                  { name: "Stefan Petrović", role: "Senior Travel Konsultant", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", exp: "8 god. iskustva" },
                  { name: "Ana Nikolić", role: "Luxury Destinacije", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", exp: "6 god. iskustva" },
                ].map(m => (
                  <div key={m.name} className="text-center">
                    <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-3 border-yellow-400"/>
                    <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                    <p className="text-blue-700 text-xs font-medium">{m.role}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{m.exp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Licence i Sertifikati</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏛️", title: "Licencirana agencija", desc: "Ministerstvo turizma RS — Br. OTP 123/2010" },
                  { icon: "🛡️", title: "Osiguranje putnika", desc: "Generali osiguranje — Partner od 2012." },
                  { icon: "✈️", title: "IATA membre", desc: "Međunarodna vazduhoplovna asocijacija" },
                  { icon: "⭐", title: "TripAdvisor Certificate", desc: "Certificate of Excellence 2023 & 2024" },
                ].map(c => (
                  <div key={c.title} className="flex gap-3 p-4 bg-gray-50 rounded-2xl">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{c.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact + Map */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-700 rounded-3xl p-7 text-white shadow-xl">
              <h3 className="font-serif text-xl font-bold mb-5">Kontakt Informacije</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <p className="font-semibold text-sm">Adresa</p>
                    <p className="text-blue-200 text-sm">Jovana Cvijića 22<br/>15300 Loznica, Srbija</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">✉️</div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a href="mailto:A1Mtravel@email.com" className="text-yellow-300 hover:text-yellow-200 text-sm">A1Mtravel@email.com</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">📞</div>
                  <div>
                    <p className="font-semibold text-sm">Telefon</p>
                    <p className="text-blue-200 text-sm">+381 15 123 456<br/>+381 60 987 654</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">🕐</div>
                  <div>
                    <p className="font-semibold text-sm">Radno vreme</p>
                    <p className="text-blue-200 text-sm">Pon–Pet: 08:00 – 20:00<br/>Sub: 09:00 – 16:00<br/>Ned: Zatvoreno</p>
                  </div>
                </div>
              </div>
              <a href="mailto:A1Mtravel@email.com" className="mt-6 block text-center py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm">
                📧 Pošaljite Upit
              </a>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <span>📍</span> Pronađite Nas
                </h3>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Jovana+Cvijića+22,+Loznica,+Serbia&output=embed&z=15"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="A1M Travel Loznica"
                className="block"
              />
              <div className="p-4">
                <p className="text-xs text-gray-500 text-center">Jovana Cvijića 22, Loznica — u centru grada</p>
              </div>
            </div>

            {/* Agency photo */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                alt="A1M Travel kancelarija"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="font-semibold text-gray-900 text-sm">Naša agencija</p>
                <p className="text-gray-500 text-xs mt-1">Udoban prostor u centru Loznice, spreman za vaše snove o putovanju</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
