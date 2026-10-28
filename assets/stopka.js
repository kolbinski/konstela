/* Stopka Nagrody Konstela - jedno źródło prawdy.
 *
 * Używana na: index.html, 404.html, view.html, view-xlsx.html.
 * Strona wstawia w treści <konstela-stopka></konstela-stopka>
 * i dołącza ten plik: <script src="/assets/stopka.js" defer></script>.
 *
 * Markup i style siedzą w shadow DOM, więc stopka wygląda tak samo
 * niezależnie od tego, jakie reguły ma strona, na której stoi.
 * Kolory i szerokość biorą się ze zmiennych CSS strony - te
 * dziedziczą się przez granicę shadow DOM - z wartościami zapasowymi
 * dla stron, które danej zmiennej nie definiują (strona główna używa
 * --rule, podstrony dokumentów --line).
 */
(function () {
  'use strict';

  var LINKI = [
    ['/', 'Strona główna'],
    ['/plebiscyt-rozmowy', 'Nagroda Konstela w plebiscycie na rozmowę ze sztuczną inteligencją'],
    ['/plebiscyt-filmu', 'Nagroda Konstela w plebiscycie na film o sztucznej inteligencji'],
    ['/plebiscyt-piosenki', 'Nagroda Konstela w plebiscycie na piosenkę o sztucznej inteligencji'],
    ['/plebiscyt-plakatu', 'Nagroda Konstela w plebiscycie na plakat o sztucznej inteligencji'],
    ['/hymn', 'Hymn Nagrody Konstela'],
    ['/dokument/procedura-moderacji', 'Procedura moderacji zgłoszeń'],
    ['/dokument/regulaminy', 'Regulaminy'],
    ['/dokument/polityka-prywatnosci', 'Polityka prywatności'],
    ['/dla-partnerow', 'Dla partnerów'],
  ];

  var STYLE = [
    /* Szerokość i wyśrodkowanie ustawiamy na pasku w środku, a nie na :host.
       Reguła strony - choćby zwykłe * { margin: 0 } - ma pierwszeństwo przed
       :host, więc margines automatyczny zapisany tam bywa kasowany. */
    ':host { display: block; }',
    '.belka {',
    '  max-width: var(--max-w, 44rem); margin: 0 auto;',
    '  display: flex; flex-wrap: wrap; gap: 1.5rem;',
    '  align-items: flex-start; justify-content: space-between;',
    '  padding-block: 2.5rem 3.5rem;',
    '  border-top: 1px solid var(--line, var(--rule, #ddd5c4));',
    /* Rozmiar i grubość jak w treści strony - stopka ma się czytać,
       a nie znikać. Kolor tekstu pełny, nie przygaszony. */
    '  color: var(--text, var(--fg, #241f18));',
    '  font-size: 1.2rem; line-height: 1.55; font-weight: 400;',
    '}',
    /* Lewa kolumna dostaje ten sam odstęp pionowy co lista po prawej,
       żeby obie strony stopki czytały się jak jeden rytm. */
    '.lewo { display: flex; flex-direction: column; align-items: flex-start; gap: 1.1rem; }',
    '.lewo p { margin: 0; line-height: 1.25; }',
    /* Lista zawsze do lewej. Przy pełnych nazwach dokumentów kolumna linków
       i tak nie mieści się obok bloku kontaktowego i schodzi pod niego -
       wyrównanie do prawej zostawiało wtedy ragged left i pusty pas przy
       krawędzi strony. */
    'nav { display: flex; flex-direction: column; align-items: flex-start; gap: 1.1rem; }',
    /* Odstęp MIĘDZY pozycjami robi gap listy, a wiersze WEWNĄTRZ jednej
       pozycji są ciaśniejsze - inaczej złamany link wygląda jak dwie pozycje. */
    'nav a { line-height: 1.25; }',
    'a { color: var(--brass, #8a6a23); text-decoration: none; font-weight: 400; }',
    'a:hover, a:focus-visible { text-decoration: underline; }',
    /* Tryb czytelności. Stopka siedzi w shadow DOM, więc arkusz strony jej
       nie dosięga - assets/czytelnosc.js ustawia tu atrybut na elemencie,
       a te reguły robią resztę. Wielkość pisma taka sama jak w treści. */
    ':host([data-czytelnie]) .belka {',
    '  color: #000; font-size: 1.875rem; line-height: 1.5;',
    '  border-top-color: #000;',
    '}',
    ':host([data-czytelnie]) nav, :host([data-czytelnie]) .lewo { gap: 1.6rem; }',
    ':host([data-czytelnie]) a { color: #0000cc; text-decoration: underline; }',
    ':host([data-czytelnie]) a:visited { color: #0000cc; }',
    /* Na wąskim ekranie obie kolumny stoją jedna pod drugą, więc odstęp
       MIĘDZY nimi ma być taki sam jak odstęp między pozycjami w środku -
       inaczej stopka czyta się jak dwie osobne listy o różnym rytmie. */
    '@media (max-width: 48rem) {',
    '  .belka { gap: 1.1rem; }',
    '  :host([data-czytelnie]) .belka { gap: 1.6rem; }',
    '}',
    '@media print {',
    '  .belka { border-color: #ccc; color: #000; }',
    '  a { color: #000; }',
    '}',
  ].join('\n');

  function szkielet() {
    var pozycje = LINKI.map(function (l) {
      return '<a href="' + l[0] + '">' + l[1] + '</a>';
    }).join('');

    return (
      '<style>' + STYLE + '</style>' +
      '<div class="belka">' +
      '<div class="lewo">' +
      '<p>Konstela &copy; 2026</p>' +
      '<p>Napisz do nas: <a href="mailto:kontakt@konstela.org">kontakt@konstela.org</a></p>' +
      '<p><a href="/fundacja">Fundacja Konstela</a></p>' +
      '</div>' +
      '<nav aria-label="Dokumenty">' + pozycje + '</nav>' +
      '</div>'
    );
  }

  if (window.customElements && !customElements.get('konstela-stopka')) {
    customElements.define(
      'konstela-stopka',
      class extends HTMLElement {
        connectedCallback() {
          if (this.shadowRoot) return;
          this.attachShadow({ mode: 'open' }).innerHTML = szkielet();
        }
      }
    );
  }
})();
