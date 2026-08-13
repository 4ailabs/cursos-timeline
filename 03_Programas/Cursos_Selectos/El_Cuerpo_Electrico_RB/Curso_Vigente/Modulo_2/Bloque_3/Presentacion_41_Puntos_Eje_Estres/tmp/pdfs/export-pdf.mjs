import { chromium } from '/Users/miguelojedarios/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';

const source = '/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Curso_Vigente/Modulo_2/Bloque_3/Presentacion_41_Puntos_Eje_Estres/index.html';
const output = '/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/El_Cuerpo_Electrico_RB/Curso_Vigente/Modulo_2/Bloque_3/Presentacion_41_Puntos_Eje_Estres/output/pdf/Presentacion_41_Puntos_Eje_Estres.pdf';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.querySelectorAll('.slide').length === 41);
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((img) => img.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      })));
  document.querySelectorAll('.fragment').forEach((fragment) => {
    fragment.classList.add('visible');
    fragment.setAttribute('aria-hidden', 'false');
  });
});
await page.addStyleTag({ content: `
  @page { size: 13.333333in 7.5in; margin: 0; }
  html, body { width: 13.333333in !important; height: auto !important; overflow: visible !important; background: #05090d !important; }
  .deck { position: static !important; width: 13.333333in !important; height: auto !important; overflow: visible !important; }
  .slide, .slide.active, .slide.leaving {
    position: relative !important;
    inset: auto !important;
    display: block !important;
    width: 13.333333in !important;
    height: 7.5in !important;
    break-after: page !important;
    page-break-after: always !important;
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
  }
  .slide:last-child { break-after: auto !important; page-break-after: auto !important; }
  .fragment { opacity: 1 !important; transform: none !important; filter: none !important; }
  .controls, .notes-panel { display: none !important; }
` });
await page.pdf({
  path: output,
  width: '13.333333in',
  height: '7.5in',
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  printBackground: true,
  preferCSSPageSize: true,
  tagged: true,
});
await browser.close();
console.log(output);
