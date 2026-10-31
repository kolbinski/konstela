/* Dzielenie wyrazów w tytule - dopasowanie do rzeczywistego ekranu.

   Skrypt budujący wstawia miękkie łączniki (U+00AD) do tych wyrazów, które
   nie zmieściłyby się w najwęższej kolumnie, jaka nam się zdarza: telefon
   320 px. Decyzja musi tam zapaść raz, dla wszystkich urządzeń, bo w pliku
   HTML nie wiadomo, kto go otworzy.

   Tutaj wiadomo. Miękki łącznik jest dla przeglądarki zwyczajnym miejscem
   podziału, a nie ostatecznością - jeżeli może nim dopchać wiersz do końca,
   to dopcha, nawet gdy wyraz zmieściłby się w osobnej linii w całości.
   Mierzymy więc tytuł na miejscu i odbieramy łączniki tym wyrazom, które
   u tego czytelnika mieszczą się w kolumnie. Zostaje reguła: dzielimy
   wyłącznie to, co naprawdę się nie mieści.

   Mierzymy prawdziwym krojem tytułu, bo kopiujemy styl z nagłówka - także
   wtedy, gdy przeglądarka sięgnęła po inny krój z listy zapasowej.
   Oryginalną treść trzymamy w pamięci, więc zwężenie okna przywraca
   łączniki, które szersze okno odebrało.

   Bez JavaScriptu - i w PDF, i przy drukowaniu - zostaje decyzja podjęta
   przy budowaniu. Jest bezpieczna: najwyżej dzieli wyraz, który na szerokim
   ekranie zmieściłby się w całości. */
(() => {
  const MIEKKI = '­';
  const oryginaly = new WeakMap();
  let linijka = null;

  /* Niewidoczny przymiar o stylu nagłówka. `white-space: pre` nie pozwala mu
     zawinąć wyrazu, więc szerokość jest szerokością całego wyrazu. */
  function przymierz(h1, wyraz) {
    if (!linijka) {
      linijka = document.createElement('span');
      linijka.setAttribute('aria-hidden', 'true');
      linijka.style.cssText =
        'position:absolute;top:0;left:-9999px;visibility:hidden;white-space:pre';
      document.body.appendChild(linijka);
    }
    const styl = getComputedStyle(h1);
    linijka.style.fontFamily = styl.fontFamily;
    linijka.style.fontSize = styl.fontSize;
    linijka.style.fontWeight = styl.fontWeight;
    linijka.style.fontStyle = styl.fontStyle;
    linijka.style.letterSpacing = styl.letterSpacing;
    linijka.textContent = wyraz;
    return linijka.getBoundingClientRect().width;
  }

  function dopasuj() {
    document.querySelectorAll('h1').forEach((h1) => {
      const kolumna = h1.clientWidth;
      if (!kolumna) return;

      const chodzik = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
      for (let wezel = chodzik.nextNode(); wezel; wezel = chodzik.nextNode()) {
        if (!oryginaly.has(wezel)) oryginaly.set(wezel, wezel.nodeValue);
        const tekst = oryginaly.get(wezel);
        if (tekst.indexOf(MIEKKI) === -1) continue;

        const nowy = tekst.replace(/\S*­\S*/g, (wyraz) => {
          const caly = wyraz.split(MIEKKI).join('');
          return przymierz(h1, caly) <= kolumna ? caly : wyraz;
        });
        if (wezel.nodeValue !== nowy) wezel.nodeValue = nowy;
      }
    });
  }

  let czeka = false;
  function zaplanuj() {
    if (czeka) return;
    czeka = true;
    requestAnimationFrame(() => {
      czeka = false;
      dopasuj();
    });
  }

  zaplanuj();
  /* Krój z pliku bywa gotowy później niż układ strony, a ma inne szerokości
     niż krój zastępczy, więc mierzymy jeszcze raz, gdy się wczyta. */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(zaplanuj);
  addEventListener('load', zaplanuj);
  addEventListener('resize', zaplanuj);
  addEventListener('orientationchange', zaplanuj);

  /* Tryb czytelny zmienia stopień pisma, a widok /dokument/ wstawia tytuł
     dopiero po wczytaniu pliku - jedno i drugie wymaga przemierzenia.
     Obserwujemy wyłącznie strukturę, nie treść, więc własna podmiana tekstu
     nie wywołuje nas w kółko. */
  new MutationObserver(zaplanuj).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
    childList: true,
    subtree: true,
  });
})();
