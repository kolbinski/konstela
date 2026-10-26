/* Przycisk powrotu w nagłówku podstron - jedno źródło prawdy.
 *
 * Używany na: view.html, strony budowane generatorem, view-xlsx.html, 404.html.
 * Strona musi mieć w pasku grupę w postaci:
 *   <span class="left">
 *     <a class="back" href="/">[svg]</a><a class="brand" href="/">Nagroda Konstela</a>
 *   </span>
 *
 * Zachowanie domyślne, zapisane wprost w HTML: strzałka i napis "Nagroda
 * Konstela" prowadzą na stronę główną. Ten skrypt zmienia je na "Powrót"
 * cofający do poprzedniej strony tylko wtedy, gdy odwiedzający naprawdę
 * przyszedł z innego miejsca w serwisie. Dzięki temu przy wyłączonym
 * JavaScripcie nagłówek dalej działa, tylko bez cofania.
 *
 * WAŻNE przy dodawaniu skróconych adresów. Przekierowanie zrobione jako
 * katalog z plikiem HTML wywołującym location.replace ustawia odsyłacz na
 * nasz własny serwis, choć odwiedzający przyszedł z zewnątrz - i ten skrypt
 * pokazałby mu "Powrót" wyprowadzający poza stronę. Przekierowania robimy
 * więc wyłącznie po stronie Cloudflare (Redirect Rules, kod 301), bo wtedy
 * przeglądarka zachowuje pierwotny odsyłacz i problem nie powstaje.
 */
(function () {
  'use strict';

  var lewa = document.querySelector('.topbar .left');
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
