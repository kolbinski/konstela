marked.setOptions({ gfm: true, breaks: true });

      const params = new URLSearchParams(window.location.search);
      const el = document.getElementById('content');

      // Dwie równoważne postacie adresu:
      //   /dokument/regulamin-rozmowy        - przepisywana regułą w Cloudflare na /view.html
      //   /view.html?file=regulamin  - postać pierwotna, linki już poszły w świat
      // Nazwę podaje się bez rozszerzenia; końcówkę .md dopisuje skrypt.
      // Adresy dedykowane: własny adres bez członu /dokument/, przepisywany
      // regułą w Cloudflare wprost na /view.html. Dopisanie nowego wymaga
      // wpisu tutaj oraz reguły w panelu - patrz cloudflare-instrukcja.
      const DEDYKOWANE = {
        '/plebiscyt-piosenki': 'plebiscyt-piosenki',
      };

      let raw = (params.get('file') || '').trim();
      if (!raw) {
        // /plebiscyt-piosenki, /plebiscyt-piosenki/ oraz
        // /plebiscyt-piosenki/index.html mają prowadzić do tego samego
        const sciezka =
          window.location.pathname
            .replace(/\/index\.html?$/i, '')
            .replace(/\/+$/, '') || '/';
        if (DEDYKOWANE[sciezka]) {
          raw = DEDYKOWANE[sciezka];
        } else {
          const fromPath = window.location.pathname.match(/^\/dokument\/(.+?)\/?$/);
          if (fromPath) {
            try {
              raw = decodeURIComponent(fromPath[1]).trim();
            } catch (e) {
              raw = fromPath[1].trim();
            }
          }
        }
      }

      function state(title, detail) {
        el.innerHTML =
          '<div class="state"><strong>' +
          title +
          '</strong>' +
          (detail || '') +
          '</div>';
        el.classList.add('loaded');
      }

      if (!raw) {
        state('Nie wskazano dokumentu', 'Poprawny adres: /dokument/regulamin-rozmowy');
      } else if (/\.md$/i.test(raw)) {
        state(
          'Nieprawidłowy adres dokumentu',
          'Pomiń końcówkę .md - poprawnie: /dokument/' + raw.replace(/\.md$/i, '')
        );
      } else if (!/^[\w-]+(?:\/[\w-]+)*$/.test(raw)) {
        state('Nieprawidłowy adres dokumentu', '');
      } else {
        // Ścieżka od korzenia, bo przy adresie /dokument/<nazwa> odwołanie
        // względne szukałoby pliku w nieistniejącym katalogu /dokument/.
        const file = '/' + raw + '.md';
        fetch(file)
          .then(r => {
            if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
            return r.text();
          })
          .then(md => {
            el.innerHTML = marked.parse(md);
            // Linki wychodzące poza serwis otwieramy w nowej karcie.
            el.querySelectorAll('a[href]').forEach(a => {
              if (a.hostname && a.hostname !== location.hostname) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
              }
            });
            /* Rozdzielacz między paragrafami - przed każdym nagłówkiem
               poza pierwszym, który stoi zaraz pod tytułem dokumentu.
               Strony budowane generatorem dostają to samo przy budowaniu. */
            const wzor = document.getElementById('rozdzielacz');
            if (wzor) {
              const naglowki = Array.from(el.querySelectorAll('h2')).slice(1);
              naglowki.forEach(h => {
                h.parentNode.insertBefore(wzor.content.cloneNode(true), h);
              });
            }
            const h1 = el.querySelector('h1');
            if (h1) document.title = h1.textContent + ' - Nagroda Konstela';
            el.classList.add('loaded');
            // Treść wstawiamy po załadowaniu strony, więc przeglądarka nie
            // zdążyła przewinąć do kotwicy z adresu - robimy to sami.
            const kotwica = decodeURIComponent(location.hash.replace(/^#/, ''));
            if (kotwica) {
              const cel = document.getElementById(kotwica);
              if (cel) cel.scrollIntoView();
            }
          })
          .catch(err => state('Nie udało się wczytać dokumentu', err.message));
      }
