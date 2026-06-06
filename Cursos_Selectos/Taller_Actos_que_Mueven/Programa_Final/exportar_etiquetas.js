const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

const SCALE = 4;
const PORT = 3010;
const URL = 'Etiquetas_Rectangulares_Nombres_RE.html';
const DIR_EXPORT = path.join(__dirname, 'export_imagenes', '05_Etiquetas_Rectangulares');

(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven™ — Exportación Etiquetas Rectangulares');
  console.log('─'.repeat(60));

  fs.mkdirSync(DIR_EXPORT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 2500,
    height: 15000,
    deviceScaleFactor: SCALE
  });

  console.log(`\nNavegando a ${URL}...`);
  await page.goto(`http://localhost:${PORT}/${URL}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  await page.waitForFunction(() => document.readyState === 'complete');
  await new Promise(r => setTimeout(r, 2000));

  const labels = await page.$$('.label, .badge, [class*="etiqueta"], [class*="tag"]');
  console.log(`Detectadas ${labels.length} etiquetas.`);

  let count = 0;
  for (let i = 0; i < labels.length; i++) {
    const el = labels[i];
    const box = await el.boundingBox();

    const name = await page.evaluate(el => {
      const textEl = el.querySelector('[class*="name"], .text, span');
      return textEl ? textEl.textContent.trim() : `etiqueta-${i}`;
    }, el);

    const filename = `${String(i + 1).padStart(2, '0')}_${name.replace(/\s+/g, '_').substring(0, 30)}.png`;
    const outPath = path.join(DIR_EXPORT, filename);

    await el.screenshot({ path: outPath, omitBackground: false });

    const pxW = Math.round(box.width * SCALE);
    const pxH = Math.round(box.height * SCALE);
    console.log(`  ✓ [${i + 1}/${labels.length}] ${filename}  —  ${pxW} × ${pxH} px`);
    count++;
  }

  await browser.close();

  console.log('\n' + '─'.repeat(60));
  console.log(`✅ ${count} etiquetas exportadas exitosamente.`);
  console.log(`📁 Carpeta: ${DIR_EXPORT}`);
  console.log('─'.repeat(60));
})();
