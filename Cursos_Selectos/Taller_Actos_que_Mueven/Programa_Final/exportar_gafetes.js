const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

const SCALE = 4; // Alta resolución
const PORT = 3010;
const DIR_EXPORT = path.join(__dirname, 'export_imagenes', '04_Gafetes');

(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven™ — Exportación Gafetes para Pecho');
  console.log('Formato: 10 × 4.5 cm (Rectangular)');
  console.log('─'.repeat(60));

  fs.mkdirSync(DIR_EXPORT, { recursive: true });

  const files = [
    { url: 'Gafetes_Pecho_Color.html', subdir: 'Color' },
    { url: 'Gafetes_Pecho_BN.html', subdir: 'BN' }
  ];

  for (const {url, subdir} of files) {
    const subdir_path = path.join(DIR_EXPORT, subdir);
    fs.mkdirSync(subdir_path, { recursive: true });

    console.log(`\n📄 Procesando: ${url}`);

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 2000,
      height: 12000,
      deviceScaleFactor: SCALE
    });

    await page.goto(`http://localhost:${PORT}/${url}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    await page.waitForFunction(() => document.readyState === 'complete');
    await new Promise(r => setTimeout(r, 2000));

    const badges = await page.$$('.badge');
    console.log(`Detectadas ${badges.length} gafetes.`);

    let count = 0;
    for (let i = 0; i < badges.length; i++) {
      const el = badges[i];
      const box = await el.boundingBox();

      // Extraer nombre del gafete desde el DOM
      const name = await page.evaluate(el => {
        const nameEl = el.querySelector('.name');
        return nameEl ? nameEl.textContent.trim() : `gafete-${i}`;
      }, el);

      const filename = `${String(i + 1).padStart(2, '0')}_${name.replace(/\s+/g, '_')}.png`;
      const outPath = path.join(subdir_path, filename);

      await el.screenshot({ path: outPath, omitBackground: false });

      const pxW = Math.round(box.width * SCALE);
      const pxH = Math.round(box.height * SCALE);
      console.log(`  ✓ [${i + 1}/${badges.length}] ${filename}  —  ${pxW} × ${pxH} px`);
      count++;
    }

    await browser.close();
    console.log(`✅ ${count} gafetes ${subdir} exportados.`);
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`✅ Exportación completada.`);
  console.log(`📁 Carpeta: ${DIR_EXPORT}`);
  console.log('─'.repeat(60));
})();
