/**
 * exportar_cuadernillo.js
 * Exporta cada página del Cuadernillo Actos que Mueven (Color y BN)
 * como PNG de alta resolución — listo para Affinity Designer / impresión.
 *
 * Uso:
 *   1. Corre un servidor local en la carpeta Programa_Final:
 *        npx -y serve . -p 3010
 *      (en otra terminal)
 *   2. Luego ejecuta:
 *        node exportar_cuadernillo.js
 *
 * Requiere: node, puppeteer (se instala solo con npx si no está)
 *
 * Dimensiones del cuadernillo:
 *   Página interior:  130 × 210 mm  →  390 × 630 px CSS
 *   Artboard wrapper: 450 × 690 px CSS (page + 60px padding)
 *   scale = 4  →  1800 × 2760 px PNG  ≈ 339 dpi a 135 × 207 mm
 */

const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

// ─── CONFIGURACIÓN ────────────────────────────────────────────
// Artboard exterior (la capa S = W+60 × H+60)
const AW = 450;   // px CSS
const AH = 690;   // px CSS
const SCALE = 4;  // → ~339 dpi

const PORT = 3010;

const ARCHIVOS = [
  {
    url: 'Cuadernillo_Actos_que_Mueven.html',
    carpeta: '01_Cuadernillo_Color',
    w: AW, h: AH, scale: SCALE,
    viewport: { width: 5000, height: 2400 },
  },
  {
    url: 'Cuadernillo_Actos_que_Mueven_BN.html',
    carpeta: '02_Cuadernillo_BN',
    w: AW, h: AH, scale: SCALE,
    viewport: { width: 5000, height: 2400 },
  },
  {
    url: 'Cuadernillo_Sabado2_BN.html',
    carpeta: '09_Cuadernillo_Sabado2_BN',
    w: AW, h: AH, scale: SCALE,
    viewport: { width: 5000, height: 2400 },
  },
  {
    url: 'http://localhost:3011/Caja_7_Actos_BN.html',
    carpeta: '10_Caja_7_Actos_BN',
    w: 610, h: 910, scale: SCALE,
    viewport: { width: 6000, height: 5000 },
    absolute: true,
  },
];

const DIR_EXPORT = path.join(__dirname, 'export_imagenes');

// ─── MAIN ─────────────────────────────────────────────────────
(async () => {
  console.log('─'.repeat(60));
  console.log('Actos que Mueven™ — Exportación PNG para impresión');
  console.log(`Resolución: ${AW * SCALE} × ${AH * SCALE} px por página`);
  console.log('─'.repeat(60));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  let totalExportados = 0;

  for (const archivo of ARCHIVOS) {
    const { url, carpeta, w, h, scale, viewport } = archivo;
    const pxW = w * scale;
    const pxH = h * scale;
    const vp   = viewport || { width: 3200, height: 1600 };
    const outDir = path.join(DIR_EXPORT, carpeta);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n▶ ${url}`);
    console.log(`  Carpeta: ${carpeta}`);
    console.log(`  Resolución por página: ${pxW} × ${pxH} px  (escala ${scale}x)`);

    // Configurar viewport para este archivo
    await page.setViewport({ ...vp, deviceScaleFactor: scale });

    // Navegar y esperar render completo (React + Babel + Google Fonts)
    const fullUrl = archivo.absolute ? url : `http://localhost:${PORT}/${url}`;
    await page.goto(fullUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000,
      // serve redirige http→https a veces; seguir el redirect
    });
    // Asegurar que estamos en la página correcta
    await page.waitForFunction(() => document.readyState === 'complete');
    await new Promise(r => setTimeout(r, 4000)); // esperar fonts + transpilación Babel

    // Encontrar artboards por sus dimensiones exactas
    // El componente S genera un div con width=AW, height=AH, overflow:hidden, background=#26201c
    const panelHandles = await page.evaluateHandle((pw, ph) => {
      const result = [];
      for (const el of document.querySelectorAll('div')) {
        const rect  = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        if (
          Math.abs(rect.width  - pw) < 4 &&
          Math.abs(rect.height - ph) < 4 &&
          style.overflow === 'hidden' &&
          rect.top >= 0
        ) {
          result.push(el);
        }
      }
      return result;
    }, w, h);

    const count = await page.evaluate(els => els.length, panelHandles);

    if (count === 0) {
      console.log('  ⚠  No se encontraron páginas.');
      console.log('     Verifica que el servidor esté corriendo en puerto ' + PORT);
      continue;
    }

    console.log(`  Páginas detectadas: ${count}`);

    for (let i = 0; i < count; i++) {
      const el  = await page.evaluateHandle((els, idx) => els[idx], panelHandles, i);
      const num = String(i + 1).padStart(2, '0');
      const filename = `pagina-${num}.png`;
      const outPath  = path.join(outDir, filename);

      await el.asElement().screenshot({ path: outPath, omitBackground: false });
      console.log(`  ✓ ${filename}  —  ${pxW} × ${pxH} px`);
      totalExportados++;
    }
  }

  await browser.close();

  console.log('\n' + '─'.repeat(55));
  console.log(`✅ ${totalExportados} páginas exportadas`);
  console.log(`📁 Carpeta: ${DIR_EXPORT}`);
  console.log('\nPara Affinity Designer / Publisher:');
  console.log('  File → Place → selecciona los PNG como capas de referencia');
  console.log('  O imprime directo con resolución 300 dpi');
  console.log('─'.repeat(55));
})();
