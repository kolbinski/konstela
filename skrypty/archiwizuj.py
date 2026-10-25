#!/usr/bin/env python3
"""
Kopia archiwalna zgloszonej rozmowy.

Uruchomienie:
    pip3 install playwright
    python3 -m playwright install chromium
    python3 archiwizuj.py "https://share.gemini.google/XXXX" [katalog_wyjsciowy]

Zapisuje do katalogu <wyjscie>/<znacznik_czasu>_<skrot_url>/:

    dialog.json      - ZRODLO PRAWDY: tury jako obiekty, rola, tekst, statystyki
    rozmowa.html     - do czytania w archiwum   (generowane z dialog.json)
    rozmowa.pdf      - do pobrania i druku      (generowane z rozmowa.html)
    rozmowa.epub     - do czytnikow             (generowane z dialog.json)
    meta.json        - adresy, czas, sumy kontrolne wszystkich plikow
    zrodlo/          - surowy zapis, do przechowania, NIE do pokazywania:
        page.html       surowy HTML (po otwarciu uruchamia skrypty dostawcy
                        i rysuje stan pusty - sluzy wylacznie do ponownej
                        ekstrakcji, gdyby ktos zakwestionowal nasz odczyt)
        screenshot.png  zrzut strony dostawcy
        text.txt        plaski tekst calej strony

Czego na stronie udostepnionej rozmowy NIE MA (sprawdzone na Gemini 21.10.2026):
    - czasow wysylania poszczegolnych wypowiedzi
    - nazwy i wersji modelu, ktory odpowiadal
Oba trzeba pozyskac od Uczestnika w formularzu - z linku ich nie odtworzymy.

Co jeszcze trzeba zrobic:
    - profil selektorow dla Claude (ponizej Gemini i ChatGPT)
    - pobieranie obrazow i zalacznikow osadzonych w rozmowie
"""

import sys, os, re, json, html, zipfile, hashlib, uuid, shutil
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright


# --------------------------------------------------------------------------
# Profile selektorow. Zalezne od dostawcy, zmieniaja sie bez uprzedzenia.
# --------------------------------------------------------------------------

PROFILE = {
    # profil wstepny, niesprawdzony na zywej stronie - przy chybieniu
    # ekstraktor cofa sie do calego wezla tury
    "claude": {
        "dopasowanie": "claude.ai",
        "tura": '[data-testid="user-message"], .font-claude-message,'
                ' [data-testid="assistant-message"]',
        "rola_uzytkownika": '[data-testid="user-message"]',
        "pomin": ".sr-only, [aria-hidden='true'], button",
        "akapity_uzytkownika": "p",
        "tresc_modelu": None,
    },
    "chatgpt": {
        "dopasowanie": "chatgpt.com",
        "tura": '[data-message-author-role="user"], [data-message-author-role="assistant"]',
        "rola_uzytkownika": '[data-message-author-role="user"]',
        "pomin": ".sr-only, [aria-hidden='true'], button",
        # u ChatGPT wypowiedz uzytkownika to jeden blok, nie osobne akapity -
        # selektor celuje w niego, a przy chybieniu ekstraktor bierze caly wezel
        "akapity_uzytkownika": ".whitespace-pre-wrap",
        "tresc_modelu": ".markdown",
    },
    "gemini": {
        "dopasowanie": "gemini.google.com",
        "tura": "user-query, response-container",
        "rola_uzytkownika": "user-query",
        # h5.cdk-visually-hidden powtarza cala wypowiedz dla czytnikow ekranu;
        # bez pominiecia go udzial czlowieka liczy sie podwojnie
        "pomin": "h5.cdk-visually-hidden, .screen-reader-user-query-label",
        "akapity_uzytkownika": "p.query-text-line",
        "tresc_modelu": "message-content",
    },
}

# Zamkniecie zgody na ciasteczka. Bez tego modal zasłania kazda strone zrzutu.
JS_ZAMKNIJ_ZGODE = r"""
() => {
  const wzor = /^(zgadzam|akceptuj|zaakceptuj|zgoda|rozumiem|ok|accept|agree|got it|I agree)/i;
  let klikniete = 0;
  document.querySelectorAll('button, [role="button"]').forEach(b => {
    const t = (b.innerText || b.getAttribute('aria-label') || '').trim();
    if (wzor.test(t)) { try { b.click(); klikniete++; } catch (e) {} }
  });
  const usuniete = [];
  const podejrzane = '[role="dialog"], [role="alertdialog"], dialog, .cdk-overlay-container,' +
                     '[class*="consent"], [id*="consent"], [class*="cookie"], [id*="cookie"]';
  document.querySelectorAll(podejrzane).forEach(n => {
    if (n.querySelector('user-query, response-container')) return;  // nie ruszamy rozmowy
    usuniete.push(n.tagName.toLowerCase() + (n.className ? '.' + String(n.className).slice(0, 40) : ''));
    n.remove();
  });
  document.querySelectorAll('.cdk-overlay-backdrop, [class*="backdrop"], [class*="scrim"]')
          .forEach(n => n.remove());
  for (const el of [document.documentElement, document.body]) {
    el.style.overflow = 'auto';
    el.style.position = 'static';
    el.classList.remove('cdk-global-scrollblock');
  }
  return { klikniete, usuniete };
}
"""

JS_EKSTRAKCJA = r"""
(profil) => {
  const bezUkrytych = (el) => {
    const k = el.cloneNode(true);
    if (profil.pomin) k.querySelectorAll(profil.pomin).forEach(n => n.remove());
    return k;
  };
  const czysc = (s) => s.replace(/ /g, " ")
                        .replace(/[ \t]+\n/g, "\n")
                        .replace(/\n{3,}/g, "\n\n").trim();
  const wynik = [];
  Array.from(document.querySelectorAll(profil.tura)).forEach((w, i) => {
    const czlowiek = w.matches(profil.rola_uzytkownika);
    const k = bezUkrytych(w);
    const tresc = (el) => el.innerText != null ? el.innerText : el.textContent;
    let tekst = "";
    if (czlowiek && profil.akapity_uzytkownika) {
      tekst = Array.from(k.querySelectorAll(profil.akapity_uzytkownika))
                   .map(tresc).join("\n");
    } else if (!czlowiek && profil.tresc_modelu) {
      const c = k.querySelector(profil.tresc_modelu);
      if (c) tekst = tresc(c);
    }
    // selektor wewnetrzny chybil (inny uklad u dostawcy) - bierzemy caly wezel
    if (!String(tekst).trim()) tekst = tresc(k);
    tekst = czysc(tekst || "");
    if (!tekst) return;
    wynik.push({
      nr: wynik.length + 1,
      kolejnosc_w_dom: i,
      rola: czlowiek ? "czlowiek" : "model",
      tekst: tekst,
      znakow: tekst.length,
      slow: (tekst.match(/\S+/g) || []).length,
    });
  });
  return wynik;
}
"""


# --------------------------------------------------------------------------
# Pomocnicze
# --------------------------------------------------------------------------

def sha256(sciezka):
    h = hashlib.sha256()
    with open(sciezka, "rb") as f:
        for kawalek in iter(lambda: f.read(65536), b""):
            h.update(kawalek)
    return h.hexdigest()


# --------------------------------------------------------------------------
# ChatGPT: ekstrakcja z ladunku danych, nie z drzewa dokumentu.
#
# Strona ChatGPT czesto nie renderuje rozmowy ("Content failed to load"), ale
# cale dane siedza w <script> jako strumien turbo-stream React Routera.
# Ladunek jest lepszym zrodlem niz DOM: ma role autora wprost, czasy wyslania
# i nazwe modelu, ktorych w drzewie dokumentu nie ma.
# --------------------------------------------------------------------------

def _turbo_strumien(html_strony):
    kawalki = re.findall(r'streamController\.enqueue\((".*?")\);', html_strony, re.S)
    return "".join(json.loads(k) for k in kawalki)


def _turbo_tablica(strumien):
    """Pierwsza linia to tablica glowna; kolejne 'P<idx>:<json>' to doladowania."""
    linie = [l for l in strumien.split("\n") if l.strip()]
    if not linie:
        return None
    plaska = json.loads(linie[0])
    for l in linie[1:]:
        m = re.match(r"^P(\d+):(.*)$", l, re.S)
        if not m:
            continue
        i = int(m.group(1))
        while len(plaska) <= i:
            plaska.append(None)
        plaska[i] = json.loads(m.group(2))
    return plaska


def _turbo_rozwin(plaska):
    """{'_<idx klucza>': <idx wartosci>} oraz [idx, idx]; liczby ujemne to wartosci specjalne."""
    SPEC = {-7: True, -8: False}
    pamiec = {}

    def we(i, slad=()):
        if not isinstance(i, int):      # wartosc wpisana wprost, nie referencja
            return i
        if i < 0:
            return SPEC.get(i)
        if i in pamiec:
            return pamiec[i]
        if i in slad:                   # cykl w grafie referencji
            return None
        w = plaska[i]
        if isinstance(w, dict):
            out = {}
            pamiec[i] = out
            for k, v in w.items():
                klucz = we(int(k[1:]), slad + (i,)) if k.startswith("_") else k
                out[klucz if isinstance(klucz, str) else str(klucz)] = we(v, slad + (i,))
            return out
        if isinstance(w, list):
            out = []
            pamiec[i] = out
            out.extend(we(x, slad + (i,)) for x in w)
            return out
        pamiec[i] = w
        return w

    return we(0)


def _szukaj(obj, pred):
    if pred(obj):
        return obj
    if isinstance(obj, dict):
        for v in obj.values():
            t = _szukaj(v, pred)
            if t is not None:
                return t
    elif isinstance(obj, list):
        for v in obj:
            t = _szukaj(v, pred)
            if t is not None:
                return t
    return None


def tury_z_ladunku_chatgpt(html_strony):
    """Zwraca (tury, metadane) albo (None, powod_niepowodzenia)."""
    sys.setrecursionlimit(50000)
    try:
        plaska = _turbo_tablica(_turbo_strumien(html_strony))
        if not plaska:
            return None, "brak strumienia turbo-stream w stronie"
        drzewo = _turbo_rozwin(plaska)
        dane = _szukaj(drzewo, lambda o: isinstance(o, dict)
                       and "mapping" in o and "current_node" in o)
        if not dane:
            return None, "w ladunku nie ma drzewa rozmowy (mapping/current_node)"
    except Exception as e:
        return None, f"{type(e).__name__}: {e}"

    mapping = dane["mapping"]
    # sciezka od wezla biezacego w gore - pomija gałęzie porzucone przy edycji
    sciezka, w = [], dane.get("current_node")
    while w:
        n = mapping.get(w) or {}
        sciezka.append(n)
        w = n.get("parent")
    sciezka.reverse()

    surowe, modele, pominiete = [], set(), {"narzedzia": 0, "system": 0, "inny_typ": 0}
    for n in sciezka:
        m = n.get("message")
        if not m:
            continue
        rola = (m.get("author") or {}).get("role")
        md = m.get("metadata") or {}
        if md.get("model_slug"):
            modele.add(md["model_slug"])
        if rola in ("system", "tool"):
            pominiete["system" if rola == "system" else "narzedzia"] += 1
            continue
        c = m.get("content") or {}
        if c.get("content_type") != "text":
            pominiete["inny_typ"] += 1
            continue
        tekst = "\n\n".join(x for x in (c.get("parts") or []) if isinstance(x, str)).strip()
        if not tekst:
            continue
        surowe.append({"rola": "czlowiek" if rola == "user" else "model",
                       "tekst": tekst, "czas": m.get("create_time")})

    # model odpowiada czesto kilkoma wiadomosciami pod rzad (kroki rozumowania,
    # wywolania narzedzi); dla oceny formalnej to JEDNA odpowiedz
    tury = []
    for s in surowe:
        if tury and tury[-1]["rola"] == s["rola"]:
            tury[-1]["tekst"] += "\n\n" + s["tekst"]
            tury[-1]["czas_do"] = s["czas"]
        else:
            tury.append({"nr": len(tury) + 1, "kolejnosc_w_dom": None,
                         "rola": s["rola"], "tekst": s["tekst"],
                         "czas_od": s["czas"], "czas_do": s["czas"]})
    for t in tury:
        t["nr"] = tury.index(t) + 1
        t["znakow"] = len(t["tekst"])
        t["slow"] = len(re.findall(r"\S+", t["tekst"]))

    czasy = [c for t in tury for c in (t.get("czas_od"), t.get("czas_do")) if c]
    na_utc = lambda s: datetime.fromtimestamp(s, timezone.utc).isoformat()
    meta = {
        "zrodlo_ekstrakcji": "ladunek danych strony (turbo-stream)",
        "tytul_u_dostawcy": dane.get("title"),
        "model": sorted(modele)[0] if len(modele) == 1 else (sorted(modele) or None),
        "pierwsza_wypowiedz_utc": na_utc(min(czasy)) if czasy else None,
        "ostatnia_wypowiedz_utc": na_utc(max(czasy)) if czasy else None,
        "dni_kalendarzowe_rozmowy": sorted({na_utc(c)[:10] for c in czasy}) if czasy else [],
        "wezlow_w_drzewie": len(mapping),
        "wezlow_na_sciezce": len(sciezka),
        "galezie_porzucone": len(mapping) - len(sciezka),
        "pominiete_wiadomosci": pominiete,
    }
    return tury, meta


def wybierz_profil(adres):
    for nazwa, p in PROFILE.items():
        if p["dopasowanie"] in adres:
            return nazwa, p
    return None, None


def statystyki(tury):
    czl = [t for t in tury if t["rola"] == "czlowiek"]
    mod = [t for t in tury if t["rola"] == "model"]
    zn_czl, zn_mod = sum(t["znakow"] for t in czl), sum(t["znakow"] for t in mod)
    razem = zn_czl + zn_mod
    naprzemiennie = (
        all(tury[i]["rola"] != tury[i + 1]["rola"] for i in range(len(tury) - 1))
        if len(tury) > 1 else None
    )
    return {
        "tur_lacznie": len(tury),
        "wypowiedzi_czlowieka": len(czl),
        "odpowiedzi_modelu": len(mod),
        "znakow_czlowiek": zn_czl,
        "znakow_model": zn_mod,
        "slow_czlowiek": sum(t["slow"] for t in czl),
        "slow_model": sum(t["slow"] for t in mod),
        "slow_lacznie": sum(t["slow"] for t in tury),
        "udzial_czlowieka": round(zn_czl / razem, 4) if razem else None,
        "najdluzsza_wypowiedz_czlowieka_znakow": max((t["znakow"] for t in czl), default=0),
        "rozmowa_naprzemienna": naprzemiennie,
        "rozpoczyna": tury[0]["rola"] if tury else None,
    }


def poczekaj_az_ustabilizuje(page, spokoj_ms=1500, limit_ms=30000):
    """Czeka, az rozmiar dokumentu przestanie rosnac. Zastepuje 'networkidle',
    ktory nie nastepuje u dostawcow trzymajacych stale polaczenie."""
    poprzedni, bez_zmian, czekano = -1, 0, 0
    while czekano < limit_ms:
        try:
            teraz = page.evaluate("document.documentElement.innerHTML.length")
        except Exception:
            break
        if teraz == poprzedni:
            bez_zmian += 500
            if bez_zmian >= spokoj_ms:
                break
        else:
            bez_zmian = 0
            poprzedni = teraz
        page.wait_for_timeout(500)
        czekano += 500


def przewin_do_konca(page, max_prob=40):
    """Strony udostepnionych rozmow doczytuja tresc przy przewijaniu."""
    poprzednia = -1
    for _ in range(max_prob):
        wysokosc = page.evaluate("document.body.scrollHeight")
        if wysokosc == poprzednia:
            break
        poprzednia = wysokosc
        page.mouse.wheel(0, wysokosc)
        page.wait_for_timeout(700)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)


# --------------------------------------------------------------------------
# Rendering z dialog.json
# --------------------------------------------------------------------------

STYL = """
:root { --tlo:#fff; --tekst:#1a1a1a; --slaby:#6b6b6b; --linia:#e2e0db;
        --czl-tlo:#f4f2ed; --czl-akcent:#1a1a1a; --mod-akcent:#c9c5bb; }
body { background:var(--tlo); color:var(--tekst); margin:0;
       font-family:Georgia,'Times New Roman',serif; font-size:17px; line-height:1.62; }
.strona { max-width:40rem; margin:0 auto; padding:3rem 1.4rem 5rem; }
header { border-bottom:1px solid var(--linia); padding-bottom:1.4rem; margin-bottom:2.4rem; }
h1 { font-size:1.5rem; line-height:1.25; margin:0 0 .6rem; font-weight:600; }
.metryczka { font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
             font-size:.82rem; color:var(--slaby); line-height:1.55; }
.metryczka a { color:var(--slaby); }
.tura { margin:0 0 1.9rem; }
.rola { font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
        font-size:.68rem; letter-spacing:.09em; text-transform:uppercase;
        color:var(--slaby); margin:0 0 .45rem; }
.tura.czlowiek .tresc { background:var(--czl-tlo); border-left:3px solid var(--czl-akcent);
                        padding:.9rem 1.1rem; }
.tura.model .tresc { border-left:3px solid var(--mod-akcent); padding:.9rem 1.1rem; }
.tresc p { margin:0 0 .75rem; }
.tresc p:last-child { margin-bottom:0; }
footer { border-top:1px solid var(--linia); margin-top:3rem; padding-top:1.2rem;
         font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
         font-size:.75rem; color:var(--slaby); line-height:1.6; }
@media print {
  body { font-size:11.5pt; }
  .strona { max-width:none; padding:0; }
  .tura { page-break-inside:avoid; }
}
@media (prefers-color-scheme:dark) {
  :root:not([data-theme="light"]) { --tlo:#15140f; --tekst:#eceae4; --slaby:#9c978c;
    --linia:#312e27; --czl-tlo:#201e18; --czl-akcent:#eceae4; --mod-akcent:#4a463c; }
}
"""


def akapity(tekst):
    bloki = [b.strip() for b in re.split(r"\n\s*\n", tekst) if b.strip()]
    if not bloki:
        bloki = [tekst.strip()]
    return "".join(
        "<p>" + "<br/>".join(html.escape(l) for l in b.split("\n")) + "</p>"
        for b in bloki
    )


def naglowek_rozmowy(dialog):
    st = dialog["statystyki"]
    md = dialog.get("metadane_dostawcy") or {}
    dni = md.get("dni_kalendarzowe_rozmowy") or []
    if len(dni) > 1:
        data = f"{dni[0]} - {dni[-1]} ({len(dni)} dni)"
    else:
        data = dialog.get("data_rozmowy") or "nie podano"
    model = dialog.get("model")
    if isinstance(model, list):
        model = ", ".join(model)
    return (
        f'Model: {html.escape(model or "nie podano")} · '
        f'data rozmowy: {html.escape(data)}<br/>'
        f'{st["tur_lacznie"]} tur · {st["slow_lacznie"]} słów · '
        f'udział człowieka: '
        f'{"-" if st["udzial_czlowieka"] is None else format(st["udzial_czlowieka"] * 100, ".1f") + "%"}'
    )


def zapisz_html(dialog, sciezka, tytul):
    czesci = [
        "<!doctype html>", '<html lang="pl"><head><meta charset="utf-8"/>',
        '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
        f"<title>{html.escape(tytul)}</title><style>{STYL}</style></head><body>",
        '<div class="strona"><header>', f"<h1>{html.escape(tytul)}</h1>",
        f'<div class="metryczka">{naglowek_rozmowy(dialog)}</div></header><main>',
    ]
    for t in dialog["tury"]:
        etykieta = "Człowiek" if t["rola"] == "czlowiek" else "Model"
        czesci.append(
            f'<section class="tura {t["rola"]}">'
            f'<p class="rola">{etykieta} · {t["nr"]}</p>'
            f'<div class="tresc">{akapity(t["tekst"])}</div></section>'
        )
    czesci.append(
        "</main><footer>"
        f'Kopia archiwalna sporządzona {html.escape(dialog["czas_pobrania_utc"][:19])} UTC '
        f'z adresu <a href="{html.escape(dialog["adres_koncowy"])}">'
        f'{html.escape(dialog["adres_koncowy"])}</a>.<br/>'
        "Zapis wygenerowany z pliku dialog.json. Archiwum Nagrody Konstela."
        "</footer></div></body></html>"
    )
    with open(sciezka, "w", encoding="utf-8") as f:
        f.write("".join(czesci))


def zapisz_epub(dialog, sciezka, tytul):
    ident = "urn:uuid:" + str(uuid.uuid4())
    data = dialog["czas_pobrania_utc"][:19] + "Z"

    rozdzial = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl"><head>',
        f"<title>{html.escape(tytul)}</title>",
        '<link rel="stylesheet" type="text/css" href="style.css"/></head><body>',
        f'<div class="strona"><header><h1>{html.escape(tytul)}</h1>',
        f'<div class="metryczka">{naglowek_rozmowy(dialog)}</div></header>',
    ]
    for t in dialog["tury"]:
        etykieta = "Człowiek" if t["rola"] == "czlowiek" else "Model"
        rozdzial.append(
            f'<section class="tura {t["rola"]}">'
            f'<p class="rola">{etykieta} · {t["nr"]}</p>'
            f'<div class="tresc">{akapity(t["tekst"])}</div></section>'
        )
    rozdzial.append("</div></body></html>")

    nav = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<html xmlns="http://www.w3.org/1999/xhtml" '
        'xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="pl">'
        "<head><title>Spis treści</title></head><body>"
        '<nav epub:type="toc" id="toc"><h1>Spis treści</h1><ol>'
        f'<li><a href="rozmowa.xhtml">{html.escape(tytul)}</a></li>'
        "</ol></nav></body></html>"
    )
    opf = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<package xmlns="http://www.idpf.org/2007/opf" version="3.0" '
        'unique-identifier="pub-id"><metadata '
        'xmlns:dc="http://purl.org/dc/elements/1.1/">'
        f'<dc:identifier id="pub-id">{ident}</dc:identifier>'
        f"<dc:title>{html.escape(tytul)}</dc:title>"
        "<dc:language>pl</dc:language>"
        "<dc:publisher>Nagroda Konstela</dc:publisher>"
        f'<meta property="dcterms:modified">{data}</meta>'
        "</metadata><manifest>"
        '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>'
        '<item id="r1" href="rozmowa.xhtml" media-type="application/xhtml+xml"/>'
        '<item id="css" href="style.css" media-type="text/css"/>'
        '</manifest><spine><itemref idref="r1"/></spine></package>'
    )
    kontener = (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<container version="1.0" '
        'xmlns="urn:oasis:names:tc:opendocument:xmlns:container">'
        '<rootfiles><rootfile full-path="OEBPS/content.opf" '
        'media-type="application/oebps-package+xml"/></rootfiles></container>'
    )

    with zipfile.ZipFile(sciezka, "w") as z:
        # mimetype musi byc pierwszy i nieskompresowany
        z.writestr(zipfile.ZipInfo("mimetype"), "application/epub+zip",
                   compress_type=zipfile.ZIP_STORED)
        for nazwa, tresc in [
            ("META-INF/container.xml", kontener),
            ("OEBPS/content.opf", opf),
            ("OEBPS/nav.xhtml", nav),
            ("OEBPS/style.css", STYL),
            ("OEBPS/rozmowa.xhtml", "".join(rozdzial)),
        ]:
            z.writestr(nazwa, tresc, compress_type=zipfile.ZIP_DEFLATED)


# --------------------------------------------------------------------------

def archiwizuj(url, katalog_bazowy="kopie", tytul=None):
    czas = datetime.now(timezone.utc)
    znacznik = czas.strftime("%Y%m%dT%H%M%SZ")
    skrot = hashlib.sha256(url.encode()).hexdigest()[:10]
    katalog = os.path.join(katalog_bazowy, f"{znacznik}_{skrot}")
    zrodlo = os.path.join(katalog, "zrodlo")
    os.makedirs(zrodlo, exist_ok=True)

    with sync_playwright() as p:
        przegladarka = p.chromium.launch()
        ctx = przegladarka.new_context(
            viewport={"width": 1280, "height": 1600},
            device_scale_factor=2, locale="pl-PL",
        )
        page = ctx.new_page()
        # NIE czekamy na "networkidle": dostawcy trzymaja stale polaczenia
        # (websocket, long-polling), wiec siec nigdy nie milknie i goto leci
        # do limitu czasu. Wchodzimy na domcontentloaded, potem czekamy, az
        # przestanie przybywac tresci.
        odpowiedz = page.goto(url, wait_until="domcontentloaded", timeout=60000)
        status = odpowiedz.status if odpowiedz else None
        try:
            page.wait_for_load_state("networkidle", timeout=12000)
        except Exception:
            pass
        poczekaj_az_ustabilizuje(page)

        zgoda = page.evaluate(JS_ZAMKNIJ_ZGODE)
        page.wait_for_timeout(800)
        przewin_do_konca(page)
        # modal potrafi wrocic po doczytaniu tresci
        page.evaluate(JS_ZAMKNIJ_ZGODE)
        page.wait_for_timeout(400)

        adres_koncowy = page.url
        nazwa_profilu, profil = wybierz_profil(adres_koncowy)
        html_strony = page.content()
        meta_dostawcy = {}

        if nazwa_profilu == "chatgpt":
            # najpierw ladunek danych - ma role, czasy i nazwe modelu
            tury, wynik = tury_z_ladunku_chatgpt(html_strony)
            if tury:
                blad, meta_dostawcy = None, wynik
            else:
                blad = f"ladunek: {wynik}; proba odczytu z drzewa dokumentu"
                try:
                    tury = page.evaluate(JS_EKSTRAKCJA, profil)
                except Exception as e:
                    tury = []
                    blad += f"; DOM: {type(e).__name__}: {e}"
        elif profil:
            try:
                tury, blad = page.evaluate(JS_EKSTRAKCJA, profil), None
            except Exception as e:
                tury, blad = [], f"{type(e).__name__}: {e}"
        else:
            tury, blad = [], "brak profilu selektorow dla tej domeny"

        with open(os.path.join(zrodlo, "page.html"), "w", encoding="utf-8") as f:
            f.write(html_strony)
        with open(os.path.join(zrodlo, "text.txt"), "w", encoding="utf-8") as f:
            f.write(page.inner_text("body"))
        page.screenshot(path=os.path.join(zrodlo, "screenshot.png"), full_page=True)

        dialog = {
            "adres_podany": url,
            "adres_koncowy": adres_koncowy,
            "dostawca": nazwa_profilu,
            "czas_pobrania_utc": czas.isoformat(),
            # Gemini: oba pola trzeba wziac z formularza, strona ich nie niesie.
            # ChatGPT: wypelniaja sie z ladunku danych.
            "model": meta_dostawcy.get("model"),
            "data_rozmowy": (meta_dostawcy.get("dni_kalendarzowe_rozmowy") or [None])[0],
            "metadane_dostawcy": meta_dostawcy or None,
            "zgoda_na_ciasteczka": zgoda,
            "blad_ekstrakcji": blad,
            "statystyki": statystyki(tury),
            "tury": tury,
        }
        with open(os.path.join(katalog, "dialog.json"), "w", encoding="utf-8") as f:
            json.dump(dialog, f, ensure_ascii=False, indent=2)

        tytul = tytul or meta_dostawcy.get("tytul_u_dostawcy") or f"Rozmowa {skrot}"
        sc_html = os.path.join(katalog, "rozmowa.html")
        zapisz_html(dialog, sc_html, tytul)
        zapisz_epub(dialog, os.path.join(katalog, "rozmowa.epub"), tytul)

        # PDF z NASZEGO renderingu, nie ze strony dostawcy
        strona_pdf = ctx.new_page()
        strona_pdf.goto("file://" + os.path.abspath(sc_html), wait_until="load")
        strona_pdf.emulate_media(color_scheme="light")
        strona_pdf.pdf(path=os.path.join(katalog, "rozmowa.pdf"), format="A4",
                       print_background=True,
                       margin={"top": "18mm", "bottom": "18mm",
                               "left": "20mm", "right": "20mm"})
        przegladarka.close()

    pliki = ["dialog.json", "rozmowa.html", "rozmowa.pdf", "rozmowa.epub",
             "zrodlo/page.html", "zrodlo/screenshot.png", "zrodlo/text.txt"]
    meta = {
        "adres_podany": url,
        "adres_koncowy": dialog["adres_koncowy"],
        "status_http": status,
        "czas_utc": czas.isoformat(),
        "zgoda_na_ciasteczka": zgoda,
        "blad_ekstrakcji": blad,
        "statystyki": dialog["statystyki"],
        "sumy_kontrolne": {n: sha256(os.path.join(katalog, n)) for n in pliki},
    }
    with open(os.path.join(katalog, "meta.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

    print(json.dumps(meta, ensure_ascii=False, indent=2))
    print("\nZapisano w:", os.path.abspath(katalog))
    return katalog


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    archiwizuj(sys.argv[1],
               sys.argv[2] if len(sys.argv) > 2 else "kopie",
               sys.argv[3] if len(sys.argv) > 3 else None)
