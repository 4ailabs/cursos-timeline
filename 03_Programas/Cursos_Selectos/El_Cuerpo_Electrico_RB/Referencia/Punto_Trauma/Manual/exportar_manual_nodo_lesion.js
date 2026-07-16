// Exporta cada página del Manual "El nodo de lesión" (B5) a PNG en alta resolución (4x ≈ 380 dpi).
// Uso: node exportar_manual_nodo_lesion.js   ·   Salida: ./export_manual/*.png
const puppeteer = require('/Users/miguel/Centrobioenergetica-Instituto/Cursos_Selectos/Taller_Actos_que_Mueven/Programa_Final/node_modules/puppeteer');
const path = require('path'); const fs = require('fs');
const SCALE = 4;
const OUT_DIR = path.resolve(__dirname, 'export_manual');
const SRC = path.resolve(__dirname, 'Manual_Paginas_RB.html');
(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless:'new', args:['--no-sandbox','--disable-setuid-sandbox','--font-render-hinting=none'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 760, height: 1100, deviceScaleFactor: SCALE });
  await page.goto('file://'+SRC, { waitUntil:'networkidle0', timeout:60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1800));
  const els = await page.$$('.page');
  console.log('Exportando '+els.length+' páginas a '+OUT_DIR);
  let n=0;
  for (const el of els) {
    const name = await el.evaluate(e => e.getAttribute('data-name')) || ('pag_'+(++n));
    const outPath = path.join(OUT_DIR, name+'.png');
    await el.screenshot({ path: outPath, omitBackground:false });
    const box = await el.boundingBox();
    console.log('  ✓ '+name+'.png  '+Math.round(box.width*SCALE)+'×'+Math.round(box.height*SCALE)+' px');
  }
  await browser.close();
  console.log('\n✅ Listo · '+OUT_DIR);
})();
