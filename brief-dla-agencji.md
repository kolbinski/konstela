# Nagroda Konstela - brief dla agencji

Przebudowa strony konstela.org: projekt, wdrożenie i teksty. Dokument służy wycenie.

---

## 1. Czym jest Nagroda Konstela

Coroczna nagroda dla ludzi, którzy prowadzą ze sztuczną inteligencją najlepsze rozmowy. Nagradzany jest człowiek, nie model i nie firma, która model zbudowała. Oceniane są pytania, a nie odpowiedzi.

Uczestnik zgłasza link do rzeczywistej rozmowy, którą odbył z modelem. Rozmowy ocenia najpierw kilkunastoosobowe grono czytelników, potem kilkuosobowe jury. Dziesięć najwyżej ocenionych rozmów ukazuje się w bezpłatnej antologii, publikowanej jako e-book, a szerszy zbiór trafia do publicznego Archiwum.

Nazwa bierze się stąd, że gwiazdy same z siebie nie układają się w żaden kształt - konstelacja powstaje dopiero wtedy, gdy ktoś poprowadzi między nimi linię, której wcześniej nie było. To samo robi dobra rozmowa: pojedyncze fakty ma każdy, wartość powstaje z połączeń.

**Pierwsza edycja:** rozmowy przeprowadzone w 2027 roku, zgłoszenia do 15 stycznia 2028, rozstrzygnięcie i gala w drugiej połowie kwietnia 2028. Kolejne edycje co roku, w tym samym rytmie.

Organizatorem będzie fundacja powoływana wyłącznie do prowadzenia Nagrody, wpisana do KRS przed otwarciem zgłoszeń. Udział jest bezpłatny. Pula nagród pochodzi od fundatora zewnętrznego; poziom docelowy to nagroda główna 300 tys. zł.

## 2. Po co ta strona istnieje

Strona ma trzy zadania, w tej kolejności ważności.

**Przekonać, że to jest poważne.** Dziś jest to przedsięwzięcie jednego człowieka bez jeszcze pozyskanego fundatora. Stronę będą otwierać: urzędnik rozważający patronat, dyrektor marketingu rozważający sponsoring, redaktor wydawnictwa, kandydat na jurora. Każde z nich w pierwszych piętnastu sekundach rozstrzyga, czy ma do czynienia z instytucją w budowie, czy z czyimś hobby.

**Doprowadzić uczestnika do zgłoszenia.** Od 1 stycznia 2027 strona musi tłumaczyć, co zgłaszać, jak to zrobić i czego się spodziewać, a potem przeprowadzić przez formularz bez pytań po drodze.

**Udostępniać materiał.** Od kwietnia 2028 strona jest miejscem, z którego pobiera się antologię i czyta Archiwum rozmów. Docelowo to jest jej główny ruch: nauczyciele, uczniowie, studenci, badacze.

## 3. Co jest dzisiaj

Strona istnieje i działa pod adresem konstela.org. Zbudowałem ją sam: statyczny HTML, bez frameworka, hostowany na GitHub Pages przez Cloudflare w trybie DNS only. Fonty są self-hostowane, bez zewnętrznych zapytań. Jest strona główna i podstrony dokumentów renderowane z plików Markdown po stronie przeglądarki.

Opublikowane dokumenty: regulamin, karta oceny, polityka prywatności, dokument o prawach do wypowiedzi modelu. Są też plik `ai.txt` i `robots.txt` z zastrzeżeniem eksploracji tekstów i danych.

Identyfikacja wizualna: pieczęć z konstelacją i medal, istniejące w wersji graficznej i jako zdjęcie. Nie ma księgi znaku ani systemu typograficznego.

**Czego oczekuję od przebudowy:** strona ma przestać wyglądać na zrobioną przez programistę w weekend, a zacząć wyglądać na instytucję. Jestem inżynierem, nie projektantem, i to widać.

## 4. Zakres zlecenia

W zakresie:

- audyt i projekt strony publicznej: architektura informacji, układ, typografia, warstwa wizualna oparta na istniejącej pieczęci,
- teksty: przepisanie istniejących treści strony głównej i podstron informacyjnych, w tym sekcji dla uczestnika, dla partnerów i o samej nagrodzie,
- wdrożenie, w technologii do uzgodnienia - preferowane statyczne, dające się hostować bez serwera aplikacyjnego,
- responsywność i dostępność na poziomie WCAG 2.1 AA,
- widok dokumentów renderowanych z Markdown (regulamin i pozostałe), zachowujący możliwość ich aktualizacji przeze mnie bez udziału agencji,
- przygotowanie strony pod wersję anglojęzyczną w przyszłości, bez jej tworzenia teraz.

Poza zakresem, ponieważ realizuję to samodzielnie:

- formularz zgłoszeniowy i obsługa danych uczestników,
- narzędzie archiwizujące zgłoszone rozmowy,
- narzędzie do weryfikacji formalnej zgłoszeń,
- panel pracy dla czytelników i jury,
- mechanizm publikowania Archiwum rozmów,
- **monitor dostępności linków zewnętrznych**: codzienne sprawdzanie, czy nagrania piosenek, filmy, zwiastuny i nagrania z pracy nad plakatem są wciąż dostępne pod podanymi adresami, z zapisem wyniku każdego sprawdzenia wraz z datą i godziną. Regulaminy wiążą z dłuższą niedostępnością konkretne skutki - termin naprawczy, pominięcie głosów, wyłączenie z oceny - a ciężar wykazania niedostępności spoczywa na organizatorze, więc ten zapis jest dowodem, a nie wygodą.

Przy dwóch ostatnich punktach potrzebuję od agencji wyłącznie **wytycznych projektowych**: jak mają wyglądać strony pojedynczej rozmowy w Archiwum i strona antologii, żeby były spójne z resztą. Samo wdrożenie zrobię po swojej stronie.

## 5. Ograniczenia, o których trzeba wiedzieć

**Treści muszę móc zmieniać sam.** Regulamin i dokumenty towarzyszące będą poprawiane po konsultacji prawnej i w trakcie edycji. Model, w którym każda zmiana przecinka wymaga zlecenia, odpada.

**Bez zewnętrznych skryptów śledzących i bez zapytań do zewnętrznych domen** tam, gdzie da się tego uniknąć. Strona deklaruje zastrzeżenie eksploracji tekstów i danych oraz ma politykę prywatności opisującą minimalny zakres danych; ładowanie fontów czy skryptów z cudzych serwerów stoi z tym w sprzeczności.

**Dane uczestników nie mogą opuszczać EOG.** Dotyczy to przyszłego formularza, ale także wszelkich narzędzi analitycznych albo osadzanych widgetów.

**Archiwum będzie duże.** Docelowo kilkaset stron pojedynczych rozmów, z których każda jest długim dialogiem. Układ i typografia muszą to unieść, a nawigacja musi działać przy takiej liczbie wpisów.

**Nie znam jeszcze skali ruchu.** Przy nagrodzie głównej 300 tys. zł liczba zgłoszeń może wynieść sto pięćdziesiąt albo tysiąc, a ruch w dniu ogłoszenia wyników jest nieprzewidywalny. Rozwiązanie ma to znieść bez przebudowy.

## 6. Harmonogram

| Etap | Termin |
|---|---|
| Wycena i rozmowa o zakresie | listopad 2026 |
| Projekt i wdrożenie | grudzień 2026 - luty 2027 |
| **Strona musi działać w nowej wersji** | **przed 1 stycznia 2027 w zakresie informacji o naborze** |
| Rozbudowa o antologię i Archiwum | styczeń - kwiecień 2028 |

Twardy termin dotyczy wyłącznie części informacyjnej: 1 stycznia 2027 otwiera się przyjmowanie zgłoszeń i od tego dnia strona musi tłumaczyć zasady i prowadzić do formularza. Warstwa publikacyjna ma czas do wiosny 2028.

## 7. O co proszę

O wycenę zakresu z punktu 4, z rozbiciem na projekt, wdrożenie i teksty, oraz o informację, ile czasu potrzebujecie od decyzji do uruchomienia. Jeżeli uważacie, że zakres jest źle pocięty albo że czegoś w nim brakuje, piszcie wprost - wolę usłyszeć to teraz niż w lutym.

Budżetu nie podaję celowo: nie znam realnych stawek za tę robotę i chcę je poznać, a nie zakotwiczyć rozmowę swoim szacunkiem. Jeżeli wycena rozminie się z moimi możliwościami, powiem to otwarcie i porozmawiamy o węższym zakresie.

Projekt jest finansowany ze środków sponsorów, których dopiero pozyskuję, więc zlecenie ruszy po podpisaniu pierwszej umowy sponsorskiej. Nie proszę o pracę na ryzyko ani o odroczoną płatność.

---

Krzysztof Olbiński  
+48 503 520 004  
olbinski@gmail.com  
konstela.org
