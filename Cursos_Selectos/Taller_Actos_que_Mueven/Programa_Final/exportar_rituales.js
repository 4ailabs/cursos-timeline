const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

const PORT = 3011;
const SCALE = 4; // Alta resolución (~300+ dpi)

// Artboard exterior del cuadernillo (vertical)
const AW = 450;   // px CSS
const AH = 690;   // px CSS

const ARCHIVOS = [
  {
    url: 'Cuadernillo_Rituales_Vida_Diaria.html',
    carpeta: '04_Cuadernillo_Rituales_Color',
    tipo: 'artboard',
    w: AW, h: AH,
  },
  {
    url: 'Cuadernillo_Rituales_Vida_Diaria_BN.html',
    carpeta: '05_Cuadernillo_Rituales_BN',
    tipo: 'artboard',
    w: AW, h: AH,
  },
  {
    url: 'Libro_Rituales_Diarios_26x21_BN.html',
    carpeta: '06_Libro_Rituales_26x21_BN',
    tipo: 'spread',
  }
];

const DIR_EXPORT = '/Users/miguelojedarios/cursos-timeline/Cursos_Selectos/Taller_Actos_que_Mueven/Cuaderno_Rituales_Vida_Diaria/export_imagenes';

const OVERRIDE_CSS = `
/* Desactivar viewport interactivo y hacerlo un contenedor normal */
#root > div {
  height: auto !important;
  width: auto !important;
  position: static !important;
  overflow: visible !important;
  background: #f0ede8 !important;
}
/* Desactivar transformaciones del worldRef */
#root > div > div {
  position: static !important;
  transform: none !important;
  width: auto !important;
  height: auto !important;
  padding: 40px 0 !important;
  overflow: visible !important;
}
/* Asegurar que el grid del background no moleste */
#root > div > div > div[style*="grid"] {
  display: none !important;
}
/* Hacer que las secciones se muestren verticales */
div[style*="display: flex"] {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 40px !important;
  width: auto !important;
}
/* Asegurar que cada slot de artboard esté centrado y visible */
div[data-dc-slot] {
  position: relative !important;
  margin: 20px auto !important;
  flex-shrink: 0 !important;
}
`;

(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven™ — Exportación Cuadernos de Rituales');
  console.log('─'.repeat(60));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  let totalExportados = 0;

  for (const archivo of ARCHIVOS) {
    const { url, carpeta, tipo, w, h } = archivo;
    const outDir = path.join(DIR_EXPORT, carpeta);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n▶ ${url}`);
    console.log(`  Carpeta: ${carpeta}`);

    // Configurar viewport estándar (evita límites de textura de GPU/Chrome)
    await page.setViewport({ width: 2000, height: 1500, deviceScaleFactor: SCALE });

    // Navegar y esperar render completo
    await page.goto(`http://localhost:${PORT}/${url}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });
    await page.waitForFunction(() => document.readyState === 'complete');
    await new Promise(r => setTimeout(r, 5000)); // Esperar fuentes y transpilación Babel/React

    // Si es cuadernillo React con DesignCanvas, inyectar CSS para linearizar el diseño
    if (tipo === 'artboard') {
      await page.addStyleTag({ content: OVERRIDE_CSS });
      await new Promise(r => setTimeout(r, 500)); // Dar tiempo a re-renderizar
    }

    let elements = [];
    if (tipo === 'artboard') {
      // Encontrar artboards por dimensiones exactas en el nuevo flujo vertical
      const panelHandles = await page.evaluateHandle((pw, ph) => {
        const result = [];
        for (const el of document.querySelectorAll('div')) {
          const rect  = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          if (
            Math.abs(rect.width  - pw) < 4 &&
            Math.abs(rect.height - ph) < 4 &&
            style.overflow === 'hidden' &&
            rect.top >= -5000 // Permitir que estén arriba/abajo fuera de pantalla inicialmente
          ) {
            result.push(el);
          }
        }
        return result;
      }, w, h);

      const count = await page.evaluate(els => els.length, panelHandles);
      for (let i = 0; i < count; i++) {
        const el = await page.evaluateHandle((els, idx) => els[idx], panelHandles, i);
        elements.push({ element: el, width: w, height: h });
      }
    } else {
      // Es tipo 'spread' (Libro horizontal)
      const spreads = await page.$$('.spread');
      for (const el of spreads) {
        const box = await el.boundingBox();
        elements.push({ element: el, width: Math.round(box.width), height: Math.round(box.height) });
      }
    }

    if (elements.length === 0) {
      console.log('  ⚠  No se encontraron páginas.');
      continue;
    }

    console.log(`  Páginas/Pliegos detectados: ${elements.length}`);

    for (let i = 0; i < elements.length; i++) {
      const { element, width, height } = elements[i];
      const num = String(i + 1).padStart(2, '0');
      const filename = `pagina-${num}.png`;
      const outPath = path.join(outDir, filename);

      const pxW = width * SCALE;
      const pxH = height * SCALE;

      // Hacer scroll al elemento para asegurar renderizado correcto y evitar recortes
      await page.evaluate((el) => {
        el.scrollIntoView({ block: 'center', inline: 'center' });
      }, element);
      await new Promise(r => setTimeout(r, 300)); // Esperar fin de scroll

      await element.screenshot({ path: outPath, omitBackground: false });
      console.log(`  ✓ ${filename}  —  ${pxW} × ${pxH} px`);
      totalExportados++;
    }
  }

  await browser.close();

  console.log('\n' + '─'.repeat(55));
  console.log(`✅ ${totalExportados} páginas exportadas`);
  console.log(`📁 Carpeta: ${DIR_EXPORT}`);
  console.log('─'.repeat(55));
})();
