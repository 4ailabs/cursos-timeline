const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 2; // 2x = 2560x1440 px por slide
const OUT_DIR = path.resolve(__dirname, 'export_slides');

(async () => {
  console.log('─'.repeat(60));
  console.log('Bases de RB y el Punto Trauma — Exportando slides a PNG');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: SCALE });

  const filePath = path.resolve(__dirname, 'slides_wellkitt_punto_trauma.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });

  await new Promise(r => setTimeout(r, 2000));

  const slides = await page.$$('.slide');
  if (slides.length === 0) {
    console.error('⚠  No se encontraron slides con clase ".slide"');
    await browser.close();
    return;
  }

  console.log(`  Slides detectados: ${slides.length}\n`);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, `slide-${num}.png`);

    await page.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' }), slide);
    await new Promise(r => setTimeout(r, 150));

    await slide.screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ slide-${num}.png`);
  }

  await browser.close();

  console.log('\n' + '─'.repeat(60));
  console.log(`✅  ${slides.length} slides exportados`);
  console.log(`📁  Carpeta: ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
