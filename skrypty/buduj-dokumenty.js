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
const crypto = require('crypto');
const path = require('path');
const { execFileSync } = require('child_process');
const { marked } = require('marked');

const KORZEN = path.resolve(__dirname, '..');

/* Biblioteka ikon: jeden plik na rysunek w assets/icons. W treści stron stoi
   znacznik <!--ikona:nazwa-->, a budowanie wstawia w jego miejsce rysunek.
   Dlaczego nie <img src="...">: ikony są rysowane kreską w kolorze otoczenia
   (stroke dziedziczony ze stylów), więc muszą być częścią dokumentu - obrazek
   w osobnym pliku nie przyjąłby koloru paska ani trybu czytelności. Zewnętrzny
   <use href="plik.svg#nazwa"> to by załatwiał, ale ma historię kłopotów w
   Safari, więc rysunek wstawiany jest przy budowaniu. */
const KATALOG_IKON = path.join(KORZEN, 'assets', 'icons');
const IKONY = {};
if (fs.existsSync(KATALOG_IKON)) {
  fs.readdirSync(KATALOG_IKON)
    .filter((n) => n.endsWith('.svg'))
    .forEach((n) => {
      IKONY[n.slice(0, -4)] = fs.readFileSync(path.join(KATALOG_IKON, n), 'utf8').trim();
    });
}

/* W markdownie znacznik stoi sam; w stronach pisanych ręcznie jest parą
   znaczników obejmującą wstawiony rysunek, żeby plik źródłowy i plik
   serwowany pozostały tym samym plikiem, a kolejne budowania odtwarzały
   rysunek z biblioteki. Nieznana nazwa zatrzymuje budowanie - lepszy błąd
   przy budowaniu niż dziura w nagłówku na stronie. W tekstach o samej
   bibliotece znacznik zapisuje się ze spacjami, żeby nie został podmieniony. */
/* Rozdzielacz sekcji w dokumencie: ten sam ornament co na stronie głównej,
   przed każdym nagłówkiem paragrafu poza pierwszym. Pierwszy go nie dostaje,
   bo stoi zaraz pod tytułem dokumentu i kreską, która już rozdziela. */
/* Kotwice nagłówków nadawane już przy budowaniu. Pasek nawigacyjny umie
   je policzyć sam, ale robi to po załadowaniu strony - czyli po chwili, w
   której przeglądarka próbowała przewinąć do fragmentu z adresu. Odesłanie
   z innego dokumentu prowadziłoby wtedy na początek strony. Reguła slugu
   jest ta sama co w `assets/pasek.js`, żeby adresy z obu źródeł się
   zgadzały; pasek zastanego `id` nie nadpisuje. */
const POLSKIE = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

function naSlug(tekst) {
  return tekst
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (z) => POLSKIE[z])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function nadajKotwice(html) {
  const uzyte = new Set();
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (calosc, atrybuty, wnetrze) => {
    if (/\sid=/.test(atrybuty)) return calosc;
    /* Nagłówek ma zwykle postać ikona + <span>tytuł</span> - tak samo jak
       w pasku bierzemy sam tytuł, bez ścieżek rysunku. */
    const dopasowanie = wnetrze.match(/<span[^>]*>([\s\S]*?)<\/span>/);
    const tytulNaglowka = (dopasowanie ? dopasowanie[1] : wnetrze)
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const slug = naSlug(tytulNaglowka);
    if (!slug) return calosc;
    let kandydat = slug;
    let n = 2;
    while (uzyte.has(kandydat)) kandydat = `${slug}-${n++}`;
    uzyte.add(kandydat);
    return `<h2${atrybuty} id="${kandydat}">${wnetrze}</h2>`;
  });
}

function rozdzielSekcje(html) {
  const rysunek = IKONY['rozdzielacz'];
  if (!rysunek) return html;

  /* Ozdobny przerywnik stoi też pod tytułem dokumentu - tak samo jak między
     sekcjami. Pomijamy strony, które mają pod tytułem ilustrację z własnym
     przerywnikiem: tam drugi stałby tuż pod pierwszym. */
  const glowaDoPierwszejSekcji = html.split(/<h2(?=[ >])/)[0];
  if (!glowaDoPierwszejSekcji.includes('viewBox="0 0 288 22"')) {
    html = html.replace(
      /<\/h1>(\s*<p class="edition">[\s\S]*?<\/p>)?/,
      (m) => m + rysunek
    );
  }

  /* Nagłówek wewnątrz cytatu - na przykład tytuł utworu w zacytowanym
     tekście hymnu - nie jest sekcją dokumentu i przerywnika nie dostaje. */
  let pierwszy = true;
  return html.replace(/(<blockquote>\s*)?<h2(?=[ >])/g, (m, cytat) => {
    if (pierwszy && !cytat) {
      pierwszy = false;
      return m;
    }
    if (cytat) return m;
    return rysunek + m;
  });
}

function wstawIkony(tresc, zPara) {
  const brakujace = [];
  const wynik = tresc
    .replace(/<!--ikona:([a-z0-9-]+)-->(?:[\s\S]*?<!--\/ikona-->)?/g, (_, nazwa) => {
      if (!IKONY[nazwa]) {
        brakujace.push(nazwa);
        return '';
      }
      return zPara
        ? `<!--ikona:${nazwa}-->${IKONY[nazwa]}<!--/ikona-->`
        : IKONY[nazwa];
    });
  if (brakujace.length) {
    throw new Error(
      'Brak ikon w assets/icons: ' + Array.from(new Set(brakujace)).join(', ')
    );
  }
  return wynik;
}
const DOMENA = 'https://konstela.org';

/* Dokumenty widoczne dla wyszukiwarek. Wszystkie pozostałe dostają
   "noindex, follow": otwierają się pod linkiem, ale nie trafiają do Google
   i nie ma ich w mapie strony. Decyzja z 25.10.2026 - publiczne jest to,
   czego potrzebuje ktoś, kto chce się zgłosić, a notatki robocze nie. */
const PUBLICZNE = new Set([
  'regulamin-rozmowy',
  'regulamin-piosenki',
  'polityka-prywatnosci',
  'plebiscyt-piosenki',
  'plebiscyt-plakatu',
  'regulamin-plakatu',
  'regulamin-filmu',
  'plebiscyt-rozmowy',
  'plebiscyt-filmu',
  'procedura-moderacji',
  'regulaminy',
  'hymn',
  'fundacja',
  'dla-partnerow',
  'jury-w-plebiscycie-piosenki-o-ai',
  'jury-w-plebiscycie-plakatu-o-ai',
  'jury-w-plebiscycie-filmu-o-ai',
  'jury-w-plebiscycie-rozmowy-z-ai',
  'oferta-dla-sponsora-antologii',
  'oferta-dla-sponsora-nagrod-plebiscytu-na-najlepsza-rozmowe-ze-sztuczna-inteligencja',
]);

/* Dokumenty mające własny, krótszy adres poza członem /dokument/.
   Strona powstaje wtedy w obu miejscach, a adresem kanonicznym jest krótszy. */
const DEDYKOWANE = {
  'plebiscyt-rozmowy': 'plebiscyt-rozmowy',
  'plebiscyt-piosenki': 'plebiscyt-piosenki',
  'plebiscyt-plakatu': 'plebiscyt-plakatu',
  'plebiscyt-filmu': 'plebiscyt-filmu',
  hymn: 'hymn',
  fundacja: 'fundacja',
  'dla-partnerow': 'dla-partnerow',
  'jury-w-plebiscycie-piosenki-o-ai': 'jury-w-plebiscycie-piosenki-o-ai',
  'jury-w-plebiscycie-plakatu-o-ai': 'jury-w-plebiscycie-plakatu-o-ai',
  'jury-w-plebiscycie-filmu-o-ai': 'jury-w-plebiscycie-filmu-o-ai',
  'jury-w-plebiscycie-rozmowy-z-ai': 'jury-w-plebiscycie-rozmowy-z-ai',
  statut: 'statut',
  regulaminy: 'regulaminy',
  'oferta-dla-sponsora-antologii': 'oferta-dla-sponsora-antologii',
  'oferta-dla-sponsora-nagrod-plebiscytu-na-najlepsza-rozmowe-ze-sztuczna-inteligencja': 'oferta-dla-sponsora-nagrod-plebiscytu-na-najlepsza-rozmowe-ze-sztuczna-inteligencja',
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
  'mk-list': 'List do MKiDN',
};

const OPISY = {
  'plebiscyt-rozmowy':
    'Plebiscyt na rozmowę ze sztuczną inteligencją: nagradzamy człowieka, nie program, bo oceniamy pytania, a nie odpowiedzi. Kto może zgłosić rozmowę, cztery kryteria oceny, nagrody, czytelnia i archiwum.',
  'regulamin-rozmowy':
    'Pełne zasady plebiscytu na rozmowę ze sztuczną inteligencją: kto może się zgłosić, jak wygląda zgłoszenie, według czego ocenia jury i jakie są nagrody. Wraz z kartą oceny.',
  'regulamin-piosenki':
    'Pełne zasady plebiscytu na piosenkę o sztucznej inteligencji: kto może zgłosić utwór, gdzie przebiega granica użycia AI, według czego ocenia jury, jakie są nagrody i co dzieje się z prawami do piosenki.',
  'polityka-prywatnosci':
    'Jakie dane zbiera Nagroda Konstela w każdym z czterech plebiscytów i w głosowaniu publiczności, w jakim celu, jak długo je przechowuje i jakie prawa przysługują uczestnikom.',
  'plebiscyt-piosenki':
    'Otwarty konkurs na własną piosenkę o sztucznej inteligencji: własny tekst, własna muzyka, własne wykonanie. Jury wybiera dziesięciu finalistów, a trzy najwyżej ocenione utwory dostają nagrody pieniężne.',
  'jury-w-plebiscycie-piosenki-o-ai':
    'Czego Nagroda Konstela oczekuje od jury plebiscytu na piosenkę o sztucznej inteligencji i co daje w zamian: zakres pracy, karta oceny, honorarium, niezależność werdyktu i terminy pierwszej edycji.',
  'jury-w-plebiscycie-plakatu-o-ai':
    'Czego Nagroda Konstela oczekuje od jury plebiscytu na plakat o sztucznej inteligencji i co daje w zamian: zakres pracy, karta oceny, oględziny oryginałów, honorarium i niezależność werdyktu.',
  'jury-w-plebiscycie-filmu-o-ai':
    'Czego Nagroda Konstela oczekuje od jury plebiscytu na film o sztucznej inteligencji i co daje w zamian: zakres pracy, karta oceny, honorarium, niezależność werdyktu i terminy pierwszej edycji.',
  'jury-w-plebiscycie-rozmowy-z-ai':
    'Czego Nagroda Konstela oczekuje od jury plebiscytu na rozmowę ze sztuczną inteligencją i co daje w zamian: zakres pracy, karta oceny, komentarze do antologii, honorarium i niezależność werdyktu.',
  'oferta-dla-sponsora-nagrod-plebiscytu-na-najlepsza-rozmowe-ze-sztuczna-inteligencja':
    'Oferta dla fundatora puli nagród w plebiscycie na rozmowę ze sztuczną inteligencją: 371 000 zł dla laureatów, honoraria jury, promocja naboru i prowadzenie plebiscytu. Kwota, kosztorys, świadczenia i warunki.',
  'oferta-dla-sponsora-antologii':
    'Mecenat Antologii Nagrody Konstela: kto finansuje bezpłatną antologię, publiczne Archiwum rozmów i podcast, ile to kosztuje, co Mecenas otrzymuje w zamian i czego propozycja nie obejmuje.',
  'dla-partnerow':
    'Zakresy współpracy przy pierwszej edycji Nagrody Konstela: sponsorzy nagród w czterech plebiscytach, mecenasi antologii i sesji studyjnych, partnerzy wydawniczy, galeria, dystrybucja filmów, gala, podcast i patronat medialny.',
  'plebiscyt-plakatu':
    'Otwarty konkurs na plakat o sztucznej inteligencji, wykonany ręcznie - farbą, tuszem, kolażem, bez generatora obrazu. Zwycięska praca trafia na okładkę antologii Nagrody Konstela.',
  'plebiscyt-filmu':
    'Otwarty konkurs na film o sztucznej inteligencji, od 20 do 90 minut, stworzony od zera na potrzeby plebiscytu. Zgłoszeniem jest link do filmu na Twoim kanale; nie ma zakazu użycia AI, jest obowiązek deklaracji.',
  'regulaminy':
    'Cztery regulaminy plebiscytów Nagrody Konstela w jednym miejscu: rozmowa, film, piosenka, plakat. Co je łączy i jakie dokumenty im towarzyszą.',
  'procedura-moderacji':
    'Jawna procedura moderacji zgłoszeń w plebiscytach Nagrody Konstela: kiedy oceniający oznacza zastrzeżenie prawne, zamknięta lista rodzajów oznaczeń z przykładami pozytywnymi i negatywnymi, czego nie oznaczamy nigdy i co dzieje się po oznaczeniu.',
  'regulamin-filmu':
    'Pełne zasady plebiscytu na film o sztucznej inteligencji: kto może zgłosić film, dlaczego nie ma tu zakazu użycia narzędzi AI, a jest obowiązek deklaracji, według czego ocenia jury, jakie są nagrody i co dzieje się z prawami do filmu.',
  hymn:
    'Hymn Nagrody Konstela „Zapytaj inaczej": pełny tekst, dwie wersje wygenerowane przez AI i zasada, której hymn podlega tak samo jak zgłoszenia - melodia pochodzi od człowieka.',
  fundacja:
    'Fundacja Konstela - podmiot prowadzący Nagrodę: na jakim jest etapie, jakie ma cele statutowe, jak jest zbudowana, skąd bierze pieniądze i jak się z nią skontaktować.',
  'regulamin-plakatu':
    'Pełne zasady konkursu na plakat o sztucznej inteligencji: kto może zgłosić pracę, na czym polega wymóg ręcznego wykonania, według czego ocenia jury, jakie są nagrody i co dzieje się z prawami do plakatu.',
};

/* Obrazek pokazywany w podglądzie linku. Mapa wyjątków jest dziś pusta:
   wszystkie podstrony dzielą jeden obrazek serwisu. */
const OBRAZEK_DOMYSLNY = '/assets/og.png';
const OBRAZKI = {
  'plebiscyt-rozmowy': '/assets/og-rozmowy.png',
  'plebiscyt-filmu': '/assets/og-filmu.png',
  'plebiscyt-piosenki': '/assets/og-piosenki.png',
  'plebiscyt-plakatu': '/assets/og-plakatu.png',
  'jury-w-plebiscycie-rozmowy-z-ai': '/assets/og-rozmowy.png',
  'jury-w-plebiscycie-filmu-o-ai': '/assets/og-filmu.png',
  'jury-w-plebiscycie-piosenki-o-ai': '/assets/og-piosenki.png',
  'jury-w-plebiscycie-plakatu-o-ai': '/assets/og-plakatu.png',
  'hymn': '/assets/og-piosenki.png',
};

/* Znacznik zasobu to odcisk JEGO treści, nie data budowania. Chodzi o to,
   żeby adres pliku zmieniał się dokładnie wtedy, gdy zmienia się plik:
   po poprawce w assets/pasek.css przeglądarka pobiera go na nowo, a obrazki
   i arkusze, których nikt nie ruszył, zostają w pamięci podręcznej
   przeglądarki i pośrednika. Znacznik z datą budowania unieważniał przy
   każdym budowaniu wszystko naraz, łącznie z ilustracjami ważącymi setki
   kilobajtów. */
const ODCISKI = new Map();
function odcisk(adresZasobu) {
  const czysty = adresZasobu.split(/[?#]/)[0].replace(/^https?:\/\/[^/]+/, '');
  if (ODCISKI.has(czysty)) return ODCISKI.get(czysty);
  let znacznik = '';
  try {
    znacznik = crypto
      .createHash('sha1')
      .update(fs.readFileSync(path.join(KORZEN, czysty.replace(/^\//, ''))))
      .digest('hex')
      .slice(0, 10);
  } catch (e) {
    /* Pliku nie ma na dysku - zostawiamy adres bez znacznika, zamiast
       przerywać budowanie. */
  }
  ODCISKI.set(czysty, znacznik);
  return znacznik;
}

/* Dopisuje ?v=odcisk do każdego adresu w /assets, także w srcset i w
   adresach bezwzględnych. Istniejący znacznik podmienia, więc wielokrotne
   budowanie niczego nie mnoży. */
const ZASOB = /((?:https?:\/\/[^/"'\s]+)?\/assets\/[A-Za-z0-9._/-]+?\.[A-Za-z0-9]+)(\?v=[A-Za-z0-9]+)?/g;
function wersjonujZasoby(html) {
  return html.replace(ZASOB, (dopasowanie, adres) => {
    const znacznik = odcisk(adres);
    return znacznik ? `${adres}?v=${znacznik}` : adres;
  });
}

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
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // linki
    .replace(/<[^>]*>/g, '')                  // wstawki HTML
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (czysty.length <= 200) return czysty;
  const uciety = czysty.slice(0, 200);
  const spacja = uciety.lastIndexOf(' ');
  return (spacja > 120 ? uciety.slice(0, spacja) : uciety).replace(/[,;:.\-]+$/, '') + '...';
}

/* Linki wychodzące poza serwis otwieramy w nowej karcie - tak samo, jak
   robił to dotąd skrypt w przeglądarce. */
function otworzObceWNowejKarcie(html) {
  return html.replace(/<a href="(https?:\/\/[^"]+)"([^>]*)>/g, (calosc, adres, reszta) => {
    if (adres.indexOf('konstela.org') !== -1) return calosc;
    /* Część dokumentów ma wpisane surowe linki HTML z własnymi
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
    <meta name="color-scheme" content="light dark" />
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
    <link rel="stylesheet" href="/assets/czytelnosc.css" />
    <link rel="stylesheet" href="/assets/view.css" />
    <link rel="stylesheet" href="/assets/pasek.css" />
    <!-- Tryb czytelności ustawiamy przed pierwszym rysowaniem strony,
         inaczej mignęłaby w zwykłych kolorach. Patrz assets/czytelnosc.js. -->
    <script>
      try {
        if (localStorage.getItem('konstela-czytelnosc')) {
          document.documentElement.classList.add('czytelnie');
        }
      } catch (e) {}
    </script>
  </head>
  <body>
    <div class="topbar">
      <div class="topbar-in">
        <span class="left">
          <a class="back" href="/" aria-label="Wróć na stronę główną"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></svg></a>
          <a class="brand" href="/">Nagroda Konstela</a>
        </span>
        <span class="prawa">
        <button
          id="czytelnosc"
          class="czytelnosc"
          type="button"
          aria-pressed="false"
          aria-label="Tryb czytelności: większe pismo i wysoki kontrast"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 15 6 7.5 9.5 15"/><path d="M3.9 12.2h4.2"/><path d="M13 18.5 18 6.5l5 12"/><path d="M15 14h6"/></svg>
        </button>
        <button
          id="burger"
          class="burger"
          type="button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="Menu dokumentu"
          hidden
        >
          <span class="burger-ikona" aria-hidden="true"></span>
        </button>
        </span>
      </div>
      <!-- Pozycje powstają z nagłówków dokumentu w assets/pasek.js. -->
      <nav id="menu" class="menu" aria-label="Paragrafy dokumentu" hidden></nav>
    </div>

    <main id="content" class="loaded">
${tresc}
    </main>

    <button id="do-gory" class="do-gory" type="button" hidden aria-label="Wróć na górę strony">${IKONY['strzalka-gora'] || ''}</button>
    <konstela-stopka></konstela-stopka>

    <script src="/assets/czytelnosc.js" defer></script>
    <script src="/assets/pasek.js" defer></script>
    <script src="/assets/nawigacja.js" defer></script>
    <script src="/assets/stopka.js" defer></script>
  </body>
</html>
`;
}

function zapisz(sciezka, tresc) {
  fs.mkdirSync(path.dirname(sciezka), { recursive: true });
  fs.writeFileSync(sciezka, tresc);
}

function main() {
  /* Pliki, które nie mają powstać jako strony w ogóle. Notatki wewnętrzne
     zawierają taktykę i niezweryfikowane założenia, a noindex nie wystarcza:
     adresat korespondencji może je znaleźć, bo działają pod linkiem.
     koncepcja.md zostaje, bo linkują do niej inne dokumenty i jest czytana
     z telefonu - jej adres nie trafia natomiast do korespondencji. */
  const niePublikowane = (nazwa) => nazwa.endsWith('-notatki');

  const pliki = fs
    .readdirSync(KORZEN)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => !niePublikowane(f.replace(/\.md$/, '')))
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

    const html = wersjonujZasoby(
      strona({
        naglowek: tytul(md, nazwa),
        opisStrony: OPISY[nazwa] || opis(md),
        adresKanoniczny,
        obrazek: OBRAZKI[nazwa] || OBRAZEK_DOMYSLNY,
        indeksowac,
        tresc: otworzObceWNowejKarcie(
          rozdzielSekcje(nadajKotwice(marked.parse(wstawIkony(md, false))))
        ),
      })
    );

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

  /* Strony pisane ręcznie - strona główna, 404 i dwie przeglądarki - mają
     własne odwołania do plików z katalogu assets ze znacznikiem w adresie.
     Dotąd trzeba było podbijać go ręcznie i to się mściło: poprawka w
     assets/pasek.css albo w assets/pasek.js nie docierała do przeglądarki,
     bo adres pliku się nie zmieniał, a strona wyglądała, jakby poprawki nie
     było. Budowanie podbija ten znacznik razem z dokumentami. */
  let podbite = 0;
  ['index.html', '404.html', 'view.html', 'view-xlsx.html'].forEach((nazwa) => {
    const sciezka = path.join(KORZEN, nazwa);
    if (!fs.existsSync(sciezka)) return;
    const przed = fs.readFileSync(sciezka, 'utf8');
    const po = wersjonujZasoby(wstawIkony(przed, true));
    if (po !== przed) {
      fs.writeFileSync(sciezka, po);
      podbite++;
    }
  });

  console.log(
    `Zbudowano ${pliki.length} dokumentów, w tym ${publiczne} publicznych. ` +
      `Mapa strony zawiera ${publiczne + 1} adresów. ` +
      `Znacznik zasobów podbity w ${podbite} stronach pisanych ręcznie.`
  );
}

main();
