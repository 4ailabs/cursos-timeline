const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const FILE = 'file:///Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/03_Caja_7_Actos/Caja_7_Actos_BN.html';
const AW = 610, AH = 910, SCALE = 4;
const OUT_DIR = path.join(__dirname, 'export_imagenes', '10_Caja_7_Actos_BN');

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('─'.repeat(60));
  console.log('Caja 7 Actos BN — Exportación PNG para impresión');
  console.log(`Resolución: ${AW * SCALE} × ${AH * SCALE} px por página`);
  console.log(`Carpeta: ${OUT_DIR}`);
  console.log('─'.repeat(60));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 8000, height: 6000, deviceScaleFactor: SCALE });
  await page.goto(FILE, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForFunction(() => document.readyState === 'complete');
  await new Promise(r => setTimeout(r, 5000));

  const panelHandles = await page.evaluateHandle((pw, ph) => {
    const result = [];
    for (const el of document.querySelectorAll('div')) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (
        Math.abs(rect.width - pw) < 4 &&
        Math.abs(rect.height - ph) < 4 &&
        style.overflow === 'hidden' &&
        rect.top >= 0
      ) result.push(el);
    }
    return result;
  }, AW, AH);

  const count = await page.evaluate(els => els.length, panelHandles);
  console.log(`\nPáginas detectadas: ${count}\n`);

  for (let i = 0; i < count; i++) {
    const el = await page.evaluateHandle((els, idx) => els[idx], panelHandles, i);
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, `pagina-${num}.png`);
    await el.asElement().screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ pagina-${num}.png  (${AW * SCALE} × ${AH * SCALE} px)`);
  }

  await browser.close();
  console.log('\n' + '─'.repeat(60));
  console.log(`✅ ${count} páginas exportadas`);
  console.log(`📁 ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
