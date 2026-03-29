import { useState, useEffect } from "react";
import BookingModal from "../components/BookingModal";
import DestinationDetailModal, { type DestinationDetail } from "../components/DestinationDetailModal";
import AvailabilityBadge, { AvailabilityDates } from "../components/AvailabilityBadge";

const COUNTRY_KEYWORDS: Record<string, string[]> = {
  "Grčka": ["Grčka", "Krf", "Kos", "Rodos", "Krit", "Santorini"],
  "Turska": ["Turska", "Antalija", "Istanbul", "Bodrum"],
  "Egipat": ["Egipat", "Hurgada", "Šarm"],
  "Španija": ["Španija", "Kosta", "Barcelona", "Madrid"],
};

const srbija: (DestinationDetail & { img: string; badge: string; nights: string; stars: number; rating: number; desc: string; includes: string[]; available: string[] })[] = [
  {
    name: "Zlatibor — Hotel Mona",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80",
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&q=80",
    ],
    price: "149€", nights: "7 noći", stars: 4, rating: 4.7,
    badge: "Polupansion", destinationType: "letovanje",
    desc: "Predivni planinski vazduh i kristalno čisto jezero. Idealno za porodice i parove koji žele mir i prirodu.",
    available: ["Jul 1–8", "Jul 15–22", "Aug 5–12", "Aug 20–27"],
    includes: ["Polupansion", "Bazen", "Spa & Wellness", "Planinarski izleti", "Besplatan parking"],
    location: "Zlatibor, Srbija — 1000m nadmorske visine, 250 km od Beograda",
    aboutDestination: "Zlatibor je planinska idila u zapadnoj Srbiji na nadmorskoj visini od 1000m, sa vedrim nebom, čistim vazduhom i blagom klimom koja nudi osveženje tokom letnih meseci. Zlatibor jezero je popularno za kupanje, ribolov i vožnju čamcem. Nacionalni park Zlatibor nudi 100+ km pešačkih staza kroz borove šume i zelene livade pokrivene endemskim biljkama. Čuveni Drvengrad i Mećavnik, etno-selo koje je stvorio reditelj Emir Kusturica, nalaze se svega 20 km dalje. Šarganska osmica — muzejski voz koji vijuga kroz tunele i serpentine — jedna je od najlepših vozinih linija u Evropi.",
    aboutHotel: "Hotel Mona Zlatibor je moderan 4-zvezdan resort smešten u srcu Zlatibora, svega 200 metara od jezera. Hotel je potpuno renoviran i raspolaže sa 150 soba i apartmana opremljenih po visokim standardima komfora. Wellness centar površine 800m² sa unutrašnjim bazenom temperature 28°C, finskim i turskim saunama te jacuzzijem predstavlja pravo utočište za telo i duh. Hotelski restoran svakodnevno priprema tradicionalnu srpsku kuhinju — jagnjece na ražnju, proju, kajmak i domaći sir iz obližnjih salaša.",
    rooms: "Standardne sobe (26m²) sa balkonom i pogledom na planinu ili jezero, klimatizovane sa LCD televizorom. Porodični apartmani (45m²) za 4 osobe opremljeni kuhinjom i odvojenim dnevnim boravkom. Predsednički apartman (80m²) sa panoramskim pogledom i fireplace-om.",
    facilities: ["Unutrašnji bazen 25m (28°C)", "Jacuzzi i hidromasažne kade", "Finska i turska sauna", "Masaže i wellness tretmani", "Teretana", "Teniski teren", "Sportski tereni na otvorenom", "Restoran srpske kuhinje", "Bar & lounge", "Dečija igraonica", "Wi-Fi besplatan", "Parking besplatan"],
    tip: "Obavezno posetite Drvengrad i Mećavnik Emira Kusturice (20 min vožnje) — etno-selo napravljeno od starih drvenih kuća iz cele Srbije. Pravo čudo arhitekture i kulture koje ostavlja bez daha.",
  },
  {
    name: "Vrnjačka Banja — Wellness Spa",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80"],
    price: "129€", nights: "5 noći", stars: 4, rating: 4.6,
    badge: "All Inclusive", destinationType: "letovanje",
    desc: "Oporavite se u srpskoj spa prestorici. Termalne vode, masaže i zdrava hrana.",
    available: ["Jun 10–15", "Jul 3–8", "Aug 1–6", "Sep 5–10"],
    includes: ["All Inclusive", "Termalni bazen", "Wellness", "Masaža", "Rekreacija"],
    location: "Vrnjačka Banja, centralna Srbija — banjski centar, 210 km od Beograda",
    aboutDestination: "Vrnjačka Banja je srpska 'prestonica zdravlja' i najposećenija banja Srbije sa 7 lekovitih mineralnih izvora čija je tradicija zabeležena još iz rimskog doba. Park u centru banje je rajsko šetalište sa fontanama, cvećem i stazama između lekovitih voda temperature 36°C. Grad je poznat i po romanticnoj tradiciji Vrnjačke bendžije i Festivalu ljubavi. Obližnje Magličko jezero i tvrđava Maglič iz 13. veka nude zanimljive izletničke destinacije. Termalna lekovita voda pomaže kod bolesti zglobova, cirkulacije i digestivnih poremećaja.",
    aboutHotel: "Wellness Spa hotel je moderni 4-zvezdan objekat postavljen u srcu banje, svega 200m od glavnog šetališta. Hotel nudi kompletan wellness program koji uključuje medicinske tretmane korišćenjem lekovitih mineralnih voda — hidroterapiju, balneoterapiju i masaže lekovitim blatom. Lekarski tim sprovodi individualne dijagnostičke konsultacije i propisuje personalizovane tretmane za svakog gosta. Restoran priprema dijetetske i tradicionalne srpske specijalitete.",
    rooms: "Standardne sobe (24m²) sa minibarom, LCD TV-om i balkonom. Superior sobe sa termalnim kupatilom i direktnim priključkom na banjsku lekovitu vodu.",
    facilities: ["Termalni bazeni sa lekovitom mineralnom vodom", "Wellness centar 600m²", "Medicinski spa program", "Masaže i kozmetički tretmani", "Fizioterapija i rehabilitacija", "Finska sauna", "Hotelski restoran", "Cafe & bar", "Wi-Fi besplatan", "Parking besplatan"],
    tip: "Preporučujemo 5-noćni wellness paket koji uključuje 2 terapeutske masaže, 3 banjska tretmana i specijalni dijetetski plan — idealno za regeneraciju, detoks i oporavak od stresa.",
  },
  {
    name: "Tara — Eko Resort",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"],
    price: "119€", nights: "5 noći", stars: 3, rating: 4.5,
    badge: "Noćenje+Doručak", destinationType: "letovanje",
    desc: "Idiličan eko-odmor u srcu Tare. Šetnje, raftning i organska hrana.",
    available: ["Jun 20–25", "Jul 10–15", "Aug 10–15"],
    includes: ["Doručak", "Rafting", "Trekking", "Bicikli", "BBQ večeri"],
    location: "Nacionalni park Tara, Bajina Bašta, zapadna Srbija — 220 km od Beograda",
    aboutDestination: "Nacionalni park Tara je najočuvaniji i najzeleniji nacionalni park Srbije, prekrivena gustim prašumama u kojima obitava mrki medved, orao belorepan i endemska Pančićeva omorika. Kanjon reke Drine je jedan od najdubljih kanjona u Srbiji sa vertikalnim stenama visine do 700m. Jezera Perućac i Zaton su popularne izletničke destinacije, a raftning rekom Drinom spada u top-avanture Srbije. UNESCO je Taru proglasio Biosphere Reserve, a park nudi 200+ km pešačkih staza i planinarski dom Mitrovac.",
    aboutHotel: "Eko Resort Tara je autentični ekološki hotel izgrađen od domaćeg drveta, harmonično uklopljen u prirodno okruženje Tare. Hotel nudi 30 bungalova i 15 standardnih soba. Sva hrana je 100% organska sa sopstvene ekofarm — domaći sir i kajmak, jaja od slobodnih kokoški, sveže ubrano povrće i meso. Digitalni detoks je deo koncepta — Wi-Fi nije dostupan u sobama, samo u zajedničkim prostorima.",
    rooms: "Drveni bungalovi (35m²) sa terasom, pećnicom na drva i rustičnim ručno rađenim nameštajem. Standardne sobe u glavnoj zgradi sa drvenim podovima i pogledom direktno na šumu.",
    facilities: ["Eko-restoran sa 100% organskom hranom", "Organizovani rafting na Drini", "Vodiči za pešačenje", "Iznajmljivanje bicikala", "Jahanje konja", "BBQ tereni i kamp vatre", "Zelenilo i bašta", "Wi-Fi u zajedničkim prostorima"],
    tip: "Rafting na kanjonu Drine je apsolutni must-do — ture traju 4–6 sati i prolaze kroz jedinstven kanjon koji se može posetiti isključivo rekom. Dostupno od maja do septembra.",
  },
];

const inostranstvo: (DestinationDetail & { img: string; badge: string; nights: string; stars: number; rating: number; desc: string; includes: string[]; available: string[] })[] = [
  {
    name: "Grčka — Krf, Hotel Dassia Beach",
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80",
      "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=600&q=80",
    ],
    price: "349€", nights: "7 noći", stars: 5, rating: 4.9,
    badge: "All Inclusive", destinationType: "letovanje",
    desc: "Kristalno plava voda Jonskog mora, maslinjaci i autentična grčka kuhinja. Charter let iz Beograda.",
    available: ["Jun 8–15", "Jun 22–29", "Jul 6–13", "Jul 20–27", "Aug 3–10"],
    includes: ["All Inclusive", "Charter let", "Transfer", "Animacija", "Aqua park"],
    location: "Uvala Dasija, Krf (Corfu), Jonsko More — 12 km od Kerkire",
    aboutDestination: "Krf je najzeleniji grk ostrvo u Jonskom moru, poznat po gustim maslinjarevima, venecijanskoj arhitekturi i kristalno bistrim vodama. Uvala Dasija (Dassia Beach) smešta se na severoistočnoj obali ostrva — prepoznatljiva po dugoj šljunkovitoj plaži, zelenilom bujnoj okolini i vedrom mediteranskim pogledom. Grad Kerkira (Corfu Town) je UNESCO svetska baština sa mletačkim palačama i Fortecą iz 13. veka. Obavezno posetiti: uvalu Paleokastritsa (najlepša na Mediteranu), Achilleion palatu carice Sisi i sela Bešiça i Kavos.",
    aboutHotel: "Hotel Dassia Beach je prostrani 5-zvezdan resort smešten direktno uz plažu u uvali Dasija. Hotel raspolaže sa 280 klimatizovanih soba i apartmana, svi sa balkonom i pogledom na Jonsko more ili mediteransku baštu. All Inclusive sistem nudi tri bogata obroka u centralnom restoranu plus šankove na plaži i bazenu. Gostima su na raspolaganju ležaljke i suncobrani na plaži bez doplata.",
    rooms: "Standardne sobe (22–28m²) sa balkonom, klima uređajem, LCD TV-om i mini-barrom — pogled na baštu ili more. Porodični apartmani (35–42m²) za max 2 odrasle + 2 dece, sa odvojenom sobe za decu i dnevnim boravkom.",
    facilities: ["Spoljni bazen 25m", "Dečiji bazen sa toboganima", "Aqua park besplatan", "Animacija danju i noću", "Večernji zabavni programi", "Teniski teren", "Fitness centar", "Wi-Fi besplatan", "Parking besplatan", "Rent-a-car servis", "Organizovani izleti do Paleokastritsa"],
    beach: "Šljunkovito-peščana plaža duga 800m direktno ispred hotela. Ležaljke i suncobrani uključeni u All Inclusive. Vodeni sportovi (jet-ski, banana, bodyboarding) dostupni uz doplatu.",
    tip: "Preporučujemo celonevni izlet brodom po uvali Paleokastritsa sa zaustavljanjem u ribarskoj taverni — jedna od najlepših stvari u Grčkoj. Rezervišite kroz hotel za cenu oko 35€.",
  },
  {
    name: "Turska — Antalija, Club Hotel",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    ],
    price: "299€", nights: "7 noći", stars: 5, rating: 4.8,
    badge: "Ultra All Inclusive", destinationType: "letovanje",
    desc: "Pored tirkiznog Mediteranskog mora sa 5* uslugom. Beskonačni bazeni i water park.",
    available: ["Jun 1–8", "Jun 15–22", "Jul 1–8", "Jul 15–22", "Aug 1–8", "Aug 15–22"],
    includes: ["Ultra All Inclusive", "Charter let", "Transfer", "Kids club", "Water park"],
    location: "Konyaaltı, Antalija, Turska — 10 km od centra Antalije, Mediteran",
    aboutDestination: "Antalija je prestonica turske rivijere — sunčano odmaralište sa 300 km peščanih plaža okruženih Tauruskim planinama koje se dramatično spuštaju ka tirkiznom Mediteranskom moru. Istorijsko srce Antalije je Kaleiçi — labirint uskih kaldrm staza sa rimskim Hadrijanovim lukom iz 130. g.n.e. U okolini se nalaze antički grad Aspendos sa najočuvanijim rimskim amfiteatrom koji i danas prima 15.000 gledalaca, slapovi Düden Waterfalls i grad Side. Letnje temperature dostiže 36°C, a more je 27–30°C.",
    aboutHotel: "Club Hotel je monumentalni 5-zvezdan resort na mediteranskoj obali sa Ultra All Inclusive sistemom koji pokriva sva jela i alkoholna pića 24 sata dnevno bez ikakvih ograničenja. Impresivni vodeni park sa 12 tobogana, lazy river dužine 150m i olimpijskim bazenima je potpuno besplatan za sve goste. Hotel ima kapacitet 850 soba i nudi 4 restorana (turski, talijanski, azijski, morski plodovi), 6 barova i spa centar površine 1500m².",
    rooms: "Standardne sobe (30m²) sa balkonom, klima uređajem, LCD TV-om i sefom. Porodične sobe (48m²) za 2+2 sa bunk krevetima za decu. Family suite (65m²) sa dve odvojene spavaće sobe.",
    facilities: ["Ultra All Inclusive 24h bez ograničenja", "Vodeni park sa 12 tobogana", "Lazy River 150m", "4 spoljanja i 1 unutrašnji bazen", "Dečiji aqua park", "Animacija 24/7", "Kids club (3–12 god)", "Fitness centar 800m²", "Hamam & SPA", "5 restorana", "6 barova & snack barovi", "Tenis, stoni tenis, odbojka na pesku"],
    beach: "Šljunkovita plaža Konyaaltı duga 7 km sa Tauruskim planinama u pozadini. Besplatni shuttle do plaže svakih 30 minuta iz hotela. Vodeni sportovi dostupni uz doplatu.",
    tip: "Ne propustite posetu antičkom Aspendosu (45 min vožnje) sa jednim od najočuvanijih rimskih amfiteatara na svetu. Organizovani transfer iz hotela dostupan svaki dan oko 09:30.",
  },
  {
    name: "Egipat — Hurgada, Arabela Resort",
    img: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546948630-b2aefd08f3fa?w=600&q=80",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
    ],
    price: "449€", nights: "10 noći", stars: 5, rating: 4.7,
    badge: "All Inclusive", destinationType: "letovanje",
    desc: "Ronite u Crvenom moru i istražujte faraonsku civilizaciju. Koralni grebeni neposredno uz hotel.",
    available: ["Jun 5–15", "Jul 3–13", "Aug 7–17", "Sep 2–12"],
    includes: ["All Inclusive", "Charter let", "Transfer", "Ronjenje", "Desert Safari"],
    location: "Safaga Bay, Hurgada, Egipat — 25 km južno od centra Hurgade, Crveno more",
    aboutDestination: "Hurgada je egipatsko crveno-morsko odmaralište koje privlači milione turista zbog koralnih grebena proglašenih jednim od najlepših na svetu. Vidljivost u vodi dostiže 30 metara, temperatura je konstantnih 25–27°C tokom cele godine. Koralni grebeni koji okružuju Hurgadu stanište su 400+ vrsta ribe, morskih kornjača, delfina i kitova usana. Akvanauti mogu videti čuvene 'blue holes' i potopljene brodove iz Drugog svetskog rata. Šarm el-Šejh i Luksor su dostupni avionom za jednodnevne izlete.",
    aboutHotel: "Arabela Resort je luksuzni 5-zvezdan hotel smešten na brežuljku koji gleda direktno na Crveno More, u zaštićenoj uvali sa sopstvenom koralnom plažom. Ronilački centar certificiran od strane PADI nudi kurseve i ture, a snorkelovanje oprema je besplatna za sve goste. All Inclusive sistem pokriva sva jela, alkohol i bezalkoholna pića. Posebno preporučujemo sunrise izlaz čamcem do otvorenih grebena.",
    rooms: "Standardne sobe (32m²) sa balkonom i pogledom na more ili baštu, klima uređaj, LCD TV, minibar. Sea view bungalovi direktno uz plaži (48m²) — preporučujemo za nezaboravan doživljaj buđenja uz Crveno more.",
    facilities: ["3 spoljnja olimpijska bazena", "Privatna koralna plaža", "PADI ronilački centar", "Snorkelovanje oprema besplatno", "Desert Safari izleti", "Camel riding", "4 restorana", "Barovi & snack bar", "Hamam i masaže", "Teniski teren", "Fitness centar", "Večernji show program"],
    beach: "Privatna koralna plaža u zaštićenoj uvali, šljunak i pesak. Koralni greben počinje na svega 15 metara od obale — snorkelovanje direktno sa plaže bez čamca! Ležaljke i suncobrani besplatni.",
    tip: "Preporučujemo PADI Open Water kurs — u svega 3 dana postajete sertifikovani ronilac i otvara vam se potpuno novi svet koralnih grebena Crvenog mora. Grupni kursevi od 150€.",
  },
  {
    name: "Španija — Kosta del Sol, Playa Resort",
    img: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1559825481-12a05cc00344?w=600&q=80"],
    price: "389€", nights: "7 noći", stars: 4, rating: 4.8,
    badge: "Hotel+Let", destinationType: "letovanje",
    desc: "Sunčana Costa del Sol sa 300 sunčanih dana godišnje. Flamenko večeri i vrhunska ishrana.",
    available: ["Jun 10–17", "Jul 8–15", "Aug 5–12", "Aug 26–Sep 2"],
    includes: ["Hotel 4*", "Avio karta", "Transfer", "Tapasin večeri", "Aquapark"],
    location: "Torremolinos, Kosta del Sol, Španija — 15 km od Malage, Mediteran",
    aboutDestination: "Kosta del Sol je špansko sunčano žarište sa 160 km zlatnih plaža, belim andaluzijskim selima i pikantnom tapas kulturom. Torremolinos je živahno mediteransko letovalište sa šetnicom Paseo Marítimo dužinom 6 km i plaže. Malaga, grad Pabla Pikasa, je svega 20 minuta — sa impresivnim Pikaso muzejom i maurskom Alcazabom. Za ljubitelje prirode, Caminito del Rey — staza u kanjonu — je nezaboravan doživljaj. Flamenko večeri u lokalnim 'peñama' su autentični kulturni susret sa andaluzijskom dušom.",
    aboutHotel: "Playa Resort je elegantni hotel direktno na zlatnoj plaži Torremolinos-a, potpuno renoviran 2022. Hotel nudi 320 soba sa balkonima i pogledom na Mediteran. Restoran sa zvezdom Michelin vodiča priprema tradicionalnu špansku kuhinju sa svežim plodovima mora, paellom kuvanom na otvorenoj vatri i autentičnim andaluzijskim specijalitetima. Infinity bazen gleda direktno na more.",
    rooms: "Standard sea view sobe (28m²) sa balkonom i pogledom na Mediteran. Junior suite (45m²) sa zasebnom sobe i terasom. Deluxe suite (55m²) sa jacuzzijem na privatnoj terasi.",
    facilities: ["Infinity bazen sa pogledom na Mediteran", "Direktni pristup zlatnoj plaži", "Spa & wellness centar", "Restoran španske kuhinje (2 Michelin preporuke)", "Tapas bar uz bazen", "Rooftop cocktail bar", "Fitness centar", "Dečije igraonice", "Animacija za decu", "Wi-Fi", "Parkig uz doplatu"],
    beach: "Zlatno-peščana plaža Torremolinos duga 3 km sa ležaljkama i suncobranima. Temperatura mora u julu/avgustu 26°C. More mirno i bezbedno za decu sa dugim plitkim pojasem.",
    tip: "Ne propustite posetu Grenadi (2h autobusom) sa čuvenim dvorcem Alhambra — jednim od najlepših maurskih bašta i dvoraca na svetu. Preporučujemo kupovinu ulaznica mesec dana unapred — rasprodaju se brzo!",
  },
];

export default function LetovanjaPage() {
  const [modal, setModal] = useState<{ open: boolean; name: string; price: string }>({ open: false, name: "", price: "" });
  const [tab, setTab] = useState<"srbija" | "inostranstvo">("inostranstvo");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [selectedDetail, setSelectedDetail] = useState<DestinationDetail | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zemlja = params.get("zemlja") || "";
    if (zemlja === "Srbija") {
      setTab("srbija");
      setCountryFilter("");
    } else if (zemlja) {
      setTab("inostranstvo");
      setCountryFilter(zemlja);
    }
  }, []);

  const openBooking = (name: string, price: string) => setModal({ open: true, name, price });

  const baseList = tab === "srbija" ? srbija : inostranstvo;
  const list = countryFilter && tab === "inostranstvo"
    ? baseList.filter(d => (COUNTRY_KEYWORDS[countryFilter] || [countryFilter]).some(kw => d.name.toLowerCase().includes(kw.toLowerCase())))
    : baseList;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80" alt="Beach" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-blue-900/60"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
          <p className="text-yellow-400 font-semibold uppercase tracking-widest text-sm mb-2">Leto 2025</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-3">Letovanja</h1>
          <p className="text-blue-100 text-lg">Odaberite savršenu destinaciju za vaše leto</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0">
          {(["inostranstvo", "srbija"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setCountryFilter(""); }}
              className={`px-8 py-4 font-semibold text-sm transition-all border-b-2 ${tab === t ? "border-yellow-500 text-yellow-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t === "srbija" ? "🇷🇸 Letovanje u Srbiji" : "✈️ Inostranstvo"}
            </button>
          ))}
          {countryFilter && (
            <button onClick={() => setCountryFilter("")}
              className="ml-auto text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-semibold hover:bg-blue-100 flex items-center gap-1">
              🔍 {countryFilter} <span className="text-blue-400 ml-1">✕</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Info banner */}
        {tab === "inostranstvo" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-10 flex gap-4 items-start">
            <span className="text-2xl">✈️</span>
            <div>
              <p className="font-bold text-yellow-800">Charter letovi iz Beograda i Niša</p>
              <p className="text-yellow-700 text-sm mt-1">Svi inostrani aranžmani uključuju direktne charter letove. Polasci iz Beograda (BEG) ili Niša (INI). Moguć i polazak autobusom po povoljnijoj ceni.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {list.map((d) => (
            <div key={d.name} className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <span className="badge-gold">{d.badge}</span>
                  <AvailabilityBadge dates={d.available} size="sm" />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-bold text-yellow-600">
                  {"⭐".repeat(d.stars)}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif font-bold text-xl text-white">{d.name}</h3>
                  <p className="text-white/80 text-sm">{d.nights}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {d.includes.map(i => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">✓ {i}</span>
                  ))}
                </div>
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slobodni termini:</p>
                  <AvailabilityDates dates={d.available} max={5} />
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Cena po osobi</p>
                    <p className="price-tag">od {d.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedDetail(d)} className="px-4 py-2.5 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl transition-colors">
                      Detaljnije →
                    </button>
                    <button onClick={() => openBooking(d.name, d.price)} className="px-4 py-2.5 btn-gold text-xs font-bold rounded-xl">
                      Rezervišite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} destination={modal.name} price={modal.price} />
      <DestinationDetailModal detail={selectedDetail} onClose={() => setSelectedDetail(null)} />
    </div>
  );
}
