const puppeteer = require('puppeteer');
const path = require('path');

const SCALE = 4; // Resolución para impresión (aprox 300+ dpi para tarjetas de 14x9cm)

const ARCHIVOS = [
  { html: 'Tarjetas_Facilitador_Sesion1.html', prefijo: 'Tarjeta_Color' },
  { html: 'Tarjetas_Facilitador_Sesion1_BN.html', prefijo: 'Tarjeta_BN' },
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
    await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: SCALE });

    const filePath = path.resolve(__dirname, html);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });

    await new Promise((r) => setTimeout(r, 1200));

    await page.addStyleTag({
      content: `
        body { background: transparent !important; padding: 0 !important; gap: 0 !important; }
        .card { box-shadow: none !important; }
        .index-tag { display: none !important; }
      `,
    });

    const cards = await page.$$('.card');
    if (cards.length === 0) {
      console.error(`  No se encontraron elementos '.card' en ${html}`);
      await page.close();
      continue;
    }

    for (let i = 0; i < cards.length; i++) {
      const num = String(i + 1).padStart(2, '0');
      const outName = `${prefijo}_${num}.png`;
      const outPath = path.resolve(__dirname, outName);
      await cards[i].screenshot({ path: outPath, omitBackground: false });
      const box = await cards[i].boundingBox();
      console.log(`  ✅ ${outName}  (${Math.round(box.width * SCALE)} × ${Math.round(box.height * SCALE)} px)`);
    }

    await page.close();
  }

  await browser.close();
  console.log('─'.repeat(60));
  console.log('Listo.');
})();
