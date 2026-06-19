const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 4;
const PORT = 3010;
const URL = 'Sello_Calendario_Paciente_BN.html';
const OUT_SUBDIR = '08_Sello_Calendario_Paciente_BN';
const DIR_EXPORT = path.join(__dirname, 'export_imagenes', OUT_SUBDIR);

(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven — Exportacion sello calendario paciente BN');
  console.log('Formato: 9 x 14 cm vertical');
  console.log('Escala: 4x');
  console.log('─'.repeat(60));

  fs.mkdirSync(DIR_EXPORT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1600,
    height: 2200,
    deviceScaleFactor: SCALE,
  });

  console.log(`\nNavegando a ${URL}...`);
  await page.goto(`http://localhost:${PORT}/${URL}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  await page.waitForFunction(() => document.readyState === 'complete');
  await new Promise(resolve => setTimeout(resolve, 1200));

  const papelito = await page.$('.papelito');
  if (!papelito) {
    console.error('No se encontro el elemento .papelito.');
    await browser.close();
    process.exit(1);
  }

  const box = await papelito.boundingBox();
  const pxW = Math.round(box.width * SCALE);
  const pxH = Math.round(box.height * SCALE);
  const outPath = path.join(DIR_EXPORT, 'sello-calendario-paciente-bn.png');

  await papelito.screenshot({ path: outPath, omitBackground: false });

  await browser.close();

  console.log(`  ✓ sello-calendario-paciente-bn.png — ${pxW} x ${pxH} px`);
  console.log('\n' + '─'.repeat(60));
  console.log('Exportacion completada.');
  console.log(`Carpeta: ${DIR_EXPORT}`);
  console.log('─'.repeat(60));
})();
