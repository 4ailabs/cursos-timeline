const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Exporta cada slide de Slides_Sesion1.html a PNG (16:9, 1920x1080).
// Mismo patrón que exportar_manual.js: Puppeteer, un solo browser, deviceScaleFactor alto.
// Las PNG quedan en ./export_slides_png/ listas para armar el Keynote.

const HTML = 'Slides_Sesion1.html';
const OUTDIR = 'export_slides_png';
const W = 1920;
const H = 1080;

(async () => {
  const outDir = path.resolve(__dirname, OUTDIR);
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.png')) fs.unlinkSync(path.join(outDir, f));
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  // deviceScaleFactor 1 porque ya exportamos a 1920x1080 nativo (proyección).
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const filePath = path.resolve(__dirname, HTML);
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });

  // El deck es body-only; escalamos el stage a 1920x1080 y desactivamos animaciones.
  await page.addStyleTag({
    content: `
      html, body { margin: 0 !important; padding: 0 !important; background: #000 !important; overflow: hidden !important; display: block !important; }
      #scaler { position: absolute !important; top: 0 !important; left: 0 !important; transform-origin: top left !important; }
      .slide .inner > * { opacity: 1 !important; transform: none !important; animation: none !important; }
      .stagger > * { opacity: 1 !important; transform: none !important; animation: none !important; }
      /* interfaz oculta en TODAS las slides para exportar limpio */
      .runhead, .folio, .nav, .dots, .progress, .rule-top { display: none !important; }
    `,
  });

  // Escala el stage a resolución de exportación.
  await page.evaluate((w, h) => {
    const scaler = document.getElementById('scaler');
    const s = Math.min(w / 1280, h / 720);
    scaler.style.transform = 'scale(' + s + ')';
    scaler.style.transformOrigin = 'top left';
  }, W, H);

  const N = await page.evaluate(() => document.querySelectorAll('.slide').length);
  console.log('─'.repeat(60));
  console.log(`Exportando ${N} slides de ${HTML}  (${W}×${H})`);
  console.log('─'.repeat(60));

  for (let i = 0; i < N; i++) {
    // Activa la slide i replicando la lógica de estado del deck.
    await page.evaluate((idx) => {
      const slides = document.querySelectorAll('.slide');
      const stage = document.getElementById('stage');
      slides.forEach((x) => x.classList.remove('active'));
      const t = slides[idx];
      t.classList.add('active');
      stage.classList.toggle('bare', idx === 0 || idx === slides.length - 1 || t.classList.contains('divider'));
      stage.classList.toggle('ends', idx === 0 || idx === slides.length - 1);
      stage.classList.toggle('onimg', t.classList.contains('imgslide'));
    }, i);

    // Espera a que carguen imágenes y se pinten los canvas de esa slide.
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll('.slide.active img'));
      await Promise.all(imgs.map((im) => im.complete ? Promise.resolve() : new Promise((r) => { im.onload = im.onerror = r; })));
    });
    await new Promise((r) => setTimeout(r, 350));

    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(outDir, `slide_${num}.png`);
    await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`  ✅ slide ${i + 1}/${N}  →  slide_${num}.png`);
  }

  await browser.close();
  console.log('─'.repeat(60));
  console.log(`Listo. ${N} PNG en ${OUTDIR}/`);
  console.log('Ahora corre:  osascript armar_keynote.applescript');
})();
