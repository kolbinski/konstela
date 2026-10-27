# Skalowanie oceny przy dużym naborze - szkic struktury

Notatka robocza z 21.10.2026. **Nic z tego nie jest jeszcze w regulaminie.** Powstała z pytania „co, jeśli zgłoszeń będzie setki tysięcy" i z błędu, który przy tej okazji wyszedł: dzika karta nie skaluje się z wielkością Akademii.

## Problem w jednym zdaniu

Przy trzystu czytających punkty przestają być porównywalne - jeden daje dobrej rozmowie siedem, drugi dziewięć, i nie wynika to z rozmów, tylko z surowości czytelnika. Zwykłe posortowanie po punktach ustawiłoby w czołówce ludzi, którzy trafili na łagodnego oceniającego. Kalibracja i kotwice z § 8 ust. 12-13 to zmniejszają, ale przy takiej skali nie wystarczą.

Drugi problem: dzika karta przysługuje każdemu członkowi Akademii, więc **rośnie liniowo z jej liczebnością**, podczas gdy jury ma stale 3-5 osób. Trzystu czytających to trzysta kart do pięciu ludzi, ponad zgłoszeniami zakwalifikowanymi punktowo. To samo zalewa archiwum, bo karta kwalifikuje do rundy drugiej, a archiwum to właśnie runda druga - i każda taka rozmowa wymaga jeszcze drugiego odczytu przed publikacją (§ 11 ust. 11 lit. h).

## Proponowana struktura: jeden stopień więcej

Dziś: Akademia -> jury. Proponowane (tylko dla bardzo dużego naboru):

**Stopień 0 - ocena formalna.** Mechaniczna, na `dialog.json`: liczba słów i wypowiedzi, język, ciągłość wątku, okno rozmów, duplikat rozmowy, jedno zgłoszenie na osobę. Narzędzia AI wyłącznie **oznaczają** podejrzenia z § 6 pkt 9-12; każde odrzucenie potwierdza człowiek. Przepustowość praktycznie nieograniczona.

**Stopień 1 - odczyt wstępny.** Każde zgłoszenie czyta jeden członek Akademii, przeciw jednemu pytaniu: czy jest w tej rozmowie moment, w którym człowiek doszedł do czegoś, czego nie wiedział na wejściu, i czy da się go wskazać. Około pięciu minut na rozmowę. **To jedyny stopień rosnący z liczbą zgłoszeń - i rośnie liczbą ludzi, nie czasem.** Zabezpieczenia jak dziś: pasmo pod progiem dostaje drugi odczyt, plus losowy audyt części odrzuconych.

**Stopień 2 - runda zbieżności.** Wszystko, co przeszło odczyt wstępny, czyta **ten sam, stały zespół** (propozycja: 20 osób) pełną kartą oceny, po dwa odczyty na zgłoszenie. Oceny stają się porównywalne, bo wystawiają je te same osoby na tym samym materiale. To jest sedno całego układu.

**Stopień 3 - jury.** Sześćdziesiąt najwyżej ocenionych w rundzie zbieżności. Wybiera dziesiątkę antologii i laureata.

## Skąd te liczby

**jury: 60 rozmów.** Każdy członek musi przeczytać wszystko, co do niej trafi, inaczej nie ma wspólnej podstawy do rozmowy o dziesiątce. Uważna lektura z notatką i punktacją to realnie pół godziny, czyli 30 godzin czytania. Do tego powtórna lektura czołówki (~10 h), obrady i ustalenie kolejności (5-8 h) oraz komentarze do antologii. Razem **45-50 godzin na osobę**. Okno od zamknięcia naboru (15 stycznia 2028) do rozstrzygnięcia (druga połowa marca) to dziewięć tygodni, czyli około pięciu godzin tygodniowo - tyle da się wziąć od człowieka mającego własną pracę.

Sprawdzian od strony pieniędzy: honoraria jury 69 500 zł, przy pięciu osobach to niecałe 14 000 na osobę, czyli ~290 zł/h. Dla osoby o nazwisku mającym uwiarygodnić nagrodę to stawka na granicy przyzwoitości. Przy 120 rozmowach spadłaby do ~140 zł/h i byłaby nieuczciwa. **100 to sufit techniczny, 150 łamie i czas, i stawkę.**

**Zespół zbieżności: 20 osób, 400 zgłoszeń.** 20 osób x 20 godzin = 400 godzin; zgłoszenie kosztuje godzinę (dwa odczyty po pół) -> 400 zgłoszeń. Ta liczba wyznacza próg odczytu wstępnego.

**Przesiew: skaluje się rekrutacją.** 10 000 zgłoszeń x 5 min = 833 godziny = 42 czytających po 20 godzin. 100 000 zgłoszeń = 417 czytających. 1 000 000 = ponad 4 000 osób i ~4 mln zł - to jest granica, za którą uczciwą odpowiedzią jest przesunięcie terminu rozstrzygnięcia, a nie udawanie, że ktokolwiek to przeczytał.

## Archiwum odcięte od jury

**Nieaktualne od 26.10.2026:** archiwum obejmuje dziś wszystkie zgłoszenia po ocenie formalnej, więc nie równa się już rundzie drugiej i nie wymaga rozdzielania opisanego poniżej. Akapit zostaje jako zapis rozumowania. Dawniej: archiwum = runda druga = to, co czyta jury. Przy tej strukturze trzeba to rozdzielić: **do jury idzie 60, do archiwum wchodzi wszystko, co przeszło rundę zbieżności** (~400). Powód: archiwum z sześćdziesięcioma pozycjami nie jest publicznym zbiorem dokumentującym rok rozmów Polaków z AI, tylko długą listą finalistów. Każda rozmowa ze stopnia 2 ma dwa odczyty, więc warunek z § 11 ust. 11 lit. h jest spełniony z definicji.

## Dwie rzeczy do rozstrzygnięcia

**1. Dzika karta.** Krzysiek skłania się ku usunięciu jej całkowicie (21.10.2026). Trzy uwagi:

- W tej strukturze ma naturalne, **ograniczone** miejsce: w zespole zbieżności, czyli najwyżej 20 kart wchodzących w sześćdziesiątkę. Nie zalewa jury.
- Usunięcie ma cenę: karta jest dziś **jedynym mechanizmem przeciw zgodnemu uśrednieniu**, a cała teza Nagrody brzmi, że rzecz wartościowa bywa niepodobna do reszty. Zabezpieczenia z § 8 ust. 10a działają przeciw przeoczeniu, nie przeciw uśrednieniu. Przy usunięciu trzeba podnieść odsetek audytu losowego.
- Karta jest wpleciona w trzy inne miejsca: § 8 ust. 10a lit. e, § 13 ust. 5 (dawne § 11 ust. 11 lit. h nie istnieje od przepisania archiwum 26.10.2026). To nie jest jedno skreślenie.

**2. Sposób ogłoszenia progu.** § 8 ust. 10a lit. a każe ogłaszać próg przed pierwszym ocenianiem, nie po obejrzeniu wyników. „Czterysta najwyżej ocenionych" jest ogłoszeniem **metody**, nie liczby punktowej - przepis to dopuszcza, bo mówi o progu „albo jednoznacznej metodzie jego wyznaczenia". Trzeba dopisać regułę na remis przy granicy: wszystkie zgłoszenia z wynikiem równym ostatniemu zakwalifikowanemu wchodzą, nawet jeśli przekroczy to czterysta.

## Zakres zmiany w regulaminie

To ma być **czwarty tryb w § 8 ust. 10**, a nie przebudowa paragrafu. Przy naborze rzędu stu pięćdziesięciu zgłoszeń - realnym scenariuszu pierwszej edycji - stopnie 1 i 2 zlewają się w jedno i obowiązuje dzisiejszy tryb. Nowy układ włącza się dopiero powyżej progu, który trzeba ustalić (rząd wielkości: kilkaset zgłoszeń).

## Czego ta notatka nie rozstrzyga

- progu włączenia nowego trybu,
- czy zespół zbieżności rekrutuje się z Akademii odczytu wstępnego, czy powoływany jest odrębnie,
- jak zapewnić, by skład zespołu zbieżności był stały przez całą rundę (choroba, rezygnacja),
- czy przy usunięciu dzikiej karty podnieść audyt losowy z 1/10 na więcej, i na ile.

Powiązane: skalowanie Akademii przez Ministerstwo Edukacji, uczelnie i emerytowanych nauczycieli - w [koncepcji](/dokument/koncepcja), sekcja o MEN.
