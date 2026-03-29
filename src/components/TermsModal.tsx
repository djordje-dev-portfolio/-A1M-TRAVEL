import { useState } from "react";

interface TermsModalProps {
  trigger: React.ReactNode;
}

export default function TermsModal({ trigger }: TermsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer hover:text-yellow-400 transition-colors">
        {trigger}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[hsl(208,79%,27%)] px-8 py-6 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">A1M Travel</p>
                <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
                  Uslovi Korišćenja i Pravni Okvir
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white text-3xl leading-none transition-colors ml-6 flex-shrink-0"
                aria-label="Zatvori"
              >
                ×
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-8 py-8 text-gray-700 text-sm leading-relaxed space-y-8">

              {/* Upozorenje */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <p className="text-red-800 font-bold text-base mb-1">⚠️ Zakonsko upozorenje</p>
                <p className="text-red-700">
                  Neovlašćeno kopiranje, reprodukovanje, distribucija ili zloupotreba sadržaja ovog veb-sajta podleže zakonskim merama u skladu sa važećim propisima Republike Srbije i međunarodnim propisima o zaštiti intelektualne svojine. Vlasnik sajta zadržava pravo na pokretanje sudskog i vansudskog postupka.
                </p>
              </div>

              <Section title="1. Opšte odredbe">
                <p>
                  Ovi Uslovi korišćenja uređuju prava i obaveze između vlasnika sajta A1M Travel (u daljem tekstu: Vlasnik) i korisnika ovog veb-sajta (u daljem tekstu: Korisnik). Pristupom ili korišćenjem ovog veb-sajta, Korisnik prihvata sve uslove navedene u ovom dokumentu.
                </p>
              </Section>

              <Section title="2. Intelektualna svojina i autorska prava">
                <p>
                  Celokupan sadržaj ovog veb-sajta — uključujući, ali ne ograničavajući se na: tekstove, opise destinacija, fotografije, grafički dizajn, logotipe, ikone, nazive aranžmana, cene i strukturu sadržaja — isključivo je vlasništvo vlasnika sajta A1M Travel ili je korišćen uz odgovarajuće licence, i zaštićen je Zakonom o autorskim i srodnim pravima Republike Srbije (Sl. glasnik RS br. 104/2009, 99/2011, 119/2012, 29/2016, 66/2019).
                </p>
                <p className="mt-2">
                  Zabranjeno je bez prethodne pisane saglasnosti vlasnika sajta:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li>Kopirati, reprodukovati ili distribuirati bilo koji deo sadržaja sajta</li>
                  <li>Koristiti sadržaj u komercijalne svrhe ili za sopstvene promotivne materijale</li>
                  <li>Preuzimati opise, ponude i cene aranžmana radi objavljivanja na drugim platformama</li>
                  <li>Modifikovati, prilagođavati ili kreirati izvedena dela zasnovana na sadržaju sajta</li>
                  <li>Sistematski prikupljati podatke sa sajta automatizovanim alatima (web scraping)</li>
                </ul>
              </Section>

              <Section title="3. Zabrana zloupotrebe i zakonske mere">
                <p>
                  Svaka zloupotreba, neovlašćeno kopiranje ili protivpravno korišćenje sadržaja, ponuda, cena ili vizuelnog identiteta sajta podleže sledećim merama:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li>Zahtev za prestankom povrede i uklanjanjem preuzetog sadržaja</li>
                  <li>Pokretanje parničnog postupka za naknadu materijalne i nematerijalne štete</li>
                  <li>Krivična prijava nadležnom tužilaštvu u skladu sa čl. 198–200 Krivičnog zakonika RS</li>
                  <li>Obaveštavanje nadležnih organa i profesionalnih udruženja</li>
                </ul>
                <p className="mt-3 font-semibold text-gray-800">
                  Vlasnik sajta aktivno prati i beleži sve neovlašćene pristupe i kopiranje sadržaja. Svaki slučaj biće procesuiran u skladu sa zakonom.
                </p>
              </Section>

              <Section title="4. Uslovi rezervacije i plaćanja">
                <p>
                  Rezervacija putovanja putem ovog sajta podrazumeva prihvatanje sledećih uslova:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li>Rezervacija postaje obavezujuća nakon uplate akontacije (minimum 30% ukupne cene aranžmana)</li>
                  <li>Ostatak iznosa plaća se najkasnije 14 dana pre polaska</li>
                  <li>Cene aranžmana iskazane su po osobi i podložne su promeni do momenta potvrde rezervacije</li>
                  <li>Vlasnik sajta ne odgovara za promene cena uzrokovane fluktuacijom valuta, porastom cena goriva ili promenama hotelskih tarifa van njegove kontrole</li>
                </ul>
              </Section>

              <Section title="5. Otkazivanje i povraćaj sredstava">
                <p>
                  Korisnik ima pravo da otkaže rezervaciju pod sledećim uslovima:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li>Više od 30 dana pre polaska — povraćaj 90% uplaćenog iznosa</li>
                  <li>15–30 dana pre polaska — povraćaj 70% uplaćenog iznosa</li>
                  <li>7–14 dana pre polaska — povraćaj 50% uplaćenog iznosa</li>
                  <li>Manje od 7 dana pre polaska — nema povraćaja sredstava</li>
                </ul>
                <p className="mt-2">
                  U slučaju više sile (epidemija, elementarne nepogode, ratni sukobi) postupa se u skladu sa važećim zakonskim propisima.
                </p>
              </Section>

              <Section title="6. Odgovornost vlasnika sajta">
                <p>
                  A1M Travel nastoji da sve informacije na sajtu budu tačne i ažurne. Vlasnik sajta ne snosi odgovornost za:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                  <li>Tehničke greške na veb-sajtu ili privremenu nedostupnost servisa</li>
                  <li>Izmene u programu putovanja uzrokovane višom silom</li>
                  <li>Ponašanje trećih lica (prevoznici, hoteli, lokalni partneri)</li>
                  <li>Gubitak ili krađu prtljaga i ličnih predmeta Korisnika</li>
                </ul>
              </Section>

              <Section title="7. Zaštita ličnih podataka">
                <p>
                  Lični podaci Korisnika prikupljaju se isključivo u svrhu realizacije rezervacija i ugovorenih usluga, u skladu sa Zakonom o zaštiti podataka o ličnosti (ZZPL, Sl. glasnik RS br. 87/2018) i GDPR regulativom Evropske unije.
                </p>
                <p className="mt-2">
                  Lični podaci neće biti prosleđivani trećim licima bez izričite saglasnosti Korisnika. Korisnik ima pravo uvida, ispravke i brisanja svojih podataka na pisani zahtev.
                </p>
              </Section>

              <Section title="8. Merodavno pravo i nadležnost">
                <p>
                  Na sve sporove koji nastanu iz ili u vezi sa ovim Uslovima korišćenja primenjuje se pravo Republike Srbije. Za rešavanje sporova nadležan je stvarno nadležan sud, osim ako stranke ne postignu sporazum o alternativnom rešavanju spora (medijacija).
                </p>
              </Section>

              <Section title="9. Izmene uslova">
                <p>
                  Vlasnik sajta zadržava pravo izmene ovih Uslova korišćenja u bilo kom trenutku, bez prethodne najave. Izmenjeni uslovi stupaju na snagu objavljivanjem na ovom veb-sajtu. Dalje korišćenje sajta nakon objave izmena smatra se prihvatanjem novih uslova.
                </p>
              </Section>

              <div className="border-t border-gray-200 pt-6 text-xs text-gray-400">
                <p>Poslednja izmena: mart 2025. godine</p>
                <p className="mt-1">Vlasnik sajta: Đorđe Milosavljević, Krupanj</p>
                <p className="mt-1">Kontakt: A1Mtravel@email.com</p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-8 py-4 flex justify-end flex-shrink-0 bg-gray-50">
              <button
                onClick={() => setOpen(false)}
                className="bg-[hsl(208,79%,27%)] text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-[hsl(208,79%,22%)] transition-colors text-sm"
              >
                Razumem i prihvatam
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 text-base mb-3 pb-2 border-b border-gray-100">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
