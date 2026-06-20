const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

const SCALE = 4; // Alta resolución
const PORT = 3010;
const URL = 'Tarjetas_Frases_Actos_que_Mueven_BN.html';
const OUT_SUBDIR = '03_Tarjetas_BN';

const DIR_EXPORT = path.join(__dirname, 'export_imagenes', OUT_SUBDIR);

(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven™ — Exportación Tarjetas de Frases BN');
  console.log('Formato: 14 × 9 cm (Horizontal)');
  console.log('─'.repeat(60));

  fs.mkdirSync(DIR_EXPORT, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport grande para contener todas las páginas/tarjetas
  await page.setViewport({
    width: 3000,
    height: 18000,
    deviceScaleFactor: SCALE
  });

  console.log(`\nNavegando a la página de tarjetas...`);
  await page.goto(`http://localhost:${PORT}/${URL}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  await page.waitForFunction(() => document.readyState === 'complete');
  await new Promise(r => setTimeout(r, 4000)); // Esperar carga de fuentes

  // Obtener metadatos de las tarjetas desde el objeto cards de la página
  const cardsMetadata = await page.evaluate(() => {
    const cardsArray = typeof cards !== 'undefined' ? cards : (window.cards || []);
    if (!cardsArray) return [];
    
    const slugify = text => text.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar acentos
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/(^_+|_+$)/g, "");

    return cardsArray.map(([num, act, step, seq, kind, phrase, type]) => {
      return {
        num,
        actSlug: slugify(act),
        step,
        seqSlug: seq.replace('/', '_'),
        kindSlug: slugify(kind)
      };
    });
  });

  if (cardsMetadata.length === 0) {
    console.error('❌ No se encontraron tarjetas en window.cards.');
    await browser.close();
    process.exit(1);
  }

  console.log(`Detectadas ${cardsMetadata.length} tarjetas en metadatos.`);

  // Obtener los elementos DOM de las tarjetas
  const cardHandles = await page.$$('.card');
  console.log(`Detectadas ${cardHandles.length} tarjetas renderizadas en el DOM.`);

  if (cardHandles.length !== cardsMetadata.length) {
    console.warn('⚠️ Advertencia: El número de tarjetas en el DOM no coincide con los metadatos.');
  }

  const count = Math.min(cardHandles.length, cardsMetadata.length);
  let totalExportadas = 0;

  for (let i = 0; i < count; i++) {
    const el = cardHandles[i];
    const meta = cardsMetadata[i];
    
    // Generar nombre descriptivo y ordenado para el archivo
    const numTarjeta = String(i + 1).padStart(2, '0');
    const filename = `tarjeta-${numTarjeta}-acto-${meta.num}-${meta.actSlug}-paso-${meta.step}-frase-${meta.seqSlug}.png`;
    const outPath = path.join(DIR_EXPORT, filename);

    // Medidas para consola
    const box = await el.boundingBox();
    const pxW = Math.round(box.width * SCALE);
    const pxH = Math.round(box.height * SCALE);

    await el.screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ [${numTarjeta}/${count}] ${filename}  —  ${pxW} × ${pxH} px`);
    totalExportadas++;
  }

  await browser.close();

  console.log('\n' + '─'.repeat(55));
  console.log(`✅ ${totalExportadas} tarjetas exportadas exitosamente.`);
  console.log(`📁 Carpeta: ${DIR_EXPORT}`);
  console.log('─'.repeat(55));
})();
