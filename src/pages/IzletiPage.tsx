import { useState } from "react";
import BookingModal from "../components/BookingModal";
import DestinationDetailModal, { type DestinationDetail } from "../components/DestinationDetailModal";

const izleti: (DestinationDetail & { img: string; badge: string; duration: string; rating: number; desc: string })[] = [
  {
    name: "Manastiri Fruškogorski",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80",
    ],
    price: "29€", badge: "Jednodnevni", duration: "1 dan", rating: 4.9,
    destinationType: "izlet",
    desc: "Obiđite 5 srpskih pravoslavnih manastira iz 15. veka uz stručnog vodiča i degustaciju fruškogorskih vina.",
    location: "Fruška Gora, Vojvodina — 180 km od Loznice, 70 km od Novog Sada",
    aboutDestination: "Fruška Gora je jedina planina Vojvodine, proteže se 80 km između Novog Sada i Sremske Mitrovice, i dom je 16 srpskih pravoslavnih manastira iz 14–18. veka. Ovi manastiri su građeni kao utočišta pred turskim osvajačima i tokom vekova postali riznicu neprocenjivih fresaka, rukopisa i zlatarskih dela srpske kulture. Planina je 1960. proglašena za Nacionalni park i danas je zaštićeno područje sa retkim vrstama biljaka i ptica. Osim manastira, Fruška Gora je i vodeći centar vojvođanskog vinogradarstva sa 20+ porodičnih vinarija koje neguju tradiciju vina staru više od 2000 godina.",
    aboutHotel: "Jednodnevni izlet — smeštaj nije uključen. Polazak iz Loznice u 05:30h AC autobusom. Povratak u Losnicu oko 22:00h. Ručak je organizovan u etno restoranu Fruška Gora sa srpskim specijalitetima.",
    facilities: ["AC turistički autobus", "Stručni licencirani vodič", "Ručak u etno restoranu", "Degustacija vina u 3 vinarije", "Ulaznice za sve manastire", "Osiguranje putnika", "Kafa i grickalice u autobusu"],
    tip: "Preporučujemo ugodnu obuću za hodanje — obilazak manastira podrazumeva kaldrmisane puteve i stepenice. Žene treba da pokriju ramena i kolena (marame se pozajmljuju na ulazu besplatno).",
    includes: ["Prevoz AC autobusom", "Stručni vodič", "Ručak", "Vinska degustacija", "Ulaznice", "Osiguranje"],
    available: ["Svake subote", "Svake nedelje", "Prazničnim danima"],
  },
  {
    name: "Đavolja Varoš i Prolom Banja",
    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80"],
    price: "35€", badge: "Jednodnevni", duration: "1 dan", rating: 4.8,
    destinationType: "izlet",
    desc: "Prirodno čudo sveta — 202 kamene figure i lekovite banje. Nezaboravan spoj prirode i zdravlja.",
    location: "Đavolja Varoš — Kursumlija; Prolom Banja — Blace; centralna Srbija",
    aboutDestination: "Đavolja Varoš je jedno od najposetivanijih prirodnih čuda Srbije i bilo je nominirano kao čudo sveta 2008. godine. Oko 202 kamene figure visine do 15 metara nastale su erozijom crvene vulkanske gline tokom miliona godina — kombinacija kiše, vetra i specifičnog tla stvorila je ovaj nestvarni pejzaž. Legende govore o svadbenoj povorci koja je skamenjena Božjom voljom. Dva bunara — Đavolje voda i Crveno vrelo — sadrže jednu od najkiselijih voda na svetu sa pH vrednošću svega 1.5 (više kisele od limunovog soka!). Prolom Banja je termalna banja 40 km dalje sa mineralnim vodama temperature 27°C, čuvenim po lekovitim efektima na bubrege, urinarni trakt i opštu regeneraciju organizma.",
    aboutHotel: "Jednodnevni izlet — smeštaj nije uključen. Polazak iz Loznice u 06:00h. Ukupno 14h tura sa obilaskom oba lokaliteta — Đavolje Varoš (3h obilaska) i Prolom Banja (2h korišćenja termalnih bazena). Povratak u Losnicu oko 21:00h.",
    facilities: ["AC turistički autobus", "Stručni licencirani vodič", "Ulaznice za Đavolju Varoš", "Korišćenje termalnih bazena Prolom Banje", "Ručak u restoranu banje", "Osiguranje putnika"],
    beach: "Prolom Banja: termalni bazeni sa mineralnom vodom temperature 27°C — kupanje uključeno u cenu izleta. Lekovito za zglobove i cirkulaciju.",
    tip: "Obuća sa dobrim prianjanjem je obavezna za Đavolju Varoš — staza za posmatrače ima strmih delova. Kamera/telefon je must — fotogeničnost kamenih figura je neverovatna u podne i pri zalasku sunca.",
    includes: ["Prevoz AC autobusom", "Stručni vodič", "Ulaznice za Đavolju Varoš", "Termalni bazeni Prolom Banje", "Ručak", "Osiguranje"],
    available: ["Svake subote", "Prazničnim danima", "Po dogovoru za grupe"],
  },
  {
    name: "Niš — Medijana i Niška Tvrđava",
    img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1524813686514-a57563d77965?w=600&q=80"],
    price: "25€", badge: "Istorijski", duration: "1 dan", rating: 4.7,
    destinationType: "izlet",
    desc: "Rodni grad cara Konstantina. Rimska palata Medijana, Niška Tvrđava i Čele kula — istorija u kamenu.",
    location: "Niš, Srbija — 215 km od Loznice",
    aboutDestination: "Niš je treći po veličini grad Srbije i jedan od najstarijih gradova na Balkanu, osnovan u antičko doba kao rimski Naissus. Najvažnija je istorijska činjenica da je Niš rodni grad cara Konstantina Velikog (272. g.n.e.) — vladara koji je Milanskim ediktom 313. godine legalizovao hrišćanstvo i zauvek promenio tok svetske istorije. Rimska palata Medijana iz 4. veka je jedna od najznačajnijih rimskih ruševina na Balkanu sa mozaicima, fontanama i luksuznim odajama. Niška Tvrđava iz osmanskog perioda (1723.) je monumentalna osmougaona tvrdjava na obali Nišave. Čele kula — kula od 952 lobanje srpskih ustanika iz 1809. — jedan je od najdirljivijih srpskih istorijskih spomenika.",
    aboutHotel: "Jednodnevni izlet — smeštaj nije uključen. Polazak iz Loznice u 06:30h. Obilazak traje 10h sa slobodnim vremenom za šetnju Niškoforumom i kupovinu domaćih specijaliteta (ajvar, pekmezi, suvo meso). Povratak oko 20:30h.",
    facilities: ["AC turistički autobus", "Stručni istoričar-vodič", "Ulaznice za sve lokalitete", "Slobodno vreme za šoping", "Osiguranje putnika", "Kafa i voda u autobusu"],
    tip: "Ne propustite nišku roštiljanicu Šaran u centru — nišvil roštilj je specifičnost koja se razlikuje od ostatka Srbije i pravi je kulinarski doživljaj. Preporučujemo ručak pre posete Čele kuli.",
    includes: ["Prevoz AC autobusom", "Stručni vodič — istoričar", "Ulaznice", "Slobodno vreme za šoping", "Osiguranje"],
    available: ["Svake nedelje", "Prvom subotom u mesecu", "Po dogovoru za grupe"],
  },
  {
    name: "Beograd City Break",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"],
    price: "39€", badge: "City Break", duration: "1 dan", rating: 4.8,
    destinationType: "izlet",
    desc: "Kalemegdan, Skadarlija i Zemun — Beograd na dlanu. Večernji Dunav i beogradska gastronomija.",
    location: "Beograd, Srbija — 145 km od Loznice",
    aboutDestination: "Beograd je jedan od najstarijih i najatraktivnijih gradova jugoistočne Evrope — prestonica koja se izgradila na ušću Save i Dunava tokom 7000 godina neprekidnog naseljenja. Kalemegdan, rimsko-vizantijsko-osmanska tvrđava, dominira gradom sa pogledom na Veliku Ratno Ostrvo i dve reke. Bohemska četvrt Skadarlija je beogradski Monmartr sa kafanama, džez muzičarima i srpskim kuhinjom u najautentičnijoj formi. Trg Republike, Knez Mihailova ulica (pešačka zona), Zemun sa dunavskim ključem i Pančevački Most su obavezne tačke. Beograd noću je posebna priča — noćni život Savamale i splavi na Dunavu privlači turiste iz celog sveta.",
    aboutHotel: "Jednodnevni izlet — smeštaj nije uključen. Polazak iz Loznice u 07:00h. Organizovani pešački obilazak Kalemegdana, Skadarlije i Knez Mihailove sa vodičem (4h), potom slobodno vreme za individualno istraživanje. Povratak oko 22:30h.",
    facilities: ["AC turistički autobus", "Licencirani grad-vodič", "Obilazak Kalemegdan (2h)", "Obilazak Skadarlije", "Slobodne 4h za shopping/gastronomiju", "Osiguranje putnika"],
    tip: "Preporučujemo večeru u Skadarliji — tražite restoran sa živom svirom tamburica za autentičan beogradski doživljaj. Naručite čorbu od divljači, punjene paprike i domaći hleb.",
    includes: ["Prevoz AC autobusom", "Grad-vodič", "Obilazak Kalemegdana", "Slobodno vreme", "Osiguranje"],
    available: ["Svake subote", "Svake nedelje", "Državnim praznicima"],
  },
  {
    name: "Tara i Drinska Klisura — Rafting",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80"],
    price: "45€", badge: "Adrenalin", duration: "1 dan", rating: 4.9,
    destinationType: "izlet",
    desc: "Rafting kanjonom Drine sa vertikalnim stenama od 700m. Nationalpark Tara i Perućac jezero.",
    location: "Drinska Klisura, Bajina Bašta — 60 km od Loznice",
    aboutDestination: "Drinska Klisura između Tare i Zvijezde planina je jedan od najdubljih kanjona Srbije sa vertikalnim vapnenačkim stenama koje dosežu 700 metara visine. Reka Drina u ovom delu teče kroz netaknutu prašumu Nacionalnog parka Tara — UNESCO Biosphere Rezervat sa endemskom Pančićevom omorikom. Perućac jezero (veštačko jezero duge 55 km) i Zaton su popularna mesta za pecanje i ćumur vreme. Rafting ovom dionicom traje 4–6 sati i donosi kombinaciju brzaka i mirnih rečnih delova kroz nestvaran kanjon koji se može posetiti isključivo brodom ili raftom.",
    aboutHotel: "Jednodnevni izlet — smeštaj nije uključen. Polazak iz Loznice u 07:30h. Raft oprema (vesla, prsluk, kaciga, neoprenski ronilački odelo) je uključena u cenu i obezbeđena na licu mesta. Tura je prikladna za sve od 10 godina. Povratak oko 20:00h.",
    facilities: ["AC autobus do polazišta", "Raft oprema (vest, kaciga, veslo, neopren)", "Sertifikovani raft vodič", "Fotografisanje tokom ture", "Roštilj ručak uz reku", "Osiguranje putnika"],
    tip: "Ponesite rezervnu odeću i vrećicu nepromočivu za telefon! Obavezno se naučno i popijte dosta vode pre starta — rafting je fizički zahtevniji nego što izgleda.",
    includes: ["Prevoz do Drine", "Rafting oprema", "Sertifikovani vodič", "Roštilj ručak", "Fotografije", "Osiguranje"],
    available: ["Svake subote (Apr–Oct)", "Svake nedelje (Maj–Sep)", "Grupno po dogovoru"],
  },
];

export default function IzletiPage() {
  const [modal, setModal] = useState<{ open: boolean; name: string; price: string }>({ open: false, name: "", price: "" });
  const [selectedDetail, setSelectedDetail] = useState<DestinationDetail | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=1600&q=80" alt="Travel" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-emerald-900/65"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
          <p className="text-yellow-400 font-semibold uppercase tracking-widest text-sm mb-2">Svaki vikend</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-3">Izleti</h1>
          <p className="text-emerald-100 text-lg">Otkrij skrivene bisere Srbije i regiona</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-emerald-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 text-sm flex-wrap justify-center">
          <span>🚌 <strong>Polasci</strong> svake subote i nedelje</span>
          <span>🎯 <strong>Stručni vodiči</strong> za svaki izlet</span>
          <span>🍽️ <strong>Ručak</strong> uključen u cenu</span>
          <span>✅ <strong>Osiguranje</strong> putnika uvek</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {izleti.map((iz) => (
            <div key={iz.name} className="bg-white rounded-3xl shadow-lg overflow-hidden card-hover border border-gray-100">
              <div className="relative h-52 overflow-hidden">
                <img src={iz.img} alt={iz.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">{iz.badge}</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-0.5 text-xs font-bold text-yellow-600">
                  ⭐ {iz.rating}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif font-bold text-lg text-white leading-tight">{iz.name}</h3>
                  <p className="text-white/70 text-xs">⏱️ {iz.duration}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{iz.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {iz.includes.slice(0, 4).map(i => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">✓ {i}</span>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Polasci:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {iz.available.map(dt => (
                      <span key={dt} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-semibold">📅 {dt}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Cena po osobi</p>
                    <p className="price-tag">od {iz.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedDetail(iz)} className="px-3 py-2 border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 text-xs font-bold rounded-xl transition-colors">
                      Detaljnije →
                    </button>
                    <button onClick={() => setModal({ open: true, name: iz.name, price: iz.price })} className="px-3 py-2 btn-gold text-xs font-bold rounded-xl">
                      Prijavi se
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
