
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
