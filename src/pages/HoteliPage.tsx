import { useState, useEffect } from "react";
import BookingModal from "../components/BookingModal";
import DestinationDetailModal, { type DestinationDetail } from "../components/DestinationDetailModal";
import AvailabilityBadge from "../components/AvailabilityBadge";

const hotels: (DestinationDetail & { img: string; badge: string; stars: number; rating: number; desc: string; country: string })[] = [
  {
    name: "Ikos Aria — Kos, Grčka",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80",
    ],
    price: "599€", badge: "Luxury All Inclusive", stars: 5, rating: 5.0,
    destinationType: "hotel",
    desc: "Pobednik World Travel Awards za 5. uzastopnu godinu. Privatna plaža Kefalos i 9 restorana bez doplata.",
    country: "Grčka",
    location: "Kefalos Bay, Kos, Dodekanez, Grčka — 45 km od aerodroma KGS",
    aboutDestination: "Ostrvo Kos je jedno od najzelenijih u Egejskom moru i rodni grad Hipokrata — oca medicine čija je zakletva i danas osnova medicinske etike. Kefalos Bay na jugozapadnoj obali je najlepši zaljev ostrva sa turbo-plavom vodom, zlatno-peščanom plažom Kamari i netaknutim pejzažima. U blizini se nalaze antički Asklepion (posvećen bogu medicine, 4. vek p.n.e.), mletačka tvrđava Neratzia u gradu Kosu i manastir Kefalos sa ruinama antičke bazilike. Kos ima odlično auto-rentanje — u jednom danu možete obilaziti celo ostrvo.",
    aboutHotel: "Ikos Aria je najnagrađivaniji luksuzni all-inclusive resort u Evropi — World Travel Awards pobednik pet uzastopnih godina. Resort se prostire na 120.000m² sa direktnim pristupom privatnoj plaži od 400m zlatnog peska. Revolucionarni Infinite Lifestyle™ koncept (nadgradnja all-inclusive) uključuje premium alkohol, fine dining u svim restoranima bez doplata, premium minibar koji se puni svaki dan i sve vodene sportove. Svaki gost dobija personalnog concierge asistenta.",
    rooms: "Deluxe Garden View (50m²) sa privatnom terasom i pogledom na sredozemnu baštu. Bungalov uz bazen (65m²) — direktni ulaz sa terase u sopstveni deo bazena. Overwater Suite (95m²) izgrađen nad Egejskim morem sa staklenim podom kroz koji gledate u plavi okean.",
    facilities: ["9 restorana bez ikakvih doplata", "7 cocktail barova", "Infinity bazen 50m", "5 bazena ukupno", "Privatna plaža 400m zlatnog peska", "Spa Thalasso 2000m²", "Sve vodene sportove besplatno (SUP, kajak, jedrilica)", "Premium minibar svaki dan", "Personalni concierge", "Dečiji & Teens klub", "Jutarnja yoga na plaži", "Teniski teren sa trenerom"],
    beach: "Privatna plaža Kefalos Bay sa zlatnim peskom i turbo-plavim Egejom, 400m. Ležaljke, suncobrani i frotirni peškiri uključeni. Sve vodene sportove (SUP, kajak, jedrilica) besplatno za sve goste.",
    tip: "Preporučujemo Overwater Suite za medeni mesec ili posebnu proslavu — jedinstven doživljaj spavanja iznad Egejskog mora sa staklenim podom kroz koji vidite ribe!",
    includes: ["Infinite Lifestyle All Inclusive", "Premium minibar", "Svi vodeni sportovi", "9 restorana", "Spa pristup", "Concierge"],
    available: ["Jun 1–8", "Jun 15–22", "Jul 6–13", "Jul 20–27", "Aug 10–17"],
  },
  {
    name: "Jumeirah Burj Al Arab — Dubai",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1495482432709-455f228a40d7?w=600&q=80",
      "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80",
    ],
    price: "1499€", badge: "7★ Jedinstven", stars: 5, rating: 5.0,
    destinationType: "hotel",
    desc: "Jedini 7-zvezdan hotel na svetu. Privatni butler, Rolls-Royce fleet i podmorski restoran sa ajkulama.",
    country: "UAE",
    location: "Jumeirah Beach, Dubai, UAE — 20 km od aerodroma Dubai International",
    aboutDestination: "Dubai je grad rekordnih superlativa — dom Burj Khalife (828m, najviša građevina ikad podignuta), Dubai Malla (najveći tržni centar), Palm Jumerajaha (veštačko ostrvo vidljivo iz svemira) i 300+ km zlatnih plaža. Kulturna kontrast Dubaja je fascinantan: stara četvrt Deira sa Gold Soukom gde zanatlije kuju nakit u staroarapskoj tradiciji, arabijska pustinja i deva-safari, te Dubai Frame — stakleni most između starog i novog dela grada. Dubai Fountain na veštačkom jezeru Burj Khalife je najveći muzički vodoskok na svetu.",
    aboutHotel: "Burj Al Arab je zvanično 5-zvezdan hotel ali kvalitetom usluge apsolutno prevazilazi sve postojeće standarde — mediji ga zovu 'jedini 7-zvezdan hotel na svetu'. Smešten na privatnom veštačkom ostrvu 280m od obale, hotel ima samo 202 sobe — sve su dupleks suiti od minimum 170m². Privatni butler dočekuje svakog gosta na helikopterskoj platformi ili u belom Rolls-Royceovom automobilu. Podmorski restoran Al Mahara jedinstven je doživljaj — sedite direktno uz ogromni akvarijum sa morskim ajkulama i rajetama.",
    rooms: "Deluxe Suite (170m²) — 2 nivoa, zasebna spavaća, dnevni boravak i terasa sa pogledom na Persijski zaliv. Diplomatic Suite (370m²) sa zasebnom trpezarijom i privatnim butler-om. Sky View Suite (780m²) — penthouse za one koji žele apsolutni maximum.",
    facilities: ["Privatni butler 24/7", "Rolls-Royce fleet po gradu", "Helikopter transfer po dogovoru", "Podmorski restoran Al Mahara", "Sky Bar na 200m visine", "18 restorana i barova", "Gold Spa (1700m²)", "Infinity bazen sa pogledom na Persijski zaliv", "Privatna plaža", "Concierge servis bez ograničenja"],
    tip: "Rezervišite ručak u restoranu Scape na 200m visine — pogled na ceo Dubai je spektakularan, posebno u sumrak kada se grad upali. Minimum konzumacija je 100$ po osobi ali vredna je svakog centa.",
    includes: ["5-noćni boravak", "Doručak Butler Service", "Rolls-Royce obilazak Dubaja", "Spa tretman", "Večera u Al Mahara"],
    available: ["Tokom cele godine", "Blagdanima uz doplatu", "New Year Gala (poseban paket)"],
  },
  {
    name: "Amansara — Siem Reap, Kambodža",
    img: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    price: "899€", badge: "Kulturna Perla", stars: 5, rating: 4.9,
    destinationType: "hotel",
    desc: "Bivša vila kralja Sihanouka. Privatni pristup Angkor Watu pre turista i personalizovano iskustvo.",
    country: "Kambodža",
    location: "Siem Reap, Kambodža — 6 km od hramskog kompleksa Angkor Wat",
    aboutDestination: "Angkor Wat je najveći verski objekat ikad podignut — kompleks kmerskih hramova iz 12. veka koji se proteže na 400 km² džungle. Izgradnja je trajala 30 godina i angažovala je 300.000 radnika. Angkor Thom, Bayon sa 216 gigantskih lica, i Ta Prohm (hram koji džungla polako 'guta') samo su deo ovog neverovatnog kompleksa koji je 1992. upisan u UNESCO. Siem Reap je mali, elegantni grad sa živahnom Old Market četvrti, nocnim tržnicama i sjajnom kmerskom kuhinjom. Lokalna tradicija apsar plesa traje 1000 godina.",
    aboutHotel: "Amansara je smešten u vili koju je 1960-ih podigao sam kralj Norodom Sihanouk kao letnju rezidenciju. Hotel je transformisan u ekskluzivni resort sa samo 24 sobe — svaka je minimalistički masterpiece sa privatnim dvorištem i bazenom. Amansara je jedini hotel koji ima privatni pristup Angkor kompleksu — gosti mogu posetiti hramove u zoru, pre dolaska turista, uz privatnog arheologa vodiča. Kuhinjski tim priprema autentičnu kmersku kuhinju sa organskim sastojcima.",
    rooms: "Suite (100m²) sa privatnim dvorištem, bazenom i verandom. Soba originalnog Sihanukovog dizajna čuva arhitektonsku tradiciju šezdesetih. Svaka soba ima sopstvenu terasu i pogled na tropski vrt.",
    facilities: ["Privatni pristup Angkor Watu u zoru", "Personalni Aman Guide (archaeologist)", "Spa sa kmerskim tretmanima", "Privatni bazen svake sobe", "Kmerska gastronomija", "Bicikli za obilazak hramova", "Helikopter panorama", "Boutique shop"],
    tip: "Sunrise poseta Angkor Watu je iskustvo koje se ne zaboravlja — dolazite u 04:30h pre turista, gledajte kako se hram budi u zoru dok magla lebdi nad džunglom. Vodi vas privatni vodič koji priča 1000 godina istorije.",
    includes: ["Boravak u Amansari", "Doručak & večera", "Privatni pristup Angkor kompleksu", "Personalni vodič-arheolog", "Transfer aerodrom-hotel-aerodrom"],
    available: ["Oktobar–April (sušna sezona)", "Novembar–Februar (idealan period)", "Po dogovoru (ostatak godine)"],
  },
  {
    name: "Four Seasons — Bora Bora",
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
    ],
    price: "1299€", badge: "Raj na Zemlji", stars: 5, rating: 5.0,
    destinationType: "hotel",
    desc: "Overwater bungalovi sa staklenim podom nad tirkiznom lagunom. Medeni mesec destinacija #1 na svetu.",
    country: "Francuska Polinezija",
    location: "Motu Tehotu, Bora Bora, Društvena Ostrva, Francuska Polinezija",
    aboutDestination: "Bora Bora je nazvana 'Biserom Pacifika' i smatrana najlepšim ostrvom na svetu — ostatak drevnog vulkana Otemanu (727m) okružen nestvarno tirkiznom lagunom i koralnjem grebanom. Laguna Bora Bore je proglašena jednom od 7 prirodnih čuda sveta sa providnošću vode do 40m i temperaturom 27°C cele godine. Jedini način dolaska je avionom do Tahitija, pa hidropavionom (20 min) do Bora Bore. U laguni žive crno-bele morske mante raspona krila do 4m, harmlos morski psi, zelene kornjače i 350+ vrsta tropske ribe.",
    aboutHotel: "Four Seasons Resort Bora Bora je ikona luksuznog putovanja — svaki od 107 bungalova i villa ili stoji na vodi (overwater) ili se nalazi na privatnim ostrvcima oko lagune. Overwater bungalovi od polinezijskog drveta imaju stakleni pod kroz koji gledate direktno u lagunom, platformu za direktni ulaz u more i infinity sunčalište nad vodom. Kuvinjski tim Four Seasons priprema polinezijsku fusion kuhinju sa plodovima mora ulovljenim isti dan.",
    rooms: "Overwater Bungalov (80m²) sa staklenim podom, direktnim pristupom u lagunom, outdoor tušem u prirodi i infinity platformom. Overwater Suite (158m²) sa sopstvenim jacuzzijem nad vodom i odvojenom spavaćom sobom. Royal Beach Villa (310m²) sa privatnim bazenom, sobnim kuvarem i sopstvenom plažicom.",
    facilities: ["107 bungalova i villa nad vodom/plaži", "Coral garden snorkeling program", "Manta ray swimming experience", "Shark feeding tura", "Privatni chef na zahtev", "Spa nad lagunom", "Outrigger canoe sunrise tura", "Helicopter island tour", "Coral planting program", "Privatna večera na motu"],
    beach: "Privatne platforme nad lagunom — direktan ulaz u more iz sobe. Organizovana snorkeling tura do manta raja prolaza i kornjačinog raja. Peščana plaža na sopstvenom motu.",
    tip: "Ako stignete na Bora Boru bez iskustva ronjenja, Discover Scuba Diving program traje 1 dan — i videćete mante i morske pse iz prve ruke u kristalnoj laguni.",
    includes: ["Bungalov nad lagunom", "Doručak", "Canoe sunrise tura", "Manta ray iskustvo", "Snorkeling oprema", "Hidropavion transfer"],
    available: ["Tokom cele godine", "Apr–Nov (idealna klima)", "Dec–Mar (tropske kiše, niže cene)"],
  },
  {
    name: "Rosewood — Hong Kong",
    img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
    gallery: ["https://images.unsplash.com/photo-1574144113084-b6f450cc5673?w=600&q=80"],
    price: "749€", badge: "Urban Luxury", stars: 5, rating: 4.9,
    destinationType: "hotel",
    desc: "Nejvišlji hotel u Hong Kongu sa panoramom Victoria Harbour i Michelin restoranima na svakom spratu.",
    country: "Hong Kong",
    location: "Victoria Dockside, Kowloon, Hong Kong — direktno na Harboru, 10 min od centra",
    aboutDestination: "Hong Kong je jedno od najdinamičnijih metropolisa na svetu — grad koji spaja britansku kolonijalnu prošlost sa modernom kineskom kulturom. Victoria Harbour, između Kowloona i Hong Kong Islanda, dočekuje posetioce sa Symphony of Lights — najvećim laserskim shooom na svetu svakog večera u 20:00h. Peak Tram (150 godina tradicije) vodi na Victoria Peak odakle se vidi panorama koja oduzima dah. Temple Street Night Market, Mong Kok, Star Ferry i Aberdeen Floating Village su obavezne atrakcije. Hong Kong je i raja za gastronome — 83 Michelin zvezde čine ga najnagrađivanijim gastronomskim gradom u Aziji.",
    aboutHotel: "Rosewood Hong Kong je 65-spratni toranj direktno na Victoria Dockside sa direktnim pogledom na Victoria Harbour. Hotel ima 413 soba i suita — minimum 60m² — svi sa floor-to-ceiling prozorima i pogledom na luku. Rosewood poseduje 10 restorana i barova uključujući Legacy House (Michelin zvezdica) sa autentičnom kineskom kuhinjom i Asaya Kitchen sa Health-First menijima. Asaya Spa na 6 etaža je jedan od najvećih urban spa centara u Aziji.",
    rooms: "Premier Room (60m²) sa panoramskim pogledom na Harbour, floor-to-ceiling prozorima i mramornim kupatilom. Victoria Harbour Suite (120m²) sa odvojenom dnevnom sobom i panoramom od 270°. Asaya Suite (200m²) sa sopstvenim spa kupatilom i privatnim bazenom.",
    facilities: ["Direktni pogled na Victoria Harbour", "Asaya Spa (6 etaža)", "10 restorana i barova", "Legacy House (Michelin ⭐)", "Infinity bazen na 6. spratu", "Concierge servis", "Helicopter pad", "Kids Club", "Fitness 24/7", "Limuzin servis"],
    tip: "Prošetajte do Tsim Sha Tsui promenade u 20:00h svake večeri — Symphony of Lights laserski show traje 15 minuta i to je besplatan, ali nestvaran doživljaj. Gledajte sa Harbora.",
    includes: ["Boravak", "Doručak za 2", "Asaya Spa pristup", "Airport limuzin", "Habour view zajamčen"],
    available: ["Tokom cele godine", "Chinese New Year (poseban paket)", "Dragon Boat Festival"],
  },
  {
    name: "Lefay Resort — Lago di Garda, Italija",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    ],
    price: "699€", badge: "Wellness & Natura", stars: 5, rating: 4.9,
    destinationType: "hotel",
    desc: "Talijanski wellness raj nad Gardskim jezerom. Taoistički spa, organskih 3 restorana i infinity bazen sa pogledom na Alpe.",
    country: "Italija",
    location: "Gargnano, Lago di Garda, Lombardija, Italija — 100 km od Milana, 60 km od Verone",
    aboutDestination: "Lago di Garda je najveće jezero Italije i 'rivijera' severne Italije sa mediteranskom mikroklimom koja omogućava uzgoj maslina, limuna i palmi na 45° severne geografske širine. Jezero je okruženo Alpama i Dolomitima koji se ogledaju u tirkizno-plavoj vodi. Istorijskog nasledja ima na pretek: dvorac Scaligero u Sirmioneu, rimska vila Catulusova iz 1. veka, Bardolino i Valpolicella wine region, gradić Limone sul Garda. Gargnano, gde se nalazi Lefay, je jedno od najlepših jezero-sela i domaćin je čuvenih jezerskih regata.",
    aboutHotel: "Lefay Resort & SPA Lago di Garda je jedinstven wellness resort koji se klizi niz brdovitu obalu Gardskog jezera sa terasama sa pogledom na vodu. Resort kombinuje taoistički pristup wellness-u (balans 5 elemenata) sa modernim tretmanima i autentičnim talijanskim tradicijama. Spa površine 3500m² je jedan od najvećih u Italiji — 30+ tretmana od kojih mnogi koriste lokalnu olivu, lavandu i ekstraktima Gardskog jezera. Tri restorana nudi organsku lombardijsku kuhinju.",
    rooms: "Deluxe Terrace Suite (60m²) sa privatnom terasom i direktnim pogledom na Gardsko jezero i Alpe. Suite (85m²) sa zasebnom dnevnom sobom, kaminom i dvostrukom privatnom terasom. Grand Suite (120m²) sa sopstvenim Jacuzzijem na terasi.",
    facilities: ["Taoistički Spa 3500m²", "Infinity bazen sa pogledom na Alpe i jezero", "Indoor Olympic bazen (28°C)", "Teniski centar", "Yoga i pilates studio", "3 organska restorana", "Vinski podrum sa Garda vinima", "Private beach access", "Čamac do Sirmionea i Limona"],
    beach: "Privatni pontoni na jezeru za kupanje. Voda Gardskog jezera je izuzetno čista i topla leti (26°C). Kajak i SUP dostupni besplatno za goste.",
    tip: "Preporučujemo celonevni izlet brodom po jezeru — poseta Sirmioneu sa rimskim ruinama, Limone sul Garda sa limunjarevima i ručak u kontobi Bardolino regiona je nezaboravan talijanski dan.",
    includes: ["Boravak", "Doručak i večera (organska)", "Spa pristup", "Kayak i SUP", "Wellness program"],
    available: ["Apr–Okt (jezero sezona)", "Jun–Aug (idealno)", "Septembar (mirno, toplo)"],
  },
];

export default function HoteliPage() {
  const [modal, setModal] = useState<{ open: boolean; name: string; price: string }>({ open: false, name: "", price: "" });
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [selectedDetail, setSelectedDetail] = useState<DestinationDetail | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zemlja = params.get("zemlja") || "";
    if (zemlja) setCountryFilter(zemlja);
  }, []);

  const list = countryFilter ? hotels.filter(h => h.country === countryFilter) : hotels;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" alt="Luxury hotel" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
          <p className="text-yellow-400 font-semibold uppercase tracking-widest text-sm mb-2">Ekskluzivni smeštaj</p>
          <h1 className="font-serif text-5xl font-bold text-white mb-3">Hoteli sveta</h1>
          <p className="text-white/80 text-lg">Kolekcija najboljeg hotelskog iskustva na planeti</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-yellow-500 text-black py-3">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 text-sm flex-wrap justify-center font-semibold">
          <span>🏆 <strong>World Travel Awards</strong> pobednici</span>
          <span>🛎️ <strong>Concierge</strong> usluga 24/7</span>
          <span>✈️ <strong>VIP transfer</strong> po dolasku</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {countryFilter && (
          <div className="mb-6 flex items-center gap-3">
            <span className="text-blue-700 font-semibold text-sm">🔍 Prikazano za: <strong>{countryFilter}</strong></span>
            <button onClick={() => setCountryFilter("")} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium transition-colors">
              Prikaži sve ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10">
          {list.map((hotel) => (
            <div key={hotel.name} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Image */}
                <div className="lg:col-span-2 relative h-72 lg:h-auto overflow-hidden">
                  <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 to-transparent"/>
                  <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                    <span className="badge-gold">{hotel.badge}</span>
                    <AvailabilityBadge dates={hotel.available || []} size="sm" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-yellow-600 font-bold text-xs px-3 py-1 rounded-full">
                      ⭐ {hotel.rating} / 5.0
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="lg:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-gray-900">{hotel.name}</h3>
                        <p className="text-blue-600 text-sm mt-1">📍 {hotel.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Noćenje / os</p>
                        <p className="price-tag">od {hotel.price}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{hotel.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(hotel.facilities ?? []).slice(0, 5).map(f => (
                        <span key={f} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{f}</span>
                      ))}
                      {(hotel.facilities ?? []).length > 5 && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-blue-100"
                          onClick={() => setSelectedDetail(hotel)}>+{(hotel.facilities ?? []).length - 5} više →</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setSelectedDetail(hotel)} className="flex-1 py-3 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-bold text-sm rounded-xl transition-colors">
                      Pogledaj detaljnije →
                    </button>
                    <button onClick={() => setModal({ open: true, name: hotel.name, price: hotel.price })} className="flex-1 py-3 btn-gold font-bold text-sm rounded-xl">
                      Rezervišite
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
