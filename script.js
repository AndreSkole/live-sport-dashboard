// Enkelt oppsett av data (placeholder)
const fotballKamper = [
  { nummer: 1, hjemme: "Rosenborg", borte: "Molde", resultat: "2 - 1", status: "Ferdig", startTid: "2026-02-03T18:00:00" },
  { nummer: 2, hjemme: "Brann", borte: "Viking", resultat: "1 - 1", status: "Direkte", startTid: "2026-02-03T20:15:00" },
  { nummer: 3, hjemme: "Bodø/Glimt", borte: "Lillestrøm", resultat: "-", status: "Kommende", startTid: "2026-02-03T21:30:00" },
  { nummer: 4, hjemme: "Stabæk", borte: "Sarpsborg 08", resultat: "0 - 3", status: "Ferdig", startTid: "2026-02-02T19:00:00" },
  { nummer: 5, hjemme: "Haugesund", borte: "Odd", resultat: "-", status: "Kommende", startTid: "2026-02-05T18:30:00" },
];

const f1Lop = [
  { nummer: 101, lop: "Bahrain Grand Prix", forer: "Oscar Piastri", lag: "McLaren", posisjon: "P1", tid: "1:32:18.552", status: "Ferdig", startTid: "2026-02-01T17:00:00" },
  { nummer: 102, lop: "Saudi Arabian Grand Prix", forer: "Max Verstappen", lag: "Red Bull Racing", posisjon: "P2", tid: "+4.210s", status: "Ferdig", startTid: "2026-02-02T19:00:00" },
  { nummer: 103, lop: "Australian Grand Prix", forer: "Lando Norris", lag: "McLaren", posisjon: "P1", tid: "LAP 38/58", status: "Direkte", startTid: "2026-02-03T07:00:00" },
  { nummer: 104, lop: "Japanese Grand Prix", forer: "Charles Leclerc", lag: "Ferrari", posisjon: "-", tid: "Start 06:00", status: "Kommende", startTid: "2026-02-05T06:00:00" },
  { nummer: 105, lop: "Monaco Grand Prix", forer: "Lewis Hamilton", lag: "Mercedes", posisjon: "-", tid: "Start 15:00", status: "Kommende", startTid: "2026-02-07T15:00:00" },
];

//Hente elementer fra html
const sportVelger = document.querySelector("#sportVelger");
const sokInput = document.querySelector("#sokInput");
const sokHjelp = document.querySelector("#sokHjelp");
const idagKnapp = document.querySelector("#idagKnapp");
const alleKnapp = document.querySelector("#alleKnapp");
const idagRutenett = document.querySelector("#idagRutenett");
const andreRutenett = document.querySelector("#andreRutenett");
const idagTittel = document.querySelector("#idagTittel");
const andreTittel = document.querySelector("#andreTittel");
const idagAntall = document.querySelector("#idagAntall");
const andreAntall = document.querySelector("#andreAntall");

let visBareIDag = false;

// Små hjelpefunksjoner
function sammeDag(a, b) {
  return a.toDateString() === b.toDateString();
}

function statusKlasse(tekst) {
  const lav = tekst.toLowerCase();
  if (lav.includes("direkte")) return "direkte";
  if (lav.includes("ferdig")) return "ferdig";
  return "kommende";
}

function tidTekst(datoVerdi) {
  const dato = new Date(datoVerdi);
  return `${dato.toLocaleDateString("no-NO", { day: "2-digit", month: "short" })} · ${dato.toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" })}`;
}

function fotballKort(kamp) {
  return `
    <div class="kort">
      <div class="status ${statusKlasse(kamp.status)}">${kamp.status}</div>
      <h3>${kamp.hjemme} vs ${kamp.borte}</h3>
      <div class="resultat">${kamp.resultat}</div>
      <div class="detalj">Start: ${tidTekst(kamp.startTid)}</div>
    </div>
  `;
}

function f1Kort(lop) {
  return `
    <div class="kort">
      <div class="status ${statusKlasse(lop.status)}">${lop.status}</div>
      <h3>${lop.lop}</h3>
      <div class="resultat">${lop.forer} · ${lop.lag}</div>
      <div class="detalj">Posisjon: ${lop.posisjon}</div>
      <div class="detalj">Tid: ${lop.tid}</div>
      <div class="detalj">Start: ${tidTekst(lop.startTid)}</div>
    </div>
  `;
}

function tegn() {
  const sport = sportVelger.value;
  const sok = sokInput.value.trim().toLowerCase();
  const idagDato = new Date();

  // Validering søk må være minst 2 tegn hvis det brukes
  if (sok.length === 1) {
    sokHjelp.classList.add("advarsel");
  } else {
    sokHjelp.classList.remove("advarsel");
  }

  const data = sport === "fotball" ? fotballKamper : f1Lop;

  // Filtrer hvis søk er brukt
  const filtrert = data.filter((element) => {
    if (sok.length < 2) return true;
    const tekst =
      sport === "fotball"
        ? `${element.hjemme} ${element.borte}`
        : `${element.lop} ${element.forer} ${element.lag}`;
    return tekst.toLowerCase().includes(sok);
  });

  const idagListe = filtrert.filter((element) => sammeDag(new Date(element.startTid), idagDato));
  const andreListe = filtrert.filter((element) => !sammeDag(new Date(element.startTid), idagDato));

  if (sport === "fotball") {
    idagTittel.textContent = "Dagens kamper";
    andreTittel.textContent = "Tidligere og kommende kamper";
    idagRutenett.innerHTML = idagListe.map(fotballKort).join("");
    andreRutenett.innerHTML = andreListe.map(fotballKort).join("");
  } else {
    idagTittel.textContent = "Dagens løp";
    andreTittel.textContent = "Tidligere og kommende løp";
    idagRutenett.innerHTML = idagListe.map(f1Kort).join("");
    andreRutenett.innerHTML = andreListe.map(f1Kort).join("");
  }

  if (visBareIDag) {
    andreRutenett.innerHTML = "";
    andreAntall.textContent = "0";
  } else {
    andreAntall.textContent = andreListe.length;
  }

  idagAntall.textContent = idagListe.length;
}

// Enkle event listeners
sportVelger.addEventListener("change", () => {
  visBareIDag = false;
  tegn();
});

sokInput.addEventListener("input", tegn);

idagKnapp.addEventListener("click", () => {
  visBareIDag = true;
  tegn();
});

alleKnapp.addEventListener("click", () => {
  visBareIDag = false;
  tegn();
});

// Start
tegn();
