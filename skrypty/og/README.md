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

Medal jest ten sam co w nagłówku strony głównej: `assets/medal-512.png`, czyli zdjęcie
medalu w pudełku, na przezroczystym tle.

## Pięć kart

Z jednego szablonu powstaje pięć plików:

| plik | gdzie użyty |
|---|---|
| `assets/og.png` | strona główna i wszystkie strony bez własnego obrazka |
| `assets/og-rozmowy.png` | plebiscyt na najlepszą rozmowę ze sztuczną inteligencją i jego strona jury |
| `assets/og-filmu.png` | plebiscyt na film i jego strona jury |
| `assets/og-piosenki.png` | plebiscyt na piosenkę, jego strona jury oraz hymn |
| `assets/og-plakatu.png` | plebiscyt na plakat i jego strona jury |

Przypisanie stron do plików jest w `skrypty/buduj-dokumenty.js`, w mapie `OBRAZKI`.

## Jak przegenerować

```bash
python3 -m http.server 8777 &
node skrypty/og/generuj.js
pkill -f "http.server 8777"
```

Teksty poszczególnych kart - nadtytuł i podtytuł - są na początku `skrypty/og/generuj.js`,
w tablicy `KARTY`. Tytuł „Nagroda Konstela", medal i adres są wspólne dla wszystkich.

Po podmianie uruchom `node skrypty/buduj-dokumenty.js` - znacznik wersji pliku policzy
się z jego treści i strony wskażą nowy adres, więc pośrednicy nie oddadzą starego obrazka.
Zajawkę sprawdza się w narzędziach do podglądu linków; samo podmienienie pliku nie
odświeża tego, co serwisy mają już w pamięci podręcznej.
