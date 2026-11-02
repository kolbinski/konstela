# Stan recenzji ofert partnerskich

Jedno miejsce na odpowiedź na pytanie „które oferty przeszły już przez recenzenta i z jakim statusem". Plik jest aktualizowany po **każdej** turze recenzji, w tym samym commicie co zmiany w ofercie - zasada zapisana w `CLAUDE.md`. Pełne teksty recenzji leżą w `recenzje/`, prompty w plikach `*-prompt-recenzji*.md`.

Osiemnaście ofert partnerskich, osiemnaście gotowych promptów, każdy z osobną personą. Recenzję przeszło **sześć** ofert, w sumie w **dwudziestu jeden turach**.

## Przeszły recenzję

| Oferta | Tury | Persona | Status końcowy | Recenzje |
| --- | --- | --- | --- | --- |
| **Rozmowa** - fundator nagród | 7 | prezes firmy technologicznej decydujący sam o kwotach powyżej pół miliona | **Gotowa do przedstawienia sponsorowi.** „Odpowiadam i umawiam spotkanie"; deklaracja finansowania zależy wyłącznie od rzeczy spoza dokumentu: Rady Fundacji, zakontraktowanego jury i umowy z limitem | `2026-10-31-oferta-rozmowa-*` (5 plików) |
| **Akademia** - sponsor pierwszej rundy oceny | 4 | dyrektor komunikacji sieci handlowej, potem osoba od budżetu sponsoringowego firmy technologicznej | **Konstrukcja finansowa zamknięta.** „Rozmowę handlową bym rozpoczął, przelewu jeszcze nie"; jedyny otwarty warunek to opinia prawna o udziale akademii w postępowaniach o odrzucenie, nie tekst oferty | `2026-10-31-oferta-akademia-*`, `2026-11-01-oferta-akademii-oczami-sponsora-technologicznego.md` |
| **Plakat** - mecenas plebiscytu | 6 + 1 | prezes firmy rodzinnej produkującej płytki ceramiczne, budującej markę wzornictwem; osobno osoba odpowiadająca za fizyczny obieg cudzych prac | **Odpowiada na list i prosi o dokumenty**, bez deklaracji finansowania. Po turze obiegu oryginałów: podpisałby przyjęcie pierwszej pracy, warunek kolejności wykonany (§ 10 ust. 1b) | `2026-10-30-oferta-plakat-oczami-producenta.md`, `2026-11-02-oferta-plakat-obieg-oryginalow.md` |
| **Mecenas założycielski** | 4 | właściciel firmy rodzinnej wydający własne pieniądze | „Rozmowa tak, **zobowiązanie finansowe po sprawdzeniu dokumentów i zakupów**" | `2026-10-30-oferta-zalozycielska-*` (4 pliki) |
| **Mecenat antologii** | 1 | członek zarządu firmy produkcyjnej, od marketingu i komunikacji | „Tak, ale odpowiedź jest **prośbą o wyjaśnienia, nie deklaracją zainteresowania finansowaniem**" | `2026-10-30-oferta-mecenatu-oczami-sponsora.md` |
| **Film** - fundator nagród | 1 | firma medialna | **Najsurowszy ze wszystkich.** „Odpowiadam na list, ale nie kieruję tej propozycji do zatwierdzenia budżetu" - zarzut główny: nie wykazano zdolności przyciągnięcia dobrych filmów | `2026-10-31-oferta-film-oczami-firmy-medialnej.md` |

## Recenzje dokumentów innych niż oferty

| Dokument | Tury | Persona | Status końcowy | Recenzje |
| --- | --- | --- | --- | --- |
| **Regulamin rozmowy** | 1 | pełnomocnik uczestnika szukający podstaw do podważenia rozstrzygnięcia | **Największe ryzyko prawne nie tkwi w tym, jak jury wybierze zwycięzcę, lecz w tym, co stanie się z uczestnikami, jeżeli edycja nie zostanie rozstrzygnięta.** Trzy kwestie pierwszorzędne poszły do kancelarii, wszystkie trzy zmienione w regulaminie tego samego dnia | `2026-11-01-regulamin-rozmowy-oczami-pelnomocnika-uczestnika.md` |
| **Regulamin rozmowy** - redakcja | 1 | czytelnik oceniający tekst jako dokument wiążący | **Regulamin zawierał komentarz redakcyjny i daty zmian.** Usunięte: 72 datowane fragmenty w rozmowie, po 4-5 w pozostałych trzech oraz wykazy pytań do kancelarii z trzech opublikowanych regulaminów | `2026-11-01-regulamin-rozmowy-druga-tura-komentarze-redakcyjne.md` |
| **Regulamin rozmowy** - skala i koszt | 2 | dyrektor operacyjny prowadzący nabory i oceny w skali krajowej, rozliczający ich koszt | **Pierwszą ścianą przy dużym naborze nie jest ocenianie, lecz obsługa zgłoszeń.** Z audytu wziął się piąty warunek otwarcia naboru, przepustowość wiązana z zabezpieczonym finansowaniem i wycena dwóch brakujących pozycji; druga tura potwierdziła zamknięcie czterech kwestii dokumentowych | `2026-11-01-regulamin-rozmowy-audyt-operacyjny-skala-i-koszt.md`, `2026-11-01-kontrola-zmian-po-audycie-operacyjnym.md` |
| **Karta oceny** - plebiscyt rozmowy | 2 | osoba oceniająca zgłoszenia w konkursach, komisjach stypendialnych i panelach recenzenckich | **Werdykt pierwszej tury: nie.** Dwie uważne osoby nie utrzymałyby różnicy do 15 punktów w czterech z pięciu rozmów; rozrzut 20-30 punktów uznany za wiarygodny scenariusz. Najgorsza Rozpiętość - jej pasma mieszały dwie osie. Po poprawkach: pięć zasad dowodowych, przebudowane pasma wszystkich czterech kryteriów, próba oceniania przesunięta za poprawki karty. **Druga tura:** wymóg, by czynność „wywołał” Uczestnik, otwierał spór o sprawstwo przesuwający ocenę przez granicę 10 punktów - zasada rozpisana na sześć reguł opartych na parze „wkład i miejsce jego wykorzystania”. **Tura zamknięta przez recenzenta:** brzmienie wystarcza do próby oceniania, a zgodność stosowania reguły sprawdzi sama próba | `2026-11-02-karta-oceny-oczami-oceniajacego-w-konkursach.md` |

**Nierecenzowane dotąd:** statut fundacji i polityka prywatności.

**Karta oceny plebiscytu rozmowy jest po dwóch turach recenzji i po przebudowie** - wiersz w tabeli wyżej. Nierecenzowane zostają **trzy karty artystyczne**: piosenki, plakatu i filmu. Reguła punktowania wewnątrz pasma weszła do wszystkich czterech, ale pozostałych zasad dowodowych nie przenosiliśmy, bo te karty oceniają utwór, nie rozmowę, a kryteria „Siła oddziaływania” w filmie i „Działanie plakatu” z nazwy opisują skutek u odbiorcy - przy pracy plastycznej jest to uprawnione kryterium zawodowe, nie wada tego samego rodzaju. Każda z nich potrzebuje recenzji z personą ze swojej dziedziny.

## Wzór, który powtarza się w każdej z sześciu

**Żaden recenzent nie odmówił rozmowy i żaden nie zadeklarował pieniędzy.** Granica nie leży w tekście ofert, lecz w czterech rzeczach, których w dokumencie być nie może: fundacja wpisana do KRS, nazwiska w Radzie Fundacji, zakontraktowane jury i podpisana umowa z górnym limitem. Kolejne tury recenzji tej granicy nie przesuną - i to jest powód, dla którego dalsze recenzje tych sześciu ofert mają malejącą wartość.

## Czekają na recenzję

Mają gotowy prompt, nie mają jeszcze recenzji:

- **piosenka** (fundator nagród) - dyrektor marketingu marki konsumenckiej
- **gala** - dyrektor komunikacji firmy sponsorującej wydarzenia
- **galeria sztuki** - dyrektor galerii sztuki współczesnej
- **mecenas muzyczny** - właściciel studia nagraniowego
- **wydawca antologii** - redaktor naczelny oficyny
- **wydawca płyty** - dyrektor wydawniczy wytwórni
- **dystrybucja filmów** - kierownik programowy sieci kin studyjnych
- **telewizja** - dyrektor programowy stacji
- **streaming** - dyrektor programowy platformy
- **sponsor podcastu** - dyrektor marketingu firmy technologicznej
- **prowadzący podcast** - podcaster oceniający własną pracę
- **patronat medialny** - redaktor naczelny serwisu o technologii

**Kolejność ustalona 31.10.2026:** najpierw role, które idą do ludzi najszybciej - piosenka i gala. Film dopiero po odpowiedziach ze szkół i festiwali. Dziewięć ról bez pieniędzy na końcu, bo ich recenzje zmienią najmniej, a przy kinach, platformie i wytwórni realna odpowiedź przyjdzie i tak dopiero po werdykcie jury.

## Co warto zrobić następne

**Druga tura filmu.** Film ma jedną recenzję i najgorszy status, a od tamtej pory doszły mu cztery przepisy o trybie oceny przy dużym naborze oraz piąty warunek otwarcia naboru. Jedna tura kosztuje jeden prompt i może zmienić status z „nie kieruję do zatwierdzenia" na taki, z którym da się iść do stacji.

## Jak aktualizować ten plik

1. Recenzja trafia do `recenzje/` pod nazwą `RRRR-MM-DD-<oferta>-<persona albo tura>.md`, z nagłówkiem opisującym personę i werdykt.
2. W tabeli wyżej rośnie liczba tur, zmienia się status końcowy i dochodzi nazwa pliku.
3. Jeżeli oferta przechodzi recenzję po raz pierwszy, wiersz przenosi się z listy oczekujących do tabeli.
4. Wszystko w tym samym commicie co poprawki w ofercie - inaczej plik zacznie kłamać, a lista, która kłamie, jest gorsza od braku listy.
