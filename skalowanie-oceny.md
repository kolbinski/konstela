# Skalowanie oceny przy dużym naborze - szkic struktury

Notatka robocza z 21.10.2026. **Nic z tego nie jest jeszcze w regulaminie.** Powstała z pytania „co, jeśli zgłoszeń będzie setki tysięcy" i z błędu, który przy tej okazji wyszedł: dzika karta nie skaluje się z wielkością akademii.

## Problem w jednym zdaniu

Przy trzystu czytających punkty przestają być porównywalne - jeden daje dobrej rozmowie siedem, drugi dziewięć, i nie wynika to z rozmów, tylko z surowości czytelnika. Zwykłe posortowanie po punktach ustawiłoby w czołówce ludzi, którzy trafili na łagodnego oceniającego. Kalibracja i kotwice z § 8 ust. 12-13 to zmniejszają, ale przy takiej skali nie wystarczą.

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

To ma być **czwarty tryb w § 8 ust. 10**, a nie przebudowa paragrafu. Przy naborze rzędu stu pięćdziesięciu zgłoszeń - realnym scenariuszu pierwszej edycji - stopnie 1 i 2 zlewają się w jedno i obowiązuje dzisiejszy tryb. Nowy układ włącza się dopiero powyżej progu, który trzeba ustalić (rząd wielkości: kilkaset zgłoszeń).

## Czego ta notatka nie rozstrzyga

- progu włączenia nowego trybu,
- czy zespół zbieżności rekrutuje się z akademii odczytu wstępnego, czy powoływany jest odrębnie,
- jak zapewnić, by skład zespołu zbieżności był stały przez całą rundę (choroba, rezygnacja),
- czy przy usunięciu dzikiej karty podnieść audyt losowy z 1/10 na więcej, i na ile.

Powiązane: skalowanie akademii przez Ministerstwo Edukacji, uczelnie i emerytowanych nauczycieli - w [koncepcji](/dokument/koncepcja), sekcja o MEN.

---

# Sito uczestników - konstrukcja rundowa (31.10.2026)

Nowsza propozycja niż szkic powyżej, powstała z pytania, co zrobić, gdy zgłoszeń będzie milion. Szkic z 21.10 dokłada stopnie oceny po naszej stronie i dlatego kończy się tam, gdzie kończą się pieniądze i ludzie. Ta konstrukcja przenosi pierwsze przejście na samych uczestników, więc **zdolność czytania rośnie dokładnie tak szybko jak liczba zgłoszeń**.

## Dlaczego w ogóle

Opłacona Akademia ma przepustowość rzędu **425 zgłoszeń** przy dwóch odczytach i minimalnej stawce - tyle wynika z puli honorariów przy górnym pułapie zobowiązania sponsora. Przy milionie zgłoszeń potrzeba 57 500 czytelników po dwadzieścia zgłoszeń każdy; nie da się ich zrekrutować i skalibrować w rok, choćby były pieniądze. Ściana jest kadrowa, nie finansowa.

## Zasada

**Warunkiem rozpatrzenia zgłoszenia jest przeczytanie i ocenienie trzech cudzych rozmów w rundzie.** Przydział jest losowy i ślepy, według tej samej jawnej karty oceny. Rundy powtarzają się, aż liczba zgłoszeń zejdzie do przepustowości opłaconej Akademii; **w kolejnych rundach czytają ci, których zgłoszenia przeszły rundę poprzednią**.

Konstrukcja bilansuje się sama: w każdej rundzie liczba czytających równa się liczbie zgłoszeń, bo czyta ten, czyje zgłoszenie zostało. Trzy odczyty na uczestnika to zawsze trzy odczyty na zgłoszenie, bez względu na skalę i bez administrowania.

## Przebieg jednej rundy

1. **Przydział.** Każdy uczestnik rundy dostaje trzy zgłoszenia i jedną **kotwicę** - zgłoszenie z punktacją rozpisaną przez nas z góry, nieoznaczone jako kotwica. Przydział jest losowy, ślepy (bez podpisu autora), z wykluczeniem własnego zgłoszenia i zgłoszeń osób powiązanych według oświadczenia.
2. **Ocena.** Ta sama karta co w dalszych etapach: cztery kryteria po 25 punktów, uzasadnienie przy każdym.
3. **Okno.** Czternaście dni, dwa przypomnienia. Prawo odmowy jednego przydziału bez podawania powodu, z przydziałem zastępczym.
4. **Kontrola jakości ocen**, trzema niezależnymi narzędziami:
   - **kotwica** - odchylenie od rozpisanej punktacji powyżej progu oznacza, że oceny tej osoby tracą wagę i trafiają do przeglądu;
   - **normalizacja** - oceny przeliczane na odchylenie od średniej danego oceniającego, co kasuje systematyczne zaniżanie i zawyżanie; zaniżanie wszystkim przestaje cokolwiek dawać, bo obniża własny punkt odniesienia;
   - **sprawdzenie spójności uzasadnienia z rozmową** - modelem, wyłącznie jako sygnał dla człowieka; model nie ocenia rozmowy i niczego nie rozstrzyga.
5. **Skutki kontroli.** Zakwestionowana ocena przepada i nie liczy się do niczego; zgłoszenie, które ją straciło, dostaje odczyt uzupełniający. **Konsekwencja spada na ocenę, nie na zgłoszenie oceniającego** - inaczej powstałoby narzędzie do eliminowania konkurenta przez podrzucenie mu złego przydziału.
6. **Wynik rundy.** Mediana znormalizowanych ocen. Awans: górna część rankingu w proporcji ustalonej przed naborem, powiększona o **dzikie karty** i o **losową próbkę kontrolną z odrzuconych**, czytaną przez opłaconą Akademię. Jeżeli próbka pokaże, że sito wycina zbyt wiele dobrych zgłoszeń, runda jest powtarzana szerzej.

## Rachunek przy milionie zgłoszeń

| Runda | Zgłoszeń | Odczytów | Awans |
|---|---:|---:|---:|
| 1 | 1 000 000 | 3 000 000 | 100 000 |
| 2 | 100 000 | 300 000 | 10 000 |
| 3 | 10 000 | 30 000 | 1 000 |
| 4 | 1 000 | 3 000 | ~400 |

Razem 3,33 mln odczytów, z czego 90% w pierwszej rundzie. Uczestnik, który dochodzi do końca, czyta dwanaście rozmów; uczestnik odpadający w pierwszej rundzie - trzy. **Pracy więcej ma ten, komu idzie lepiej.**

Przy pięciu tysiącach zgłoszeń wystarcza jedna runda, przy pięćdziesięciu - dwie.

## Trzy liczby do regulaminu

- **trzy odczyty na rundę** - minimum pozwalające wziąć medianę i rozpoznać ocenę odstającą;
- **rundy powtarzają się, aż liczba zgłoszeń zejdzie do przepustowości opłaconej Akademii** - reguła, nie stała, więc nie trzeba zmieniać regulaminu, gdy wolumen skoczy;
- **najwyżej dwanaście odczytów na uczestnika w całej edycji** - przy milionie wystarczają cztery rundy.

## Czego ta konstrukcja nie rusza

Oceny z sita **nie przyznają żadnej nagrody**. Decydują wyłącznie o awansie do płatnego etapu, a opłacona Akademia czyta zakwalifikowane zgłoszenia **od nowa, nie widząc wyników sita**. Jury pracuje jak dotąd. Nie ograniczamy liczby przyjmowanych zgłoszeń i nie pomijamy żadnego.

## Co to kosztuje i czego wymaga

- **Zmiany w regulaminie**: warunek rozpatrzenia zgłoszenia, zasady przydziału, kontrola jakości ocen, zwolnienia.
- **Parametr edycji, nie przełącznik w trakcie.** Obowiązku nałożonego na uczestników nie wolno wprowadzać po tym, jak ktoś już się zgłosił, więc sito ogłaszane jest przed otwarciem naboru na podstawie wolumenu poprzedniej edycji. W pierwszej edycji wyłączone.
- **Terminy.** Runda to około trzech tygodni: czternaście dni okna plus przydział, normalizacja i kontrola. Cztery rundy to trzy miesiące, więc przy bardzo dużym naborze wyniki przesuwają się - regulamin już to przewiduje i jest to kolejny powód tego samego przesunięcia.
- **Panel.** Przydziały, zbieranie ocen, normalizacja i kontrola przy milionach odczytów to praca oprogramowania, tania w przeliczeniu na zgłoszenie, ale niezerowa.
- **Weryfikacja formalna musi być automatyczna.** Sześć minut na zgłoszenie daje przy milionie sto tysięcy godzin; człowiek wchodzi wyłącznie do wyjątków.
- **Sprawdzenie spójności modelem skaluje się liniowo**: trzy miliony sprawdzeń po dwa grosze to 60 000 zł, więc potrzebny jest limit i działanie na próbce plus na sygnałach.
- **Pytanie do kancelarii**: przesłanie cudzej rozmowy do modelu dostawcy to powierzenie przetwarzania i wymaga podstawy w licencji uczestnika.

## Zostaje do rozstrzygnięcia

Proporcja awansu w rundzie (dziesiąta część to propozycja, nie wyliczenie), próg odchylenia od kotwicy, wielkość losowej próbki kontrolnej i próg błędu, przy którym rundę trzeba powtórzyć szerzej. Wszystkie cztery są parametrami jakości sita i żadnego nie wyliczymy bez próby oceniania.
