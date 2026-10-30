# Obrazek zajawki (og:image)

`assets/og.png` powstaje z `skrypty/og/og.html`, renderowanego Playwrightem w 1200 x 630
przy dwukrotnej gęstości i zmniejszanego do 1200 x 630.

**Dlaczego wszystko jest w środku.** Open Graph nie przewiduje osobnego obrazka dla
układu pionowego: serwisy biorą jeden plik i przycinają go po swojemu. Instagram
i Messenger w wiadomościach przycinają zajawkę mniej więcej do kwadratu, więc przy
obrazku 1200 x 630 odpada po 285 pikseli z każdej strony. Dlatego medal, tytuł, podtytuł
i adres mieszczą się w **środkowym kwadracie 630 x 630**, a na bokach zostaje samo tło
z ramką. Ten sam plik czyta się poprawnie w kadrze szerokim (Facebook, LinkedIn, Slack)
i w kwadratowym.

Medal jest wycięty z `assets/medal.jpg` do `assets/medal-kolo.png` - koło o środku
(512, 462) i promieniu 330 pikseli, przeskalowane do 600 x 600 z maską przezroczystości.

## Jak przegenerować

```bash
cp skrypty/og/og.html ./og-podglad.html
python3 -m http.server 8777 &
node - <<'JS'
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:8777/og-podglad.html', { waitUntil: 'networkidle' });
  await p.screenshot({ path: '/tmp/og-2x.png' });
  await b.close();
})();
JS
python3 -c "from PIL import Image; Image.open('/tmp/og-2x.png').resize((1200,630), Image.LANCZOS).save('assets/og.png')"
rm og-podglad.html
```

Po podmianie uruchom `node skrypty/buduj-dokumenty.js` - znacznik wersji pliku policzy
się z jego treści i strony wskażą nowy adres, więc pośrednicy nie oddadzą starego obrazka.
Zajawkę sprawdza się w narzędziach do podglądu linków; samo podmienienie pliku nie
odświeża tego, co serwisy mają już w pamięci podręcznej.
