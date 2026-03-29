import { useState, useEffect } from "react";
import BookingModal from "../components/BookingModal";
import DestinationDetailModal, { type DestinationDetail } from "../components/DestinationDetailModal";
import AvailabilityBadge, { AvailabilityDates } from "../components/AvailabilityBadge";

type Dest = DestinationDetail & {
  img: string; badge: string; nights: string;
  stars: number; rating: number; desc: string; country: string;
};

const srbija: Dest[] = [
  {
    name: "Kopaonik — Grand Hotel & Spa",
    img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542332213-31f87348e0a4?w=600&q=80",
      "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&q=80",
    ],
    price: "339€", nights: "7 noći", stars: 5, rating: 4.9,
    badge: "All Inclusive", destinationType: "zimovanje",
    desc: "Najveće srpsko skijalište sa 55km staza direktno ispred hotelskih vrata. Olimpijski Spa.",
    country: "Srbija",
    location: "Kopaonik, centralna Srbija — 1770m nadmorske visine, direktno na ski stazi",
    aboutDestination: "Kopaonik je najveće i najopremljenije skijalište Srbije — planinski masiv sa 55 km uređenih ski staza i 40 ski-liftova različitih kategorija. Nadmorska visina od 1770m garantuje odlično snežno pokrivalo od decembra do aprila, a staze su prilagođene svim nivoima skijaša od početnika do eksperta. Pored klasičnog skijanja, Kopaonik nudi nordijsko skijanje, sanka stazu, ice skating i snowboard park. Nacionalni park Kopaonik je zaštićeno područje sa endemskim vrstama flore i faune — cvet Kopaoničke ljubičice je simbol planine.",
    aboutHotel: "Grand Hotel & Spa Kopaonik je jedini pravi 5-zvezdan hotel na Kopaoniku, smešten direktno na ski stazi — možete bukvalno izaći iz hotelskih vrata na skijama! Hotel raspolaže sa 165 luksuznih soba i suita. Spa centar površine 1200m² sa unutrašnjim olimpijskim bazenom 25m, 4 saune, jacuzzi i 25 vrsta masaža. Restoran 'Beli Bor' priprema planinska srpska jela uz živu muziku svake večeri.",
    rooms: "Klasična soba (30m²) sa balkonom i pogledom na ski stazu. Deluxe suite (55m²) sa zasebnim dnevnim boravkom i romantičnim kaminom. Planinska villa (90m²) za porodice.",
    facilities: ["Direktan izlaz na ski stazu", "Olimpijski bazen 25m (28°C)", "SPA centar 1200m²", "4 saune", "Jacuzzi & Turkish Bath", "25 vrsta masaža", "Kids Ski Club (3–12 god)", "Ski room sa grejačima za čizme", "Restoran uz živu muziku", "Iznajmljivanje ski opreme", "Ski škola za odrasle i decu"],
    tip: "Rezervišite ski školu za decu mesec dana unapred — kursevi se pune brzo! Mala deca (3 god+) pohađaju grupnu ski školu dok vi uživate na stazama.",
    includes: ["All Inclusive", "Ski pass", "Ski škola", "SPA", "Oprema", "Transfer"],
    available: ["Dec 27–Jan 3", "Jan 10–17", "Jan 24–31", "Feb 7–14", "Feb 21–28", "Mar 7–14"],
  },
  {
    name: "Zlatibor — Mona Hotel Snow",
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    ],
    price: "149€", nights: "5 noći", stars: 4, rating: 4.7,
    badge: "Polupansion", destinationType: "zimovanje",
    desc: "Zimska bajka na Zlatiboru. Gondola žičara, sanka staza i bazen sa pogledom na sneg.",
    country: "Srbija",
    location: "Zlatibor, Srbija — Tornik ski centar, 1496m nadmorske visine",
    aboutDestination: "Zlatibor se zimi transformiše u snežnu bajku — Tornik ski centar nudi 14 km uređenih ski staza, gondolsku kabinsku žičaru i snowboard park. Staze su prilagođene svim nivoima, posebno porodičnim skijašima sa decom. Sanka staza od 1.5 km savršena je za ne-skijaše. Noćni život na Zlatiboru je živahan: kafane sa etno muzikom i domaća hrana.",
    aboutHotel: "Mona Hotel Snow je 4-zvezdan ski hotel na Zlatiboru, svega 1 km od ski lifta Tornik. Hotel nudi 80 soba i suita sa panoramskim pogledom na planinu i snežne šume. Unutrašnji bazen temperature 32°C sa staklenim pogledom na snežni pejzaž, saune i relaks zona idealni su za opuštanje posle skijanja.",
    rooms: "Standardna soba (26m²) sa balkonom i pogledom na planinu. Deluxe soba (32m²) sa fireplace-om. Apartman za 4 osobe (45m²) sa mini-kuhinjom i zasebnim dnevnim boravkom.",
    facilities: ["Unutrašnji bazen (32°C) sa pogledom na sneg", "Finska sauna", "Relaks zona & masaže", "Ski room sa sušačima", "Restoran srpske kuhinje", "Bar & lounge", "Dečija igraonica", "Wi-Fi besplatan", "Parking besplatan", "Shuttle do ski lifta"],
    tip: "Iznajmite sanjke za decu — sanka staza na Zlatiboru je 1.5 km duga i potpuno bezbedna za porodice. Veče na sankama + kafana = savršena zimska uspomena.",
    includes: ["Polupansion", "Ski pass Tornik", "Bazen", "Shuttle do lifta", "Parking"],
    available: ["Dec 26–31", "Jan 5–10", "Jan 18–23", "Feb 1–6", "Feb 15–20", "Mar 1–6"],
  },
  {
    name: "Stara Planina — Ski Jablaničko",
    img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    ],
    price: "119€", nights: "5 noći", stars: 3, rating: 4.5,
    badge: "Noćenje+Doručak", destinationType: "zimovanje",
    desc: "Neotkrivena zimska destinacija. Autentična planinska atmosfera, manje gužve i pristupačne cene.",
    country: "Srbija",
    location: "Stara Planina, istočna Srbija — Jablaničko skijalište, 1700m n.v.",
    aboutDestination: "Stara Planina je najočuvanija planina Srbije i skrivena zimska dragocjenost — alternativa Kopaoniku za one koji traže mir i autentičnost. Jablaničko skijalište nudi 12 km uređenih staza i 5 ski-liftova na nadmorskoj visini do 1900m. Snežni pokrivač se zadržava od novembra do aprila. Etno-sela na padinama planine nude izvanrednu domaću kuhinju — burek, kačamak, peciva iz peći na drva.",
    aboutHotel: "Planinska kuća Stara Planina je autentični 3-zvezdan objekat sa 40 soba u tradicionalnom stilu. Restoran pripremа planinska jela po starim receptima. Sauna i mini-wellness zona savršeni su za zagrevanje posle skijanja. Drvene kolibe za porodice sa kaminom dostupne su na upit.",
    rooms: "Standardne sobe (20m²) sa planinom-view pogledom. Sobe sa kaminom (25m²). Drvene porodične kolibe (40m²) sa zasebnom kuhinjom.",
    facilities: ["Sauna", "Restoran planinske kuhinje", "Ski room", "Wi-Fi", "Parking", "Shuttle do ski lifta"],
    tip: "Rent sanjke i uzmite trasu do etno-sela — domaćini pripremaju kačamak i rakiju kakvi se ne mogu naći nigde drugde.",
    includes: ["Noćenje+Doručak", "Sauna", "Parking", "Transfer do lifta"],
    available: ["Dec 28–Jan 2", "Jan 12–17", "Feb 2–7", "Feb 16–21", "Mar 2–7"],
  },
];

const inostranstvo: Dest[] = [
  {
    name: "Slovenija — Kranjska Gora",
    img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
    ],
    price: "279€", nights: "5 noći", stars: 4, rating: 4.7,
    badge: "Polupansion", destinationType: "zimovanje",
    desc: "Porodično skijalište 3 km od Italije. Jasna ski centar i Vitranc kup staze Svetskog kupa.",
    country: "Slovenija",
    location: "Kranjska Gora, Gorenjska, Slovenija — 810m n.v., Triglavski nacionalni park",
    aboutDestination: "Kranjska Gora je slovenački alpski dragulj i domaćin ski Svetskog kupa — čuveni Vitranc kup privlači svetski vrh svakog februara. Jasna ski centar nudi 26 km uređenih staza i 18 liftova za sve kategorije skijaša. Triglavski nacionalni park počinje odmah iza sela — zimski izleti do Planice klisure i Vintgar klisure dostupni su svaki dan. Savršena porodična destinacija — mali, bezbedni alpski gradić.",
    aboutHotel: "Hotel Larix 4**** je moderni alpski hotel u srcu Kranjske Gore, 5 minuta pešice od ski lifta. Hotel nudi 72 sobe sa pogledom na Triglav ili ski staze, slovenačkim nameštajem i modernim sadržajima. Unutrašnji bazen (29°C), sauna i wellness zona savršeni su za opuštanje.",
    rooms: "Standardne sobe (26m²) sa balkonom i pogledom na Triglav ili ski staze. Deluxe sobe (34m²) sa kaminskim sedištem. Apartmani za 4 osobe (50m²) sa mini-kuhinjom.",
    facilities: ["Unutrašnji bazen (29°C)", "Finska sauna", "Wellness zona", "Ski room sa grejačima", "Restoran alpske kuhinje", "Bar & lounge", "Dečija igraonica", "Wi-Fi besplatan", "Parking besplatan", "Shuttle do ski lifta"],
    tip: "Rent-a-car je preporuka — za 30 min budete u Udine (Italija) ili Villach (Austrija). Tri alpske kulture, kuhinje i pejzaži u jednom danu!",
    includes: ["Polupansion", "Ski pass Jasna", "Bazen & sauna", "Transfer", "Parking"],
    available: ["Dec 27–Jan 1", "Jan 10–15", "Jan 24–29", "Feb 7–12", "Feb 21–26"],
  },
  {
    name: "Austrija — Innsbruck Ski Resort",
    img: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    ],
    price: "649€", nights: "7 noći", stars: 4, rating: 4.8,
    badge: "Hotel+Let", destinationType: "zimovanje",
    desc: "Olimpijska prestonica Tirola. 300+ km staza, Stubai Glacier i barokni Innsbruck.",
    country: "Austrija",
    location: "Innsbruck, Tirol, Austrija — 573m nadmorske visine, okružen Alpama do 3210m",
    aboutDestination: "Innsbruck je prestonica austrijskog Tirola i jedini grad koji je dva puta ugostio Zimske olimpijade (1964. i 1976.). Grad okružuje 6 ski oblasti sa ukupno 300+ km uređenih staza, neke do 3300m na Stubai Gletscher — glečerskom skijalištu otvorenom 12 meseci godišnje. Sâm grad je remek-delo barokne arhitekture: Zlatni krov, dvorac Hofburg i gotička katedrala.",
    aboutHotel: "Hotel Alpine Lodge 4**** je u srcu Innsbruck-a, 10 minuta pešice od Marktplatz i stajaješta ski-busa. Hotel ima 65 soba sa tirloskim drvenim nameštajem, wellness centar sa saunom i jacuzzijem, te klasičan austrijski restoran koji priprema schnitzel, strudl i tirolske specijalitete. Gosti dobijaju Innsbruck Card — besplatan javni prevoz i ski-bus.",
    rooms: "Standardne sobe (28–32m²) sa tirloskim nameštajem i pogledom na planinu. Deluxe sobe (42m²) sa panoramskim prozorom. Porodične sobe (48m²) za 4 osobe.",
    facilities: ["Besplatni ski-bus card (6 ski zona)", "Ski room sa grejačima za obuću", "Wellness & sauna", "Jacuzzi", "Austrijski restoran", "Tirolski vinski bar", "Wi-Fi", "Concierge za ski rezervacije"],
    tip: "Stubai Glacier nudi skijanje čak i u maju — ledničke staze na 3200m. Preporučujemo celonevni izlet sa vodičem sa nestvarnim doživljajem vožnje po glečeru.",
    includes: ["Hotel 4*", "Avio karta", "Transfer", "Ski-bus card", "Sauna & wellness"],
    available: ["Dec 21–28", "Jan 4–11", "Jan 18–25", "Feb 8–15", "Feb 22–Mar 1"],
  },
  {
    name: "Italija — Dolomiti, Val Gardena",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=600&q=80",
    ],
    price: "979€", nights: "7 noći", stars: 5, rating: 4.9,
    badge: "All Inclusive", destinationType: "zimovanje",
    desc: "UNESCO Dolomiti i legendarni Sellaronda ski karusel. Ladin kultura i fine dining.",
    country: "Italija",
    location: "Ortisei, Val Gardena, Trentino-Alto Adige, Italija — 1236m n.v.",
    aboutDestination: "Dolomiti su UNESCO svetska prirodna baština — jedinstvene vapnenačke planine koje menjaju boje od ružičaste do narandžaste pri zalasku sunca. Val Gardena je srce Dolomita i polazna tačka za legendarni Sellaronda ski karusel — 26 km staza koji se vraća na polaznu tačku bez ponavljanja ijedne staze. Lokalna Ladin kultura daje poseban karakter selima Ortisei, Santa Cristina i Selva.",
    aboutHotel: "Hotel Tyrol ***** u Ortisei — porodični 5-zvezdan hotel sa 100-godišnjom tradicijom. Hotel ima sopstveni ski-lift koji kreće direktno ispred ulaza. Outdoor jacuzzi sa 360° pogledom na Dolomite. Fine dining restoran nudi degustacioni meni sa Ladinskim specijalitetima i vinom iz Južnog Tirola.",
    rooms: "Sobe (32–75m²) sa balkonima i pogledom na Dolomite, tirolski drveni nameštaj i kamine u premium kategorijama. Porodični suite (80m²) sa 2 spavaće sobe.",
    facilities: ["Direktni sopstveni ski-lift", "Outdoor jacuzzi sa pogledom na Dolomite", "Indoor bazen (28°C)", "SPA i wellness 900m²", "Fine dining restoran", "Tirolski vinski podrum", "Ski room sa grejačima", "Dečija soba sa animacijom"],
    tip: "Sellaronda karusel je must-do — krenite SUPROTNO od oznaka i imaćete manje gužve i kraće čekanje na liftovima u vrhunskim delovima karusela.",
    includes: ["All Inclusive", "Ski pass Dolomiti Superski", "Direktni ski-lift", "SPA", "Fine dining"],
    available: ["Dec 22–29", "Jan 3–10", "Jan 17–24", "Feb 7–14", "Feb 21–28"],
  },
  {
    name: "Švajcarska — Verbier",
    img: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80"],
    price: "1199€", nights: "7 noći", stars: 5, rating: 5.0,
    badge: "VIP paket", destinationType: "zimovanje",
    desc: "Jetset skijalište sveta sa 412 km staza. Butler usluga i privatni ski instruktor.",
    country: "Švajcarska",
    location: "Verbier, Valais, Švajcarska — 1500m nadmorske visine, pogled na Mont-Blanc",
    aboutDestination: "Verbier je globalna prestonica elitnog skijanja — oblast 4 Vallées nudi 412 km uređenih staza i 94 ski-lifta, neke do 3300m. Verbier domaćin čuvenog Verbier Festivala klasične muzike. Après-ski u Farm Club-u i Farinet baru je svetski poznat — strani royals i celebrities su stalni gosti.",
    aboutHotel: "Chalet RoyAlp Hotel & Spa je ekskluzivni 5-zvezdan hotel na 50 metara od gondole. Svaki od 65 suita je privatni chalet sa sopstvenom terasom, kaminom i spa-kupatilom od mramora. Privatni butler dostupan je 24/7.",
    rooms: "Chalet Suite (55–90m²) sa privatnom terasom i pogledom na Mont-Blanc, kaminom i mramornim spa kupatilom. Royal Suite (150m²) sa privatnim jacuzzijem na terasi.",
    facilities: ["Butler usluga 24/7", "Privatni ski instruktor", "Ski Concierge servis", "Indoor & outdoor bazeni", "Medical SPA & Thalasso", "Fine dining restoran", "Vinski podrum sa 400+ etiketa", "Après-ski bar", "Privatni Rolls-Royce transfer", "Heli-skiing organizacija"],
    tip: "Zakupite vodiča za off-piste freeride u Val de Bagnes — za iskusne skijaše, ali nagrada je netaknuti prah sneg i panorame Alpa kakve ne vidite nigde drugde.",
    includes: ["Hotel 5*", "Avio karta", "Privatni transfer", "Ski pass 4 Vallées", "Butler", "Privatna instrukcija"],
    available: ["Dec 20–27", "Jan 3–10", "Jan 24–31", "Feb 14–21"],
  },
];

export default function ZimovanjaPage() {
  const [modal, setModal] = useState<{ open: boolean; name: string; price: string }>({ open: false, name: "", price: "" });
  const [tab, setTab] = useState<"srbija" | "inostranstvo">("srbija");
  const [selectedDetail, setSelectedDetail] = useState<DestinationDetail | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zemlja = params.get("zemlja") || "";
    if (zemlja && zemlja !== "Srbija") setTab("inostranstvo");
  }, []);

  const list = tab === "srbija" ? srbija : inostranstvo;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=80" alt="Ski" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-blue-900/60"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
          <p className="text-yellow-400 font-semibold uppercase tracking-widest text-sm mb-2">Sezona 2025/2026</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-3">Zimovanja</h1>
          <p className="text-blue-100 text-lg">Skijanje, adrenalin i zimska bajka na najboljim skijalištima</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-blue-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 text-sm flex-wrap justify-center">
          <span>⛷️ <strong>Ski pass</strong> uključen u cenu</span>
          <span>🎿 <strong>Oprema</strong> dostupna na licu mesta</span>
          <span>🏔️ <strong>Ski škola</strong> za sve uzraste</span>
          <span>🚌 <strong>Polasci</strong> iz Loznice i Beograda</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0">
          {(["srbija", "inostranstvo"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-8 py-4 font-semibold text-sm transition-all border-b-2 ${tab === t ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t === "srbija" ? "🇷🇸 Zimovanje u Srbiji" : "✈️ Inostranstvo"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Info banner za inostranstvo */}
        {tab === "inostranstvo" && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-10 flex gap-4 items-start">
            <span className="text-2xl">✈️</span>
            <div>
              <p className="font-bold text-blue-800">Avio i autobus polasci iz Srbije</p>
              <p className="text-blue-700 text-sm mt-1">Za Sloveniju i bliže destinacije — komforni autobus iz Loznice i Beograda. Za Austriju, Italiju i Švajcarsku — avio karta iz Beograda uključena u cenu aranžmana.</p>
            </div>
          </div>
        )}

        {/* Info banner za Srbiju */}
        {tab === "srbija" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-10 flex gap-4 items-start">
            <span className="text-2xl">🚌</span>
            <div>
              <p className="font-bold text-yellow-800">Polasci autobusom — bez avio karata</p>
              <p className="text-yellow-700 text-sm mt-1">Svi aranžmani u Srbiji uključuju komforan autobus polazak iz Loznice i Beograda. Nema brige oko karata — sve je u ceni.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((d) => (
            <div key={d.name} className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover border border-gray-100">
              <div className="relative h-52 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className="badge-gold text-xs">{d.badge}</span>
                  <AvailabilityBadge dates={d.available} size="sm" />
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-0.5 text-xs font-bold text-yellow-600">{"⭐".repeat(d.stars)}</div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif font-bold text-lg text-white leading-tight">{d.name}</h3>
                  <p className="text-white/70 text-xs">{d.nights}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {d.includes.slice(0, 4).map(i => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">✓ {i}</span>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Termini:</p>
                  <AvailabilityDates dates={d.available} max={3} />
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Cena po osobi</p>
                    <p className="price-tag">od {d.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedDetail(d)} className="px-3 py-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl transition-colors">
                      Detaljnije →
                    </button>
                    <button onClick={() => setModal({ open: true, name: d.name, price: d.price })} className="px-3 py-2 btn-gold text-xs font-bold rounded-xl">
                      Rezerviši
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal isOpen={modal.open} onClose={() => setModal({ ...modal, open: false })} destination={modal.name} price={modal.price} />
      <DestinationDetailModal detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
    </div>
  );
}
