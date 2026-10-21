# Kopia archiwalna rozmowy - co sprawdzono i co z tego wynika

Notatka z testu przeprowadzonego 21 października 2026 na rzeczywistych linkach, nie na założeniach. Narzędzie: `skrypty/archiwizuj.py` (Playwright + Chromium). Test był konieczny, bo § 5 regulaminu obiecuje kopię archiwalną, a do tego dnia nikt nie sprawdził, czy da się ją w ogóle sporządzić.

## 1. Wynik u trzech dostawców

| Dostawca | Kopia automatyczna | Skąd treść | Czasy wypowiedzi | Nazwa modelu |
|---|---|---|---|---|
| Gemini | tak | drzewo dokumentu (selektory) | **brak** | **brak** |
| ChatGPT | tak | ładunek danych strony | tak, co do sekundy | tak |
| Claude | **nie** | - | - | - |

**Gemini.** Strona udostępnionej rozmowy renderuje treść i daje się odczytać selektorami (`user-query`, `response-container`). Pułapka: element `h5.cdk-visually-hidden` powtarza całą wypowiedź uczestnika dla czytników ekranu. Bez jego pominięcia udział człowieka wychodzi 54% zamiast 44,6% - czyli próg formalny odrzucałby albo przepuszczał zgłoszenia bezpodstawnie.

**ChatGPT.** Strona często w ogóle nie wyświetla rozmowy („Content failed to load"), ale cała rozmowa jest zawarta w danych strony jako strumień turbo-stream React Routera. Ładunek jest lepszym źródłem niż drzewo dokumentu: ma rolę autora wprost, znaczniki czasu i nazwę modelu. Wymaga rozwinięcia referencji (`{"_<indeks klucza>": <indeks wartości>}`) i odtworzenia ścieżki rozmowy od węzła bieżącego w górę po `parent`, bo dane są drzewem z gałęziami, a nie listą.

**Claude.** Zatrzymuje zarządzane wyzwanie Cloudflare Turnstile. Nie jest to kwestia selektorów ani czasu ładowania. Patrz obszar 7 w `prawnik.md` - decyzja należy do prawnika, nie do programisty.

## 2. Ustalenia, które dotykają regulaminu

**Data rozmowy nie jest jedną datą.** Testowa rozmowa z ChatGPT trwała **trzy dni kalendarzowe** (19-21 października). Rozmowa zaczęta 29 grudnia 2027 i dokończona 3 stycznia 2028 jest w świetle dzisiejszego § 4 nierozstrzygalna, a § 6 pkt 7 każe takie odrzucać. Potrzebna reguła: liczy się data pierwszej wypowiedzi, ostatniej, albo całość musi mieścić się w oknie.

**§ 4 obiecuje weryfikację, której nie da się wykonać.** Zdanie „Datę rozmowy Uczestnik podaje w metryczce; weryfikowana jest **na podstawie udostępnionego linku** oraz rozmowy weryfikacyjnej" jest nieprawdziwe dla Gemini, który nie niesie żadnego znacznika czasu. Dostawcy nie są pod tym względem symetryczni i uczestnik nie ma na to wpływu.

**Zapisany HTML nie jest kopią archiwalną.** Po otwarciu uruchamia skrypty dostawcy, framework czyści drzewo i rysuje stan pusty. Kopią archiwalną jest `dialog.json` (struktura rozmowy) plus wygenerowane z niego HTML, PDF i EPUB. Surowy HTML przechowujemy wyłącznie po to, by w razie zakwestionowania odczytu dało się ekstrakcję powtórzyć i porównać sumy kontrolne. § 5 mówi dziś o „kopii archiwalnej" bez określenia, czym ona jest.

**Liczba tur wymaga definicji.** ChatGPT rozbija jedną odpowiedź na kilkanaście wiadomości (kroki rozumowania, wywołania narzędzi). Surowo wychodziło 112 „odpowiedzi modelu" na 21 wypowiedzi uczestnika; po scaleniu ciągów tej samej roli - 18 na 18. Gdyby liczyć surowo, każdy próg oparty na liczbie tur byłby bez sensu.

**Limit 25 000 słów wymaga doprecyzowania.** Nie jest rozstrzygnięte, czy kroki rozumowania i wywołania narzędzi wliczają się do limitu. Jeżeli tak, długi łańcuch rozumowania wypycha zwykłą rozmowę poza limit bez winy uczestnika.

**81 wiadomości „innego typu" zostało pominiętych** przy ekstrakcji z ChatGPT, obok 16 wywołań narzędzi. Nie wiadomo jeszcze, co to jest - prawdopodobnie załączniki, obrazy i podsumowania rozumowania. Jeżeli są wśród nich pliki wgrane przez uczestnika, kopia archiwalna jest niepełna, co dotyka także § 5 lit. e) o deklaracji załączników. **Do sprawdzenia.**

## 3. Co narzędzie robi dzisiaj

Zapisuje do katalogu ze znacznikiem czasu:

- `dialog.json` - źródło prawdy: tury jako obiekty (rola, tekst, znaki, słowa, czasy), statystyki formalne, metadane dostawcy,
- `rozmowa.html`, `rozmowa.pdf`, `rozmowa.epub` - generowane z `dialog.json`,
- `meta.json` - adres podany i końcowy, status, czas pobrania, sumy kontrolne SHA-256 wszystkich plików,
- `zrodlo/` - surowy HTML, zrzut strony i płaski tekst; do przechowania, nie do pokazywania.

Statystyki liczone automatycznie: liczba tur, wypowiedzi człowieka i modelu, znaki i słowa w rozbiciu na role, udział człowieka, najdłuższa wypowiedź, naprzemienność, kto rozpoczyna. To wystarcza do oceny formalnej bez czytania przez człowieka.

Rzeczy rozwiązane po drodze, warte zapamiętania: nie wolno czekać na `networkidle`, bo dostawcy trzymają stałe połączenia i wejście leci do limitu czasu - zamiast tego czekamy, aż przestanie przybywać treści. Strony doczytują rozmowę dopiero przy przewijaniu, więc trzeba przewijać do końca w pętli. Modal zgody na ciasteczka trzeba zamykać dwukrotnie, bo wraca po doczytaniu treści. W XHTML (czyli w EPUB-ie) wolno używać tylko pięciu encji - `&middot;` wywala plik na pierwszej linii.

## 4. Co zostało do zrobienia

- rozpoznać te 81 pominiętych wiadomości i dopisać obsługę załączników,
- renderowanie markdown w odpowiedziach modelu (nagłówki, listy, pogrubienia, kod, tabele - reszta składni w rozmowach praktycznie nie występuje); bez tego strona antologii wygląda na zepsutą,
- profil dla Claude - zależny od rozstrzygnięcia obszaru 7,
- poprawki regulaminu: § 4 (data i okno rozmów), § 5 (definicja kopii archiwalnej, zakaz przesyłania eksportu całego konta, rola pliku od uczestnika przy znikającym linku), § 6 (definicja tury i zakres limitu słów),
- polityka prywatności: zakaz przyjmowania eksportu całego konta i tryb postępowania, gdy ktoś przyśle go mimo zakazu,
- reguła dla narzędzia do oceny formalnej: zero tur albo rozmowa nienaprzemienna kieruje zgłoszenie do sprawdzenia ręcznego, zamiast cicho przepuścić puste `dialog.json`.

## 5. Wtyczka do przeglądarki organizatora - rozważana 21.10.2026

Pomysł: zamiast skryptu otwierającego stronę samodzielnie, rozszerzenie działające w zwykłej przeglądarce organizatora, w której **człowiek sam otwiera link i sam przechodzi weryfikację Cloudflare**. Wtyczka czyta dopiero stronę już wyświetloną. Dotyczy wyłącznie organizatora, nie uczestników.

**Za.** Znika element omijania zabezpieczenia technicznego - wyzwanie rozwiązuje człowiek, a nie program; zostaje tylko kwestia kopiowania treści wbrew regulaminowi dostawcy, o zupełnie innym ciężarze. Działa u każdego dostawcy. Znika problem ChatGPT z „Content failed to load" i zgadywanie, czy przewijanie doczytało całość - widać na ekranie to, co się zapisuje.

**Przeciw.** Selektory zostają takie same, więc roczne utrzymanie przy trzech dostawcach nie znika. Dochodzi człowiek w pętli: ktoś musi otworzyć każdy link - przy 300 zgłoszeniach jedno posiedzenie, przy 3000 dni pracy koordynatora, do policzenia w budżecie B. Archiwum zaczyna zależeć od jednego komputera z jedną zalogowaną przeglądarką, co przy jednoosobowym zarządzie jest pojedynczym punktem awarii.

**Wirtualizacja listy.** Aplikacje dostawców usuwają z dokumentu wypowiedzi wyprzewijane poza ekran, więc pojedynczy zrzut na końcu daje przy rozmowie na 200 tur tylko tyle, ile akurat widać. Kolejność wejść od najpewniejszego: (1) odczyt danych, które aplikacja pobiera z serwera dostawcy - wirtualizacja przestaje mieć znaczenie, bo bierzemy dane, z których lista jest rysowana; (2) gromadzenie treści **w trakcie przewijania**, obserwatorem mutacji, z odróżnianiem powtórzeń po identyfikatorze wiadomości albo skrócie treści; (3) gdy jedno i drugie zawiedzie - zgłoszenie idzie do sprawdzenia ręcznego. Ten ostatni warunek jest ważniejszy, niż się wydaje: najgorszy możliwy wynik to archiwum z rozmowami uciętymi w połowie, o czym nikt się nie dowie przed publikacją antologii.

**Zasada architektoniczna:** `dialog.json` zostaje kontraktem. Wtyczka jest alternatywnym sposobem pobrania, a nie nowym narzędziem - wypluwa ten sam plik, a generowanie HTML, PDF i EPUB oraz ocena formalna zostają nietknięte. Skrypt obsługuje Gemini i ChatGPT bez nadzoru, wtyczka wchodzi tam, gdzie skrypt nie wchodzi.

Wyceny wtyczki nie robimy przed rozstrzygnięciem obszaru 7 w `prawnik.md`.

## 6. Eksport przez uczestnika - dlaczego w pierwotnej postaci odpada

Wariant „uczestnik sam załącza eksport rozmowy" wydawał się odporny na wszystko, co psuje skraper. Ustalenie z 21.10.2026 go przewraca: dostawcy w większości **nie oferują eksportu pojedynczej rozmowy** - eksport obejmuje całe konto. ChatGPT wysyła archiwum wszystkich czatów, Gemini idzie przez Takeout, Claude eksportuje konto. Uczestnik, chcąc dostarczyć jedną rozmowę, przysyłałby fundacji kilkaset swoich prywatnych rozmów: korespondencję, sprawy zdrowotne, służbowe, cudze dane.

Przyjęcie takiego pliku to zbieranie danych bez podstawy przetwarzania, wbrew zasadzie minimalizacji (art. 5 ust. 1 lit. c RODO) - w przedsięwzięciu, którego polityka prywatności podkreśla, że nie zbiera nawet numeru telefonu od wszystkich uczestników. **Regulamin i formularz mają to wprost zakazywać**, a nie przyjmować i usuwać później.

Zostaje to, co jest u każdego dostawcy i obejmuje wyłącznie jedną rozmowę: **wydruk strony do PDF** z poziomu przeglądarki uczestnika. Cena: PDF nie niesie struktury, więc ocena formalna na nim nie pojedzie - role i liczbę tur trzeba by odtwarzać heurystycznie albo czytać ręcznie.

Wniosek zmieniający hierarchię: plik od uczestnika **nie jest drogą równoległą do skrapera, tylko zabezpieczeniem na wypadek zniknięcia linku** - czyli dokładnie tym, co obiecuje § 5 ust. 6. Ocena formalna i archiwum opierają się na kopii pobranej przez organizatora; PDF od uczestnika leży obok jako dowód, że rozmowa istniała w zgłoszonym kształcie.

## 7. Wniosek operacyjny

Trzej dostawcy to trzy różne sposoby dobierania się do treści, a każdy z nich może przebudować stronę w dowolnym tygodniu naboru - wtedy zgłoszenia przestają się archiwizować z dnia na dzień. Pięćdziesiąt godzin w budżecie wystarcza na napisanie narzędzia, nie na roczne pilnowanie go, i nie obejmuje wtyczki.

Żadna z dróg nie jest odporna na wszystko. Skrypt jest tani i bezobsługowy, ale zatrzymuje go zabezpieczenie antybotowe i przebudowa strony. Wtyczka obchodzi jedno i drugie, ale kosztuje czas człowieka przy każdym zgłoszeniu i musi poradzić sobie z wirtualizacją. Plik od uczestnika jest niezależny od dostawcy, ale w postaci eksportu całego konta jest niedopuszczalny, a w postaci wydruku do PDF nie nadaje się do oceny formalnej. Dlatego układ docelowy jest wielowarstwowy, a nie jednym narzędziem: skrypt tam, gdzie działa; wtyczka tam, gdzie skrypt nie wchodzi; PDF od uczestnika jako zabezpieczenie na wypadek zniknięcia linku; sprawdzenie ręczne jako jawny wyjątek, nigdy jako ciche przepuszczenie niepełnej kopii.
