
const fotballKamper = [
  { nummer: 1, hjemme: "Rosenborg", borte: "Molde", resultat: "2 - 1", status: "Ferdig", startTid: "2026-02-03T18:00:00" },
  { nummer: 2, hjemme: "Brann", borte: "Viking", resultat: "1 - 1", status: "Direkte", startTid: "2026-02-03T20:15:00" },
  { nummer: 3, hjemme: "Bodø/Glimt", borte: "Lillestrøm", resultat: "-", status: "Kommende", startTid: "2026-02-03T21:30:00" },
  { nummer: 4, hjemme: "Stabæk", borte: "Sarpsborg 08", resultat: "0 - 3", status: "Ferdig", startTid: "2026-02-02T19:00:00" },
  { nummer: 5, hjemme: "Haugesund", borte: "Odd", resultat: "-", status: "Kommende", startTid: "2026-02-05T18:30:00" },
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

function tegn() {
  const sok = sokInput.value.trim().toLowerCase();
  const idagDato = new Date();

  if (sok.length === 1) {
    sokHjelp.classList.add("advarsel");
  } else {
    sokHjelp.classList.remove("advarsel");
  }

  const filtrert = fotballKamper.filter((kamp) => {
    if (sok.length < 2) return true;
    const tekst = `${kamp.hjemme} ${kamp.borte}`;
    return tekst.toLowerCase().includes(sok);
  });

  const idagListe = filtrert.filter((kamp) => sammeDag(new Date(kamp.startTid), idagDato));
  const andreListe = filtrert.filter((kamp) => !sammeDag(new Date(kamp.startTid), idagDato));

  idagRutenett.innerHTML = idagListe.map(fotballKort).join("");
  andreRutenett.innerHTML = andreListe.map(fotballKort).join("");

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
