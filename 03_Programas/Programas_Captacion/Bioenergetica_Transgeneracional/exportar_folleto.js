const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 4; // Resolución para impresión (aprox 300+ dpi)

(async () => {
  console.log('─'.repeat(60));
  console.log('Generando imagen de Folleto_Beca.html (Tamaño Carta)');
  console.log('─'.repeat(60));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport grande para asegurar que cabe la página entera
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: SCALE });

  // Cargar el archivo local
  const filePath = path.resolve(__dirname, 'Folleto_Beca.html');
  await page.goto(`file://${filePath}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Asegurarnos de que las fuentes SVG y Google Fonts hayan cargado
  await new Promise(r => setTimeout(r, 2000));

  // Ocultar sombra y márgenes del body para exportar la página limpia
  await page.addStyleTag({
    content: `
      body { background: transparent !important; padding: 0 !important; display: block !important; }
      .page { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
    `
  });

  // Seleccionar la clase que define la página tamaño carta
  const element = await page.$('.page');
  if (!element) {
    console.error("No se encontró el elemento '.page'");
    await browser.close();
    return;
  }

  // Tomar captura
  const outName = 'Folleto_Beca_Exportado.png';
  const outPath = path.resolve(__dirname, outName);
  
  await element.screenshot({ path: outPath, omitBackground: false });

  const box = await element.boundingBox();
  console.log(`✅ ¡Folleto guardado con éxito!`);
  console.log(`   Ruta: ${outName}`);
  console.log(`   Dimensiones (px reales a 4x): ${Math.round(box.width * SCALE)} × ${Math.round(box.height * SCALE)} px`);
  console.log('─'.repeat(60));

  await browser.close();
})();
