const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 2; // 2x = 2560x1440 px por slide (~150 dpi, ideal para pantalla y presentaciones)
const OUT_DIR = path.resolve(__dirname, 'export_slides');

(async () => {
  console.log('─'.repeat(60));
  console.log('El Cuerpo Eléctrico — Exportando slides a PNG');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport grande para que quepan todos los slides en el DOM
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: SCALE });

  const filePath = path.resolve(__dirname, 'webinar_el_cuerpo_electrico_44_slides.html');
  await page.goto(`file://${filePath}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Esperar fuentes y renderizado de imágenes
  await new Promise(r => setTimeout(r, 3000));

  // Encontrar todos los slides
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
    const filename = `slide-${num}.png`;
    const outPath = path.join(OUT_DIR, filename);

    // Hacer scroll al slide para asegurar que esté renderizado
    await page.evaluate((el) => {
      el.scrollIntoView({ block: 'center', inline: 'center' });
    }, slide);
    await new Promise(r => setTimeout(r, 200));

    await slide.screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ ${filename}`);
  }

  await browser.close();

  console.log('\n' + '─'.repeat(60));
  console.log(`✅  ${slides.length} slides exportados`);
  console.log(`📁  Carpeta: ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
