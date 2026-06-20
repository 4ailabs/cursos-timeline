const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

const PORT  = 3010;
const SCALE = 4;

const SLIDE_W = 1280;
const SLIDE_H = 720;

const URL_FILE = 'Sabado_2/Slides_Sabado_2_Actos_que_Mueven.html';
const OUT_DIR  = path.join(__dirname, '..', 'Programa_Final', 'export_imagenes', '08_Slides_Sabado2_Actos');

(async () => {
  console.log('────────────────────────────────────────────────────────────');
  console.log('Actos que Mueven™ — Exportación Slides Sábado 2 Actos');
  console.log('────────────────────────────────────────────────────────────\n');

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: SCALE });

  const fullUrl = `http://localhost:${PORT}/${URL_FILE}`;
  console.log(`▶ Cargando: ${URL_FILE}`);
  await page.goto(fullUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  const slideCount = await page.evaluate(() =>
    document.querySelectorAll('.slide').length
  );
  console.log(`  Slides detectados: ${slideCount}\n`);

  for (let i = 0; i < slideCount; i++) {
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, `slide-${num}.png`);

    const box = await page.evaluate((idx) => {
      const el = document.querySelectorAll('.slide')[idx];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }, i);

    if (!box) {
      console.log(`  ✗ slide-${num} — no encontrado`);
      continue;
    }

    await page.screenshot({
      path: outPath,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
      omitBackground: false,
    });

    const width = Math.round(box.width * SCALE);
    const height = Math.round(box.height * SCALE);
    console.log(`  ✓ slide-${num}.png  —  ${width} × ${height} px`);
  }

  await browser.close();

  console.log('\n───────────────────────────────────────────────────────');
  console.log(`✅ ${slideCount} slides exportados`);
  console.log(`📁 Carpeta: ${OUT_DIR}`);
  console.log('───────────────────────────────────────────────────────');
})();
