const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const HTML = 'Slides_Tu_Mapa_Hormonal.html';
const OUTDIR = 'export_png';
const CSS_W = 1280;
const CSS_H = 720;
const OUT_W = 1920;
const OUT_H = 1080;

(async () => {
  const outDir = path.resolve(__dirname, OUTDIR);
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of fs.readdirSync(outDir)) {
    if (file.endsWith('.png')) fs.unlinkSync(path.join(outDir, file));
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: CSS_W, height: CSS_H, deviceScaleFactor: OUT_W / CSS_W });
  await page.goto(`file://${path.resolve(__dirname, HTML)}`, { waitUntil: 'networkidle0', timeout: 60000 });

  await page.addStyleTag({
    content: `
      html, body { margin: 0 !important; padding: 0 !important; background: #10251d !important; overflow: hidden !important; display: block !important; }
      #scaler { position: absolute !important; left: 0 !important; top: 0 !important; transform: none !important; transform-origin: top left !important; }
      .slide { transition: none !important; }
      .slide.active { opacity: 1 !important; visibility: visible !important; }
      .slide:not(.active) { opacity: 0 !important; visibility: hidden !important; }
      .slide .inner > * { opacity: 1 !important; transform: none !important; animation: none !important; }
      .chrome, .rule-top, .nav, .dots, .progress { display: none !important; }
    `,
  });

  await page.evaluate(() => {
    const scaler = document.getElementById('scaler');
    scaler.style.transform = 'none';
  });

  const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
  for (let i = 0; i < total; i++) {
    await page.evaluate((index) => {
      const slides = [...document.querySelectorAll('.slide')];
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      const stage = document.getElementById('stage');
      stage.classList.toggle('bare', index === 0 || index === slides.length - 1);
      stage.classList.toggle('on-dark', slides[index].dataset.tone === 'dark');
    }, i);
    await page.evaluate(async () => {
      const images = [...document.querySelectorAll('.slide.active img')];
      await Promise.all(images.map(img => img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = img.onerror = resolve; })));
    });
    await new Promise(resolve => setTimeout(resolve, 120));
    const filename = `slide_${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({ path: path.join(outDir, filename), clip: { x: 0, y: 0, width: CSS_W, height: CSS_H } });
    console.log(`Exportada ${filename}`);
  }
  await browser.close();
  console.log(`Listo: ${total} PNG en ${OUTDIR}/ (${OUT_W}x${OUT_H})`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
