import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import BookingModal from "../components/BookingModal";
import DestinationDetailModal, { type DestinationDetail } from "../components/DestinationDetailModal";
import { getDestinations } from "../lib/api";
import { ALL_LOCAL, parsePrice as parsePriceLocal } from "../lib/localDestinations";
import { useDestLineString, useTranslatedDestination } from "../hooks/useTranslatedDestination";
import { formatNights } from "../lib/i18nFormat";

const featuredDest: (DestinationDetail & { img: string; badge: string; rating: number; destId?: string })[] = [
  {
    destId: "leto-grcka-krf",
    name: "Grčka — Krf, Hotel Dassia Beach",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80",
      "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=600&q=80",
    ],
    price: "349€", badge: "All Inclusive", rating: 4.9, nights: "7 noći", stars: 5,
    destinationType: "letovanje",
    location: "Uvala Dasija, Krf (Corfu), Jonsko More — 12 km od Kerkire",
    aboutDestination: "Krf je najzeleniji grčki ostrvo u Jonskom moru, poznat po gustim maslinjarevima, venecijanskoj arhitekturi i kristalno bistrim vodama. Uvala Dasija smešta se na severoistočnoj obali ostrva — prepoznatljiva po dugoj šljunkovitoj plaži okruženoj mediteranskim zelenilom. Grad Kerkira (Corfu Town) je UNESCO svetska baština sa mletačkim palačama i Fortecą iz 13. veka. Obavezno posetiti: uvalu Paleokastritsa, Achilleion palatu carice Sisi i autentična ribarska sela.",
    aboutHotel: "Hotel Dassia Beach je prostrani 5-zvezdan resort smešten direktno uz plažu u uvali Dasija sa 280 klimatizovanih soba i apartmana. All Inclusive sistem nudi tri bogata obroka u centralnom restoranu plus šankove na plaži i bazenu. Gostima su na raspolaganju ležaljke i suncobrani na plaži bez ikakvih doplata.",
    rooms: "Standardne sobe (22–28m²) sa balkonom i pogledom na more ili baštu. Porodični apartmani (35–42m²) za max 2 odrasle + 2 dece sa odvojenom sobe za decu.",
    facilities: ["Spoljni bazen 25m", "Dečiji bazen sa toboganima", "Aqua park besplatan", "Animacija danju i noću", "Teniski teren", "Fitness centar", "Wi-Fi besplatan", "Parking besplatan", "Rent-a-car servis"],
    beach: "Šljunkovito-peščana plaža duga 800m direktno ispred hotela. Ležaljke i suncobrani uključeni u All Inclusive. Vodeni sportovi dostupni uz doplatu.",
    tip: "Preporučujemo celonevni izlet brodom do uvale Paleokastritsa sa zaustavljanjem u ribarskoj taverni — jedna od najlepših stvari koje možete uraditi na Krfu!",
    includes: ["All Inclusive", "Charter let", "Transfer", "Animacija", "Aqua park"],
    available: ["Jun 8–15", "Jun 22–29", "Jul 6–13", "Jul 20–27", "Aug 3–10"],
  },
  {
    destId: "leto-turska-ant",
    name: "Turska — Antalija, Club Hotel",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    ],
    price: "299€", badge: "Ultra All Inc.", rating: 4.8, nights: "7 noći", stars: 5,
    destinationType: "letovanje",
    location: "Konyaaltı, Antalija, Turska — 10 km od centra Antalije, Mediteran",
    aboutDestination: "Antalija je prestonica turske rivijere — sunčano odmaralište sa 300 km peščanih plaža okruženih Tauruskim planinama. Istorijsko srce Antalije je Kaleiçi sa rimskim Hadrijanovim lukom iz 130. g.n.e. U okolini: antički Aspendos sa najočuvanijim rimskim amfiteatrom za 15.000 gledalaca, slapovi Düden Waterfalls i grad Side. Temperatura mora u julu/avgustu dostiže 28–30°C.",
    aboutHotel: "Club Hotel je monumentalni 5-zvezdan resort sa Ultra All Inclusive sistemom koji pokriva sva jela i alkohol 24 sata bez ograničenja. Impresivni vodeni park sa 12 tobogana i lazy river dužine 150m je potpuno besplatan. Hotel ima 4 restorana, 6 barova i spa centar od 1500m².",
    rooms: "Standardne sobe (30m²) sa balkonom, klima uređajem i sefom. Porodične sobe (48m²) za 2+2 sa bunk krevetima. Family suite (65m²) sa dve odvojene spavaće sobe.",
    facilities: ["Ultra All Inclusive 24h", "Vodeni park sa 12 tobogana", "Lazy River 150m", "4 bazena", "Kids club", "Fitness & hamam", "5 restorana", "6 barova", "Tenis i sportski tereni"],
    beach: "Šljunkovita plaža Konyaaltı duga 7 km. Besplatni shuttle svakih 30 minuta iz hotela do plaže. Vodeni sportovi dostupni uz doplatu.",
    tip: "Ne propustite posetu antičkom Aspendosu (45 min vožnje) — organizovani transfer iz hotela dostupan svaki dan oko 09:30.",
    includes: ["Ultra All Inclusive", "Charter let", "Transfer", "Kids club", "Water park"],
    available: ["Jun 1–8", "Jun 15–22", "Jul 1–8", "Jul 15–22", "Aug 1–8", "Aug 15–22"],
  },
  {
    destId: "leto-egipat-hur",
    name: "Egipat — Hurgada, Arabela Resort",
    img: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546948630-b2aefd08f3fa?w=600&q=80",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
    ],
    price: "449€", badge: "All Inclusive", rating: 4.7, nights: "10 noći", stars: 5,
    destinationType: "letovanje",
    location: "Safaga Bay, Hurgada, Egipat — 25 km južno od centra, Crveno more",
    aboutDestination: "Hurgada je egipatsko odmaralište na Crvenom moru, poznato po koralnim grebenima proglašenim jednim od najlepših za ronjenje na svetu. Temperatura mora je konstantnih 25–27°C tokom cele godine sa vidljivošću u vodi do 30m. Koralni grebeni stanište su 400+ vrsta ribe, morskih kornjača i delfina. Snorkelovanje direktno sa plaže je jedinstven doživljaj.",
    aboutHotel: "Arabela Resort je luksuzni 5-zvezdan hotel u zaštićenoj uvali sa sopstvenom koralnom plažom. Ronilački centar certificiran od PADI nudi kurseve i ture, a snorkelovanje oprema je besplatna za sve goste. All Inclusive pokriva sva jela, alkohol i bezalkoholna pića.",
    rooms: "Standardne sobe (32m²) sa balkonom i pogledom na more ili baštu. Sea view bungalovi uz plaži (48m²) — preporučujemo za nezaboravan doživljaj.",
    facilities: ["3 spoljnja olimpijska bazena", "Privatna koralna plaža", "PADI ronilački centar", "Snorkelovanje oprema besplatno", "4 restorana", "Hamam i masaže", "Desert Safari izleti"],
    beach: "Privatna koralna plaža u zaštićenoj uvali. Koralni greben počinje na svega 15m od obale — snorkelovanje direktno sa plaže! Ležaljke i suncobrani besplatni.",
    tip: "PADI Open Water kurs u 3 dana — postajete sertifikovani ronilac i otvara vam se svet koralnih grebena Crvenog mora. Grupni kursevi od 150€.",
    includes: ["All Inclusive", "Charter let", "Transfer", "Ronjenje", "Desert Safari"],
    available: ["Jun 5–15", "Jul 3–13", "Aug 7–17", "Sep 2–12"],
  },
  {
    destId: "leto-spanija-bcn",
    name: "Španija — Barcelona, Hotel Arts",
    img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80"],
    price: "389€", badge: "Hotel+Let", rating: 4.8, nights: "7 noći", stars: 5,
    destinationType: "letovanje",
    location: "Barceloneta, Barcelona, Španija — direktno na plaži, centar grada",
    aboutDestination: "Barcelona je jedno od najuzbudljivijih gradova Mediterana — grad Gaudijeve arhitekture, flamenkoa i playa kulture. Sagrada Família (u izgradnji od 1882, planira se završetak 2026) je UNESCO svetska baština i apsolutni simbol grada. Park Güell sa mozaičkim terasama, četvrt Gothic s katedralama iz 14. veka, La Boqueria pijaca i Las Ramblas su neizostavni deo doživljaja. Barceloneta plaža je srce gradskog kupanja sa peskom i palme šetnicom.",
    aboutHotel: "Hotel Arts Barcelona je ikonski 44-spratni toranj direktno na Barceloneta plaži, jedini pravi beachfront luksuzni hotel u gradu. Hotel nudi 397 soba i suita sa panoramskim pogledom na Mediteran ili grad. Restoran Enoteca ima 2 Michelin zvezde. Infinity bazen na 42. spratu je jedan od najneverovatnijih u Evropi.",
    rooms: "Deluxe City View (48m²) sa balkonom i pogledom na Barcelonu. Sea View Room (55m²) sa direktnim pogledom na Mediteran i Barcelonetu. Sky Suite (90m²) na visokim spratovima sa 270° panoramom.",
    facilities: ["Infinity bazen na 42. spratu", "Direktni pristup Barceloneta plaži", "Enoteca restoran (2 Michelin ⭐⭐)", "Spa Six Senses (1500m²)", "Fitness 24h", "Concierge", "Limuzin servis", "Kids Club"],
    beach: "Barceloneta plaža — zlatni pesak, Mediteransko more temperature 26°C u julu/avgustu. Hotel je direktno na plaži — sunce i more na 2 minute od sobe.",
    tip: "Kupite Barcelona Card (3 dana, ~50€) — besplatan javni prevoz i popusti na sve atrakcije. Sagrada Família rezervišite ulaznice mesec dana unapred!",
    includes: ["Hotel 5*", "Avio karta", "Transfer", "Doručak", "Barcelona Card"],
    available: ["Jun 10–17", "Jul 8–15", "Aug 5–12", "Aug 26–Sep 2"],
  },
];

interface SearchResult {
  id?: number;
  name: string;
  img: string;
  badge: string;
  rating: number;
  price: string;
  priceNum: number;
  nights: string;
  country: string;
  destinationType: string;
  description?: string;
  detail?: DestinationDetail & { img: string; badge: string; rating: number; destId?: string };
}

function SearchResultCard({
  result,
  onOpenDetail,
  onBook,
  viewDetailsLabel,
  reserveLabel,
}: {
  result: SearchResult;
  onOpenDetail: () => void;
  onBook: (name: string, price: string) => void;
  viewDetailsLabel: string;
  reserveLabel: string;
}) {
  const { t, i18n } = useTranslation();
  const detail = result.detail;
  const { field } = useTranslatedDestination(detail ?? null);
  const desc = useDestLineString(detail?.destId, "desc", result.description || "");
  const name = detail ? field("name") : result.name;
  const badge = detail ? field("badge") : result.badge;
  const country = detail ? field("country") : result.country;
  const nights = formatNights(result.nights, t, i18n.language);
  const line = [nights, country].filter(Boolean).join(" · ");

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100">
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => detail && onOpenDetail()}
      >
        <img src={result.img} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
        <div className="absolute top-3 left-3">
          <span className="badge-gold">{badge}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-yellow-600">
          ⭐ {result.rating}
        </div>
        {detail && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-full">
              {viewDetailsLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wide">{line}</p>
        <h3
          className={`font-bold text-gray-900 text-sm leading-tight ${detail ? "cursor-pointer hover:text-blue-700 transition-colors" : ""}`}
          onClick={() => detail && onOpenDetail()}
        >
          {name}
        </h3>
        {desc && (
          <p className="text-gray-400 text-xs mt-1.5 line-clamp-2">{desc}</p>
        )}
        <div className="flex items-center justify-between mt-3 gap-2">
          <span className="price-tag text-lg">{t("home.from")} {result.price}</span>
          <button
            onClick={() => onBook(name, result.price)}
            className="text-xs btn-ocean px-3 py-1.5 rounded-lg font-bold"
          >
            {reserveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedDestCard({
  d,
  onDetail,
  onBook,
  viewDetailsLabel,
  reserveLabel,
  fromLabel,
}: {
  d: (typeof featuredDest)[number];
  onDetail: () => void;
  onBook: (name: string, price: string) => void;
  viewDetailsLabel: string;
  reserveLabel: string;
  fromLabel: string;
}) {
  const { field } = useTranslatedDestination(d);
  const name = field("name");
  const badge = field("badge");
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={onDetail}>
        <img src={d.img} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
        <div className="absolute top-3 left-3">
          <span className="badge-gold">{badge}</span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-bold text-yellow-600">
          ⭐ {d.rating}
        </div>
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-full">
            {viewDetailsLabel}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm leading-tight cursor-pointer hover:text-blue-700 transition-colors" onClick={onDetail}>{name}</h3>
        <div className="flex items-center justify-between mt-3 gap-2">
          <span className="price-tag text-lg">{fromLabel} {d.price}</span>
          <button onClick={() => onBook(name, d.price)} className="text-xs btn-ocean px-3 py-1.5 rounded-lg font-bold">
            {reserveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const reviews = [
  {
    name: "Milica Jovanović",
    location: "Beograd",
    avatar: "https://i.pravatar.cc/80?img=47",
    rating: 5,
    destination: "Turska — Antalija",
    text: "Sve je bilo savršeno organizovano — od polaska do povratka. Smeštaj je bio odličan, osoblje ljubazno, i hrana fantastična. Definitivno ćemo ponovo putovati sa A1M Travel!",
  },
  {
    name: "Stefan Petrović",
    location: "Kragujevac",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    destination: "Kopaonik — Grand Hotel",
    text: "Zimovanje na Kopaoniku je bilo na visokom nivou. Ski pass, transfer, hotel — sve je bilo uključeno bez skrivenih troškova. Preporučujem svima koji traže kvalitet bez komplikacija.",
  },
  {
    name: "Ana Nikolić",
    location: "Novi Sad",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    destination: "Grčka — Krf",
    text: "Već treće leto putujem sa ovom agencijom i uvek oduševljena. Krf je bio pravo otkrovenje — kristalno more, odličan hotel i prelepi izleti. Hvala na predivnom odmoru!",
  },
  {
    name: "Marko Đorđević",
    location: "Loznica",
    avatar: "https://i.pravatar.cc/80?img=7",
    rating: 4,
    destination: "Zlatibor — Mona Hotel",
    text: "Odličan odmor na Zlatiboru. Priroda, mir i sjajno osoblje hotela. Jedina napomena — transfer je kasnio pola sata, ali sve ostalo je bilo besprekorno.",
  },
  {
    name: "Jovana Stanković",
    location: "Šabac",
    avatar: "https://i.pravatar.cc/80?img=25",
    rating: 5,
    destination: "Egipat — Hurgada",
    text: "Ronjenje u Crvenom moru je iskustvo koje ću pamtiti ceo život. Arabela Resort je bio luksuz na visokom nivou. Hvala A1M Travel na savršenoj organizaciji!",
  },
  {
    name: "Nikola Vasiljević",
    location: "Valjevo",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    destination: "Španija — Kosta del Sol",
    text: "Španija je bila san. Playa Resort direktno na plaži, flamenko večeri, fantastična hrana — sve što smo tražili i više. Booking je bio brz i jednostavan, preporučujem!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewsSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const total = reviews.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const visible = [
    reviews[(active) % total],
    reviews[(active + 1) % total],
    reviews[(active + 2) % total],
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest text-sm mb-2">{t("home.reviewsTag")}</p>
          <h2 className="section-title text-4xl md:text-5xl text-gray-900">{t("home.reviewsTitle")}</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t("home.reviewsSub")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((r, i) => (
            <div
              key={r.name + i}
              className={`bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4 transition-all duration-300 ${i === 1 ? "md:scale-105 shadow-xl ring-2 ring-yellow-400/30" : ""}`}
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400/40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=1a5fa8&color=fff&size=80`;
                  }}
                />
                <div>
                  <p className="font-bold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                  <StarRating rating={r.rating} />
                </div>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">"{r.text}"</p>

              {/* Destination tag */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-xs">✈️</span>
                <span className="text-xs font-semibold text-blue-700">{r.destination}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-[hsl(208,79%,27%)] hover:text-white transition-colors"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? "bg-yellow-400" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:bg-[hsl(208,79%,27%)] hover:text-white transition-colors"
          >
            ›
          </button>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <div className="text-center">
            <p className="text-3xl font-black text-gray-900">4.9</p>
            <StarRating rating={5} />
            <p className="text-xs text-gray-400 mt-1">{t("home.avgRating")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200"/>
          <div className="text-center">
            <p className="text-3xl font-black text-gray-900">50k+</p>
            <p className="text-xs text-gray-400 mt-1">{t("home.happy50")}</p>
          </div>
          <div className="w-px h-12 bg-gray-200"/>
          <div className="text-center">
            <p className="text-3xl font-black text-gray-900">15+</p>
            <p className="text-xs text-gray-400 mt-1">{t("home.years15")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [modal, setModal] = useState(false);
  const [bookingDest, setBookingDest] = useState("");
  const [bookingPrice, setBookingPrice] = useState("");
  const [displayCount, setDisplayCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [searchType, setSearchType] = useState("letovanje");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<DestinationDetail | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const TRAVEL_TEXT = t("home.heroLine1");
  const WITH_US_TEXT = t("home.heroLine2");
  const FULL_TEXT = TRAVEL_TEXT + WITH_US_TEXT;

  const typeLabels = useMemo(
    () => ({
      letovanje: `🏖️ ${t("home.typeLet")}`,
      zimovanje: `⛷️ ${t("home.typeZim")}`,
      izlet: `🚌 ${t("home.typeIzlet")}`,
      hotel: `🏨 ${t("home.typeHotel")}`,
    }),
    [t]
  );

  const priceRanges = useMemo(
    () => [
      { value: "", label: `💰 ${t("home.priceAll")}` },
      { value: "0-200", label: t("home.price0200") },
      { value: "200-400", label: t("home.price200400") },
      { value: "400-800", label: t("home.price400800") },
      { value: "800-999999", label: t("home.price800") },
    ],
    [t]
  );

  const locationsByType = useMemo(
    () => ({
      letovanje: [
        { value: "Grčka", label: `🇬🇷 ${t("home.locGrcka")}` },
        { value: "Turska", label: `🇹🇷 ${t("home.locTurska")}` },
        { value: "Egipat", label: `🇪🇬 ${t("home.locEgipat")}` },
        { value: "Španija", label: `🇪🇸 ${t("home.locSpanija")}` },
        { value: "Srbija", label: `🇷🇸 ${t("home.locSrbija")}` },
      ],
      zimovanje: [
        { value: "Srbija", label: `🇷🇸 ${t("home.locSrbija")}` },
        { value: "Austrija", label: `🇦🇹 ${t("home.locAustrija")}` },
        { value: "Italija", label: `🇮🇹 ${t("home.locItalija")}` },
        { value: "Švajcarska", label: `🇨🇭 ${t("home.locSvajcarska")}` },
        { value: "Slovenija", label: `🇸🇮 ${t("home.locSlovenija")}` },
      ],
      izlet: [{ value: "Srbija", label: `🇷🇸 ${t("home.locSrbija")}` }],
      hotel: [
        { value: "Grčka", label: `🇬🇷 ${t("home.locGrcka")}` },
        { value: "Međunarodni", label: `🌍 ${t("home.locMedjunarodni")}` },
      ],
    }),
    [t]
  );

  const stats = useMemo(
    () => [
      { value: "15+", label: t("home.statYears") },
      { value: "50.000+", label: t("home.statGuests") },
      { value: "80+", label: t("home.statDest") },
      { value: "24/7", label: t("home.statSupport") },
    ],
    [t]
  );

  const why = useMemo(
    () => [
      { icon: "🏅", title: t("home.why1t"), desc: t("home.why1d") },
      { icon: "🛡️", title: t("home.why2t"), desc: t("home.why2d") },
      { icon: "🤝", title: t("home.why3t"), desc: t("home.why3d") },
      { icon: "✈️", title: t("home.why4t"), desc: t("home.why4d") },
    ],
    [t]
  );

  useEffect(() => {
    setDisplayCount(0);
    setStarted(false);
    const delay = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(delay);
  }, [i18n.language]);

  useEffect(() => {
    if (!started) return;
    if (displayCount >= FULL_TEXT.length) return;
    const timer = setTimeout(() => setDisplayCount((c) => c + 1), 85);
    return () => clearTimeout(timer);
  }, [started, displayCount, FULL_TEXT.length]);

  // Reset location when type changes
  useEffect(() => { setSearchLocation(""); }, [searchType]);

  async function handleSearch() {
    setSearching(true);
    setHasSearched(true);

    try {
      const [minStr, maxStr] = searchPrice ? searchPrice.split("-") : ["0", "999999"];
      const min = parseInt(minStr);
      const max = parseInt(maxStr);

      const localPool = ALL_LOCAL[searchType] || [];
      const localResults: SearchResult[] = localPool
        .filter(d => {
          const priceNum = parsePriceLocal(d.price);
          const matchCountry = !searchLocation ||
            (d.country || "").toLowerCase().includes(searchLocation.toLowerCase()) ||
            d.name.toLowerCase().includes(searchLocation.toLowerCase());
          const matchPrice = !searchPrice || (priceNum >= min && priceNum <= max);
          return matchCountry && matchPrice;
        })
        .map(d => ({
          name: d.name,
          img: d.img,
          badge: d.badge,
          rating: d.rating ?? 4.5,
          price: d.price,
          priceNum: parsePriceLocal(d.price),
          nights: d.nights || "7 noći",
          country: d.country || "",
          destinationType: d.destinationType || searchType,
          description: d.desc,
          detail: d as any,
        }));

      // DB results are optional (if API is down, we still show local + correct local prices)
      let dbResults: SearchResult[] = [];
      try {
        const dbDests = await getDestinations(searchType);
        const dbMapped: SearchResult[] = dbDests
          .filter((d: any) => {
            const priceNum = parsePriceLocal(d.price);
            const matchCountry = !searchLocation || (d.country || "").toLowerCase().includes(searchLocation.toLowerCase());
            const matchPrice = !searchPrice || (priceNum >= min && priceNum <= max);
            return matchCountry && matchPrice;
          })
          .map((d: any) => ({
            id: d.id,
            name: d.name,
            img: d.img || "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80",
            badge: d.badge || t("booking.offerBadge"),
            rating: parseFloat(d.rating) || 4.5,
            price: d.price,
            priceNum: parsePriceLocal(d.price),
            nights: d.nights || "7 noći",
            country: d.country || "",
            destinationType: d.type || searchType,
            description: d.description || d.desc,
          }));

        // Local data is the source of truth (so its prices always match Letovanja/website content)
        const localNames = new Set(localResults.map(r => r.name));
        dbResults = dbMapped.filter(r => !localNames.has(r.name));
      } catch {
        dbResults = [];
      }

      const combined = [...dbResults, ...localResults].sort((a, b) => a.priceNum - b.priceNum);
      setResults(combined);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }

  function openBooking(name: string, price: string) {
    setBookingDest(name);
    setBookingPrice(price);
    setModal(true);
  }

  const filterSummary = `${typeLabels[searchType]}${searchLocation ? ` · ${searchLocation}` : ""}${searchPrice ? ` · ${priceRanges.find((p) => p.value === searchPrice)?.label ?? ""}` : ""}`;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1920&q=90"
          alt="Tropical beach"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"/>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"/>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-5 py-2 mb-6">
            <span className="text-yellow-300 text-sm font-semibold">✈️ {t("home.heroBadge")}</span>
          </div>

          <h1 className="font-serif" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 700, lineHeight: 1.1, textShadow: "2px 4px 20px rgba(0,0,0,0.4)", minHeight: "1.1em" }}>
            {FULL_TEXT.slice(0, displayCount).split("").map((char, i) => (
              <span
                key={i}
                className={i < TRAVEL_TEXT.length ? "text-white" : "text-gold"}
                style={{ textShadow: i >= TRAVEL_TEXT.length ? "0 0 40px rgba(245,192,30,0.6)" : "2px 4px 20px rgba(0,0,0,0.4)" }}
              >
                {char}
              </span>
            ))}
            {displayCount < FULL_TEXT.length && (
              <span className="text-white animate-pulse">|</span>
            )}
          </h1>

          <p className="text-white/90 text-xl md:text-2xl mt-5 mb-8 font-light max-w-2xl mx-auto" style={{ textShadow: "1px 2px 8px rgba(0,0,0,0.5)" }}>
            {t("home.heroSub")}
          </p>

          {/* Search bar — 4 filters */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-5 max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <select
                value={searchType}
                onChange={e => setSearchType(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium focus:outline-none focus:border-blue-500"
              >
                {Object.entries(typeLabels).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>

              <select
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="">🌍 {t("home.allPlaces")}</option>
                {(locationsByType[searchType] || []).map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>

              <select
                value={searchPrice}
                onChange={e => setSearchPrice(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium focus:outline-none focus:border-blue-500"
              >
                {priceRanges.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                disabled={searching}
                className="btn-gold px-6 py-3 text-sm font-bold rounded-xl disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {searching ? (
                  <><span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"/><span>{t("home.searching")}</span></>
                ) : (
                  `🔍 ${t("home.search")}`
                )}
              </button>
            </div>
          </div>

          <p className="text-white/60 text-sm mt-4">{t("home.searchFoot")}</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest">{t("home.scroll")}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-bounce"/>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {hasSearched && (
        <section ref={resultsRef} className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searching ? t("home.resultsSearching") : results.length === 0 ? t("home.resultsNone") : t("home.resultsCount", { count: results.length })}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {filterSummary}
                </p>
              </div>
              <button
                onClick={() => { setHasSearched(false); setResults([]); }}
                className="text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
              >
                ✕ {t("home.closeSearch")}
              </button>
            </div>

            {searching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse"/>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg mb-2">{t("home.noResults")}</p>
                <p className="text-gray-400 text-sm">{t("home.noResultsHint")}</p>
                <button onClick={() => openBooking(t("booking.placeholderDest"), t("booking.placeholderPrice"))} className="mt-6 btn-ocean px-6 py-2.5 text-sm font-bold rounded-xl">
                  {t("home.contactUs")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((d, i) => (
                  <SearchResultCard
                    key={d.id ?? d.name + i}
                    result={d}
                    onOpenDetail={() => d.detail && setSelectedDetail(d.detail)}
                    onBook={(name, price) => openBooking(name, price)}
                    viewDetailsLabel={t("home.viewDetails")}
                    reserveLabel={t("home.reserve")}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-yellow-400 font-bold text-3xl md:text-4xl font-serif">{s.value}</div>
              <div className="text-blue-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest text-sm mb-2">{t("home.featuredTag")}</p>
            <h2 className="section-title text-4xl md:text-5xl text-gray-900">{t("home.featuredTitle")}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">{t("home.featuredSub")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDest.map((d) => (
              <FeaturedDestCard
                key={d.name}
                d={d}
                onDetail={() => setSelectedDetail(d)}
                onBook={(name, price) => openBooking(name, price)}
                viewDetailsLabel={t("home.viewDetails")}
                reserveLabel={t("home.reserve")}
                fromLabel={t("home.from")}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/letovanja" className="inline-block px-8 py-3.5 btn-ocean text-sm font-bold">
              {t("home.seeAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-yellow-500 font-semibold uppercase tracking-widest text-sm mb-2">{t("home.whyTag")}</p>
            <h2 className="section-title text-4xl text-gray-900">{t("home.whyTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {why.map((w) => (
              <div key={w.title} className="text-center p-6 rounded-2xl hover:bg-blue-50 transition-colors">
                <div className="text-5xl mb-4">{w.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* CTA Banner */}
      <section className="relative py-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80" alt="Sea" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-blue-900/75"/>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">{t("home.ctaTitle")}</h2>
          <p className="text-blue-200 text-lg mb-8">{t("home.ctaSub")}</p>
          <button onClick={() => openBooking(t("booking.placeholderDest"), t("booking.placeholderPrice"))} className="px-10 py-4 btn-gold text-base font-bold inline-block">
            🌴 {t("home.ctaBtn")}
          </button>
        </div>
      </section>

      <BookingModal isOpen={modal} onClose={() => setModal(false)} destination={bookingDest} price={bookingPrice} />
      <DestinationDetailModal detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
    </div>
  );
}
