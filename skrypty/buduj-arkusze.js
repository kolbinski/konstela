#!/usr/bin/env node
/* Prerendering arkuszy: z pliku .xlsx powstaje gotowy HTML pod /arkusz/<nazwa>/.
 *
 * Po co. Przeglądarka arkusza w `view-xlsx.html` rozpakowuje plik i składa
 * tabele w przeglądarce, więc narzędzie bez JavaScriptu - czytnik, robot
 * wyszukiwarki, podgląd w kliencie poczty, model językowy czytający stronę -
 * widzi sam komunikat „Wczytywanie". Oferty powołują się na jawny kosztorys
 * jako na dowód, więc dowód musi być widoczny bez uruchamiania skryptu.
 *
 * Jak. Szablonem jest ten sam `view-xlsx.html`, więc nie ma drugiego arkusza
 * stylów ani drugiego układu strony do utrzymywania. Skrypt podmienia w nim
 * zawartość znacznika <main id="content"> na wszystkie zakładki wypisane jedna
 * pod drugą i zapisuje wynik jako `arkusz/<nazwa>/index.html`. Skrypt strony
 * zostaje: jeżeli JavaScript działa, zastępuje wersję statyczną wersją z
 * zakładkami. To jest wzmocnienie, nie zamiana.
 *
 * Czego ten skrypt nie robi. Nie liczy formuł. Wartości bierze z pliku, więc
 * plik musi być zapisany z wynikami - patrz skrypty/README.md.
 *
 * Uruchamianie: node skrypty/buduj-arkusze.js, po `npm install exceljs`.
 */

const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const KORZEN = path.resolve(__dirname, '..');

/* Arkusze publikowane pod /arkusz/. Klucz to człon adresu, wartość to plik. */
const ARKUSZE = {
  'budzet-edycji-pierwszej': 'budzet-edycji-pierwszej.xlsx',
  'zestawienie-zadania': 'attachments/zestawienie-zadania.xlsx',
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

/* Ta sama reguła co w przeglądarce arkusza, żeby kotwice zakładek się zgadzały. */
function slug(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* Formatowanie liczb jak w przeglądarce: ułamki poniżej jedności jako procent,
   reszta po polsku z odstępem w każdym rzędzie tysięcy. Odstęp wymuszamy, bo
   polska reguła domyślna nie grupuje liczb czterocyfrowych i w jednej kolumnie
   wychodziło „5500" obok „11 000". Lata zapisane są w arkuszu jako tekst, więc
   ta funkcja ich nie dotyka. */
function fmt(v) {
  const n = Number(v);
  if (!isFinite(n)) return String(v);
  if (Math.abs(n) > 0 && Math.abs(n) < 1) return (n * 100).toFixed(0) + '%';
  return n.toLocaleString('pl-PL', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: 'always',
  });
}

/* Wartość komórki sprowadzona do tekstu wraz z informacją, czy jest liczbą i
   czy stoi za nią formuła. Formuła trafia do atrybutu title, żeby dało się ją
   podejrzeć bez pobierania pliku. */
function komorka(c) {
  let v = c.value;
  let formula = '';
  if (v && typeof v === 'object') {
    if (v.formula !== undefined || v.sharedFormula !== undefined) {
      formula = v.formula || v.sharedFormula || '';
      v = v.result !== undefined ? v.result : '';
    } else if (v.richText) {
      v = v.richText.map((t) => t.text).join('');
    } else if (v.text !== undefined) {
      v = v.text;
    } else if (v instanceof Date) {
      v = v.toISOString().slice(0, 10);
    } else if (v.error) {
      v = v.error;
    }
  }
  if (v === null || v === undefined) v = '';
  const liczba = v !== '' && typeof v === 'number';
  return { tekst: liczba ? fmt(v) : String(v), liczba, formula };
}

function tabela(ws) {
  /* Scalenia: kotwica dostaje rozpiętość, komórki przykryte pomijamy. */
  const kotwica = {};
  const przykryte = {};
  (ws.model.merges || []).forEach((ref) => {
    const [p1, p2] = ref.split(':');
    const d = (p) => {
      const m = /^([A-Z]+)(\d+)$/.exec(p);
      let k = 0;
      for (const z of m[1]) k = k * 26 + (z.charCodeAt(0) - 64);
      return { k, w: +m[2] };
    };
    const a = d(p1);
    const b = d(p2);
    kotwica[a.w + ':' + a.k] = { cs: b.k - a.k + 1, rs: b.w - a.w + 1 };
    for (let r = a.w; r <= b.w; r++)
      for (let k = a.k; k <= b.k; k++)
        if (!(r === a.w && k === a.k)) przykryte[r + ':' + k] = true;
  });

  /* Szerokość tabeli wyznacza ostatnia kolumna z jakąkolwiek treścią; puste
     kolumny techniczne arkusza nie mają po co trafiać na stronę. */
  let szer = 0;
  ws.eachRow({ includeEmpty: false }, (row) => {
    row.eachCell({ includeEmpty: false }, (c, nr) => {
      if (komorka(c).tekst.trim() !== '' && nr > szer) szer = nr;
    });
  });
  if (!szer) return '';

  let html = '<div class="sheet-wrap"><table class="sheet"><tbody>';
  const ostatni = ws.rowCount;
  for (let nrw = 1; nrw <= ostatni; nrw++) {
    const row = ws.getRow(nrw);
    let pusty = true;
    for (let k = 1; k <= szer; k++) if (komorka(row.getCell(k)).tekst.trim() !== '') pusty = false;
    if (pusty && !Object.keys(kotwica).some((x) => x.startsWith(nrw + ':'))) continue;
    html += '<tr>';
    for (let k = 1; k <= szer; k++) {
      if (przykryte[nrw + ':' + k]) continue;
      const c = row.getCell(k);
      const { tekst, liczba, formula } = komorka(c);
      const prawo = c.alignment && c.alignment.horizontal === 'right';
      const pogrubienie = !!(c.font && c.font.bold);
      const wypelnienie = !!(
        c.fill &&
        c.fill.type === 'pattern' &&
        c.fill.pattern !== 'none' &&
        c.fill.fgColor &&
        c.fill.fgColor.argb &&
        !/^(FF)?FFFFFF$/i.test(c.fill.fgColor.argb)
      );
      const kl = [];
      if (liczba || prawo) kl.push('num');
      if (pogrubienie) kl.push('b');
      if (wypelnienie) kl.push('fill');
      const sp = kotwica[nrw + ':' + k];
      const atr =
        (kl.length ? ' class="' + kl.join(' ') + '"' : '') +
        (sp && sp.cs > 1 ? ' colspan="' + sp.cs + '"' : '') +
        (sp && sp.rs > 1 ? ' rowspan="' + sp.rs + '"' : '') +
        (formula ? ' title="= ' + esc(formula) + '"' : '');
      html += '<td' + atr + '>' + esc(tekst) + '</td>';
    }
    html += '</tr>';
  }
  html += '</tbody></table></div>';
  return html;
}

async function zbuduj(nazwa, plik) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(path.join(KORZEN, plik));

  const zakladki = wb.worksheets.filter((ws) => ws.state !== 'hidden');
  const nawigacja =
    '<nav class="tabs" aria-label="Zakładki arkusza">' +
    zakladki
      .map((ws) => '<a href="#' + slug(ws.name) + '">' + esc(ws.name) + '</a>')
      .join('') +
    '</nav>';

  const sekcje = zakladki
    .map((ws) => {
      const t = tabela(ws);
      if (!t) return '';
      return (
        '<section id="' + slug(ws.name) + '" class="zakladka">' +
        '<h2>' + esc(ws.name) + '</h2>' +
        t +
        '</section>'
      );
    })
    .join('');

  const wstep =
    '<p class="pobierz"><a href="/' + plik.replace(/^.*\//, (m) => m) + '" download>Pobierz plik xlsx</a></p>' +
    '<p class="legend"><span class="box"></span>pola do edycji w arkuszu. ' +
    'Wartości pochodzą z pliku; formułę stojącą za polem pokazuje dymek po najechaniu na nie kursorem.</p>';

  const tresc = wstep + nawigacja + sekcje;

  const szablon = fs.readFileSync(path.join(KORZEN, 'view-xlsx.html'), 'utf8');
  const html = szablon
    .replace(
      /<main id="content">[\s\S]*?<\/main>/,
      '<main id="content" class="loaded">\n' + tresc + '\n    </main>'
    )
    .replace(
      /<title>[^<]*<\/title>/,
      '<title>' + esc(nazwa.replace(/-/g, ' ')) + ' - arkusz - Nagroda Konstela</title>'
    );

  const katalog = path.join(KORZEN, 'arkusz', nazwa);
  fs.mkdirSync(katalog, { recursive: true });
  fs.writeFileSync(path.join(katalog, 'index.html'), html);
  return { nazwa, zakladki: zakladki.length };
}

async function main() {
  const wynik = [];
  for (const [nazwa, plik] of Object.entries(ARKUSZE)) wynik.push(await zbuduj(nazwa, plik));
  console.log(
    'Zbudowano ' +
      wynik.length +
      ' arkuszy: ' +
      wynik.map((w) => w.nazwa + ' (' + w.zakladki + ' zakładek)').join(', ') +
      '.'
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
