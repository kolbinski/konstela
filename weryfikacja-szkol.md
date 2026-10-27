# Weryfikacja szkół przy Nagrodzie Uczniowskiej

Dokument roboczy: jak działa potwierdzanie, że grupę czytającą zgłasza naprawdę szkoła, i co trzeba zbudować, żeby działało to od pierwszej edycji. Zasada jest w regulaminie plebiscytu na rozmowę (§ 8 ust. 2a lit. a1); tutaj jest wykonanie.

## Zasada

**Kod idzie na adres z rejestru, nie na adres z formularza.** Zgłaszający wybiera szkołę z rejestru państwowego, a jednorazowy kod wysyłamy na adres poczty elektronicznej tej szkoły wskazany w Rejestrze Szkół i Placówek Oświatowych. Przepisanie kodu potwierdza, że zgłaszający ma dostęp do skrzynki szkoły.

Kierunek jest tu całą różnicą. Gdyby kod szedł na adres wpisany w formularzu, automat sprawdzałby wyłącznie to, czy ktoś umie przepisać domenę ze strony szkoły - a to potrafi każdy.

## Źródło danych

**Rejestr Szkół i Placówek Oświatowych.** Gromadzi z mocy ustawy dane kontaktowe każdej szkoły, w tym adres poczty elektronicznej i stronę internetową (art. 7 ust. 1 pkt 10 ustawy o systemie informacji oświatowej).

Dwie drogi dostępu:

- **API** pod `api-rspo.mein.gov.pl`, zasób `/api/placowki`, filtry po województwie, gminie, numerze RSPO, NIP i REGON, odpowiedzi w formacie JSON, stronicowanie po 100 rekordów. Dokumentacja wspomina o uwierzytelnianiu Basic Auth i nie mówi, jak uzyskać dane logowania - **do ustalenia u źródła przed budową formularza**.
- **Zbiór na dane.gov.pl** („Wykaz szkół i placówek oświatowych", zbiór 839) - ten sam materiał do pobrania plikiem.

Przyjęte rozwiązanie: **pobieramy wykaz raz przed otwarciem naboru i trzymamy u siebie**, bo dane szkół zmieniają się wolno, a zapytanie do cudzego interfejsu w trakcie wypełniania formularza dokłada awarię, której nie kontrolujemy. Odświeżenie wykazu przed każdą edycją.

## Co trzeba zbudować

1. **Import wykazu** - numer RSPO, pełna nazwa, miejscowość, adres poczty elektronicznej, numer telefonu, status (czynna/zlikwidowana). Tylko szkoły, w których uczą się osoby w wieku ponadpodstawowym.
2. **Wyszukiwarka szkoły w formularzu** - po nazwie i miejscowości, z numerem RSPO jako identyfikatorem. Zgłaszający nie wpisuje adresu poczty.
3. **Wysyłka kodu** na adres z wykazu, ważność kodu ograniczona w czasie, limit prób.
4. **Ścieżka ręczna** - gdy w rejestrze nie ma adresu albo wiadomość wraca: potwierdzenie telefoniczne pod numerem z rejestru, odnotowane przy zgłoszeniu grupy.
5. **Zestawienie szkół uczestniczących** - do kontaktu i do sprawozdania, wyłącznie na użytek Organizatora; bez danych uczniów i bez publikowania.

## Czego nie zbieramy

**Żadnych danych uczniów** - ani imion, ani adresów, ani numerów telefonu. Do Organizatora trafia werdykt grupy wraz z uzasadnieniem; lista osób czytających pozostaje w szkole. To jest główny powód, dla którego Nagroda Uczniowska ma postać werdyktu grupy, a nie głosowania uczniów: głosowanie wymagałoby danych osób niepełnoletnich i zgód ich rodziców.

## Trzy rzeczy, które się zepsują

**Nieaktualny adres w rejestrze.** Szkoły zmieniają skrzynki rzadziej niż ludzie, ale zmieniają. Stąd ścieżka telefoniczna, nie jako wyjątek, lecz jako przewidziana część trybu.

**Dostarczalność.** Poczta szkolna bywa filtrowana ostro, a wiadomość z kodem wygląda jak wiadomość z kodem, czyli jak spam. Domena wysyłkowa musi mieć poprawnie ustawione SPF, DKIM i DMARC, zanim pójdzie pierwszy kod.

**Skrzynka sekretariatu.** Adres z rejestru to zwykle sekretariat, a nie nauczyciel prowadzący grupę. To jest cecha, nie wada - potwierdzenie pochodzi wtedy od szkoły jako instytucji - ale trzeba to powiedzieć w materiałach dla szkół, żeby nauczyciel wiedział, gdzie szukać kodu.

## Do rozstrzygnięcia

- **Dane logowania do API**, jeżeli chcemy odświeżać wykaz automatycznie, a nie plikiem.
**Listy szkół nie publikujemy** (decyzja z 27.10.2026) - wykaz służy wyłącznie weryfikacji i zostaje u Organizatora. Odpada przy tym pytanie o warunki ponownego wykorzystania zbioru, bo niczego z niego nie udostępniamy dalej.

**Liczba grup w szkole nie jest ograniczona, ale wskazanie jest jedno na szkołę** (decyzja z 27.10.2026, § 8 ust. 2a lit. g regulaminu). Formularz przyjmuje więc jedno wskazanie na numer RSPO; druga próba z tej samej szkoły wymaga kontaktu z Organizatorem.
