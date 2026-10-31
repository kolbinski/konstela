
## Arkusze: zawsze przeliczyć przed commitem

Pliki `.xlsx` zapisane biblioteką openpyxl zawierają formuły **bez wyników**:
w XML stoi `<f>...</f><v></v>`. Przeglądarka arkusza na stronie czyta wyłącznie
`<v>`, więc po takim zapisie wszystkie pola liczone same są na stronie puste -
łącznie z sumami, VAT-em i kwotami do zapłaty.

Po każdej zmianie arkusza biblioteką openpyxl trzeba więc podmienić plik na
wersję przeliczoną:

    soffice --headless --convert-to xlsx --outdir /tmp/przeliczone plik.xlsx
    cp /tmp/przeliczone/plik.xlsx plik.xlsx

Kontrola, czy plik nadaje się do commitu:

    python3 -c "import zipfile,re;d=zipfile.ZipFile('plik.xlsx').read('xl/worksheets/sheet2.xml').decode();print(len(re.findall(r'<f[^>]*>[^<]*</f><v></v>',d)))"

Wynik musi być zerem.

## Arkusze jako gotowe strony

`node skrypty/buduj-arkusze.js` zapisuje `/arkusz/<nazwa>/index.html` z pełną
treścią wszystkich zakładek. Szablonem jest `view-xlsx.html`, więc układ i style
są jedne. Skrypt strony, jeżeli się wykona, zastępuje wersję statyczną układem z
zakładkami - prerendering jest wzmocnieniem, nie zamiennikiem.

Wymaga `npm install exceljs`. Nowy arkusz dodaje się w stałej `ARKUSZE` w tym
skrypcie. Katalog `/arkusz/` jest poza repozytorium; powstaje przy budowaniu,
tak samo jak `/dokument/`.

Formuł skrypt nie liczy - bierze wyniki zapisane w pliku, więc obowiązuje
zasada z poprzedniego rozdziału.
