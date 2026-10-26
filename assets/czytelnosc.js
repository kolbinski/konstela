/* Przełącznik trybu czytelności - jedno źródło prawdy.
 *
 * Używany na: index.html, view.html, 404.html, view-xlsx.html oraz stronach
 * budowanych przez skrypty/buduj-dokumenty.js.
 *
 * Tryb włącza klasa "czytelnie" na <html>; wygląd opisuje
 * assets/czytelnosc.css. Wybór zapamiętywany jest w localStorage, więc
 * przechodzi na kolejne strony i wraca przy następnej wizycie.
 *
 * Klasę ustawia krótki skrypt wpisany w nagłówek każdej strony, zanim
 * przeglądarka cokolwiek narysuje - ten plik dokłada tylko obsługę kliknięcia.
 * Gdyby ustawiał ją dopiero ten plik, strona mignęłaby w zwykłych kolorach.
 *
 * localStorage bywa niedostępny - tryb prywatny, zablokowane dane witryn - i
 * samo sięgnięcie po niego potrafi rzucić wyjątkiem. Dlatego każdy odczyt i
 * zapis jest w try/catch, a brak zapisu oznacza tylko tyle, że tryb nie
 * przetrwa przejścia na inną stronę.
 */
(function () {
  'use strict';

  var KLUCZ = 'konstela-czytelnosc';
  var przycisk = document.getElementById('czytelnosc');
  if (!przycisk) return;

  var korzen = document.documentElement;

  function wlaczony() {
    return korzen.classList.contains('czytelnie');
  }

  function opisz() {
    przycisk.setAttribute('aria-pressed', wlaczony() ? 'true' : 'false');
    przycisk.setAttribute(
      'title',
      wlaczony() ? 'Wyłącz tryb czytelności' : 'Większe pismo i wysoki kontrast'
    );
  }

  opisz();

  przycisk.addEventListener('click', function () {
    var nowy = !wlaczony();
    korzen.classList.toggle('czytelnie', nowy);
    opisz();
    try {
      if (nowy) {
        window.localStorage.setItem(KLUCZ, '1');
      } else {
        window.localStorage.removeItem(KLUCZ);
      }
    } catch (e) {
      /* Zapamiętanie się nie udało; tryb działa do końca tej strony. */
    }
  });
})();
