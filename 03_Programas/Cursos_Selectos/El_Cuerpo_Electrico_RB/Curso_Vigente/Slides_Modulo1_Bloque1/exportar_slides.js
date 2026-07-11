const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 2; // 2x = 2560x1440 px por slide
const OUT_DIR = path.resolve(__dirname, 'export_png');

(async () => {
  console.log('─'.repeat(60));
  console.log('El Cuerpo Eléctrico · Módulo 1 · Bloque 1 — Exportando slides a PNG');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: SCALE });

  const filePath = path.resolve(__dirname, 'slides_modulo1_bloque1.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 90000 });

  // Estado final estático: revelar todo y congelar animaciones para una captura limpia.
  await page.addStyleTag({ content: `
    *{animation:none!important;transition:none!important}
    .r{opacity:1!important;transform:none!important}
    .rule::after{width:210px!important}
    .draw{stroke-dashoffset:0!important}
    .dot-appear,.badge{opacity:1!important}
  `});
  await page.evaluate(() => document.querySelectorAll('.slide').forEach(s => s.classList.add('in')));
  await new Promise(r => setTimeout(r, 1200));

  const slides = await page.$$('.slide');
  console.log(`  Slides detectados: ${slides.length}\n`);

  for (let i = 0; i < slides.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, `slide-${num}.png`);
    await page.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'center' }), slides[i]);
    await new Promise(r => setTimeout(r, 120));
    await slides[i].screenshot({ path: outPath, omitBackground: false });
    console.log(`  ✓ slide-${num}.png`);
  }

  await browser.close();
  console.log('\n' + '─'.repeat(60));
  console.log(`✅  ${slides.length} slides exportados`);
  console.log(`📁  ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
