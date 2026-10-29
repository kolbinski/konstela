# Konstela - materiał warsztatowy dla Reequest

> **Snapshot obecnego stanu wiedzy o projekcie, nie Archiwum.** Plik jest podstawą warsztatów z agencją i ma być aktualizowany przy każdej decyzji dotyczącej Nagrody, plebiscytu, strony albo komunikacji. Rzeczy nieaktualne są z niego usuwane, a nie oznaczane jako historyczne - od tego są pozostałe pliki projektu.
>
> Stan na 24.10.2026.

## 1. Marka: współistnienie, nie rozmowy z AI

**Punkt wyjścia do brandingu i tone of voice.**

Konstela nie jest nagrodą za rozmowy z komputerem. Jest o **życiu z AI - o współistnieniu ludzi i sztucznej inteligencji w epoce, która już się zaczęła**. Rozmowa jest pierwszym miejscem, w którym to współistnienie widać i daje się ocenić, i dlatego stoi w centrum. Nie jest miejscem jedynym.

Nazwa bierze się stąd, że gwiazdy same z siebie nie układają się w żaden kształt - konstelacja powstaje dopiero wtedy, gdy ktoś poprowadzi między nimi linię, której wcześniej nie było. To samo robi dobra rozmowa: pojedyncze fakty ma każdy, wartość powstaje z połączeń.

**Z ramy współistnienia wynika hierarchia dwóch plebiscytów:** plebiscyt na piosenkę nie jest akcją towarzyszącą ani oprawą artystyczną gali, tylko **drugim plebiscytem o tej samej randze**. Plebiscyt, w którym AI nie wolno skomponować ani zaśpiewać, mierzy ludzką część dokładnie tak, jak karta oceny mierzy pytania człowieka, a nie odpowiedzi programu. Rynek muzyczny jest przy tym zmieniany przez narzędzia generatywne szybciej i boleśniej niż sposób, w jaki ludzie zadają pytania.

**Dla warsztatów:** słowa „akcja towarzysząca", „dodatek", „część artystyczna" wypadają z języka projektu.

## 2. Dwa plebiscyty

**Nagroda Konstela.** Uczestnik zgłasza link do rzeczywistej rozmowy, którą odbył ze sztuczną inteligencją. Ocenia najpierw kilkunastoosobowa akademia czytająca, potem kilkuosobowe jury, według **jawnej karty oceny** opublikowanej przed naborem: cztery kryteria o równej wadze, w tym wyłapywanie zmyśleń oraz to, co człowiek z rozmowy wyniósł. Nagradzany jest człowiek, nie program. Udział bezpłatny, jedno zgłoszenie na osobę potwierdzane kodem SMS.

**Plebiscyt na piosenkę.** Otwarty plebiscyt na własny utwór o sztucznej inteligencji: własny tekst, własna muzyka, własne wykonanie; zespoły i duety dopuszczone, ze wskazaniem reprezentanta składu. Adresat: każdy, niezależnie od dorobku. **Zgłasza się czytelne demo**, nie gotowy singiel, żeby koszt studia nie decydował o tym, kto weźmie udział; zgłoszeniem jest link do YouTube. Jedno zgłoszenie na osobę.

Zwycięzcę wybiera **jury**, nie głosowanie. **Karta oceny jest jawna od początku**: ujęcie tematu 25, tekst 30, muzyka 25, wykonanie 20 punktów, z wyraźnym zastrzeżeniem, że nie oceniamy jakości produkcji, zasięgów ani wcześniejszego dorobku.

**Reguła wobec AI (brzmienie z 24.10.2026, godz. 18).** Melodia, harmonia i wokal muszą być własne - nie wolno zgłosić melodii przejętej z wygenerowanego nagrania, wolno natomiast szukać w generatorze klimatu i pomysłów przed napisaniem własnej. Tekst wolno napisać z AI, z opisem przy zgłoszeniu, jak powstał; o proporcje nie pytamy. Narzędzia na etapie produkcji i obróbki wolno stosować z deklaracją. **To jest treść komunikacyjna, nie tylko zapis regulaminowy:** plebiscyt nie żąda abstynencji od AI, tylko jawności co do tego, gdzie jej użyto - i hymn Nagrody deklaruje to samo co zgłaszający. Hasłem, które z tego wynika, warto zająć się na warsztatach.

## 3. Co z tego powstaje

- **Antologia** - dziesięć najwyżej ocenionych rozmów każdej edycji, bezpłatnie, w całości, z komentarzem jury.
- **Publiczne Archiwum** wszystkich zgłoszeń: czytelnia rosnąca w trakcie naboru, utrwalona w dniu jego zamknięcia i przeglądalna także według jawnych ocen.
- **Płyta** z dziesięcioma najwyżej ocenionymi utworami plebiscytu - nagrania finansuje organizator, wydaje wydawnictwo-partner, którego jeszcze nie ma. Prawa do nagrań przechodzą na autorów jako część nagrody.
- **Hymn „Zapytaj inaczej"** z teledyskiem; obsada nie jest jeszcze ustalona.

## 4. Harmonogram i jedno pytanie, które blokuje resztę

| Kiedy | Co |
|---|---|
| początek 2027 | premiera hymnu z teledyskiem - **otwiera kampanię naboru** |
| cały 2027 | nabór, czytelnia zgłoszeń rośnie, zgłoszenia plebiscytu napływają, odcinki podcastu |
| 15 stycznia 2028 | zamknięcie naboru; 14 dni później zamrożenie punktacji rundy pierwszej |
| I kwartał 2028 | głosowanie publiczności |
| druga połowa kwietnia 2028 | gala: werdykty, koncert, dialog czytany |

**Nierozstrzygnięte i blokujące:** regulamin mówi, że zgłoszenia przyjmowane są od dnia publikacji regulaminu, a pozostałe dokumenty wskazują 1 stycznia 2027. **Ta rozbieżność wyznacza twardy termin dla strony i powinna zostać zamknięta na warsztatach**, zanim agencja zacznie budować na niej komunikację.

## 5. Strona - zakres

**Dziś:** statyczny HTML bez frameworka, GitHub Pages przez Cloudflare w trybie DNS only, fonty self-hostowane. Strona główna plus podstrony dokumentów renderowane z Markdown po stronie przeglądarki. Opublikowane: regulamin, karta oceny, polityka prywatności, dokument o prawach do wypowiedzi AI, strona plebiscytu, `ai.txt` i `robots.txt` z zastrzeżeniem eksploracji tekstów i danych.

**Co dochodzi i wymaga wyceny:**

**Czytelnia zgłoszeń - cały 2027.** Lista, która rośnie przez rok: imię i nazwisko albo pseudonim, link do rozmowy opublikowany przez uczestnika, opis odkrycia (200-1500 znaków). **Kolejność wyłącznie po dacie zgłoszenia, bez sortowania i bez wyróżniania.** Przeczytane oznaczane lokalnie. Obecność na czytelni jest warunkiem udziału; wpis pojawia się po przejściu weryfikacji formalnej. **To jest odpowiedź na zarzut o rozwodnieniu rocznego okna** - strona ma wreszcie powód, by na nią wracać.

**Półka z gwiazdkami.** Czytelnik oznacza rozmowy, do których chce wrócić, i w styczniu 2028 wybiera z własnej półki. **Gwiazdki zostają na urządzeniu i nigdy nie trafiają na serwer** - inaczej powstałby żywy licznik popularności. Potrzebny eksport i import półki, bo rok zbierania ginie przy wyczyszczeniu przeglądarki, a kont nie ma i nie będzie.

**Głosowanie publiczności - 2028.** Jeden głos na numer telefonu potwierdzony kodem SMS, **liczniki ukryte do ogłoszenia na gali**. Na gali trzy werdykty obok siebie: jury, Uczniowskiej akademii i publiczności.

**Podstrona plebiscytu.** Zgłoszenia prezentowane na bieżąco przez cały rok, jawna karta oceny, dwie nagrody publiczności, hymn, tekst hymnu. Osobny, bardziej widowiskowy kierunek wizualny - przy zachowaniu rangi równorzędnej, nie podrzędnej.

**Antologia i Archiwum - 2028.** Docelowo kilkaset stron pojedynczych rozmów; układ, typografia i nawigacja muszą to unieść.

## 6. Ograniczenia, które nie podlegają negocjacji

- **Bez komunikatu o ciasteczkach, bez Google Analytics, bez fontów z CDN.** Strona deklaruje zastrzeżenie eksploracji tekstów i danych; ładowanie skryptów z cudzych serwerów stoi z tym w sprzeczności.
- **Dane uczestników nie opuszczają EOG.**
- **Treści muszę móc zmieniać sam**, bez zlecenia przy każdej poprawce regulaminu.
- **YouTube wyłącznie jako klikalne okładki, nie osadzone odtwarzacze.** *Do rozstrzygnięcia na warsztatach:* podstrona plebiscytu będzie prezentować kilkadziesiąt zgłoszeń muzycznych, a okładka z przejściem na YouTube jest spójna z zasadą, ale słabsza w odbiorze. To realna decyzja projektowa.
- **Nowa rzecz do wyjaśnienia na stronie:** półka z gwiazdkami używa pamięci przeglądarki, co nie jest ciasteczkiem śledzącym, ale wymaga jednego zdania wyjaśnienia - i jest przy okazji atutem komunikacyjnym.

**Otwarty spór:** Piotr zgłosił sprzeciw wobec rezygnacji z analityki, bo bez niej nie da się mierzyć kampanii. Do listy dla kancelarii dopisano pytanie o narzędzia bez ciasteczek, w tym o rozwiązanie Cloudflare.

## 7. Zakres zlecenia i granica

**Po stronie agencji:** warsztaty, branding i tone of voice, materiały wideo (kierunek kreatywny ustalony - sekcja 12), audyt i projekt strony publicznej wraz z podstronami, teksty, wdrożenie w technologii statycznej, WCAG 2.1 AA, widok dokumentów z Markdown z możliwością samodzielnej aktualizacji, przygotowanie pod wersję anglojęzyczną bez jej tworzenia. Podstrona plebiscytu jako osobna pozycja wyceny. Wytyczne projektowe do czytelni, półki, strony pojedynczej rozmowy w Archiwum i strony antologii.

**Po stronie Krzyśka:** formularz zgłoszeniowy i obsługa danych uczestników, narzędzie archiwizujące rozmowy, narzędzie do weryfikacji formalnej, panel pracy akademii i jury, mechanizmy czytelni, półki i głosowania, publikowanie Archiwum.

**Kolejność przyjęta przez agencję:** branding przed stroną. Zdanie Piotra: „wynikiem naszej pracy będzie strona internetowa, ale wpierw musimy przejść przez branding". Ela przygotuje plan warsztatów i wyśle mailem przed pierwszym spotkaniem. Warsztaty najlepiej na żywo, w Warszawie.

**Wycena:** Ela zadeklarowała wysyłkę najpóźniej 4 listopada.

**Uwaga o kotwicy, do pamiętania przy kolejnych dostawcach.** Brief celowo nie podawał budżetu, ale w rozmowie padło, że „to nie będzie 5000 na pewno" i że przy sponsorze antologii rzędu dwustu tysięcy kwota kilkunastu tysięcy to procent tej sumy. To jest kotwica ustawiona od dołu i wycena najprawdopodobniej nie zejdzie poniżej piętnastu tysięcy. Zasada na przyszłość: najpierw cudza wycena, potem własna liczba.

## 8. Budżety - trzy wnioski do trzech sponsorów

| Budżet | Przedmiot | Kwota netto |
|---|---|---:|
| [Nagrody](/arkusz/budzet-edycji-pierwszej?tab=nagrody) | Nagroda i gala: pula nagród, honoraria jury, gala, promocja naboru, prowadzenie plebiscytu | **ok. 561,7 tys. zł** |
| [Antologii](/arkusz/budzet-edycji-pierwszej?tab=antologii) | Antologia i Archiwum: redakcja, korekta, skład, druk, utrzymanie Archiwum, powołanie fundacji, **przebudowa strony**, narzędzia AI | **ok. 277,6 tys. zł** |
| [Plebiscytu](/arkusz/budzet-edycji-pierwszej?tab=plebiscytu) | Plebiscyt: nagrody, nagrania dziesiątki finalistów, hymn z teledyskiem, statuetki, prowadzenie | **ok. 261,7 tys. zł** |
| [akademii](/arkusz/budzet-edycji-pierwszej?tab=akademii) | Pierwsza runda oceny: honoraria czytelników, vouchery rosnące z liczbą ocenionych rozmów, kalibracja | **ok. 49,3 tys. zł** |

Wyliczenia pozycja po pozycji są w arkuszu [budzet-edycji-pierwszej](/arkusz/budzet-edycji-pierwszej), w zakładkach Budżet Nagrody, Budżet Antologii, Budżet Plebiscytu i Budżet akademii; zakładka Wyjaśnienia opisuje, jak czytać każdą kolumnę.

Razem ok. 1 150,2 tys. zł netto przy 937 godzinach pracy organizatora. **Honoraria jury plebiscytu i realizacja części artystycznej gali stoją na zerze** i czekają na wycenę od Michała Sołtana, więc Budżet P jeszcze urośnie.

**Praca agencji jest w Budżecie A** - finansuje ją partner wydawniczy, nie fundator puli. Żaden sponsor nie jest jeszcze pozyskany; zlecenie rusza po podpisaniu pierwszej umowy sponsorskiej.

**Plebiscytu nie ogłaszamy publicznie, dopóki nie ma pieniędzy na nagrody** - komunikacja musi tego pilnować. Do tego czasu strona zapowiada go i zbiera zainteresowanie wykonawców, bez obietnicy kwot.

## 9. Zarzuty Piotra i co z nimi zrobiliśmy

**„Odbiór jako freak".** Pierwsze skojarzenie z nazwą: gwiazdy, energia wszechświata, ezoteryka. Największym wyzwaniem jest pokazanie, że to nie jest czyjeś hobby. **Nierozwiązane - to jest zadanie na warsztaty i główny powód, dla którego branding idzie przed stroną.**

**Rozwodnienie rocznego okna.** „Kiedyś czyli nigdy". **Rozwiązane trzema rzeczami:** hymn z teledyskiem jako wydarzenie otwierające pierwszą edycję, rosnąca czytelnia zgłoszeń z półką, napływające zgłoszenia plebiscytu. Dochodzą odcinki podcastu.

**Jedno zgłoszenie na osobę obcina zainteresowanych.** **Podtrzymane mimo zarzutu** - wybór własnej najlepszej rozmowy jest sam w sobie aktem oceny, a Nagroda premiuje właśnie takie rzeczy.

**Wtyczka do przeglądarki jako bariera zaufania.** Wtyczka jest opcjonalna, liczy lokalnie, zapisuje rozmowę do pliku, a pobrany plik nie jest podstawą oceny. Zarzut pozostaje w mocy: przeciętny użytkownik zakłada, że wtyczka go podsłuchuje. **Zadanie dla agencji:** jak zakomunikować narzędzie opcjonalne, działające bez wysyłania czegokolwiek, żeby nie czytało się jak prośba o dostęp do cudzych rozmów.

**Termin 1 stycznia nazwany szalonym.** Patrz punkt 4 - rozbieżność wciąż otwarta.

## 10. Rzeczy wymagające uwagi w projekcie formularza

**Domyślna widoczność linku udostępniania.** U Claude link generuje się domyślnie jako „Only people invited". Uczestnik, który tego nie przestawi, zgłosi link niemożliwy do otwarcia przez Organizatora i odpadnie formalnie bez swojej winy i bez swojej wiedzy. **Potrzebne:** instrukcja przy formularzu, zrzut ekranu pokazujący to ustawienie u każdego dostawcy oraz **sprawdzanie dostępności linku w chwili zgłoszenia**, z natychmiastowym komunikatem zamiast odrzucenia po terminie.

**Deklaracja sposobu powstania tekstu - w formularzu plebiscytu (dodane 24.10.2026).** Po rozdzieleniu zasady wobec AI każde zgłoszenie opisuje, jak powstał tekst, również wtedy, gdy powstał w całości samodzielnie. Pole jest **obowiązkowe, swobodne i krótkie** - kilka zdań, nie formularz wyboru - bo pytamy o drogę, a nie o proporcje. Trzy rzeczy do rozstrzygnięcia przy projektowaniu: czy treść deklaracji jest **publiczna** razem ze zgłoszeniem, czy widzi ją wyłącznie organizator; czy trafia do jury przed oceną, po ocenie, czy wcale; oraz co widzi zgłaszający w podpowiedzi przy tym polu, żeby nie czytał go jako pytania podchwytliwego. Osobne, krótsze pole zostaje przy deklaracji narzędzi użytych na etapie produkcji dźwięku, bo to inne pytanie.

**Lista powiadomień.** Dobrowolny zapis, **osobny od zgłoszenia**, z odrębną zgodą i odrębnym polem. Treścią mailingu są handbook i nowe odcinki podcastu, nie przypomnienia o plebiscycie - ludzie zapisują się po materiał, a przy okazji wiedzą, że nabór trwa.

**Komunikat o odrzuceniu.** Na żądanie, po gali, uczestnik może zapytać o powód niezakwalifikowania i otrzymuje własne oceny, bez wskazania oceniających. **Nierozwiązana kolizja:** polityka prywatności każe usuwać dane nienagrodzonych w ciągu 60 dni od ogłoszenia wyników, więc pytanie zadane w 70. dniu trafia w próżnię.

## 11. Jak docieramy do odbiorców

**Akademia czytająca - emeryci i akademicy.** Emerytowani nauczyciele, doktoranci i profesorowie mają czas, warsztat i powód. Kanały w kolejności siły: Uniwersytety Trzeciego Wieku (kilkaset w Polsce, zacząć od 3-4 największych), biblioteki publiczne prowadzące zajęcia dla seniorów, Kluby Rozwoju Cyfrowego, sekcje emerytów przy ZNP, uczelnie.

**Szkoły.** Uczniowska akademia zgłaszana przez szkoły czyta zgłoszenia według tej samej karty oceny i przyznaje odrębną **Nagrodę Uczniowską**, niezależnie od werdyktu jury. Wzorem jest Prix Goncourt des lycéens. Udział uczniów jest nieodpłatny.

**Wykonawcy plebiscytu.** Strona ich nie dosięga. Żyją w grupach muzyków na Facebooku, w szkołach muzycznych i na wydziałach wokalnych, na scenie coverowej YouTube i TikToka, w radiach lokalnych i studenckich, na open mikach i w rosterach małych wydawnictw. To praca ręczna albo płatna promocja w mediach muzycznych - raz czyjś czas, raz gotówka.

## 12. Materiały wideo - kierunek kreatywny

**Decyzja z 24.10.2026: filmy robią ludzie.** Technika to wycinanka z rysunkami dzieci - człowiek, laptop, konstelacja na niebie, przedmioty cięte nożyczkami i animowane poklatkowo. Żadnego wideo generowanego narzędziami AI.

**Powód pierwszy, obronny.** Nagroda zabrania zgłaszania muzyki wygenerowanej przez AI, a plebiscyt tego pilnuje. Reklama Nagrody zrobiona przez AI byłaby sprzecznością, którą ktoś nagłośni, i to słusznie. Dziecięcy rysunek jest artefaktem, przy którym to pytanie nie powstaje.

**Powód drugi, znaczeniowy, ważniejszy dla warsztatów.** Konstelacja narysowana przez dziecko to dosłownie teza Nagrody: gwiazdy same z siebie nie układają się w żaden kształt, dopóki ktoś nie poprowadzi między nimi linii, której wcześniej nie było. Dziecko z kredką robi dokładnie to i robi to pierwsze w życiu. Jedno takie ujęcie tłumaczy nazwę bez zdania lektora. Drugi poziom: Nagroda premiuje zadawanie pytań, a dziecko jest jedynym człowiekiem, który zadaje je bez opamiętania.

**Zastrzeżenie techniczne i kulturowe.** Wycinanka jest tania i wdzięczna - płaskie warstwy, widoczne cięcie, lekkie drżenie klatek - i ma w Polsce własną tradycję, więc nie czyta się jako oszczędność, tylko jako wybór.

**Ryzyko do zaadresowania w projekcie: odczytanie jako „dla dzieci".** Nagroda jest dla pełnoletnich, rysunek jest metaforą, nie adresem. Trzyma to dorosły głos lektora i poważny tekst. Agencja ma to dostać powiedziane wprost, bo sama estetyka ciągnie w drugą stronę.

**Nierozstrzygnięte: czyje to rysunki.** Prawdziwe prace dzieci wymagają zgód rodziców, a przy szkole zgody na każde dziecko osobno. Alternatywą jest ilustrator rysujący „dziecięcą ręką" - czysto prawnie, ale traci autentyczność, którą ktoś może wyczuć. Przy Uczniowskiej akademii prawdziwe rysunki byłyby natomiast pretekstem dla szkół, żeby się zaangażowały. Pytanie skierowane do kancelarii (sekcja Cv pkt 28 w [prawnik](/dokument/prawnik)).

## 13. Reequest jako partner

Piotr zasygnalizował, że jeśli to wypali, będą wkładem w rozpromowanie.

**Przyjęta zasada: pełna wycena zostaje**, a osobno pada pytanie, czy chcą figurować jako **partner kreatywny Nagrody**, z logo na stronie i w materiałach, i czy w zamian zejdą o konkretny, zapisany procent. Raz, na piśmie. **Czego nie robimy:** nie prosimy o niższe honorarium „w zamian za partnerstwo" - przy koledze ze studiów zamienia się to w układ, w którym nikt nie wie, co komu się należy, a pierwszy spór kończy i współpracę, i znajomość.

## 14. Ustalone i otwarte

**Ustalone:** rama współistnienia; plebiscyt jako drugi równorzędny plebiscyt; jawne karty oceny obu plebiscytów; czytelnia jako warunek udziału; półka wyłącznie lokalna; głosowanie publiczności dopiero w 2028 z ukrytymi licznikami; demo na wejściu do plebiscytu; jedno zgłoszenie na osobę w obu plebiscytach; hymn jako materiał otwierający nabór; prawa zostają przy autorach; branding przed stroną.

**Otwarte:** termin otwarcia naboru; YouTube jako okładki czy odtwarzacze; analityka; nazwa i gratyfikacja Nagrody Publiczności; kolizja terminu 60 dni z pytaniami o oceny po gali; kto wykonuje kontrolę formalną zgłoszeń plebiscytu przy dużych liczbach; skład jury plebiscytu poza przewodniczącym; honoraria jury plebiscytu i realizacja części artystycznej gali.
