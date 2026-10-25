/* Przycisk powrotu w nagłówku podstron - jedno źródło prawdy.
 *
 * Używany na: view.html, view-xlsx.html, plebiscyt-piosenki/index.html.
 * Strona musi mieć nagłówek w postaci:
 *   <header class="masthead"><span class="left">
 *     <a class="back" href="/">&#8592;</a><a class="brand" href="/">Nagroda Konstela</a>
 *   </span></header>
 *
 * Zachowanie domyślne, zapisane wprost w HTML: strzałka i napis "Nagroda
 * Konstela" prowadzą na stronę główną. Ten skrypt zmienia je na "Powrót"
 * cofający do poprzedniej strony tylko wtedy, gdy odwiedzający naprawdę
 * przyszedł z innego miejsca w serwisie. Dzięki temu przy wyłączonym
 * JavaScripcie nagłówek dalej działa, tylko bez cofania.
 */
(function () {
  'use strict';

  /* Katalogi, które tylko przerzucają dalej. Adresy te poszły kiedyś w świat
     i nie można ich zgasić, ale wejście przez nie nie jest nawigacją po
     serwisie. Dopisać tutaj każdy nowy katalog z przekierowaniem. */
  var PRZEKIEROWANIA = ['/piosenka'];

  var lewa = document.querySelector('.masthead .left');
  if (!lewa) return;

  var strzalka = lewa.querySelector('a.back');
  var napis = lewa.querySelector('a.brand');
  if (!strzalka || !napis) return;

  function bezKoncowki(sciezka) {
    return sciezka.replace(/\/(index\.html?)?$/i, '');
  }

  /* Czy poprzednia strona była inną stroną tego serwisu. */
  function jestDokadWracac() {
    var skad = document.referrer;

    /* Pusty odsyłacz: wpisany adres, zakładka, nowa karta, czasem też
       wejście z aplikacji. Nie ma dokąd wracać. */
    if (!skad) return false;

    var poprzednia;
    try {
      poprzednia = new URL(skad);
    } catch (e) {
      return false;
    }

    /* Wejście z wyszukiwarki albo z cudzego linku - wtedy cofanie
       wyrzuciłoby odwiedzającego poza serwis, czyli odwrotnie do zamiaru. */
    if (poprzednia.origin !== location.origin) return false;

    var stad = bezKoncowki(location.pathname);
    var stamtad = bezKoncowki(poprzednia.pathname);

    /* Odświeżenie tej samej strony. Porównujemy razem ze znakiem zapytania,
       bo przeglądarka dokumentów rozróżnia dokumenty właśnie nim
       (view.html?file=regulamin i view.html?file=karta-oceny to dwie różne
       strony pod tą samą ścieżką). */
    if (stamtad + poprzednia.search === stad + location.search) return false;

    /* Nasze własne przekierowanie ze skróconego adresu. Takie strony
       przerzucają dalej przez location.replace, więc odsyłacz wskazuje nasz
       serwis, choć odwiedzający przyszedł z zewnątrz - a cofanie
       wyprowadziłoby go poza stronę, czyli odwrotnie do zamiaru. */
    if (PRZEKIEROWANIA.indexOf(stamtad) !== -1) return false;

    /* Karta otwarta w tle linkiem "otwórz w nowej karcie" ma odsyłacz,
       ale nie ma własnej historii. */
    return history.length > 1;
  }

  if (!jestDokadWracac()) return;

  napis.textContent = 'Powrót';
  strzalka.setAttribute('aria-label', 'Wróć do poprzedniej strony');
  napis.setAttribute('aria-label', 'Wróć do poprzedniej strony');

  [strzalka, napis].forEach(function (odnosnik) {
    odnosnik.addEventListener('click', function (zdarzenie) {
      /* Otwieranie w nowej karcie i klik środkowym przyciskiem zostawiamy
         przeglądarce - prowadzą wtedy na stronę główną z atrybutu href. */
      if (
        zdarzenie.button !== 0 ||
        zdarzenie.metaKey ||
        zdarzenie.ctrlKey ||
        zdarzenie.shiftKey ||
        zdarzenie.altKey
      ) {
        return;
      }
      zdarzenie.preventDefault();
      history.back();
    });
  });
})();
