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

**Bielik - prośba o funkcję udostępniania (wysłana 22.10.2026).** Czat Bielika nie ma funkcji udostępniania rozmowy linkiem, więc jego użytkownicy nie mogą dziś zgłosić się do Nagrody - § 5 ust. 2b nazywa to wprost kosztem przyjętego sposobu dowodzenia. Mail z prośbą o wdrożenie funkcji przed końcem 2026 wysłany na **partnerstwa@bielik.ai** (Fundacja Speakleash, Niemczańska 33/4, 50-561 Wrocław, KRS 0001099568; druga skrzynka, wydarzenia@bielik.ai, dotyczy patronatów i wystąpień - nie tam). W zamian zaoferowano miejsce na liście obsługiwanych modeli od pierwszego dnia naboru, profil w otwartym narzędziu Konsteli oraz napisanie zmiany samodzielnie, jeżeli kod czatu jest otwarty. Poproszono też o wskazanie publicznego repozytorium, gdyby zgłoszenie tam było skuteczniejsze. **Bez odpowiedzi po dwóch tygodniach: zgłoszenie w ich repozytorium, nie drugi mail.** Niezależnie od wyniku sama korespondencja jest czymś, co można uczciwie przywołać w rozmowie z Ministerstwem Cyfryzacji: ścieżka polskiego modelu była brana pod uwagę, a nie przeoczona.

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

## 5. Wtyczka do przeglądarki - od narzędzia organizatora do otwartego projektu

### 5. Punkt wyjścia: wtyczka dla organizatora (21.10.2026)

Pomysł: zamiast skryptu otwierającego stronę samodzielnie, rozszerzenie działające w zwykłej przeglądarce organizatora, w której **człowiek sam otwiera link i sam przechodzi weryfikację Cloudflare**. Wtyczka czyta dopiero stronę już wyświetloną. Dotyczy wyłącznie organizatora, nie uczestników.

**Za.** Znika element omijania zabezpieczenia technicznego - wyzwanie rozwiązuje człowiek, a nie program; zostaje tylko kwestia kopiowania treści wbrew regulaminowi dostawcy, o zupełnie innym ciężarze. Działa u każdego dostawcy. Znika problem ChatGPT z „Content failed to load" i zgadywanie, czy przewijanie doczytało całość - widać na ekranie to, co się zapisuje.

**Przeciw.** Selektory zostają takie same, więc roczne utrzymanie przy trzech dostawcach nie znika. Dochodzi człowiek w pętli: ktoś musi otworzyć każdy link - przy 300 zgłoszeniach jedno posiedzenie, przy 3000 dni pracy koordynatora, do policzenia w budżecie B. Archiwum zaczyna zależeć od jednego komputera z jedną zalogowaną przeglądarką, co przy jednoosobowym zarządzie jest pojedynczym punktem awarii.

**Wirtualizacja listy.** Aplikacje dostawców usuwają z dokumentu wypowiedzi wyprzewijane poza ekran, więc pojedynczy zrzut na końcu daje przy rozmowie na 200 tur tylko tyle, ile akurat widać. Kolejność wejść od najpewniejszego: (1) odczyt danych, które aplikacja pobiera z serwera dostawcy - wirtualizacja przestaje mieć znaczenie, bo bierzemy dane, z których lista jest rysowana; (2) gromadzenie treści **w trakcie przewijania**, obserwatorem mutacji, z odróżnianiem powtórzeń po identyfikatorze wiadomości albo skrócie treści; (3) gdy jedno i drugie zawiedzie - zgłoszenie idzie do sprawdzenia ręcznego. Ten ostatni warunek jest ważniejszy, niż się wydaje: najgorszy możliwy wynik to archiwum z rozmowami uciętymi w połowie, o czym nikt się nie dowie przed publikacją antologii.

**Zasada architektoniczna:** `dialog.json` zostaje kontraktem. Wtyczka jest alternatywnym sposobem pobrania, a nie nowym narzędziem - wypluwa ten sam plik, a generowanie HTML, PDF i EPUB oraz ocena formalna zostają nietknięte. Skrypt obsługuje Gemini i ChatGPT bez nadzoru, wtyczka wchodzi tam, gdzie skrypt nie wchodzi.

Wyceny wtyczki nie robimy przed rozstrzygnięciem obszaru 7 w `prawnik.md`.

### 5a. Wtyczka służy też Uczestnikom (ustalenia z 22.10.2026)

Wtyczka przestała być wyłącznie narzędziem organizatora. Uczestnik może nią **sprawdzić przed zgłoszeniem**, czy rozmowa spełnia policzalne wymogi formalne - zapisane jako § 5 ust. 3b regulaminu.

**Dlaczego wtyczka, a nie strona z polem na link.** Link jest zrzutem stanu z chwili udostępnienia; wymiany dopisane później nie pojawią się pod tym samym adresem. Sprawdzanie przez stronę wymuszałoby więc pętlę: porozmawiaj, udostępnij, sprawdź, dopisz, udostępnij **ponownie** - i uczestnik zostaje z kilkoma linkami do tej samej rozmowy. Wtyczka czyta żywy czat, więc link generuje się raz, na końcu.

Konsekwencja, której nie przewidzieliśmy przy pierwszym podejściu: skoro wtyczka liczy **lokalnie, w przeglądarce uczestnika**, rozmowa nigdzie nie jest wysyłana. Znika zarzut o przetwarzanie danych osób, które się nie zgłosiły, znika problem Cloudflare (człowiek czyta własną rozmowę) i **dla narzędzia uczestnika obszar 7 przestaje mieć znaczenie** - działa u wszystkich trzech dostawców. Dla kopii archiwalnej sporządzanej przez organizatora obszar 7 zostaje bez zmian.

**Narzędzie jest identyczne dla Uczestnika i Organizatora** - bez trybu uprzywilejowanego, kont i logowania (§ 5 ust. 3b lit. e). Powód nie jest techniczny: nagroda stoi na jawności procedury, a tryb uprzywilejowany byłby pierwszą rzeczą kwestionowaną przy reklamacji. Korzyść operacyjna: uczestnik widzi, co dokładnie wyciągamy z jego rozmowy, więc zgłasza błąd ekstrakcji **przed** zgłoszeniem, a nie w trybie z § 5 ust. 9.

**Plik pobrany przez Uczestnika nie jest podstawą oceny** (§ 5 ust. 3b lit. f). To ten sam problem, dla którego § 5 ust. 3 odrzuca transkrypty: plik można zmienić po pobraniu, a podpisem się tego nie uratuje, bo klucz w kodzie wtyczki da się wyjąć. Zasada: **narzędzie identyczne, status pliku różny.** Różnica siedzi w regulaminie i procedurze, nie w programie.

**Czego narzędzie nie sprawdza:** § 6 pkt 5 oraz 9-12, czyli osoby trzecie, treści bezprawne, zarzuty i kryzys psychiczny. Maszynowy werdykt byłby albo fałszywym uspokojeniem, albo fałszywym oskarżeniem - a to drugie gorsze.

**Narzędzie nigdy nie pokazuje zera zamiast błędu.** Uczestnik, który zobaczy „0 słów", uzna rozmowę za pustą, a nie wtyczkę za zepsutą - i albo zrezygnuje, albo zacznie sztucznie przedłużać rozmowę.

**Komunikaty stwierdzają, nie doradzają.** „738 słów, próg 800" to informacja. „Dopisz 62 słowa" to instrukcja nadmuchania wypowiedzi, czyli psucie tego, co się mierzy.

### 5b. Otwarty kod wtyczki (decyzja z 22.10.2026)

Wtyczka ma być **projektem otwartym fundacji**, możliwym do rozwijania przez społeczność. Materiał testowy przygotowywany specjalnie w tym celu - neutralne rozmowy, nie zapisy prywatnych rozmów kogokolwiek.

**Dlaczego.** § 5 ust. 3b lit. e deklaruje, że uczestnik widzi to samo odczytanie co organizator; przy otwartym kodzie staje się to **sprawdzalne**, a nie tylko deklarowane. Przy puli 300 tys. zł ktoś zapyta, czy liczydło nie jest ustawione, i odpowiedź „proszę sprawdzić" waży więcej niż każde oświadczenie. Dodatkowo rozwiązuje największe ryzyko utrzymania: że selektory padną w środku naboru, a pilnuje ich jedna osoba. Współtwórcy to zresztą naturalni kandydaci do Akademii.

**Trzy warunki, ustalone od razu:**

1. **Wersja licząca jest zamrożona na edycję.** Kod liczący słowa i wypowiedzi rozstrzyga, kto przechodzi ocenę formalną. Zmiana metody liczenia w trakcie naboru to zmiana reguł w trakcie gry - ta sama zasada co w § 8 ust. 10a. Wersja obowiązująca ustalana jest przed otwarciem naboru; w trakcie wchodzą wyłącznie poprawki przywracające działanie po zmianie u dostawcy, nigdy zmiany metody.
2. **Decyzja o scaleniu zostaje przy fundacji.** Otwarty kod nie oznacza, że każdy może zmienić narzędzie rozstrzygające.
3. **Minimalne uprawnienia i dyscyplina wydań.** Rozszerzenie z dostępem do stron, na których ludzie rozmawiają z modelami, jest celem dla kogoś, kto chciałby wypuścić zatrutą wersję. Żadnych połączeń sieciowych poza jawnym zgłoszeniem błędu; wydania podpisywane po przeglądzie.

**Czego nie robimy:** nie wykluczamy współtwórców z udziału w konkursie. Progi i karta oceny są jawne, więc wgląd w kod nie daje przewagi, a wykluczenie zniechęciłoby dokładnie tych ludzi, na których nam zależy. Wyłączenie z § 3 ust. 5 dotyczy oceniających i partnerów.

### 5c. Testy i wykrywanie awarii (ustalenia z 22.10.2026)

Dwie warstwy, łatwe do pomylenia, bo obie nazywa się testami:

- **Testy na zapisanych stronach** - zamrożony wzorzec, porównanie przy każdej zmianie kodu. Szybkie, bez sieci i konta. Łapią **nasze** regresje; nie wykryją niczego, co zmieni się u dostawcy.
- **Rozmowy kontrolne na żywo** - po jednej udostępnionej rozmowie u każdego dostawcy, sprawdzane codziennie. Łapią **ich** zmiany, czyli to, co przewraca nabór. ChatGPT i Gemini automatycznie; Claude nie, bo Cloudflare - tam kontrola przez wtyczkę, ręcznie albo półautomatycznie.

**Co porównujemy.** Nie całego `dialog.json`, bo czas pobrania, sumy kontrolne i parametry adresu zmieniają się przy każdym przebiegu. Zamrażamy część stabilną: sekwencję ról, liczbę tur i tekst każdej wypowiedzi po ujednoliceniu białych znaków.

**Dwa poziomy alarmu.** Niezgodność liczby tur albo sekwencji ról to awaria. Różnica w samym tekście przy zachowanej strukturze to ostrzeżenie do obejrzenia - inaczej po trzecim fałszywym alarmie nikt nie patrzy na wyniki, a wtedy test jest gorszy niż jego brak. Komunikat ma wskazywać, **która tura się rozjechała i jak**, nie samo „test nie przeszedł".

**Dostawcy, o których nie wiemy.** Nie da się przetestować z wyprzedzeniem. Trzy rzeczy zamiast tego: narzędzie rozpoznaje, że nie zna tej strony, i mówi to wprost; profil awaryjny szuka naprzemiennych bloków tekstu i oznacza wynik jako niepewny, kierujący do sprawdzenia ręcznego; a o nowym dostawcy dowiadujemy się **z formularza**, bo § 5 ust. 2 lit. d każe podać nazwę modelu i dostawcy - zgłoszenia z nazwą spoza listy narzędzie oznacza, a nie odrzuca. Do tego lista obsługiwanych dostawców na stronie.

**Zgłaszanie awarii przez użytkownika** - jeśli powstanie, to jako przycisk po nieudanym odczycie, pokazujący dokładnie, co zostanie wysłane, nigdy jako cicha telemetria. Zakres: dostawca, wersja wtyczki, próbowany profil, rodzaj błędu, liczniki znalezionych elementów i rozmiar dokumentu. **Nigdy treść wypowiedzi ani adres rozmowy** - adres identyfikuje konkretną rozmowę konkretnej osoby.

## 6. Eksport przez uczestnika - dlaczego w pierwotnej postaci odpada

Wariant „uczestnik sam załącza eksport rozmowy" wydawał się odporny na wszystko, co psuje skraper. Ustalenie z 21.10.2026 go przewraca: dostawcy w większości **nie oferują eksportu pojedynczej rozmowy** - eksport obejmuje całe konto. ChatGPT wysyła archiwum wszystkich czatów, Gemini idzie przez Takeout, Claude eksportuje konto. Uczestnik, chcąc dostarczyć jedną rozmowę, przysyłałby fundacji kilkaset swoich prywatnych rozmów: korespondencję, sprawy zdrowotne, służbowe, cudze dane.

Przyjęcie takiego pliku to zbieranie danych bez podstawy przetwarzania, wbrew zasadzie minimalizacji (art. 5 ust. 1 lit. c RODO) - w przedsięwzięciu, którego polityka prywatności podkreśla, że nie zbiera nawet numeru telefonu od wszystkich uczestników. **Regulamin i formularz mają to wprost zakazywać**, a nie przyjmować i usuwać później.

Zostaje to, co jest u każdego dostawcy i obejmuje wyłącznie jedną rozmowę: **wydruk strony do PDF** z poziomu przeglądarki uczestnika. Cena: PDF nie niesie struktury, więc ocena formalna na nim nie pojedzie - role i liczbę tur trzeba by odtwarzać heurystycznie albo czytać ręcznie.

Wniosek zmieniający hierarchię: plik od uczestnika **nie jest drogą równoległą do skrapera, tylko zabezpieczeniem na wypadek zniknięcia linku** - czyli dokładnie tym, co obiecuje § 5 ust. 6. Ocena formalna i archiwum opierają się na kopii pobranej przez organizatora; PDF od uczestnika leży obok jako dowód, że rozmowa istniała w zgłoszonym kształcie.

## 7. Wniosek operacyjny

Trzej dostawcy to trzy różne sposoby dobierania się do treści, a każdy z nich może przebudować stronę w dowolnym tygodniu naboru - wtedy zgłoszenia przestają się archiwizować z dnia na dzień. Pięćdziesiąt godzin w budżecie wystarcza na napisanie narzędzia, nie na roczne pilnowanie go, i nie obejmuje wtyczki.

Żadna z dróg nie jest odporna na wszystko. Skrypt jest tani i bezobsługowy, ale zatrzymuje go zabezpieczenie antybotowe i przebudowa strony. Wtyczka obchodzi jedno i drugie, ale kosztuje czas człowieka przy każdym zgłoszeniu i musi poradzić sobie z wirtualizacją. Plik od uczestnika jest niezależny od dostawcy, ale w postaci eksportu całego konta jest niedopuszczalny, a w postaci wydruku do PDF nie nadaje się do oceny formalnej. Dlatego układ docelowy jest wielowarstwowy, a nie jednym narzędziem: skrypt tam, gdzie działa; wtyczka tam, gdzie skrypt nie wchodzi; PDF od uczestnika jako zabezpieczenie na wypadek zniknięcia linku; sprawdzenie ręczne jako jawny wyjątek, nigdy jako ciche przepuszczenie niepełnej kopii.
