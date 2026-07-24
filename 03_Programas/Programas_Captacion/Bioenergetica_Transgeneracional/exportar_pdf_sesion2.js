const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Exporta a PDF los documentos impresos de la Sesión 2 (carta horizontal, 11 x 8.5 in).
// Uso:  NODE_PATH=~/node_modules node exportar_pdf_sesion2.js
//
// El @media print del HTML usa 100vh para el alto de página, que en la exportación a PDF
// no corresponde al alto del papel. Aquí se fija la hoja en pulgadas antes de imprimir.

const DOCS = [
  { html: 'Manual_Estudiante_Sesion2.html',    pdf: 'Manual_Estudiante_Sesion2.pdf',    paginas: 10 },
  { html: 'Manual_Estudiante_Sesion2_BN.html', pdf: 'Manual_Estudiante_Sesion2_BN.pdf', paginas: 10 },
  { html: 'Ejercicio_Practica_Sesion2.html',   pdf: 'Ejercicio_Practica_Sesion2.pdf',   paginas: 2 },
  { html: 'Ejercicio_Practica_Sesion2_BN.html', pdf: 'Ejercicio_Practica_Sesion2_BN.pdf', paginas: 2 },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  console.log('─'.repeat(64));

  for (const doc of DOCS) {
    const origen = path.resolve(__dirname, doc.html);
    if (!fs.existsSync(origen)) { console.log(`  ⚠️  falta ${doc.html}, se omite`); continue; }

    const page = await browser.newPage();
    await page.setViewport({ width: 1056, height: 816, deviceScaleFactor: 2 });
    await page.goto(`file://${origen}`, { waitUntil: 'networkidle0', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 900)); // fuentes + isotipo SVG

    // El último hijo del <body> es el <script> del isotipo, así que `.page:last-child`
    // no coincide y quedaría una hoja en blanco al final. Se marca la última a mano.
    const n = await page.evaluate(() => {
      const hojas = document.querySelectorAll('.page');
      hojas[hojas.length - 1].classList.add('ultima-hoja');
      return hojas.length;
    });

    // Hoja en pulgadas, sin sombras ni fondo de escritorio.
    await page.addStyleTag({ content: `
      @page { size: 11in 8.5in; margin: 0; }
      html, body { background: #fff !important; }
      body { padding: 0 !important; gap: 0 !important; display: block !important; }
      .page {
        width: 11in !important; height: 8.5in !important;
        box-shadow: none !important; break-after: page; page-break-after: always;
      }
      .page.ultima-hoja { break-after: auto !important; page-break-after: avoid !important; }
    ` });

    const salida = path.resolve(__dirname, doc.pdf);
    await page.pdf({
      path: salida,
      width: '11in', height: '8.5in',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
      // El flujo deja ~28 px sobrantes tras la última hoja y Chrome añade una página
      // en blanco. Se acota la salida al número real de secciones .page del documento.
      pageRanges: `1-${n}`,
    });
    await page.close();

    const kb = Math.round(fs.statSync(salida).size / 1024);
    const ok = n === doc.paginas ? '✅' : `⚠️  esperaba ${doc.paginas}`;
    console.log(`  ${ok}  ${doc.pdf.padEnd(36)} ${n} pág · ${kb} KB`);
  }

  await browser.close();
  console.log('─'.repeat(64));
})();
