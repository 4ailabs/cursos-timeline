const puppeteer = require('puppeteer');
const path = require('path');

const SCALE = 4; // Resolución para impresión (aprox 300+ dpi)

const ARCHIVOS = [
  { html: 'Manual_Genograma_Genosociograma.html', prefijo: 'Manual_Genograma_Color' },
  { html: 'Manual_Genograma_Genosociograma_BN.html', prefijo: 'Manual_Genograma_BN' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { html, prefijo } of ARCHIVOS) {
    console.log('─'.repeat(60));
    console.log(`Generando imágenes de ${html}`);
    console.log('─'.repeat(60));

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: SCALE });

    const filePath = path.resolve(__dirname, html);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });

    // Asegurar que fuentes y SVGs hayan terminado de renderizar
    await new Promise((r) => setTimeout(r, 1500));

    await page.addStyleTag({
      content: `
        body { background: transparent !important; padding: 0 !important; gap: 0 !important; display: block !important; }
        .page { box-shadow: none !important; margin: 0 !important; }
      `,
    });

    const elements = await page.$$('.page');
    if (elements.length === 0) {
      console.error(`  No se encontraron elementos '.page' en ${html}`);
      await page.close();
      continue;
    }

    for (let i = 0; i < elements.length; i++) {
      const num = i + 1;
      const outName = `${prefijo}_Pagina${num}.png`;
      const outPath = path.resolve(__dirname, outName);
      await elements[i].screenshot({ path: outPath, omitBackground: false });
      const box = await elements[i].boundingBox();
      console.log(`  ✅ ${outName}  (${Math.round(box.width * SCALE)} × ${Math.round(box.height * SCALE)} px)`);
    }

    await page.close();
  }

  await browser.close();
  console.log('─'.repeat(60));
  console.log('Listo.');
})();
