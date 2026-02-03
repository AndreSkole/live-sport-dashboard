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

// Hent elementer
const sokInput = document.querySelector("#sokInput");
const sokHjelp = document.querySelector("#sokHjelp");
const fotballRutenett = document.querySelector("#fotballRutenett");
const f1Rutenett = document.querySelector("#f1Rutenett");
const fotballAntall = document.querySelector("#fotballAntall");
const f1Antall = document.querySelector("#f1Antall");

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
    <article class="kort">
      <span class="status ${statusKlasse(kamp.status)}">${kamp.status}</span>
      <h3>${kamp.hjemme} vs ${kamp.borte}</h3>
      <div class="resultat">${kamp.resultat}</div>
      <div class="detalj">Start: ${tidTekst(kamp.startTid)}</div>
    </article>
  `;
}

function f1Kort(lop) {
  return `
    <article class="kort">
      <span class="status ${statusKlasse(lop.status)}">${lop.status}</span>
      <h3>${lop.lop}</h3>
      <div class="resultat">${lop.forer} · ${lop.lag}</div>
      <div class="detalj">Posisjon: ${lop.posisjon}</div>
      <div class="detalj">Tid: ${lop.tid}</div>
      <div class="detalj">Start: ${tidTekst(lop.startTid)}</div>
    </article>
  `;
}

function tegn() {
  const sok = sokInput.value.trim().toLowerCase();

  if (sok.length === 1) {
    sokHjelp.classList.add("advarsel");
  } else {
    sokHjelp.classList.remove("advarsel");
  }

  const filtrertFotball = fotballKamper.filter((kamp) => {
    if (sok.length < 2) return true;
    const tekst = `${kamp.hjemme} ${kamp.borte}`;
    return tekst.toLowerCase().includes(sok);
  });

  const filtrertF1 = f1Lop.filter((lop) => {
    if (sok.length < 2) return true;
    const tekst = `${lop.lop} ${lop.forer} ${lop.lag}`;
    return tekst.toLowerCase().includes(sok);
  });

  fotballRutenett.innerHTML = filtrertFotball.map(fotballKort).join("");
  f1Rutenett.innerHTML = filtrertF1.map(f1Kort).join("");

  fotballAntall.textContent = filtrertFotball.length;
  f1Antall.textContent = filtrertF1.length;
}

sokInput.addEventListener("input", tegn);

tegn();
