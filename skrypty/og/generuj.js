/* Generator obrazków zajawki (og:image).

   Jeden szablon, pięć kart: domyślna dla całej Nagrody i po jednej na plebiscyt.
   Wszystko istotne mieści się w środkowym kwadracie 630 x 630, bo Instagram
   i Messenger przycinają zajawkę w wiadomościach mniej więcej do kwadratu.

   Uruchomienie: node skrypty/og/generuj.js
   Wymaga serwera plików na porcie 8777 w katalogu projektu. */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KARTY = [
  {
    plik: 'og.png',
    nad: 'Rozmowa &middot; Film &middot; Piosenka &middot; Plakat',
    pod: 'Nagradzamy człowieka, nie maszynę',
  },
  {
    plik: 'og-rozmowy.png',
    nad: 'Plebiscyt na rozmowę z AI',
    pod: 'Oceniamy pytania, nie odpowiedzi',
  },
  {
    plik: 'og-filmu.png',
    nad: 'Plebiscyt na film o AI',
    pod: 'Od 20 do 90 minut, stworzony dla tego plebiscytu',
  },
  {
    plik: 'og-piosenki.png',
    nad: 'Plebiscyt na piosenkę o AI',
    pod: 'Własny tekst, własna muzyka, własne wykonanie',
  },
  {
    plik: 'og-plakatu.png',
    nad: 'Plebiscyt na plakat o AI',
    pod: 'Obraz ma powstać pod ludzką ręką',
  },
];

const KATALOG = path.join(__dirname, '..', '..');
const szablon = fs.readFileSync(path.join(__dirname, 'og.html'), 'utf8');

(async () => {
  const przegladarka = await chromium.launch();
  const strona = await przegladarka.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  });

  for (const karta of KARTY) {
    const html = szablon
      .replace(/<div class="nad">[\s\S]*?<\/div>/, `<div class="nad">${karta.nad}</div>`)
      .replace(/<div class="pod">[\s\S]*?<\/div>/, `<div class="pod">${karta.pod}</div>`);
    const tymczasowy = path.join(KATALOG, 'og-podglad.html');
    fs.writeFileSync(tymczasowy, html);
    await strona.goto('http://localhost:8777/og-podglad.html', { waitUntil: 'networkidle' });
    await strona.waitForTimeout(300);
    const duzy = path.join('/tmp', 'og-2x.png');
    await strona.screenshot({ path: duzy });
    // zmniejszenie z dwukrotnej gęstości do docelowych 1200 x 630
    execFileSync('python3', [
      '-c',
      `from PIL import Image; Image.open(${JSON.stringify(duzy)})` +
        `.resize((1200,630), Image.LANCZOS)` +
        `.save(${JSON.stringify(path.join(KATALOG, 'assets', karta.plik))})`,
    ]);
    fs.unlinkSync(tymczasowy);
    console.log('zapisane assets/' + karta.plik);
  }

  await przegladarka.close();
})();
