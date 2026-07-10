// Exporta el Folleto (3 páginas carta) y el Tríptico (2 caras carta horizontal)
// a PNG en alta resolución (4x ≈ 380 dpi), listos para imprimir o compartir.
//
// Uso:  node exportar_folleto_triptico.js
// Salida:  ./export_imagenes/*.png

const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');
const fs = require('fs');

const SCALE = 4; // resolución para impresión (~380 dpi)
const OUT_DIR = path.resolve(__dirname, 'export_imagenes');

// Estilo que se inyecta para exportar limpio (sin sombras ni fondo del "escritorio")
const CLEAN_CSS = `
  .folleto-root, .tri-root { background:#fff !important; padding:0 !important; gap:0 !important; }
  .page, .sheet { box-shadow:none !important; }
`;

const JOBS = [
  {
    file: 'Folleto_Programa_RB.html',
    selector: '.page',
    names: ['Folleto_1_Portada', 'Folleto_2_Temario', 'Folleto_3_Inscripcion'],
  },
  {
    file: 'Triptico_Programa_RB.html',
    selector: '.sheet',
    names: ['Triptico_Cara_A_Exterior', 'Triptico_Cara_B_Interior'],
  },
  {
    file: 'Triptico_Programa_RB_BN.html',
    selector: '.sheet',
    names: ['Triptico_BN_Cara_A_Exterior', 'Triptico_BN_Cara_B_Interior'],
  },
];

(async () => {
  console.log('─'.repeat(60));
  console.log('El Cuerpo Eléctrico — Exportando folleto y tríptico a PNG');
  console.log('─'.repeat(60));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 1200, deviceScaleFactor: SCALE });

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
      await elements[i].screenshot({ path: outPath, omitBackground: false });
      const w = Math.round(box.width * SCALE);
      const h = Math.round(box.height * SCALE);
      console.log(`  ✓ ${name}.png  —  ${w} × ${h} px`);
    }
  }

  await browser.close();
  console.log('\n✅ Exportación completa');
  console.log(`📁 ${OUT_DIR}`);
  console.log('─'.repeat(60));
})();
