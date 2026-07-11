const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error('Uso: node export_slides_png.cjs <deck.html> <carpeta_png>');

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 2 });
  await page.goto(`file://${path.resolve(input)}`, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.addStyleTag({ content: `
    *{animation:none!important;transition:none!important}
    .slide,.js .slide{display:block!important;opacity:1!important;transform:none!important}
    .r{opacity:1!important;transform:none!important}
  ` });
  await new Promise(resolve => setTimeout(resolve, 800));
  const slides = await page.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    const out = path.join(output, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: out, omitBackground: false });
    console.log(out);
  }
  await browser.close();
})();
