/* Menu sekcji w górnym pasku podstron dokumentów - jedno źródło prawdy.
 *
 * Używany na: view.html oraz stronach budowanych przez
 * skrypty/buduj-dokumenty.js.
 *
 * Pozycje powstają z nagłówków dokumentu: h2 jako pozycje główne, h3 jako
 * podrzędne. Lista wpisywana ręcznie rozjeżdża się z treścią przy każdej
 * zmianie dokumentu, a rozjechanie widać dopiero wtedy, gdy ktoś kliknie
 * odnośnik prowadzący w nieistniejące miejsce.
 *
 * Nagłówki w dokumentach powstają z markdownu i nie mają identyfikatorów,
 * więc nadajemy je tutaj - z tekstu nagłówka, żeby adres z kotwicą dał się
 * przeczytać i wysłać komuś. Przedrostek "do-" trzyma je osobno od kotwic
 * wpisanych w treści ręcznie, takich jak karta-oceny.
 *
 * Treść strony budowanej jest w HTML od razu, a w view.html dochodzi dopiero
 * po wczytaniu pliku markdown - dlatego czekamy na nią obserwatorem.
 */
(function () {
  'use strict';

  var przycisk = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var tresc = document.getElementById('content');
  if (!przycisk || !menu || !tresc) return;

  var uzyte = {};

  function naId(tekst) {
    var znaki = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
    var slug = tekst
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, function (z) { return znaki[z]; })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
    if (!slug) return '';
    var kandydat = 'do-' + slug;
    var n = 2;
    while (uzyte[kandydat]) kandydat = 'do-' + slug + '-' + n++;
    uzyte[kandydat] = true;
    return kandydat;
  }

  function tekstNaglowka(el) {
    return (el.querySelector('span') || el).textContent.replace(/\s+/g, ' ').trim();
  }

  function zbuduj() {
    var naglowki = tresc.querySelectorAll('h2, h3');
    if (!naglowki.length) return false;

    var fragment = document.createDocumentFragment();
    var dodane = 0;

    for (var i = 0; i < naglowki.length; i++) {
      var el = naglowki[i];
      var tekst = tekstNaglowka(el);
      if (!tekst) continue;
      if (!el.id) {
        var id = naId(tekst);
        if (!id) continue;
        el.id = id;
      }
      var a = document.createElement('a');
      a.href = '#' + el.id;
      a.textContent = tekst;
      if (el.tagName === 'H3') a.className = 'pod';
      fragment.appendChild(a);
      dodane++;
    }

    /* Jedna pozycja to nie spis treści - przycisk menu byłby wtedy
       odnośnikiem do miejsca, w którym czytający już stoi. */
    if (dodane < 2) return false;
    menu.textContent = '';
    menu.appendChild(fragment);
    przycisk.hidden = false;
    return true;
  }

  function ustaw(otwarte) {
    przycisk.setAttribute('aria-expanded', otwarte ? 'true' : 'false');
    menu.hidden = !otwarte;
  }

  przycisk.addEventListener('click', function () {
    ustaw(przycisk.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') ustaw(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) {
      ustaw(false);
      przycisk.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (menu.hidden) return;
    if (!menu.contains(e.target) && !przycisk.contains(e.target)) ustaw(false);
  });

  /* Dokument wstawiony od razu w HTML - budujemy teraz. Dokument wczytywany
     przez view.js - czekamy, aż treść pojawi się w <main>. Obserwatora
     wyłączamy po pierwszym udanym zbudowaniu, żeby późniejsze zmiany w
     treści nie przebudowywały menu w trakcie czytania. */
  if (!zbuduj()) {
    przycisk.hidden = true;
    menu.textContent = '';
    if (window.MutationObserver) {
      var obserwator = new MutationObserver(function () {
        if (zbuduj()) obserwator.disconnect();
      });
      obserwator.observe(tresc, { childList: true, subtree: true });
      /* Gdyby dokument nie wczytał się w ogóle, przestajemy nasłuchiwać. */
      window.setTimeout(function () { obserwator.disconnect(); }, 30000);
    }
  }

  /* Pasek chowa się przy przewijaniu w dół i wraca przy przewijaniu w górę.
     Trzy zastrzeżenia, bez których to irytuje:
     - przy otwartym menu pasek zostaje, bo chowałby własny przycisk;
     - u samej góry strony pasek jest zawsze widoczny;
     - drobne ruchy poniżej progu są ignorowane, żeby pasek nie migotał przy
       odbiciu palcem na telefonie. */
  var pasek = document.querySelector('.topbar');
  if (!pasek) return;

  var ostatniY = window.pageYOffset || 0;
  var prog = 6;

  window.addEventListener(
    'scroll',
    function () {
      var y = window.pageYOffset || 0;
      if (!menu.hidden || y <= 0) {
        pasek.classList.remove('schowany');
        ostatniY = y;
        return;
      }
      var roznica = y - ostatniY;
      if (Math.abs(roznica) < prog) return;
      pasek.classList.toggle('schowany', roznica > 0);
      ostatniY = y;
    },
    { passive: true }
  );
})();
