// Enkelt oppsett av data (placeholder)
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
const idagKnapp = document.querySelector("#idagKnapp");
const alleKnapp = document.querySelector("#alleKnapp");
const idagRutenett = document.querySelector("#idagRutenett");
const andreRutenett = document.querySelector("#andreRutenett");
const idagAntall = document.querySelector("#idagAntall");
const andreAntall = document.querySelector("#andreAntall");

let visBareIDag = false;

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
  const sok = sokInput.value.trim().toLowerCase();
  const idagDato = new Date();

  if (sok.length === 1) {
    sokHjelp.classList.add("advarsel");
  } else {
    sokHjelp.classList.remove("advarsel");
  }

  const filtrert = f1Lop.filter((lop) => {
    if (sok.length < 2) return true;
    const tekst = `${lop.lop} ${lop.forer} ${lop.lag}`;
    return tekst.toLowerCase().includes(sok);
  });

  const idagListe = filtrert.filter((lop) => sammeDag(new Date(lop.startTid), idagDato));
  const andreListe = filtrert.filter((lop) => !sammeDag(new Date(lop.startTid), idagDato));

  idagRutenett.innerHTML = idagListe.map(f1Kort).join("");
  andreRutenett.innerHTML = andreListe.map(f1Kort).join("");

  if (visBareIDag) {
    andreRutenett.innerHTML = "";
    andreAntall.textContent = "0";
  } else {
    andreAntall.textContent = andreListe.length;
  }

  idagAntall.textContent = idagListe.length;
}

sokInput.addEventListener("input", tegn);

idagKnapp.addEventListener("click", () => {
  visBareIDag = true;
  tegn();
});

alleKnapp.addEventListener("click", () => {
  visBareIDag = false;
  tegn();
});

tegn();
