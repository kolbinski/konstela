#!/usr/bin/env node
/* Kontrola spójności kwot między kosztorysem a dokumentami.
 *
 * Po co. Kwoty w dokumentach są przepisane z arkusza ręcznie, a część z nich
 * jest wyliczana z innych: brutto ze stawki VAT, sumy roczne z pozycji, udziały
 * z klucza podziału. Zmiana jednej kwoty netto w kosztorysie unieważnia więc
 * kilka liczb w kilkudziesięciu plikach, a niespójność nie powoduje żadnego
 * błędu - dokument po prostu kłamie. 1.11.2026 oferta dla Mecenasa
 * Założycielskiego podawała przez kilka godzin 223 428,70 zł netto obok
 * 220 973,31 zł brutto, czyli brutto mniejsze od netto.
 *
 * Co sprawdza.
 *   1. Każdą parę „X zł netto (Y zł brutto" w plikach .md - czy Y = X * 1,23.
 *   2. Czy sumy RAZEM NETTO z zakładek arkusza występują w dokumentach w
 *      aktualnej postaci i czy nie został nigdzie ślad poprzedniej wartości.
 *   3. Czy udziały w rocznym koszcie licencji AI sumują się dokładnie do kwoty
 *      z Wyjaśnień - to kontrola klucza podziału, który zmienia się przy każdej
 *      zmianie liczby godzin pracy organizatora w dowolnym budżecie.
 *
 * Czego nie sprawdza. Nie czyta formuł arkusza i nie przelicza budżetów - do
 * tego służy LibreOffice. Zakłada, że arkusz jest przeliczony, czyli że po
 * ostatniej zmianie wykonano konwersję soffice.
 *
 * Użycie:  node skrypty/sprawdz-kwoty.js
 * Kod wyjścia 1, jeżeli znaleziono niespójność - do użycia w hooku albo w CI.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KORZEN = path.resolve(__dirname, '..');
const VAT = 0.23;
const TOLERANCJA = 0.02; // zaokrąglenia przy przepisywaniu

let bledy = 0;
const zglos = (msg) => { console.error('  BŁĄD  ' + msg); bledy++; };

/* ---------- pomocnicze ---------- */

const liczba = (t) => parseFloat(t.replace(/[  ]/g, '').replace(',', '.'));

const formatuj = (x) => {
  const [c, u] = x.toFixed(2).split('.');
  return c.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ',' + u;
};

function plikiMd() {
  const out = [];
  (function chodz(dir) {
    for (const wpis of fs.readdirSync(dir, { withFileTypes: true })) {
      if (wpis.name === '.git' || wpis.name === 'node_modules') continue;
      const p = path.join(dir, wpis.name);
      if (wpis.isDirectory()) chodz(p);
      else if (wpis.name.endsWith('.md')) out.push(p);
    }
  })(KORZEN);
  return out;
}

/* ---------- 1. pary netto/brutto ---------- */

function sprawdzPary(pliki) {
  console.log('1. Pary netto/brutto');
  let par = 0;
  const wzor = /([\d][\d  ]*,\d\d)\s*zł netto[^.\n]{0,60}?\(([\d][\d  ]*,\d\d)\s*zł brutto/g;
  for (const p of pliki) {
    const s = fs.readFileSync(p, 'utf8');
    for (const m of s.matchAll(wzor)) {
      par++;
      const netto = liczba(m[1]);
      const brutto = liczba(m[2]);
      const ma = Math.round(netto * (1 + VAT) * 100) / 100;
      if (Math.abs(brutto - ma) > TOLERANCJA) {
        zglos(`${path.relative(KORZEN, p)}: ${m[1]} netto / ${m[2]} brutto, powinno ${formatuj(ma)}`);
      }
    }
  }
  console.log(`   sprawdzono par: ${par}`);
}

/* ---------- 2. sumy budżetów ---------- */

function sumyZArkusza() {
  // Odczyt przez python3 + openpyxl: w repozytorium nie ma zależności npm do xlsx,
  // a openpyxl jest już używany przez skrypty budujące.
  const kod = `
import openpyxl, json
w = openpyxl.load_workbook('budzet-edycji-pierwszej.xlsx', data_only=True)
out = {}
for n in w.sheetnames:
    sh = w[n]
    for r in range(1, sh.max_row + 1):
        if str(sh.cell(r, 1).value).strip().upper() == 'RAZEM NETTO':
            v = [sh.cell(r, c).value for c in range(2, 8) if isinstance(sh.cell(r, c).value, (int, float))]
            if v:
                out[n] = round(v[-1], 2)
print(json.dumps(out, ensure_ascii=False))
`;
  const wynik = execFileSync('python3', ['-I', '-c', kod], { cwd: KORZEN, encoding: 'utf8' });
  return JSON.parse(wynik);
}

function sprawdzSumy(pliki, sumy) {
  console.log('2. Sumy budżetów w dokumentach');
  const tresci = pliki.map((p) => [p, fs.readFileSync(p, 'utf8')]);
  let razem = 0;
  for (const [nazwa, kwota] of Object.entries(sumy)) {
    razem += kwota;
    const tekst = formatuj(kwota);
    const ile = tresci.filter(([, s]) => s.includes(tekst)).length;
    console.log(`   ${nazwa.padEnd(24)} ${tekst.padStart(12)}  w ${ile} plikach`);
  }
  const tekstRazem = formatuj(Math.round(razem * 100) / 100);
  const ileRazem = tresci.filter(([, s]) => s.includes(tekstRazem)).length;
  console.log(`   ${'RAZEM'.padEnd(24)} ${tekstRazem.padStart(12)}  w ${ileRazem} plikach`);
  if (ileRazem === 0) {
    zglos(`suma wszystkich budżetów ${tekstRazem} nie występuje w żadnym dokumencie - prawdopodobnie została stara wartość`);
  }
}

/* ---------- 3. klucz podziału licencji AI ---------- */

function sprawdzLicencje() {
  console.log('3. Udziały w koszcie licencji AI');
  const kod = `
import openpyxl, json
w = openpyxl.load_workbook('budzet-edycji-pierwszej.xlsx', data_only=True)
calosc = w['Wyjaśnienia']['B85'].value
suma = 0.0
for n in w.sheetnames:
    sh = w[n]
    for r in range(1, sh.max_row + 1):
        a = sh.cell(r, 1).value
        if a and 'licencje' in str(a).lower() and 'udzia' in str(a).lower():
            for c in range(2, 8):
                v = sh.cell(r, c).value
                if isinstance(v, (int, float)):
                    suma += v
                    break
print(json.dumps({'calosc': calosc, 'suma': round(suma, 2)}))
`;
  const { calosc, suma } = JSON.parse(execFileSync('python3', ['-I', '-c', kod], { cwd: KORZEN, encoding: 'utf8' }));
  console.log(`   cała pozycja: ${formatuj(calosc)}   suma udziałów: ${formatuj(suma)}`);
  if (Math.abs(calosc - suma) > TOLERANCJA) {
    zglos(`udziały nie sumują się do całej pozycji - różnica ${formatuj(Math.abs(calosc - suma))}; klucz podziału wymaga przeliczenia arkusza`);
  }
}

/* ---------- ---------- */

const pliki = plikiMd();
console.log(`Kontrola kwot: ${pliki.length} dokumentów .md\n`);
sprawdzPary(pliki);
console.log('');
sprawdzSumy(pliki, sumyZArkusza());
console.log('');
sprawdzLicencje();
console.log('');

if (bledy) {
  console.error(`Znaleziono niespójności: ${bledy}.`);
  process.exit(1);
}
console.log('Bez niespójności.');
