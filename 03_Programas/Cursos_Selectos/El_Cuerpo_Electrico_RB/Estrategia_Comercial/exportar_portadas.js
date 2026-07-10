// Exporta las portadas (thumbnails 1280x720) del video Punto Trauma a PNG.
// Uso:  node exportar_portadas.js
// Salida:  ./export_imagenes/Portada_Punto_Trauma_ES.png  y  _EN.png

const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 2; // 1280x720 -> 2560x1440 (nítido; YouTube lo reescala)
const OUT_DIR = path.resolve(__dirname, 'export_imagenes');
const FILE = 'Portada_Punto_Trauma.html';
const NAMES = ['Portada_Punto_Trauma_ES', 'Portada_Punto_Trauma_EN'];

const CLEAN_CSS = `body{background:#fff !important;padding:0 !important;gap:0 !important} .cap{display:none !important}`;

(async () => {
  console.log('─'.repeat(60));
  console.log('El Cuerpo Eléctrico — Exportando portadas del video a PNG');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 820, deviceScaleFactor: SCALE });

  const filePath = path.resolve(__dirname, FILE);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: CLEAN_CSS });
  await new Promise((r) => setTimeout(r, 1500)); // asentar fuentes/SVG

  const elements = await page.$$('.thumb');
  if (elements.length === 0) {
    console.error("  ✗ No se encontró '.thumb'");
    await browser.close();
    process.exit(1);
  }

  for (let i = 0; i < elements.length; i++) {
    const name = NAMES[i] || `Portada_${i + 1}`;
    const outPath = path.join(OUT_DIR, `${name}.png`);
    const box = await elements[i].boundingBox();
    await elements[i].screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ ${name}.png  —  ${Math.round(box.width * SCALE)} × ${Math.round(box.height * SCALE)} px`);
  }

  await browser.close();
  console.log('\n✅ Exportación completa');
  console.log(`📁 ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
