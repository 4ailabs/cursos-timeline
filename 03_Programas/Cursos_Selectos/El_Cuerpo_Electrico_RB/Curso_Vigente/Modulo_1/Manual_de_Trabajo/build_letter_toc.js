/**
 * build_letter_toc.js — Reconstruye los manuales Letter (Color y B&N) AÑADIENDO
 * un índice con numeración real. Dos pasadas con paged.js: (1) se pagina con un
 * índice de marcador para fijar la maqueta y se mide en qué página cae cada
 * sección; (2) se rellena el índice con los números y se escribe el archivo final.
 * Reutiliza el CSS override de build_letter_color.js y build_letter_reflow.js.
 * Uso: node build_letter_toc.js
 */
const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

const b1 = read('Modulo_1_Bloque_1.html');
const b2 = read('Modulo_1_Bloque_2.html');
const b3 = read('Modulo_1_Bloque_3.html');
const b4 = read('Modulo_1_Bloque_4.html');
const pagedjs = read('pagedjs.min.js');
const style = b1.slice(b1.indexOf('<style>'), b1.indexOf('</style>') + '</style>'.length);

function extractOverride(scriptFile) {
  const t = read(scriptFile);
  const key = 'const override = `';
  const s = t.indexOf(key) + key.length;
  const e = t.indexOf('`;', s);
  return t.slice(s, e); // <style>...</style>
}
const overrideColor = extractOverride('build_letter_color.js');
const overrideBw = extractOverride('build_letter_reflow.js');

function bodies(html) {
  const res = [];
  const open = '<div class="body">';
  let i = 0;
  while ((i = html.indexOf(open, i)) !== -1) {
    let j = i + open.length, depth = 1;
    while (depth > 0) {
      const nd = html.indexOf('<div', j), cd = html.indexOf('</div>', j);
      if (cd === -1) break;
      if (nd !== -1 && nd < cd) { depth++; j = nd + 4; } else { depth--; j = cd + 6; }
    }
    res.push(html.slice(i + open.length, j - 6));
    i = j;
  }
  return res;
}
const meta = (h, re, d) => { const m = h.match(re); return m ? m[1].trim() : (d || ''); };
const clean = (s) => s.replace(/<p class="kicker">[^<]*continuaci[oó]n[^<]*<\/p>\s*/gi, '');
const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const DIP = '<svg class="dip" viewBox="0 0 44 24"><circle cx="8" cy="12" r="6" fill="currentColor"/><line x1="16" y1="12" x2="28" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="36" cy="12" r="6" fill="currentColor" opacity="0.35"/></svg>';

function titlePage(html, label) {
  const h1 = meta(html, /<h1>([\s\S]*?)<\/h1>/, '');
  const sub = meta(html, /<p class="sub">([\s\S]*?)<\/p>/, '');
  const prog = meta(html, /<div class="prog">([\s\S]*?)<\/div>/, 'Formación en Regulación Bioeléctrica');
  return `<section class="titlepage">
    <div class="tp-mark">${DIP}<span>el cuerpo eléctrico</span></div>
    <div class="tp-center"><div class="tp-prog">${prog}</div><h1>${h1}</h1><p class="tp-sub">${sub}</p></div>
    <div class="tp-meta"><div><b>Dr. Miguel Ojeda Rios</b><br>Instituto Centrobioenergetica · 2026</div><div class="tp-mod">${label}<br>Manual de trabajo</div></div>
  </section>`;
}

const blks = [
  { html: b1, art: clean_join(b1), n: 1 },
  { html: b2, art: clean_join(b2), n: 2 },
  { html: b3, art: clean_join(b3), n: 3 },
  { html: b4, art: clean_join(b4), n: 4 },
];
function clean_join(h) { return bodies(h).map(clean).join('\n'); }

// entradas del índice, EN EL MISMO ORDEN que ".doc h1, .doc h2" del documento
function h2texts(art) {
  const out = []; const re = /<h2[^>]*>([\s\S]*?)<\/h2>/g; let m;
  while ((m = re.exec(art))) out.push(stripTags(m[1]));
  return out;
}
const entries = [];
for (const b of blks) {
  const h1 = stripTags(meta(b.html, /<h1>([\s\S]*?)<\/h1>/, ''));
  entries.push({ level: 'b', text: `Bloque ${b.n} · ${h1}` });
  for (const t of h2texts(b.art)) entries.push({ level: 's', text: t });
}

// CSS del índice (usa las variables de marca; se adapta a color/BW)
const tocStyle = `<style>
.toc{min-height:220mm;break-after:page;break-inside:avoid;padding-top:4mm}
.toc-head{border-bottom:1px solid var(--rule);padding-bottom:6mm;margin-bottom:8mm}
.toc-eyebrow{font-family:system-ui,sans-serif;font-size:10.5px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
.toc .toc-title{font-size:40px;line-height:1.04;margin:0;color:var(--ink);letter-spacing:-.01em;font-weight:700}
.toc-list{display:flex;flex-direction:column;gap:2.4mm}
.toc-row{display:flex;align-items:baseline;font-family:Georgia,serif}
.toc-row .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.toc-row .ld{flex:1 1 auto;border-bottom:1px dotted var(--muted);margin:0 6px;position:relative;top:-3px;min-width:14px;opacity:.6}
.toc-row .pg{font-variant-numeric:tabular-nums;color:var(--muted)}
.toc-row.b{margin-top:5mm;font-weight:700;font-size:14.5px;color:var(--teal)}
.toc-row.b:first-child{margin-top:0}
.toc-row.b .pg{color:var(--teal)}
.toc-row.s{font-size:12.5px;color:var(--ink-soft);padding-left:8mm}
/* índice: sin encabezado/pie/línea, como las portadas */
.pagedjs_area:has(.toc)::before,.pagedjs_area:has(.toc)::after{content:none}
.pagedjs_area:has(.toc) .pagedjs_page_content{padding:0}
.pagedjs_page:has(.toc) .pagedjs_margin-content::after{content:"" !important}
</style>`;

function tocSection(pages /* array|null */) {
  const rows = entries.map((e, i) => {
    const pg = pages ? pages[i] : '··';
    return `<div class="toc-row ${e.level}"><span class="t">${e.text}</span><span class="ld"></span><span class="pg">${pg}</span></div>`;
  }).join('\n');
  return `<section class="toc">
    <div class="toc-head"><div class="toc-eyebrow">El Cuerpo Eléctrico · Formación en Regulación Bioeléctrica</div><div class="toc-title">Índice del Módulo 1</div></div>
    <div class="toc-list">${rows}</div>
  </section>`;
}

function assemble(mode, toc) {
  const override = mode === 'bw' ? overrideBw : overrideColor;
  const htmlAttr = mode === 'bw' ? 'lang="es" data-mode="bw"' : 'lang="es"';
  const title = mode === 'bw'
    ? 'El Cuerpo Eléctrico · Módulo 1 (Bloques 1–4) — Manual (Carta · B&N)'
    : 'El Cuerpo Eléctrico · Módulo 1 (Bloques 1–4) — Manual (Carta · Color)';
  return `<!doctype html>
<html ${htmlAttr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
${style}
${override}
${tocStyle}
</head>
<body>
<div class="doc">
${titlePage(b1, 'Módulo 1 · Bloque 1')}
${toc}
${blks[0].art}
${titlePage(b2, 'Módulo 1 · Bloque 2')}
${blks[1].art}
${titlePage(b3, 'Módulo 1 · Bloque 3')}
${blks[2].art}
${titlePage(b4, 'Módulo 1 · Bloque 4')}
${blks[3].art}
</div>
<script>${pagedjs}</script>
</body>
</html>
`;
}

async function measure(fullHtml) {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });
  await p.setContent('<!doctype html><html><head><meta charset=utf-8></head><body>' + fullHtml + '</body></html>', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  const pages = await p.evaluate(() => {
    const allPages = [...document.querySelectorAll('.pagedjs_page')];
    const idx = (el) => { const pg = el.closest('.pagedjs_page'); return pg ? allPages.indexOf(pg) + 1 : 0; };
    return [...document.querySelectorAll('.doc h1, .doc h2')].map(idx);
  });
  await b.close();
  return pages;
}

(async () => {
  for (const mode of ['color', 'bw']) {
    const placeholder = assemble(mode, tocSection(null));
    const pages = await measure(placeholder);
    if (pages.length !== entries.length) {
      console.warn(`⚠ ${mode}: medidas ${pages.length} ≠ entradas ${entries.length}`);
    }
    const final = assemble(mode, tocSection(pages));
    const OUT = mode === 'bw' ? 'Manual_Letter_BN_Modulo1_Bloques_1y2.html' : 'Manual_Letter_Color_Modulo1_Bloques_1-4.html';
    fs.writeFileSync(path.join(__dirname, OUT), final);
    console.log(`✅  ${OUT}  ·  ${mode.toUpperCase()}  ·  índice de ${entries.length} entradas  ·  ${(final.length / 1024).toFixed(0)} KB`);
  }
})();
