const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path = require('path');

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const p = await b.newPage();
  const f = path.resolve(__dirname, 'Manual_Letter_BN_Modulo1_Bloques_1y2.html');
  await p.goto('file://' + f, { waitUntil: 'networkidle0', timeout: 120000 });
  await new Promise(r => setTimeout(r, 1200));

  const footer = `<div style="width:100%;font-family:Georgia,'Times New Roman',serif;font-size:8.5px;
    color:#8a897f;padding:0 30mm 13mm;display:flex;justify-content:space-between;align-items:center;">
    <span style="letter-spacing:1.4px;text-transform:uppercase">Regulación Bioeléctrica</span>
    <span style="letter-spacing:1px;font-variant-numeric:tabular-nums"><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

  const out = path.resolve(__dirname, 'Manual_Letter_BN_Modulo1_Bloques_1y2.pdf');
  await p.pdf({
    path: out,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footer,
  });
  await b.close();
  console.log('PDF con numeración:', out);
})();
