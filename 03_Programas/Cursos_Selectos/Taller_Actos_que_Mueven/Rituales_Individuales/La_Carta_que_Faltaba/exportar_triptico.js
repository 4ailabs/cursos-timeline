const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const PORT = 3012;
const SCALE = 4;
const URL_FILE = 'Rituales_Individuales/La_Carta_que_Faltaba/Triptico_La_Carta_que_Faltaba.html';
const OUT_DIR = path.join(__dirname, 'export_imagenes');

(async () => {
  console.log('Exportando tríptico La Carta que Faltaba...\n');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: SCALE });

  await page.goto(`http://localhost:${PORT}/${URL_FILE}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const sheets = await page.$$('.sheet');
  console.log(`Sheets encontrados: ${sheets.length}\n`);

  const names = ['Cara_A_Frente', 'Cara_B_Reverso'];
  for (let i = 0; i < sheets.length; i++) {
    const outPath = path.join(OUT_DIR, `${names[i]}.png`);
    const box = await sheets[i].boundingBox();
    await sheets[i].screenshot({ path: outPath, omitBackground: false });
    const w = Math.round(box.width * SCALE);
    const h = Math.round(box.height * SCALE);
    console.log(`  ✓ ${names[i]}.png  —  ${w} × ${h} px`);
  }

  await browser.close();
  console.log('\n✅ Exportación completa');
  console.log(`📁 ${OUT_DIR}`);
})();
