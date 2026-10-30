/* Przyciski nad nagłówkiem oferty: zapis do PDF i wydruk.
 *
 * Oba korzystają z silnika wydruku przeglądarki, bo tylko on składa tekst tak,
 * jak wygląda na stronie: żywe odnośniki, prawdziwe czcionki, poprawne łamanie
 * tabel. Biblioteka generująca PDF po stronie przeglądarki zrobiłaby z tej
 * strony obrazek i dołożyła kilkaset kilobajtów do każdego wejścia.
 *
 * Dzięki temu plik powstaje w locie z tego, co w danej chwili jest na stronie,
 * i nie ma czego synchronizować z treścią dokumentu.
 *
 * Nazwa zapisywanego pliku bierze się z tytułu karty, więc na czas wydruku
 * tytuł jest podmieniany na nazwę pliku, a potem wracany na swoje miejsce.
 */
(function () {
  var pasek = document.querySelector('.akcje');
  if (!pasek) return;

  var pdf = pasek.querySelector('[data-pdf]');
  var druk = pasek.querySelector('[data-druk]');

  function nazwaPliku() {
    var h1 = document.querySelector('#content h1');
    var tekst = (h1 ? h1.textContent : document.title) || 'Oferta';
    return tekst
      .trim()
      .replace(/\s+/g, ' ')
      .slice(0, 90);
  }

  /* Podmiana tytułu musi wrócić niezależnie od tego, czy użytkownik zapisał
     plik, czy zamknął okno - stąd oba zdarzenia i zapas czasowy dla
     przeglądarek, które żadnego z nich nie wysyłają. */
  function zTytulem(nazwa, dzialanie) {
    var stary = document.title;
    document.title = nazwa;
    var wrocilo = false;
    function wroc() {
      if (wrocilo) return;
      wrocilo = true;
      document.title = stary;
      window.removeEventListener('afterprint', wroc);
    }
    window.addEventListener('afterprint', wroc);
    try {
      dzialanie();
    } finally {
      setTimeout(wroc, 1000);
    }
  }

  if (pdf) {
    pdf.addEventListener('click', function () {
      zTytulem(nazwaPliku(), function () {
        window.print();
      });
    });
  }

  if (druk) {
    druk.addEventListener('click', function () {
      window.print();
    });
  }
})();
