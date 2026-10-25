# Cloudflare - instrukcja zmian dla konstela.org

Plik do wracania przy każdej zmianie w Cloudflare. Opisuje stan faktyczny, kolejność czynności i miejsca, w których łatwo zepsuć stronę albo pocztę.

## Stan na 25.10.2026

**Konto:** Olbik80@gmail.com, plan **Free**. Domena konstela.org, DNS Setup: Full.

**Hosting:** GitHub Pages, repozytorium `kolbinski.github.io`. Cztery rekordy A o nazwie `konstela.org` wskazują na 185.199.108.153, 185.199.109.153, 185.199.110.153 i 185.199.111.153. Rekord CNAME `www` wskazuje na `kolbinski.github.io`.

**Proxy:** pięć rekordów obsługujących witrynę (cztery A oraz `www`) przestawionych na **Proxied** 25.10.2026 rano. Wcześniej wszystko stało na „DNS only", co oznaczało, że żadna reguła Cloudflare nie działała, bo ruch szedł prosto do GitHuba z pominięciem Cloudflare.

**Szyfrowanie:** tryb **Full**. Do dociągnięcia na **Full (strict)** - GitHub wystawia prawidłowy certyfikat dla konstela.org, więc ten tryb jest poprawny i szczelniejszy. Nie robić tego jednocześnie z inną zmianą.

**Poczta:** Email Routing, trzy rekordy MX `routeN.mx.cloudflare.net`, SPF, DMARC i DKIM. **Wszystkie zostają „DNS only"** - rekordy MX w ogóle nie dają się proxować i panel pokazuje przy nich „Selection unavailable". To jest stan prawidłowy, nie usterka.

## Zasada, od której wszystko zależy

**Reguły Cloudflare działają wyłącznie na ruchu przechodzącym przez Cloudflare.** Dopóki rekord stoi na „DNS only" (szara chmurka), Cloudflare podaje tylko adres serwera, a ruch idzie do GitHuba bezpośrednio - żadna reguła, żadne statystyki i żadna ochrona nie zadziałają. Pierwsze pytanie przy każdym problemie z regułą brzmi: czy rekord jest proxowany.

## Kolejność przy włączaniu proxy

Jeżeli kiedykolwiek trzeba będzie włączyć proxy od nowa albo na nowej domenie:

1. **Najpierw sprawdź tryb szyfrowania** w SSL/TLS → Overview. Musi być **Full** albo **Full (strict)**. Jeżeli jest **Flexible**, strona po włączeniu proxy wpada w pętlę przekierowań i przestaje się otwierać. To jest najczęstsza pułapka tego połączenia.
2. **Potem przestaw chmurki** w DNS → Records, przyciskiem „Edit" przy każdym rekordzie witryny z osobna.
3. **Nie ruszaj rekordów poczty** - MX, SPF, DMARC, DKIM, `_domainconnect`.
4. **Sprawdź stronę** w trybie prywatnym: czy się otwiera, czy kłódka jest w porządku, czy działa dokument.

**Cofnięcie jest natychmiastowe:** przestawiasz chmurki z powrotem na „DNS only" i stan wraca do poprzedniego w ciągu minuty. Nic się nie traci, bo proxy nie zmienia zawartości serwera.

## Reguła przepisująca adresy dokumentów

**Cel:** `konstela.org/dokument/regulamin` ma pokazywać to samo, co `konstela.org/view.html?file=regulamin`, bez zmiany adresu w pasku i bez kodu 404.

**Dlaczego wzorzec z gwiazdką, a nie wyrażenie regularne.** Na planie Free wyrażenia regularne w wyrażeniach filtrujących są niedostępne. Wzorzec z gwiazdką jest osobną opcją w panelu, działa na każdym planie i pozwala podstawić przechwycony fragment jako `${1}`.

### Jak ją utworzyć

1. W lewym menu **Rules**, strona **Overview**.
2. **Create rule** → **URL Rewrite Rule**.
3. **Rule name:** `Dokumenty - /dokument/ na view.html`.
4. W sekcji **If incoming requests match** wybierz **Wildcard pattern**.
5. **Request URL:** `https://konstela.org/dokument/*`
6. Sekcja **Then rewrite the path and/or query** ma **cztery** pola, nie dwa: osobno wzorzec docelowy i osobno to, na co przepisujemy. **Pola mają już wdrukowany przedrostek `/` oraz `?`, więc nie wpisuje się ich ponownie.**
   - **Path → Target path:** `dokument/*`
   - **Path → Rewrite to:** `view.html`
   - **Query → Target query:** zostawić puste
   - **Query → Rewrite to:** zostawić puste
7. **Deploy**.

**Dlaczego bez parametru zapytania.** Pierwotny pomysł przenosił nazwę dokumentu do `?file=`, co wymagałoby podstawienia `${1}` w polu zapytania - a dokumentacja nie pokazuje takiego przypadku i nie ma pewności, że przechwycenie ze ścieżki jest tam dostępne. Zamiast zgadywać, **przeglądarka dokumentów odczytuje nazwę wprost z adresu**: `view.html` sprawdza najpierw parametr `?file=`, a gdy go nie ma, wyciąga nazwę ze ścieżki `/dokument/<nazwa>`. Dzięki temu reguła robi jedną prostą rzecz, a obie postacie adresu działają równolegle.

**Dwie zmiany w `view.html`, bez których to nie zadziała** (wprowadzone 25.10.2026):

- **Odwołania do stylów, skryptu i fontów muszą być liczone od korzenia** (`/assets/...`, nie `assets/...`). Pod adresem `/dokument/regulamin` odwołanie względne szuka plików w nieistniejącym katalogu `/dokument/assets/` i strona wczytuje się pusta. To jest najbardziej podstępna część tej konstrukcji: serwer zwraca poprawny dokument, a mimo to widać pustkę.
- **Pobranie pliku `.md` też idzie od korzenia** (`/regulamin.md`), z tego samego powodu.

### Sprawdzenie po wdrożeniu

Otwórz w trybie prywatnym:

- `konstela.org/dokument/regulamin` - ma pokazać regulamin, a adres w pasku ma zostać taki, jaki wpisałeś.
- `konstela.org/view.html?file=regulamin` - **ma nadal działać.** Reguła uruchamia się wyłącznie na adresach zaczynających się od `/dokument/`, więc stara forma jest nietknięta. To jest istotne, bo stare linki poszły już w sześciu wiadomościach i stoją w kilkunastu dokumentach odsyłających do siebie nawzajem.
- `konstela.org` - strona główna bez zmian.

### Znane ograniczenia tej reguły

- **Ukośnik na końcu jest obsłużony.** `/dokument/regulamin/` działa tak samo jak bez ukośnika, bo `view.html` obcina go przy odczytywaniu nazwy ze ścieżki.
- **Domena z `www` nie jest objęta.** Wzorzec dotyczy `konstela.org`. Jeżeli `www.konstela.org` ma działać tak samo, potrzebna jest druga reguła z tym samym działaniem i wzorcem `https://www.konstela.org/dokument/*`.
- **Nieistniejący dokument** pokaże stan błędu przeglądarki dokumentów, a nie stronę 404 serwisu. To jest zachowanie poprawne, ale inne niż przy zwykłym złym adresie.

## Limity planu Free

- **10 aktywnych reguł typu Transform.** Na dziś zużyta jedna.
- **Wyrażenia regularne w wyrażeniach filtrujących: niedostępne.** Stąd wzorce z gwiazdką.
- 200 rekordów DNS, zużytych 12.

## Pamiętać przy pracy z proxowaną stroną

- **Prawdziwe adresy odwiedzających przestają docierać do GitHuba.** Statystyki ruchu są teraz po stronie Cloudflare, w zakładce Analytics.
- **Treści HTML nie są domyślnie trzymane w pamięci podręcznej Cloudflare**, więc wypchnięcie zmiany na GitHub Pages pokazuje się od razu. Gdyby kiedyś trzeba było wymusić odświeżenie, służy do tego Caching → Configuration → **Purge Everything**.
- **Przy diagnozowaniu problemu ze stroną** pierwszą czynnością jest przestawienie chmurki na „DNS only" i sprawdzenie, czy problem znika. Jeżeli znika, przyczyna jest w Cloudflare; jeżeli nie, w repozytorium.

## Co jeszcze warto tu kiedyś ustawić

- **Full (strict)** zamiast Full, osobną zmianą, ze sprawdzeniem strony zaraz po.
- **Always Use HTTPS**, jeżeli nie jest już włączone po stronie GitHuba.


## Reguła druga: arkusze pod `/arkusz/`

Utworzona 25.10.2026, tą samą metodą co reguła dokumentów.

- **Rule name:** `Arkusze - /arkusz/ na view-xlsx.html`
- **If incoming requests match:** Wildcard pattern
- **Request URL:** `https://konstela.org/arkusz/*`
- **Path → Target path:** `arkusz/*`
- **Path → Rewrite to:** `view-xlsx.html`
- **Query → Target query:** puste
- **Query → Rewrite to:** puste

`view-xlsx.html` odczytuje nazwę arkusza ze ścieżki `/arkusz/<nazwa>` dokładnie tak jak `view.html`, obcina ukośnik na końcu, pobiera plik `.xlsx` od korzenia i ma wszystkie odwołania do zasobów liczone od korzenia. Stara postać `view-xlsx.html?file=` działa dalej.

Sprawdzone lokalnie na symulacji reguły: `/arkusz/budzet-edycji-pierwszej` oraz ten sam adres z ukośnikiem na końcu pokazują cztery zakładki arkusza, `/arkusz/` pokazuje komunikat o braku wskazanego arkusza, a nieistniejąca nazwa - błąd wczytywania.

**Uwaga o dwóch polach.** Zmiana członu adresu wymaga poprawienia **dwóch** miejsc w regule: pola `Request URL` oraz pola `Path → Target path`. Zmiana tylko pierwszego z nich powoduje, że wzorzec docelowy nie pasuje do przychodzącej ścieżki, przepisanie się nie wykonuje i serwer oddaje 404. Tak właśnie wyglądał błąd przy przejściu z `/xls/` na `/arkusz/` 25.10.2026. Trzecie miejsce jest poza Cloudflare - wyrażenie w pliku przeglądarki, które wyciąga nazwę ze ścieżki.


## Wybór zakładki w adresie arkusza

`view-xlsx.html` otwiera wskazaną zakładkę na dwa sposoby:

- **parametr zapytania:** `/arkusz/budzet-edycji-pierwszej?tab=antologii`
- **kotwica:** `/arkusz/budzet-edycji-pierwszej#antologii`

Rozpoznawane są `nagrody`, `antologii`, `plebiscytu`, `akademii`, `wyjasnienia` oraz pełne nazwy zakładek w postaci uproszczonej (`budzet-nagrody`). Nieznana wartość otwiera pierwszą zakładkę zamiast pokazywać błąd. Kliknięcie zakładki wpisuje kotwicę do adresu, więc skopiowany adres odtwarza widok.

**Dlaczego dwie postacie.** Kotwica nie dociera do serwera, więc działa niezależnie od reguł przepisujących. Parametr zapytania przechodzi przez regułę tylko wtedy, gdy ta go nie usuwa - w polu `Query → Rewrite to` pusta wartość oznacza według podpowiedzi panelu usunięcie zapytania, a zachowanie przy obu pustych polach nie jest w dokumentacji opisane. **Do sprawdzenia w praktyce:** jeżeli `?tab=antologii` na żywej stronie nie przełącza zakładki, linki w dokumentach należy przestawić na postać z kotwicą; sama przeglądarka arkusza nie wymaga wtedy żadnej zmiany.


## Reguła trzecia: adres dedykowany `/plebiscyt-piosenki`

Utworzona 25.10.2026. Różni się od dwóch poprzednich tym, że nie obsługuje całej rodziny adresów, tylko jeden.

- **Rule name:** `Plebiscyt - adres dedykowany`
- **If incoming requests match:** Wildcard pattern
- **Request URL:** `https://konstela.org/plebiscyt-piosenki`
- **Path → Target path:** `plebiscyt-piosenki`
- **Path → Rewrite to:** `view.html`
- **Query → Target query:** puste
- **Query → Rewrite to:** puste

**Jak `view.html` wie, który dokument pokazać.** W pliku jest mapa `DEDYKOWANE`, wiążąca ścieżkę z nazwą dokumentu. Dodanie kolejnego adresu dedykowanego wymaga **dwóch** rzeczy: wpisu w tej mapie oraz reguły w panelu. Nazwa dokumentu nie wędruje przez parametr zapytania, więc nie zależymy od tego, czy reguła go zachowuje.

**Co to zmienia.** Wcześniej `/plebiscyt-piosenki` działało przez katalog z przekierowaniem: wczytywała się pusta strona i natychmiast przerzucała na `/dokument/plebiscyt-piosenki`, co było widoczne jako mignięcie i zmiana adresu w pasku. Teraz adres **jest** stroną plebiscytu. Katalog `plebiscyt-piosenki/` **zostaje**, bo obsługuje postać z ukośnikiem na końcu. Nie jest już przekierowaniem: zawiera pełną stronę przeglądarki dokumentów, taką samą jak `view.html`.

## Reguła czwarta: przekierowanie starego adresu `/piosenka`

Utworzona 25.10.2026, zastępuje katalog `piosenka/` z plikiem HTML, który został usunięty. To jest **inny typ reguły** niż trzy poprzednie: tamte przepisują adres po cichu (Rewrite), ta odsyła przeglądarkę pod nowy adres (Redirect).

**Po co.** Adres `konstela.org/piosenka` poszedł 22.10.2026 w wiadomościach prywatnych na Instagramie do sześciu wokalistów i nie można go zgasić. Prowadzi dziś do strony plebiscytu.

**Dlaczego przekierowanie po stronie Cloudflare, a nie katalog z plikiem HTML.** Dwa powody, z czego drugi jest poważniejszy.

1. Katalog z przekierowaniem wczytuje pustą stronę i dopiero ona przerzuca dalej - widać mignięcie.
2. Taka strona staje się dla przeglądarki "poprzednią stroną w naszym serwisie". Nagłówek podstron (`assets/nawigacja.js`) pokazuje wtedy "Powrót", choć odwiedzający przyszedł z zewnątrz - i cofnięcie wyprowadza go poza stronę. **Przy przekierowaniu HTTP przeglądarka zachowuje pierwotny odsyłacz**, więc problem nie powstaje.

**Zasada na przyszłość: każdy nowy skrócony adres robimy jako Redirect Rule, nigdy jako katalog z plikiem HTML.**

### Jak ją utworzyć

1. W lewym menu **Rules**, strona **Overview**.
2. **Create rule** → **Redirect Rule**.
3. **Rule name:** `Piosenka - stary adres na plebiscyt`.
4. W sekcji **If incoming requests match** wybierz **Custom filter expression** i w edytorze wyrażenia wpisz:

   `(http.request.uri.path eq "/piosenka") or (http.request.uri.path eq "/piosenka/")`

   Wyrażenie nie używa wyrażeń regularnych, więc działa na planie Free.
5. Sekcja **Then**:
   - **Type:** `Static`
   - **URL:** `https://konstela.org/plebiscyt-piosenki`
   - **Status code:** `301`
   - **Preserve query string:** wyłączone
6. **Deploy**.

**Alternatywa prostsza, ale mniej precyzyjna.** Zamiast wyrażenia można wybrać **Wildcard pattern** i podać `https://konstela.org/piosenka*`. Gwiazdka złapie wtedy również adresy w rodzaju `/piosenka-cos`, gdyby kiedyś powstały - dlatego wyżej jest wariant dokładny.

### Sprawdzenie po wdrożeniu

- `konstela.org/piosenka` oraz `konstela.org/piosenka/` kończą się na stronie plebiscytu, z adresem `konstela.org/plebiscyt-piosenki` w pasku.
- W nagłówku strony plebiscytu widnieje **Nagroda Konstela**, a nie Powrót - to znaczy, że odsyłacz nie został podmieniony.

**Limity.** Redirect Rules są liczone osobno od reguł typu Transform. Liczniki obu rodzajów widać w panelu przy tworzeniu reguły - warto tam zajrzeć zamiast ufać liczbie zapisanej w tym pliku.

## Po wprowadzeniu stron generowanych: reguły pierwsza i trzecia do skasowania

Od 25.10.2026 strony dokumentów powstają jako gotowe pliki HTML przy każdym wrzuceniu na GitHub (patrz `.github/workflows/publikuj.yml`). Pod adresem `konstela.org/dokument/regulamin/` leży więc prawdziwy plik, a nie przepisanie na `view.html`.

**Reguła przepisująca `/dokument/*` oraz reguła dedykowana `/plebiscyt-piosenki` muszą zostać usunięte**, inaczej przesłonią nowe pliki: reguły typu Transform działają na brzegu sieci i zmieniają adres, zanim żądanie dotrze do serwera z plikami. Strona dalej by działała, ale pokazywałaby wersję składaną w przeglądarce, czyli dokładnie to, od czego odchodzimy.

**Kolejność ma znaczenie:**

1. Najpierw wrzucić zmiany na GitHub i poczekać, aż akcja zakończy publikowanie.
2. Sprawdzić pod adresem `konstela.org/dokument/regulamin/`, czy strona działa - póki reguła istnieje, zobaczysz wersję starą, więc to sprawdzenie niczego nie rozstrzyga; rozstrzyga dopiero punkt czwarty.
3. Skasować w panelu obie reguły.
4. Sprawdzić ponownie. Treść ma być w źródle strony: `Ctrl+U` i szukanie fragmentu tekstu. Jeżeli w źródle widać tylko „Wczytywanie", reguła nadal działa albo akcja nie zdążyła opublikować.

Zostaje **reguła druga** (arkusze pod `/arkusz/`), bo przeglądarka arkuszy dalej składa stronę w przeglądarce, oraz **reguła czwarta** (przekierowanie `/piosenka`).

## Odwołania względne w dokumentach - pułapka

Obrazek albo link zapisany w pliku `.md` bez początkowego ukośnika (`assets/piosenka.jpg`) wczytuje się poprawnie pod `/dokument/nazwa`, ale **psuje się pod `/dokument/nazwa/`**, bo przeglądarka szuka go wtedy w nieistniejącym katalogu. Wszystkie odwołania w dokumentach mają być liczone od korzenia. Sprawdzenie: szukać w plikach `.md` wzorców `](` oraz `src="` niezaczynających się od ukośnika albo od `http`.


## Przeglądarka dokumentów jest wspólna dla kilku stron

Od 25.10.2026 `view.html` nie zawiera stylu ani skryptu. Oba leżą w `/assets/view.css` i `/assets/view.js`, a strony korzystające z przeglądarki dokumentów są cienkimi skorupkami złożonymi z nagłówka, pustego `<main id="content">` i stopki.

Dziś są dwie takie strony: **`/view.html`** (adresy `/dokument/<nazwa>`) oraz **`/plebiscyt-piosenki/index.html`** (adres dedykowany z ukośnikiem na końcu). Ta druga nie przekierowuje - renderuje dokument na miejscu, więc adres w pasku się nie zmienia.

**Konsekwencja porządkowa, dla której to zrobiono:** zmiana w przeglądarce idzie w jedno miejsce i obowiązuje wszędzie. Kopiowanie `view.html` do kolejnych katalogów dawałoby ten sam efekt tylko do pierwszej poprawki, po której kopie zaczynają się rozjeżdżać.

**Dodanie kolejnego adresu dedykowanego** wymaga trzech rzeczy: wpisu w mapie `DEDYKOWANE` w `/assets/view.js`, reguły w Cloudflare dla postaci bez ukośnika oraz skorupki `index.html` w katalogu o tej nazwie dla postaci z ukośnikiem. Skorupkę najprościej skopiować z `plebiscyt-piosenki/index.html` - nie zawiera niczego, co trzeba by w niej zmieniać.
