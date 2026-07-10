const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Exporta cada página del Manual del estudiante (letter horizontal) a PNG.
// Mismo patrón que exportar_slides.js. Alta resolución para impresión.
// Las PNG quedan en ./export_manual_png/

const HTML = 'Manual_Estudiante_Sesion1.html';
const OUTDIR = 'export_manual_png';
// Letter landscape a ~200 dpi: 11in x 200 = 2200, 8.5in x 200 = 1700.
const W = 2200;
const H = 1700;

(async () => {
  const outDir = path.resolve(__dirname, OUTDIR);
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  // La página mide 11in = 1056px @96dpi. deviceScaleFactor ~2.08 → 2200px de ancho.
  await page.setViewport({ width: 1056, height: 816, deviceScaleFactor: W / 1056 });

  const filePath = path.resolve(__dirname, HTML);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200)); // fuentes + isotipo SVG

  const N = await page.evaluate(() => document.querySelectorAll('.page').length);
  console.log('─'.repeat(60));
  console.log(`Exportando ${N} páginas de ${HTML}  (${W}×${H})`);
  console.log('─'.repeat(60));

  for (let i = 0; i < N; i++) {
    // Aísla la página i: muéstrala sola, sin sombras ni fondo gris.
    await page.evaluate((idx) => {
      const pages = document.querySelectorAll('.page');
      pages.forEach((p, k) => { p.style.display = (k === idx) ? 'flex' : 'none'; });
      document.body.style.padding = '0';
      document.body.style.gap = '0';
      document.body.style.background = '#fff';
      const p = pages[idx];
      p.style.boxShadow = 'none';
    }, i);
    await new Promise((r) => setTimeout(r, 200));

    const el = await page.$('.page[style*="flex"]');
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(outDir, `manual_p${num}.png`);
    if (el) {
      await el.screenshot({ path: outPath });
    } else {
      // fallback: captura el viewport
      await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1056, height: 816 } });
    }
    console.log(`  ✅ página ${i + 1}/${N}  →  manual_p${num}.png`);
  }

  await browser.close();
  console.log('─'.repeat(60));
  console.log(`Listo. ${N} PNG en ${OUTDIR}/`);
})();
