# Zasady pracy nad Nagrodą Konstela

## Liczby, których nie wolno podawać

**Nigdy i nigdzie nie powołujemy się na 150 zgłoszeń** - ani jako na prognozę, ani jako na „założenie przepustowości", ani w ofertach, ani w dokumentach roboczych, ani w notatkach z decyzji. Liczba nie ma podstawy: nie pochodzi z badania, z poprzedniej edycji ani z porównania z innym konkursem. Zasada ustalona 31.10.2026 po audycie, który usunął ją z jedenastu dokumentów i z arkusza budżetu.

Zamiast niej mówimy, **co kosztorys kupuje**: „300 odczytów rozmów", „300 obejrzeń filmów", „30 godzin kontroli formalnej, czyli 12 minut na zgłoszenie", „przepustowość objęta kosztorysem". To jest prawdziwe, sprawdzalne i nie udaje wiedzy o frekwencji.

Dwie rzeczy dodatkowo:

- pozycje rozliczane od liczby zgłoszeń opisujemy przez **stawkę jednostkową i faktyczną liczbę**, a nie przez iloczyn z założoną frekwencją;
- w ofertach piszemy wprost, że prognozy nie mamy, zamiast podawać liczbę z zastrzeżeniem.

Wyjątek: liczby w tabelach pokazujących **koszt przy kolejnych wolumenach** (20 / 50 / 150 / 1000 zgłoszeń) są punktami na krzywej i zostają - pod warunkiem, że żadne zdanie obok nie wskazuje jednego z nich jako spodziewanego.

Dokumenty w `recenzje/` są zapisem tego, co powiedział recenzent, i nie podlegają temu porządkowaniu - jedna z recenzji atakuje właśnie tę liczbę.

## Nazwy mechanizmów

Rejestr ma być urzędowy, ale nie sztywny; potoczne przezwiska mechanizmów nie wchodzą do regulaminu ani do ofert. Ustalone 31.10.2026:

- **runda uczestników** (nie „sito") - pierwsza kwalifikacja zgłoszeń przeprowadzana przez samych Uczestników, § 8 ust. 10c regulaminu rozmowy. Rund przeprowadza się tyle, ile potrzeba, więc w liczbie mnogiej: „rundy uczestników". Funkcję opisuje zwrot „pierwsza kwalifikacja zgłoszeń";
- **zgłoszenie wzorcowe** (nie „kotwica") - zgłoszenie z punktacją ustaloną wcześniej, dołączane do przydziału w rundzie uczestników, po to by zmierzyć odchylenie oceniającego;
- **rozmowy kalibracyjne** (nie „kotwice") - trzy rozmowy spoza edycji oceniane ponownie w połowie naboru i po jego zamknięciu, § 8 ust. 12-13. To osobny mechanizm od zgłoszenia wzorcowego i nazwa musi je rozróżniać: rozmowy kalibracyjne **nie** wyznaczają prawidłowej punktacji, tylko pokazują zmianę standardu oceniającego;
- **dzika karta** zostaje - jest terminem o ustalonym znaczeniu.

Drabina ocen nazywa się: **runda uczestników → runda Akademii → runda jury**.

## Opisy commitów

Z polskimi znakami diakrytycznymi. Opis commitu **wyjaśnia samą zmianę i jej rzeczową przyczynę - i nic poza tym**. Nie ma w nim kontekstu, w jakim zmiana powstała: ani recenzenta i recenzji zewnętrznej, ani persony, tury, numeru uwagi, ani tego, kto o zmianę poprosił. Rzeczowa przyczyna to wada w rzeczy, którą zmieniamy - „termin był przekraczany przez sam przebieg edycji”, a nie „recenzent wskazał, że termin jest nierealny”. Zasada ustalona 3.11.2026.

## Prompty recenzji

Pliki `*-prompt-recenzji.md` oraz wszystkie inne teksty przeznaczone do skopiowania i wklejenia zawierają **wyłącznie treść do wklejenia**. Żadnego nagłówka, żadnej notatki o doborze persony, żadnej linii poziomej oddzielającej komentarz od treści - komentarz utrudnia skopiowanie, bo trzeba go za każdym razem ręcznie pominąć. Plik zaczyna się od pierwszego zdania promptu.

Uzasadnienie doboru persony, tego, czego prompt celowo nie robi, i tego, co zmieniło się od poprzedniej tury, nie wchodzi ani do pliku, ani do opisu commitu - **zapisuje się je w `recenzje-status.md`**, przy wierszu danego dokumentu, razem z personą i werdyktem. Zasada o samej treści plików ustalona 1.11.2026, wtedy też usunięto komentarze z dwudziestu czterech istniejących plików; miejsce uzasadnienia przeniesione z opisu commitu do `recenzje-status.md` 3.11.2026, bo commit opisuje zmianę, a nie okoliczności jej powstania.

## Obietnice w ofertach: pięć pytań przed dopisaniem świadczenia

Każde nowe świadczenie w ofercie partnerskiej sprawdza się pięcioma pytaniami, zanim trafi do dokumentu. Zasada ustalona 2.11.2026 po trzech turach recenzji oferty piosenki, w których **każda naprawa wprowadzała własne wady**: pakiet dopisany po pierwszej turze dał sześć nowych zarzutów, a rozliczenie dopisane po drugiej - trzy kolejne.

1. **Kto to wykona.** Dokumentacja zdjęciowa i filmowa dziesięciu sesji była obiecana, choć nie miał jej kto zrobić: nie wchodziła w stawkę studia ani w godziny organizatora.
2. **Z czego to zapłacimy.** Jeżeli nie ma pozycji w kosztorysie, świadczenie albo nie powstanie, albo zje pieniądze przeznaczone na coś innego.
3. **Czyje prawa są do tego potrzebne.** Film z sesji zawiera słyszalny utwór, jego wykonanie i nagranie; zgoda na publikację wizerunku tego nie obejmuje, a oferta obiecywała płatną promocję.
4. **Kiedy i po czym stwierdzimy wykonanie.** „W trakcie trwania sesji" nie jest terminem, jeżeli sesje mogą być równoległe. Świadczenie bez daty i bez miary - liczby zdjęć, długości materiału, liczby publikacji - nie daje się odebrać ani zakwestionować.
5. **Co otrzyma sponsor, jeżeli świadczenie nie powstanie.** Umowna wartość liczona od kosztu wykonania, nie od ułamka ceny roli. **Godzin przypisanych innym zadaniom nie wolno policzyć jako wartości pakietu** - te same 90 godzin były raz pracą nad naborem, a raz wartością czternastu publikacji.

Pytania 4 i 5 dopisał recenzent, wskazując, że pierwsze trzy nie objęłyby wszystkich znalezionych wad, bo problemów terminów, odbioru i wartości zwrotu nie wychwytują.

## Stan recenzji ofert

Plik `recenzje-status.md` jest jedynym miejscem, w którym stoi odpowiedź na pytanie, które oferty przeszły recenzję i z jakim statusem. **Aktualizuje się go po każdej turze recenzji, w tym samym commicie co poprawki w ofercie** - nie później i nie osobno. Zasada ustalona 2.11.2026, kiedy okazało się, że ta odpowiedź wymagała przeszukania folderu recenzji, promptów i trzech sekcji planu działań.

Przy każdej turze: recenzja idzie do `recenzje/` jako `RRRR-MM-DD-<oferta>-<persona albo tura>.md` z nagłówkiem opisującym personę i werdykt, a w `recenzje-status.md` rośnie liczba tur i zmienia się status końcowy. Oferta recenzowana po raz pierwszy przenosi się z listy oczekujących do tabeli.

Lista „Dziś" w `plan-dzialan.md` nie jest dowodem na to, że czegoś nie zrobiono - jest dowodem na to, że nikt jej nie odhaczył. Wysyłki i telefony potwierdza się, zanim zostaną nazwane zaległością.
