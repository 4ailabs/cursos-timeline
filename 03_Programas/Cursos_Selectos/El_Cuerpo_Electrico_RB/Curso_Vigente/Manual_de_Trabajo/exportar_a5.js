/**
 * exportar_a5.js — Exporta cada hoja (.sheet) del manual a PNG A5 (color y B&N).
 * No necesita servidor: carga el HTML por file:// (todo es inline).
 *
 * Uso:
 *   node exportar_a5.js
 * Requiere puppeteer (node_modules cercano o instalar con: npm i puppeteer)
 *
 * A5 = 148 × 210 mm. A 96 dpi: 559.4 × 793.7 px CSS.
 * deviceScaleFactor = 3.125 → ~300 dpi → 1748 × 2480 px por hoja.
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML = 'Modulo_1_Bloque_1.html';
const DPR = 3.125; // ~300 dpi

const PASES = [
  { modo: 'color', outdir: 'export_a5_png' },
  { modo: 'bw', outdir: 'export_a5_png_bn' },
];

(async () => {
  const filePath = path.resolve(__dirname, HTML);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 900, deviceScaleFactor: DPR }); // >640 para evitar el breakpoint móvil
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));

  const N = await page.evaluate(() => document.querySelectorAll('.sheet').length);
  console.log('─'.repeat(56));
  console.log(`Manual: ${HTML}  ·  ${N} hojas A5  ·  ${Math.round(559 * DPR)}×${Math.round(794 * DPR)} px`);
  console.log('─'.repeat(56));

  const overflow = [];

  for (const { modo, outdir } of PASES) {
    const outDir = path.resolve(__dirname, outdir);
    fs.mkdirSync(outDir, { recursive: true });
    for (const f of fs.readdirSync(outDir)) if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));

    // Preparar SIN ocultar hojas (así el contador de página CSS funciona).
    // El screenshot de elemento ya recorta a cada hoja.
    await page.evaluate((m) => {
      document.documentElement.setAttribute('data-mode', m === 'bw' ? 'bw' : 'color');
      document.body.style.background = '#fff';
      const book = document.querySelector('.book'); if (book) { book.style.padding = '0'; book.style.gap = '10px'; }
      const note = document.querySelector('.screen-note'); if (note) note.style.display = 'none';
      const ctrl = document.querySelector('.ctrl'); if (ctrl) ctrl.style.display = 'none';
      document.querySelectorAll('.sheet').forEach((s) => { s.style.boxShadow = 'none'; s.style.border = 'none'; });
    }, modo);

    console.log(`\n▶ ${modo.toUpperCase()}  →  ${outdir}/`);
    const handles = await page.$$('.sheet');
    for (let i = 0; i < handles.length; i++) {
      const h = await handles[i].evaluate((el) => Math.round(el.getBoundingClientRect().height));
      if (modo === 'color' && h > 800) overflow.push({ p: i + 1, h });
      const num = String(i + 1).padStart(2, '0');
      const outPath = path.join(outDir, `hoja-${num}.png`);
      await handles[i].screenshot({ path: outPath });
      process.stdout.write(`  ✓ hoja-${num}.png`);
    }
    console.log('');
  }

  await browser.close();
  console.log('\n' + '─'.repeat(56));
  console.log(`✅ ${N} hojas × 2 (color + B&N) exportadas.`);
  if (overflow.length) {
    console.log('\n⚠  Hojas que se pasan de A5 (>794px de alto):');
    overflow.forEach((o) => console.log(`   hoja ${o.p}: ${o.h}px (A5 = 794px)`));
  } else {
    console.log('   Todas las hojas caben en A5.');
  }
  console.log('─'.repeat(56));
})();
