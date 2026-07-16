// Exporta el Folleto "El Punto Trauma" (3 páginas carta, color y blanco-y-negro)
// a PNG en alta resolución (4x ≈ 380 dpi), tamaño carta exacto, listos para imprimir.
//
// Uso:  node exportar_folleto_punto_trauma.js
// Salida:  ./export_imagenes/*.png

const puppeteer = require('/Users/miguel/Centrobioenergetica-Instituto/Cursos_Selectos/Taller_Actos_que_Mueven/Programa_Final/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 4; // resolución para impresión (~380 dpi)
const OUT_DIR = path.resolve(__dirname, 'export_imagenes');

// Estilo que se inyecta para exportar limpio (sin sombras ni fondo del "escritorio")
const CLEAN_CSS = `
  .folleto-root { background:#fff !important; padding:0 !important; gap:0 !important; }
  .page { box-shadow:none !important; }
`;

const JOBS = [
  {
    file: 'Folleto_Punto_Trauma.html',
    selector: '.page',
    names: ['Folleto_PuntoTrauma_1_Portada', 'Folleto_PuntoTrauma_2_Diagramas', 'Folleto_PuntoTrauma_3_Protocolo'],
  },
  {
    file: 'Folleto_Punto_Trauma_ByN.html',
    selector: '.page',
    names: ['Folleto_PuntoTrauma_ByN_1_Portada', 'Folleto_PuntoTrauma_ByN_2_Diagramas', 'Folleto_PuntoTrauma_ByN_3_Protocolo'],
  },
];

(async () => {
  console.log('─'.repeat(60));
  console.log('El Punto Trauma — Exportando folleto a PNG (carta)');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  // 8.5in x 11in a 96dpi = 816 x 1056 px; viewport un poco más ancho para que quepan las 3 páginas apiladas
  await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: SCALE });

  for (const job of JOBS) {
    const filePath = path.resolve(__dirname, job.file);
    if (!fs.existsSync(filePath)) {
      console.error(`  ✗ No se encontró ${job.file} — se omite.`);
      continue;
    }

    console.log(`\n${job.file}`);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: CLEAN_CSS });
    await new Promise(r => setTimeout(r, 1500)); // asentar fuentes/SVG

    const elements = await page.$$(job.selector);
    if (elements.length === 0) {
      console.error(`  ✗ No se encontró '${job.selector}' en ${job.file}`);
      continue;
    }

    for (let i = 0; i < elements.length; i++) {
      const name = job.names[i] || `${path.parse(job.file).name}_${i + 1}`;
      const outPath = path.join(OUT_DIR, `${name}.png`);
      const box = await elements[i].boundingBox();
      const wIn = box.width / 96;
      const hIn = box.height / 96;
      if (Math.abs(wIn - 8.5) > 0.02 || hIn > 11.02) {
        console.warn(`  ⚠ ${name}: ${wIn.toFixed(2)}in × ${hIn.toFixed(2)}in — fuera de tamaño carta exacto`);
      }
      await elements[i].screenshot({ path: outPath, omitBackground: false });
      const w = Math.round(box.width * SCALE);
      const h = Math.round(box.height * SCALE);
      console.log(`  ✓ ${name}.png  —  ${w} × ${h} px  (${wIn.toFixed(2)}in × ${hIn.toFixed(2)}in)`);
    }
  }

  await browser.close();

  // Las imágenes ByN salen de Puppeteer en modo RGB (aunque cada píxel sea gris puro).
  // Al imprimir, un PNG "RGB con grises" todavía pasa por gestión de color/perfil ICC del
  // driver de la impresora, que puede aplicar un tinte distinto según cuánto texto vs.
  // gráficos tenga cada hoja. Forzar el archivo a escala de grises real (un solo canal,
  // modo "L") elimina esa ambigüedad para la impresora.
  const { execSync } = require('child_process');
  const byNFiles = fs.readdirSync(OUT_DIR).filter(f => f.includes('_ByN_') && f.endsWith('.png'));
  if (byNFiles.length) {
    console.log('\nConvirtiendo exportaciones ByN a escala de grises real (modo L)…');
    const pyScript = `
import sys
from PIL import Image
for name in sys.argv[1:]:
    Image.open(name).convert("RGB").convert("L").save(name)
    print("  ✓ escala de grises real:", name)
`;
    const tmpPy = path.join(OUT_DIR, '.to_grayscale.py');
    fs.writeFileSync(tmpPy, pyScript);
    try {
      execSync(`python3 "${tmpPy}" ${byNFiles.map(f => `"${path.join(OUT_DIR, f)}"`).join(' ')}`, { stdio: 'inherit' });
    } finally {
      fs.unlinkSync(tmpPy);
    }
  }

  console.log('\n✅ Exportación completa');
  console.log(`📁 ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
