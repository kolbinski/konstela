# Warianty publikowania strony

Działający workflow jest jeden: `.github/workflows/publikuj.yml`. Tutaj leżą
warianty odstawione na bok, żeby dało się do nich wrócić bez grzebania w historii.

| Plik | Czym się różni | Kiedy wrócić |
|---|---|---|
| `publikuj-dwa-zadania.yml` | Budowanie i wdrażanie jako osobne zadania. „Re-run failed jobs" ponawia samo wdrożenie i korzysta z paczki już zbudowanej, więc nie powstaje druga paczka o tej samej nazwie. | Gdy wdrożenia zaczną się wywalać na chwilowych błędach GitHuba i ponawianie będzie częste. Kosztuje około 20 sekund na przebieg, bo wdrożenie czeka na przydzielenie drugiej maszyny. |

Wariant jednozadaniowy, czyli ten obecnie działający, jest szybszy i wystarcza
przy gęstych iteracjach. Jego jedyna pułapka: po nieudanym wdrożeniu trzeba
uruchomić ponownie **cały** przebieg, a nie samo nieudane zadanie.

Żeby podmienić wariant, skopiuj wybrany plik na `.github/workflows/publikuj.yml`.
Ten katalog jest usuwany przy budowaniu, więc nic z niego nie trafia na stronę.
