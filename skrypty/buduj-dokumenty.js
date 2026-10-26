/* Generator stron dokumentów - Nagroda Konstela.
 *
 * Zamienia każdy plik `<nazwa>.md` z korzenia repozytorium na gotową stronę
 * `dokument/<nazwa>/index.html`, z treścią wrenderowaną już po stronie
 * serwera. Dzięki temu Google, Facebook, LinkedIn i Slack widzą tekst,
 * tytuł i opis bez uruchamiania JavaScriptu.
 *
 * Uruchamiany automatycznie przy każdym wrzuceniu plików na GitHub, przez
 * `.github/workflows/publikuj.yml`. Lokalnie: `node skrypty/buduj-dokumenty.js`
 * po `npm install marked@12.0.2`.
 *
 * Czego ten skrypt NIE robi: nie dotyka `view.html` ani `view-xlsx.html`.
 * Pierwszy obsługuje dawną postać adresu `?file=`, która poszła w świat;
 * drugi rozpakowuje arkusze i musi działać w przeglądarce.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { marked } = require('marked');

const KORZEN = path.resolve(__dirname, '..');
const DOMENA = 'https://konstela.org';

/* Dokumenty widoczne dla wyszukiwarek. Wszystkie pozostałe dostają
   "noindex, follow": otwierają się pod linkiem, ale nie trafiają do Google
   i nie ma ich w mapie strony. Decyzja z 25.10.2026 - publiczne jest to,
   czego potrzebuje ktoś, kto chce się zgłosić, a notatki robocze nie. */
const PUBLICZNE = new Set([
  'regulamin',
  'regulamin-plebiscytu',
  'polityka-prywatnosci',
  'plebiscyt-piosenki',
  'plebiscyt-plakatu',
  'regulamin-plakatu',
]);

/* Dokumenty mające własny, krótszy adres poza członem /dokument/.
   Strona powstaje wtedy w obu miejscach, a adresem kanonicznym jest krótszy. */
const DEDYKOWANE = {
  'plebiscyt-piosenki': 'plebiscyt-piosenki',
  'plebiscyt-plakatu': 'plebiscyt-plakatu',
};

/* Opisy stron publicznych pisane ręcznie. Dokumenty prawne zaczynają się od
   paragrafu pierwszego, więc nie ma w nich akapitu wstępnego nadającego się
   na opis w wynikach wyszukiwania. Pozostałe dokumenty dostają opis wyjęty
   z pierwszego akapitu, co przy notatkach roboczych wystarcza. */
/* Tytuły dla dokumentów, które nie mogą mieć nagłówka h1 - pismo urzędowe
   zaczyna się od miejscowości i daty, nie od tytułu. Bez tego w karcie
   przeglądarki zostaje sama nazwa pliku. */
const TYTULY = {
  'mk-pismo': 'Pismo do MKiDN',
};

const OPISY = {
  regulamin:
    'Pełne zasady konkursu na najlepszą rozmowę ze sztuczną inteligencją: kto może się zgłosić, jak wygląda zgłoszenie, według czego ocenia Kapituła i jakie są nagrody. Wraz z kartą oceny.',
  'regulamin-plebiscytu':
    'Pełne zasady plebiscytu na piosenkę o sztucznej inteligencji: kto może zgłosić utwór, gdzie przebiega granica użycia AI, według czego ocenia jury, jakie są nagrody i co dzieje się z prawami do piosenki.',
  'polityka-prywatnosci':
    'Jakie dane zbiera Nagroda Konstela, w jakim celu, jak długo je przechowuje i jakie prawa przysługują uczestnikom.',
  'plebiscyt-piosenki':
    'Otwarty konkurs na własną piosenkę o sztucznej inteligencji: własny tekst, własna muzyka, własne wykonanie. Jury wybiera dziesięciu finalistów, a trzy najwyżej ocenione utwory dostają nagrody pieniężne.',
  'plebiscyt-plakatu':
    'Otwarty konkurs na plakat o sztucznej inteligencji, wykonany ręcznie - farbą, tuszem, kolażem, bez generatora obrazu. Zwycięska praca trafia na okładkę antologii Nagrody Konstela.',
  'regulamin-plakatu':
    'Pełne zasady konkursu na plakat o sztucznej inteligencji: kto może zgłosić pracę, na czym polega wymóg ręcznego wykonania, według czego ocenia jury, jakie są nagrody i co dzieje się z prawami do plakatu.',
};

/* Obrazek pokazywany w podglądzie linku. */
const OBRAZEK_DOMYSLNY = '/assets/og.png';
const OBRAZKI = { 'plebiscyt-piosenki': '/assets/piosenka.jpg' };

const ZNACZNIK_ZASOBOW = process.env.ZNACZNIK_ZASOBOW || dzisiaj().replace(/-/g, '');

marked.setOptions({ gfm: true, breaks: true });

function dzisiaj() {
  return new Date().toISOString().slice(0, 10);
}

/* Data ostatniej zmiany pliku, brana z historii Git. Czas modyfikacji na
   dysku jest tu bezużyteczny, bo przy pobraniu repozytorium wszystkie pliki
   dostają tę samą, dzisiejszą datę. */
function dataZmiany(plik) {
  try {
    const wynik = execFileSync('git', ['log', '-1', '--format=%cs', '--', plik], {
      cwd: KORZEN,
      encoding: 'utf8',
    }).trim();
    return wynik || dzisiaj();
  } catch (e) {
    return dzisiaj();
  }
}

function escapuj(tekst) {
  return tekst
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* Tytuł: pierwszy nagłówek pierwszego poziomu. */
function tytul(md, nazwa) {
  if (TYTULY[nazwa]) return TYTULY[nazwa];
  const trafienie = md.match(/^#\s+(.+)$/m);
  if (!trafienie) return nazwa;
  return trafienie[1].replace(/\s*<[^>]*>\s*/g, ' ').replace(/[*_`]/g, '').trim();
}

/* Opis do podglądu linku: pierwszy prawdziwy akapit, oczyszczony ze
   znaczników markdown i przycięty na granicy słowa. */
function opis(md) {
  const wiersze = md.split('\n');
  let akapit = '';
  for (let i = 0; i < wiersze.length; i++) {
    const w = wiersze[i].trim();
    if (!w) continue;
    if (w.startsWith('#')) continue;          // nagłówki
    if (w.startsWith('![')) continue;         // obrazki
    if (w.startsWith('<')) continue;          // wstawki HTML
    if (w.startsWith('|') || w.startsWith('>')) continue; // tabele i cytaty
    if (w.startsWith('-') || w.startsWith('*') || /^\d+[a-z]?[.)]/.test(w)) continue; // listy i ustępy
    akapit = w;
    break;
  }
  if (!akapit) return 'Nagroda Konstela - coroczna nagroda dla ludzi, którzy prowadzą najlepsze rozmowy ze sztuczną inteligencją.';

  let czysty = akapit
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // odnośniki
    .replace(/<[^>]*>/g, '')                  // wstawki HTML
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (czysty.length <= 200) return czysty;
  const uciety = czysty.slice(0, 200);
  const spacja = uciety.lastIndexOf(' ');
  return (spacja > 120 ? uciety.slice(0, spacja) : uciety).replace(/[,;:.\-]+$/, '') + '...';
}

/* Odnośniki wychodzące poza serwis otwieramy w nowej karcie - tak samo, jak
   robił to dotąd skrypt w przeglądarce. */
function otworzObceWNowejKarcie(html) {
  return html.replace(/<a href="(https?:\/\/[^"]+)"([^>]*)>/g, (calosc, adres, reszta) => {
    if (adres.indexOf('konstela.org') !== -1) return calosc;
    /* Część dokumentów ma wpisane surowe odnośniki HTML z własnymi
       atrybutami - takich nie dublujemy. */
    if (/target=/.test(reszta)) return calosc;
    return '<a href="' + adres + '" target="_blank" rel="noopener noreferrer"' + reszta + '>';
  });
}

/* Nazwa serwisu w tytule karty przeglądarki - ale bez powtarzania jej dwa
   razy, gdy nagłówek dokumentu już ją zawiera. */
function pelnyTytul(naglowek) {
  return /konstel/i.test(naglowek) ? naglowek : naglowek + ' - Nagroda Konstela';
}

function strona({ naglowek, opisStrony, adresKanoniczny, obrazek, indeksowac, tresc }) {
  const roboty = indeksowac ? 'index, follow, noai, noimageai' : 'noindex, follow';
  const v = '?v=' + ZNACZNIK_ZASOBOW;
  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${escapuj(pelnyTytul(naglowek))}</title>
    <meta name="description" content="${escapuj(opisStrony)}" />
    <link rel="canonical" href="${adresKanoniczny}" />
    <meta name="robots" content="${roboty}" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Nagroda Konstela" />
    <meta name="theme-color" content="#f6f2e9" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#14120e" media="(prefers-color-scheme: dark)" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Nagroda Konstela" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:url" content="${adresKanoniczny}" />
    <meta property="og:title" content="${escapuj(naglowek)}" />
    <meta property="og:description" content="${escapuj(opisStrony)}" />
    <meta property="og:image" content="${DOMENA}${obrazek}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapuj(naglowek)}" />
    <meta name="twitter:description" content="${escapuj(opisStrony)}" />
    <meta name="twitter:image" content="${DOMENA}${obrazek}" />
    <link rel="stylesheet" href="/assets/view.css${v}" />
  </head>
  <body>
    <header class="masthead">
      <span class="left">
        <a class="back" href="/" aria-label="Wróć na stronę główną">&#8592;</a>
        <a class="brand" href="/">Nagroda Konstela</a>
      </span>
    </header>

    <main id="content" class="loaded">
${tresc}
    </main>

    <konstela-stopka></konstela-stopka>

    <script src="/assets/nawigacja.js${v}" defer></script>
    <script src="/assets/stopka.js${v}" defer></script>
  </body>
</html>
`;
}

function zapisz(sciezka, tresc) {
  fs.mkdirSync(path.dirname(sciezka), { recursive: true });
  fs.writeFileSync(sciezka, tresc);
}

function main() {
  const pliki = fs
    .readdirSync(KORZEN)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const doMapyStrony = [];
  let publiczne = 0;

  pliki.forEach((plik) => {
    const nazwa = plik.replace(/\.md$/, '');
    const md = fs.readFileSync(path.join(KORZEN, plik), 'utf8');

    const indeksowac = PUBLICZNE.has(nazwa);
    const adresKrotki = DEDYKOWANE[nazwa];
    const adresKanoniczny = adresKrotki
      ? `${DOMENA}/${adresKrotki}/`
      : `${DOMENA}/dokument/${nazwa}/`;

    const html = strona({
      naglowek: tytul(md, nazwa),
      opisStrony: OPISY[nazwa] || opis(md),
      adresKanoniczny,
      obrazek: OBRAZKI[nazwa] || OBRAZEK_DOMYSLNY,
      indeksowac,
      tresc: otworzObceWNowejKarcie(marked.parse(md)),
    });

    zapisz(path.join(KORZEN, 'dokument', nazwa, 'index.html'), html);
    if (adresKrotki) zapisz(path.join(KORZEN, adresKrotki, 'index.html'), html);

    if (indeksowac) {
      publiczne++;
      doMapyStrony.push({ adres: adresKanoniczny, data: dataZmiany(plik) });
    }
  });

  const mapa =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `  <url>\n    <loc>${DOMENA}/</loc>\n    <lastmod>${dataZmiany('index.html')}</lastmod>\n` +
    '    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n' +
    doMapyStrony
      .map(
        (w) =>
          `  <url>\n    <loc>${w.adres}</loc>\n    <lastmod>${w.data}</lastmod>\n` +
          '    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n'
      )
      .join('') +
    '</urlset>\n';
  fs.writeFileSync(path.join(KORZEN, 'sitemap.xml'), mapa);

  console.log(
    `Zbudowano ${pliki.length} dokumentów, w tym ${publiczne} publicznych. ` +
      `Mapa strony zawiera ${publiczne + 1} adresów.`
  );
}

main();
