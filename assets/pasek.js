/* Górny pasek z menu sekcji - jedno źródło prawdy.
 *
 * Używany na: index.html, view.html oraz stronach budowanych przez
 * skrypty/buduj-dokumenty.js.
 *
 * Pozycje menu powstają z nagłówków strony, a nie z listy wpisanej ręcznie:
 * lista wpisana ręcznie rozjeżdża się z treścią przy każdej jej zmianie, a
 * rozjechanie widać dopiero wtedy, gdy ktoś kliknie odnośnik prowadzący w
 * nieistniejące miejsce.
 *
 * Dwa układy, jedno zachowanie:
 * - strona główna: sekcje <section id> z nagłówkiem h2, kotwicą jest id sekcji;
 * - dokument: nagłówki h2 w <main id="content">. Tylko h2 - menu ma być
 *   spisem paragrafów, a nie spisem treści; nagłówki niższego stopnia
 *   rozbijały ten rytm jedną pozycją na cały dokument. Nagłówki z markdownu
 *   nie mają identyfikatorów, więc nadajemy je z tekstu, z przedrostkiem
 *   "do-", żeby nie zderzyły się z kotwicami wpisanymi w treści ręcznie.
 *
 * Treść dokumentu budowanego jest w HTML od razu, a w view.html dochodzi
 * dopiero po wczytaniu pliku markdown - dlatego czekamy na nią obserwatorem.
 */
(function () {
  'use strict';

  var przycisk = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (!przycisk || !menu) return;

  var tresc = document.getElementById('content');
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

  /* Nagłówek ma zwykle postać ikona + <span>tytuł</span>. */
  function tytul(el) {
    return (el.querySelector('span') || el).textContent.replace(/\s+/g, ' ').trim();
  }

  function pozycja(fragment, href, tekst, podrzedna) {
    var a = document.createElement('a');
    a.href = href;
    a.textContent = tekst;
    if (podrzedna) a.className = 'pod';
    fragment.appendChild(a);
  }

  /* Wyłącznie strona główna: pod pozycją sekcji z plebiscytami wchodzą
     wcięte odnośniki do czterech podstron. Nie powstają z nagłówków, bo w
     sekcji ich nie ma - to są cztery osobne strony, a nie jej fragmenty. */
  var PODSTRONY = {
    plebiscyty: [
      ['/plebiscyt-rozmowy', 'Rozmowa ze sztuczną inteligencją'],
      ['/plebiscyt-filmu', 'Film o sztucznej inteligencji'],
      ['/plebiscyt-piosenki', 'Piosenka o sztucznej inteligencji'],
      ['/plebiscyt-plakatu', 'Plakat o sztucznej inteligencji'],
    ],
  };

  function zbuduj() {
    var fragment = document.createDocumentFragment();
    var dodane = 0;
    var i;

    if (tresc) {
      var naglowki = tresc.querySelectorAll('h2');
      for (i = 0; i < naglowki.length; i++) {
        var el = naglowki[i];
        var tekst = tytul(el);
        if (!tekst) continue;
        if (!el.id) {
          var id = naId(tekst);
          if (!id) continue;
          el.id = id;
        }
        pozycja(fragment, '#' + el.id, tekst);
        dodane++;
      }
    } else {
      var sekcje = document.querySelectorAll('section[id] > h2');
      for (i = 0; i < sekcje.length; i++) {
        var h2 = sekcje[i];
        var nazwa = tytul(h2);
        if (!h2.parentElement.id || !nazwa) continue;
        pozycja(fragment, '#' + h2.parentElement.id, nazwa, false);
        dodane++;
        var podrzedne = PODSTRONY[h2.parentElement.id];
        if (podrzedne) {
          for (var j = 0; j < podrzedne.length; j++) {
            pozycja(fragment, podrzedne[j][0], podrzedne[j][1], true);
            dodane++;
          }
        }
      }
    }

    /* Wystarczy jedna pozycja. Przycisk znika dopiero wtedy, gdy nie ma z
       czego zbudować menu w ogóle - na stronie 404 albo w dokumencie bez
       nagłówków. */
    if (!dodane) return false;
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

  /* Obserwatora wyłączamy po pierwszym udanym zbudowaniu, żeby późniejsze
     zmiany w treści nie przebudowywały menu w trakcie czytania. */
  if (!zbuduj()) {
    przycisk.hidden = true;
    menu.textContent = '';
    if (tresc && window.MutationObserver) {
      var obserwator = new MutationObserver(function () {
        if (zbuduj()) obserwator.disconnect();
      });
      obserwator.observe(tresc, { childList: true, subtree: true });
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
  var czeka = false;
  var PROG = 6;
  var ODSTEP = 80;

  function przelicz() {
    czeka = false;
    var y = window.pageYOffset || 0;
    if (y < 0) y = 0;
    var roznica = y - ostatniY;

    if (Math.abs(roznica) < PROG) return;

    if (!menu.hidden || y <= ODSTEP) {
      pasek.classList.remove('schowany');
    } else if (roznica > 0) {
      pasek.classList.add('schowany');
    } else {
      pasek.classList.remove('schowany');
    }
    ostatniY = y;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (czeka) return;
      czeka = true;
      window.requestAnimationFrame(przelicz);
    },
    { passive: true }
  );
})();
