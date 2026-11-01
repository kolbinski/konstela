# Skalowanie oceny przy dużym naborze - szkic struktury

Dokument roboczy, zaczęty 21.10.2026 i rozbudowany 31.10.2026. **Część druga - rundy uczestników - weszła 31.10.2026 do regulaminu plebiscytu rozmowy jako mechanizm włączany ogłoszeniem przed otwarciem naboru; w pierwszej edycji pozostaje wyłączona. Część pierwsza, poniżej, jest nadal szkicem.** Powstała z pytania „co, jeśli zgłoszeń będzie setki tysięcy" i z błędu, który przy tej okazji wyszedł: dzika karta nie skaluje się z wielkością akademii.

## Problem w jednym zdaniu

Przy trzystu czytających punkty przestają być porównywalne - jeden daje dobrej rozmowie siedem, drugi dziewięć, i nie wynika to z rozmów, tylko z surowości czytelnika. Zwykłe posortowanie po punktach ustawiłoby w czołówce ludzi, którzy trafili na łagodnego oceniającego. Kalibracja i rozmowy kalibracyjne z § 8 ust. 12-13 to zmniejszają, ale przy takiej skali nie wystarczą.

Drugi problem: dzika karta przysługuje każdemu członkowi akademii, więc **rośnie liniowo z jej liczebnością**, podczas gdy jury ma stale 3-5 osób. Trzystu czytających to trzysta kart do pięciu ludzi, ponad zgłoszeniami zakwalifikowanymi punktowo. To samo zalewa Archiwum, bo karta kwalifikuje do rundy drugiej, a Archiwum to właśnie runda druga - i każda taka rozmowa wymaga jeszcze drugiego odczytu przed publikacją (§ 11 ust. 11 lit. h).

## Proponowana struktura: jeden stopień więcej

Dziś: Akademia -> jury. Proponowane (tylko dla bardzo dużego naboru):

**Stopień 0 - weryfikacja formalna.** Mechaniczna, na `dialog.json`: liczba słów i wypowiedzi, język, ciągłość wątku, okno rozmów, duplikat rozmowy, jedno zgłoszenie na osobę. Narzędzia AI wyłącznie **oznaczają** podejrzenia z § 6 pkt 9-12; każde odrzucenie potwierdza człowiek. Przepustowość praktycznie nieograniczona.

**Stopień 1 - odczyt wstępny.** Każde zgłoszenie czyta jeden członek akademii, przeciw jednemu pytaniu: czy jest w tej rozmowie moment, w którym człowiek doszedł do czegoś, czego nie wiedział na wejściu, i czy da się go wskazać. Około pięciu minut na rozmowę. **To jedyny stopień rosnący z liczbą zgłoszeń - i rośnie liczbą ludzi, nie czasem.** Zabezpieczenia jak dziś: pasmo pod progiem dostaje drugi odczyt, plus losowy audyt części odrzuconych.

**Stopień 2 - runda zbieżności.** Wszystko, co przeszło odczyt wstępny, czyta **ten sam, stały zespół** (propozycja: 20 osób) pełną kartą oceny, po dwa odczyty na zgłoszenie. Oceny stają się porównywalne, bo wystawiają je te same osoby na tym samym materiale. To jest sedno całego układu.

**Stopień 3 - jury.** Sześćdziesiąt najwyżej ocenionych w rundzie zbieżności. Wybiera dziesiątkę antologii i laureata.

## Skąd te liczby

**jury: 60 rozmów.** Każdy członek musi przeczytać wszystko, co do niej trafi, inaczej nie ma wspólnej podstawy do rozmowy o dziesiątce. Uważna lektura z notatką i punktacją to realnie pół godziny, czyli 30 godzin czytania. Do tego powtórna lektura czołówki (~10 h), obrady i ustalenie kolejności (5-8 h) oraz komentarze do antologii. Razem **45-50 godzin na osobę**. Okno od zamknięcia naboru (15 stycznia 2028) do rozstrzygnięcia (druga połowa marca) to dziewięć tygodni, czyli około pięciu godzin tygodniowo - tyle da się wziąć od człowieka mającego własną pracę.

Sprawdzian od strony pieniędzy: honoraria jury 69 500 zł, przy pięciu osobach to niecałe 14 000 na osobę, czyli ~290 zł/h. Dla osoby o nazwisku mającym uwiarygodnić nagrodę to stawka na granicy przyzwoitości. Przy 120 rozmowach spadłaby do ~140 zł/h i byłaby nieuczciwa. **100 to sufit techniczny, 150 łamie i czas, i stawkę.**

**Zespół zbieżności: 20 osób, 400 zgłoszeń.** 20 osób x 20 godzin = 400 godzin; zgłoszenie kosztuje godzinę (dwa odczyty po pół) -> 400 zgłoszeń. Ta liczba wyznacza próg odczytu wstępnego.

**Przesiew: skaluje się rekrutacją.** 10 000 zgłoszeń x 5 min = 833 godziny = 42 czytających po 20 godzin. 100 000 zgłoszeń = 417 czytających. 1 000 000 = ponad 4 000 osób i ~4 mln zł - to jest granica, za którą uczciwą odpowiedzią jest przesunięcie terminu rozstrzygnięcia, a nie udawanie, że ktokolwiek to przeczytał.

## Archiwum odcięte od jury

**Nieaktualne od 26.10.2026:** Archiwum obejmuje dziś wszystkie zgłoszenia po weryfikacji formalnej, więc nie równa się już rundzie drugiej i nie wymaga rozdzielania opisanego poniżej. Akapit zostaje jako zapis rozumowania. Dawniej: Archiwum = runda druga = to, co czyta jury. Przy tej strukturze trzeba to rozdzielić: **do jury idzie 60, do Archiwum wchodzi wszystko, co przeszło rundę zbieżności** (~400). Powód: Archiwum z sześćdziesięcioma pozycjami nie jest publicznym zbiorem dokumentującym rok rozmów Polaków z AI, tylko długą listą finalistów. Każda rozmowa ze stopnia 2 ma dwa odczyty, więc warunek z § 11 ust. 11 lit. h jest spełniony z definicji.

## Dwie rzeczy do rozstrzygnięcia

**1. Dzika karta.** Krzysiek skłania się ku usunięciu jej całkowicie (21.10.2026). Trzy uwagi:

- W tej strukturze ma naturalne, **ograniczone** miejsce: w zespole zbieżności, czyli najwyżej 20 kart wchodzących w sześćdziesiątkę. Nie zalewa jury.
- Usunięcie ma cenę: karta jest dziś **jedynym mechanizmem przeciw zgodnemu uśrednieniu**, a cała teza Nagrody brzmi, że rzecz wartościowa bywa niepodobna do reszty. Zabezpieczenia z § 8 ust. 10a działają przeciw przeoczeniu, nie przeciw uśrednieniu. Przy usunięciu trzeba podnieść odsetek audytu losowego.
- Karta jest wpleciona w trzy inne miejsca: § 8 ust. 10a lit. e, § 13 ust. 5 (dawne § 11 ust. 11 lit. h nie istnieje od przepisania Archiwum 26.10.2026). To nie jest jedno skreślenie.

**2. Sposób ogłoszenia progu.** § 8 ust. 10a lit. a każe ogłaszać próg przed pierwszym ocenianiem, nie po obejrzeniu wyników. „Czterysta najwyżej ocenionych" jest ogłoszeniem **metody**, nie liczby punktowej - przepis to dopuszcza, bo mówi o progu „albo jednoznacznej metodzie jego wyznaczenia". Trzeba dopisać regułę na remis przy granicy: wszystkie zgłoszenia z wynikiem równym ostatniemu zakwalifikowanemu wchodzą, nawet jeśli przekroczy to czterysta.

## Zakres zmiany w regulaminie

To ma być **czwarty tryb w § 8 ust. 10**, a nie przebudowa paragrafu. Dopóki nabór mieści się w przepustowości objętej kosztorysem, stopnie 1 i 2 zlewają się w jedno i obowiązuje dzisiejszy tryb. Nowy układ włącza się dopiero powyżej progu, który trzeba ustalić (rząd wielkości: kilkaset zgłoszeń).

## Czego ta notatka nie rozstrzyga

- progu włączenia nowego trybu,
- czy zespół zbieżności rekrutuje się z akademii odczytu wstępnego, czy powoływany jest odrębnie,
- jak zapewnić, by skład zespołu zbieżności był stały przez całą rundę (choroba, rezygnacja),
- czy przy usunięciu dzikiej karty podnieść audyt losowy z 1/10 na więcej, i na ile.

Powiązane: skalowanie akademii przez Ministerstwo Edukacji, uczelnie i emerytowanych nauczycieli - w [koncepcji](/dokument/koncepcja), sekcja o MEN.

---

# Runda uczestników - konstrukcja rundowa (31.10.2026)

Nowsza propozycja niż szkic powyżej, powstała z pytania, co zrobić, gdy zgłoszeń będzie milion. Szkic z 21.10 dokłada stopnie oceny po naszej stronie i dlatego kończy się tam, gdzie kończą się pieniądze i ludzie. Ta konstrukcja przenosi pierwsze przejście na samych uczestników, więc **zdolność czytania rośnie dokładnie tak szybko jak liczba zgłoszeń**.

## Dlaczego w ogóle

Opłacona Akademia ma przepustowość rzędu **425 zgłoszeń** przy dwóch odczytach i minimalnej stawce - tyle wynika z puli honorariów przy górnym pułapie zobowiązania sponsora. Przy milionie zgłoszeń potrzeba 57 500 czytelników po dwadzieścia zgłoszeń każdy; nie da się ich zrekrutować i skalibrować w rok, choćby były pieniądze. Ściana jest kadrowa, nie finansowa.

## Zasada

**Warunkiem rozpatrzenia zgłoszenia jest przeczytanie i ocenienie do czterech cudzych rozmów w rundzie - albo tylu, ile obejmuje budżet słów przydziału - obok dwóch zgłoszeń wzorcowych, które stoją poza tym budżetem.** Przydział jest losowy i ślepy, według tej samej jawnej karty oceny. Rundy powtarzają się, aż liczba zgłoszeń zejdzie do przepustowości opłaconej Akademii; **w kolejnych rundach czytają ci, których zgłoszenia przeszły rundę poprzednią**.

Konstrukcja bilansuje się sama: w każdej rundzie liczba czytających równa się liczbie zgłoszeń, bo czyta ten, czyje zgłoszenie zostało. Cztery oceniane zgłoszenia na uczestnika to w przybliżeniu cztery oceny na zgłoszenie, bez względu na skalę i bez administrowania.

## Dlaczego cztery oceny, a nie dwie

**Przy trzech odczytach zgłoszenie dostaje dwie oceny, nie trzy.** Część przydziału to zgłoszenia wzorcowe, które służą sprawdzeniu oceniającego, a nie ocenieniu tych rozmów. Mediana z dwóch liczb to ich średnia - nie ma czego odrzucić, więc jedna ocena odstająca przesuwa wynik o połowę swojego błędu. Przy przydziale sześciu rozmów, z których dwie są wzorcowe, zostają cztery oceny i mediana zaczyna działać jak mediana.

Ma to następstwo ważniejsze niż sama precyzja: **im więcej ocen na zgłoszenie, tym ostrzej wolno ciąć pole w jednej rundzie.** Przy dwóch ocenach proporcja awansu rzędu dziesiątej części jest trudna do obrony, bo pojedynczy nietrafiony odczyt decyduje o odpadnięciu; przy czterech ocenach jest obronna. Łagodniejsze cięcie oznacza więcej rund, a więcej rund to więcej odczytów dla tych, którzy dochodzą najdalej - więc mniejszy przydział nie jest tańszy dla uczestnika, tylko gorszy dla oceny.

## Dlaczego przydział liczony w słowach

Regulamin dopuszcza rozmowy od progu z § 5 do dwudziestu pięciu tysięcy słów. Przy lekturze uważnej, czyli około 170 słów na minutę, plus kwadrans na wypełnienie karty z uzasadnieniem przy każdym kryterium, jedna ocena zajmuje:

| Długość rozmowy | Jedna ocena | 3 odczyty | 5 odczytów |
|---|---|---|---|
| progowa, ~3 000 słów | 30 min | 1 h 30 | 2 h 30 |
| typowa, ~6 000 słów | 47 min | 2 h 20 | 3 h 55 |
| maksymalna, 25 000 słów | 2 h 40 | **8 h** | **13 h 20** |

Przedział jest dziewięciokrotny. Przy przydziale liczonym w sztukach ten sam obowiązek regulaminowy oznacza dla jednego uczestnika półtorej godziny, a dla drugiego osiem - i to jest zarzut nierównego traktowania, nie drobiazg redakcyjny.

Dlatego **przydział obejmuje sześć rozmów albo ustalony budżet słów, co wyczerpie się pierwsze**, a do budżetu wlicza się całą objętość przydziału, w tym zgłoszenia wzorcowe. Przy budżecie rzędu trzydziestu tysięcy słów uczestnik z typowym losowaniem przeczyta ich pięć albo sześć w niespełna cztery godziny, a uczestnik, któremu trafią się dwie maksymalne, czyta dwie i kończy po trzech godzinach dwudziestu. **Sufit spada z ośmiu godzin do około czterech** - czyli przydział z budżetem słów jest w najgorszym przypadku dwa razy tańszy dla uczestnika niż trzy odczyty liczone w sztukach, przy dwukrotnie większej liczbie ocen na zgłoszenie.

Cena tej konstrukcji: **liczba ocen na zgłoszenie przestaje być równa.** Długie rozmowy zbierają mniej oceniających niż krótkie. Domyka to gwarancja **minimum trzech ocen uczestników na każde zgłoszenie**: brakujące odczyty dobierają się w kolejnych przydziałach, a gdyby i to nie wystarczyło - wykonuje je Akademia. Mediana radzi sobie ze zmienną liczbą ocen, normalizacja również; żadne zgłoszenie nie może odpaść z powodu niedobrania oceniających.

## Przebieg jednej rundy

1. **Przydział.** Każdy uczestnik rundy dostaje do sześciu zgłoszeń, w tym **dwa zgłoszenia wzorcowe** - z punktacją rozpisaną przez nas z góry, nieoznaczone jako wzorcowe - czyli do czterech zgłoszeń podlegających jego ocenie, przy czym przydział zamyka się na ostatniej rozmowie mieszczącej się w budżecie słów. Przydział jest losowy, ślepy (bez podpisu autora), z wykluczeniem własnego zgłoszenia i zgłoszeń osób powiązanych według oświadczenia.
2. **Ocena.** Ta sama karta co w dalszych etapach: cztery kryteria po 25 punktów, uzasadnienie przy każdym.
3. **Okno.** Czternaście dni, dwa przypomnienia. Prawo odmowy jednego przydziału bez podawania powodu, z przydziałem zastępczym.
4. **Kontrola jakości ocen**, trzema niezależnymi narzędziami:
   - **dwa zgłoszenia wzorcowe** - odchylenie od rozpisanej punktacji powyżej progu oznacza, że oceny tej osoby tracą wagę i trafiają do przeglądu; dwa, bo przy jednym przypadkowa punktacja ma szansę przejść;
   - **normalizacja** - oceny przeliczane na odchylenie od punktacji ustalonej dla zgłoszeń wzorcowych, co kasuje systematyczne zaniżanie i zawyżanie; przy jednakowej punktacji całego przydziału oceny są pomijane, bo nie ma czym dzielić. Normalizacja względem własnej średniej oceniającego, z czterech liczb, byłaby pozorem precyzji - dlatego punktem odniesienia są zgłoszenia wzorcowe;
   - **zgodność z pozostałymi ocenami tego samego zgłoszenia** - każde zgłoszenie zbiera co najmniej trzy oceny, więc ocena odstająca od pozostałych trafia do przeglądu, a oceniający odstający systematycznie traci wagę ocen. To narzędzie **nie wymaga modelu** i działa także wtedy, gdy ktoś rozpozna zgłoszenia wzorcowe.

   Sprawdzanie spójności uzasadnienia z rozmową **modelem** - pierwotnie trzecie narzędzie - zostało z regulaminu wyjęte 1.11.2026. Powód: § 8 ust. 8 obiecuje, że narzędzia oparte na modelach językowych służą wyłącznie weryfikacji warunków formalnych i że zgłoszenia nie są przekazywane dostawcom modeli. Żeby model mógł sprawdzać spójność, trzeba otworzyć ten ustęp wyjątkiem, a wcześniej dostać od kancelarii odpowiedź, czy licencja Uczestnika to obejmuje i jakie powierzenie przetwarzania jest konieczne. Narzędzie wraca, gdy ta odpowiedź będzie - jako czwarte, nie jako podstawa.
5. **Skutki kontroli.** Zakwestionowana ocena przepada i nie liczy się do niczego; zgłoszenie, które ją straciło, dostaje odczyt uzupełniający. **Konsekwencja spada na ocenę, nie na zgłoszenie oceniającego** - inaczej powstałoby narzędzie do eliminowania konkurenta przez podrzucenie mu złego przydziału.

   Od tego jest jeden wyjątek i bez niego cała konstrukcja byłaby do obejścia w dwie minuty: **ocena pozorna, czyli taka, przy której widać, że rozmowy nie przeczytano, oznacza odczyt niewykonany**, a nie tylko ocenę odrzuconą. Inaczej najtańszym sposobem spełnienia warunku rozpatrzenia zgłoszenia byłoby wypełnienie kart zerami albo losowymi liczbami: obowiązek formalnie wykonany, oceny odrzucone, zgłoszenie idzie dalej. Przesłanki muszą być zamknięte i mierzalne - jednakowa punktacja we wszystkich kryteriach przy rozbieżności ze wzorcem, karta niekompletna, rozbieżność z obydwoma wzorcami - bo ocenianie intencji nie jest rzeczą, którą regulamin może robić. Skutkiem jest przydział zastępczy, a dopiero przy powtórzeniu wyłączenie z dalszych rund.
6. **Wynik rundy.** Mediana znormalizowanych ocen. Awans: górna część rankingu w proporcji ustalonej przed naborem, powiększona o **dzikie karty** i o **losową próbkę kontrolną z odrzuconych**, czytaną przez opłaconą Akademię. Jeżeli próbka pokaże, że runda wycina zbyt wiele dobrych zgłoszeń, jest powtarzana szerzej.

## Rachunek przy milionie zgłoszeń

| Runda | Zgłoszeń | Odczytów | Ocen zgłoszeń | Awans |
|---|---:|---:|---:|---:|
| 1 | 1 000 000 | 6 000 000 | 4 000 000 | 100 000 |
| 2 | 100 000 | 600 000 | 400 000 | 10 000 |
| 3 | 10 000 | 60 000 | 40 000 | 1 000 |
| 4 | 1 000 | 6 000 | 4 000 | ~400 |

Razem 6,67 mln odczytów, z czego 4,44 mln to oceny zgłoszeń, a reszta zgłoszenia wzorcowe; 90% przypada na pierwszą rundę. Uczestnik, który dochodzi do końca, ocenia szesnaście cudzych rozmów i czyta do ośmiu wzorcowych; uczestnik odpadający w pierwszej rundzie - cztery i dwie, a przy długich rozmowach mniej. **Pracy więcej ma ten, komu idzie lepiej.**

Przy pięciu tysiącach zgłoszeń wystarcza jedna runda, przy pięćdziesięciu - dwie.

## Trzy liczby do regulaminu

- **do sześciu odczytów na rundę, z czego dwa wzorcowe, ograniczonych budżetem słów** - cztery oceniane zgłoszenia dają cztery oceny na zgłoszenie, czyli medianę, z której da się odrzucić ocenę odstającą, dwa wzorce domykają kontrolę jakości, a budżet słów wyrównuje obciążenie i obniża jego sufit;
- **rundy powtarzają się, aż liczba zgłoszeń zejdzie do przepustowości opłaconej Akademii** - reguła, nie stała, więc nie trzeba zmieniać regulaminu, gdy wolumen skoczy;
- **najwyżej szesnaście ocenianych zgłoszeń i czterokrotność budżetu słów na uczestnika w całej edycji** - przy milionie wystarczają cztery rundy, a po przekroczeniu granicy odczyty przejmuje Akademia.

## Czego ta konstrukcja nie rusza

Oceny z rund uczestników **nie przyznają żadnej nagrody**. Decydują wyłącznie o awansie do płatnego etapu, a opłacona Akademia czyta zakwalifikowane zgłoszenia **od nowa, nie widząc ich wyników**. Jury pracuje jak dotąd. Nie ograniczamy liczby przyjmowanych zgłoszeń i nie pomijamy żadnego.

## Co to kosztuje i czego wymaga

- **Zmiany w regulaminie**: warunek rozpatrzenia zgłoszenia, zasady przydziału, kontrola jakości ocen, zwolnienia.
- **Parametr edycji, nie przełącznik w trakcie.** Obowiązku nałożonego na uczestników nie wolno wprowadzać po tym, jak ktoś już się zgłosił, więc rundy uczestników ogłaszane są przed otwarciem naboru na podstawie wolumenu poprzedniej edycji. W pierwszej edycji wyłączone.
- **Terminy.** Runda to około trzech tygodni: czternaście dni okna plus przydział, normalizacja i kontrola. Cztery rundy to trzy miesiące, więc przy bardzo dużym naborze wyniki przesuwają się - regulamin już to przewiduje i jest to kolejny powód tego samego przesunięcia.
- **Panel.** Przydziały, zbieranie ocen, normalizacja i kontrola przy milionach odczytów to praca oprogramowania, tania w przeliczeniu na zgłoszenie, ale niezerowa.
- **Weryfikacja formalna musi być automatyczna.** Sześć minut na zgłoszenie daje przy milionie sto tysięcy godzin; człowiek wchodzi wyłącznie do wyjątków.
- **Sprawdzenie spójności modelem skaluje się liniowo**: cztery i pół miliona sprawdzeń po dwa grosze to blisko 90 000 zł, więc potrzebny jest limit i działanie na próbce plus na sygnałach.
- **Pytanie do kancelarii**: przesłanie cudzej rozmowy do modelu dostawcy to powierzenie przetwarzania i wymaga podstawy w licencji uczestnika.

## Co znalazł audyt z 1.11.2026

Po wpisaniu rundy uczestników do regulaminu przeszedłem ją pod kątem oszustw, a niezależnie przeczytał ją ktoś, kto jej nie pisał. Razem **szesnaście pozycji**, z czego trzy były sprzecznościami z innymi przepisami tego samego regulaminu, a jedna groziła nierozstrzygnięciem edycji. Wszystkie zostały zamknięte w brzmieniu z 1.11.2026 - zapis poniżej jest po to, żeby przy kolejnych zmianach nie odtworzyć ich z powrotem.

**Sprzeczności.** Automatyczne sprawdzanie spójności łamało § 8 ust. 8 (patrz wyżej). Warunek zakończenia rund „aż pole zejdzie do przepustowości akademii" łamał § 8 ust. 10, bo przepustowość zależy od decyzji Organizatora, a ustęp 10 zabrania wiązać tryb oceny z taką decyzją - dziś ogłaszana jest **liczba zgłoszeń kończąca rundy**. Odesłanie do „§ 8 ust. 5a" wskazywało przepis, którego w § 8 nie ma; zastąpił je **obowiązek odstąpienia od oceny po rozpoznaniu autora**, wzorowany na ust. 6 i jedyny wykonalny przy przydziale ślepym.

**Terminy.** Rundy ruszają po zamknięciu naboru i zajmują około trzech miesięcy, a § 1b ust. 2a wylicza podstawy przesunięcia zamknięcie - rund tam nie było, więc ich włączenie prowadziło wprost do nierozstrzygnięcia edycji. Dziś: ogłoszenie rund podaje **terminy edycji uwzględniające czas ich przeprowadzenia**, dzień zamrożenia punktacji liczy się od zakończenia ostatniej rundy, jedna runda więcej mieści się w wąskim przesunięciu z § 4, a większa potrzeba uruchamia ust. 10b.

**Arytmetyka.** Dwa wzorce po 25 tysięcy słów wyczerpywały budżet 30 tysięcy same, więc uczestnik wykonywał obowiązek, nie oceniwszy ani jednego cudzego zgłoszenia - a nadal podlegał przesłance odchylenia od obu wzorców. Dziś wzorce stoją **poza budżetem słów** i dobierane są wyłącznie z krótszych zgłoszeń. Gwarancja minimum trzech ocen przy milionie zgłoszeń i pięcioprocentowym niedoborze oznaczała 50 tysięcy odczytów do wykonania przez akademię o przepustowości 425; dziś brakujące oceny dobierają się **w kolejnych przydziałach uczestników**, a gdyby to nie wystarczyło, wchodzi próg wykonania rundy.

**Czego w ogóle nie było.** Poufności po stronie oceniającego. Oznaczania zastrzeżeń prawnych i prawa sygnału o inscenizacji - oba przysługiwały tylko członkom akademii i jury, więc przy rundach uczestników organizator tracił jedyne źródło wiedzy o zastrzeżeniach w zgłoszeniach, których akademia nie przeczyta, choć wszystkie wchodzą do Czytelni. Reguły remisowej na granicy awansu. Trybu odwoławczego. Przepisów o wycofaniu, odrzuceniu i wykluczeniu zgłoszenia w trakcie rundy. Zgody przedstawiciela ustawowego dla uczestników od 16 do 18 lat - katalog w § 3 ust. 1a był zamknięty i czytania cudzych rozmów nie obejmował.

**Progu wykonania rundy**, bez którego pole zawężałoby się przez niewykonanie obowiązku, a nie przez wartość zgłoszeń. To była najpoważniejsza pozycja merytoryczna: finalistami zostaliby sumienni, nie najlepsi, a próbka kontrolna tego nie wyłapie, bo takie odrzucenia są formalnie prawidłowe.

**I rzecz, którą trzeba było odwołać, a nie naprawić.** Strona plebiscytu obiecywała, że „zaniżanie cudzych ocen nie podnosi Twojej pozycji". Normalizacja znosi zaniżanie **systematyczne**, więc strategią dominującą zostawało: ocenić trafnie wzorce i zaniżyć cudze rozmowy z porządnym uzasadnieniem. Nie uruchamiało to żadnej kontroli. Zgodność z pozostałymi ocenami tego samego zgłoszenia to łapie - ale obietnicy ze strony i tak nie da się utrzymać w tej postaci i została zdjęta.

## Druga weryfikacja: osiem luk powstałych przy naprawianiu pierwszych (1.11.2026)

Przepisany ustęp przeszedł drugie niezależne czytanie, sprawdzające, czy każda z piętnastu luk jest zamknięta w tekście, a nie tylko wspomniana. Jedenaście było zamkniętych, cztery częściowo - i doszło osiem nowych. Jedna wywracała mechanizm: **zgłoszenia wzorcowe miały być zgłoszeniami ocenionymi wcześniej przez akademię, a akademia w tej edycji ocenia dopiero to, co przeszło rundy.** W pierwszej rundzie nie ma więc czego użyć jako wzorca, a bez wzorców upadają dwa z trzech narzędzi kontroli, cała normalizacja i dwie z trzech przesłanek oceny pozornej. Dziś wzorcem jest rozmowa spoza edycji oceniona przez akademię przed naborem albo zgłoszenie ocenione w czasie naboru właśnie w tym celu; zbiór liczy co najmniej dwadzieścia rozmów i jest odświeżany w każdej rundzie.

Pozostałe siedem: odesłanie do ogłoszenia wskazywało § 9 ust. 5, czyli przepis o kategoriach, a nie § 10 ust. 5; § 4 nie miał ani jednego dnia na przeprowadzenie rund i zakładał ocenę akademii w czasie naboru, co w tej edycji jest nieprawdą także dla kalibracji śródnaborowej; rundy mogły zawęzić pole do dwudziestu zgłoszeń, czyli do progu, przy którym akademii się nie powołuje, choć to ona czyta próbkę kontrolną i odczyty uzupełniające; mediana nie przyjmuje wag, więc „utrata wagi oceny" nie dawała się wykonać - dziś ocena jest **pomijana**, z odczytem uzupełniającym; uczestnik miał oznaczać zastrzeżenia w panelu, do którego regulamin dawał dostęp tylko jury i akademii, a gwarancja nieujawniania danych autora też jego nie obejmowała; przepis o ubyciu zgłoszenia odsyłał do wycofania możliwego wyłącznie do zamknięcia naboru, czyli przed rundami; a karta do głosowania publiczności dla zgłoszenia o ograniczonej prezentacji wymagała podpisu, który Czytelnia w tej edycji zataja - dziś zastępuje go numer zgłoszenia.

Z czterech pozycji zamkniętych częściowo: odmowa skierowana na zgłoszenie wzorcowe dobiera inne wzorcowe, obowiązek odstąpienia objął pełny standard bezstronności z ust. 6, a próg wykonania rundy uruchamia się także wtedy, gdy minimum trzech ocen jest **arytmetycznie nieosiągalne**, a nie tylko gdy odsetek wykonanych odczytów jest niski. Poprawiona też sankcja za naruszenie poufności: odsyłała do listy osób wyłączonych z udziału, a nie do trybu, więc dziś odrzucenie następuje w trybie z ust. 18, z uzasadnieniem, siedmiodniowym terminem na odpowiedź i decyzją wspólną z członkiem jury.

**Wniosek na przyszłość, ważniejszy od samej listy:** przy mechanizmie wplecionym w kilkanaście przepisów naprawianie luk tworzy nowe luki w tempie zbliżonym do ich zamykania. Dopóki kolejne czytanie znajduje pozycje tej wagi, ustęp nie jest gotowy, a liczba tur, nie długość tekstu, jest miarą tego, jak blisko jesteśmy końca.

## Dzika karta w rundach uczestników nie przysługuje

Przysługuje członkowi akademii, a akademia w tych rundach czyta wyłącznie próbkę kontrolną i odczyty uzupełniające - nie ma kto jej użyć. Ochronę zgłoszeń nietypowych pełni w tych rundach sama próbka kontrolna. Zapisane w lit. h, żeby nie trzeba było tego wnioskować.

## Zostaje do rozstrzygnięcia

Dziewięć parametrów, wszystkie ogłaszane przed naborem i żadnego nie wyliczymy bez próby oceniania:

- **budżet słów przydziału** - nie niższy niż górna granica objętości rozmowy; trzydzieści tysięcy to propozycja wyliczona z typowej długości zgłoszenia, a typowej długości jeszcze nie znamy;
- **pasmo objętości** przydziału zastępczego przy odmowie;
- **granica objętości** zgłoszeń dobieranych jako wzorcowe oraz **limit powtórzeń** jednego wzorca;
- **proporcja awansu w rundzie** - dziesiąta część to propozycja, nie wyliczenie;
- **liczba zgłoszeń kończąca rundy**;
- **próg zgodności ze zgłoszeniami wzorcowymi**;
- **próg odstawania od pozostałych ocen** tego samego zgłoszenia;
- **wielkość próbki kontrolnej i próg błędnych odrzuceń**;
- **próg wykonania rundy**, poniżej którego runda nie zawęża pola.

Wpisanie teraz dowolnej z tych liczb byłoby tym samym błędem co liczba zgłoszeń wzięta z iloczynu w kosztorysie.
