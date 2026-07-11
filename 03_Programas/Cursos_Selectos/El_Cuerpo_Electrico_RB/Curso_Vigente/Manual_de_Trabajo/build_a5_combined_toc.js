/**
 * build_a5_combined_toc.js — Documento A5 ÚNICO con los 4 bloques + índice.
 * El sistema A5 usa hojas de tamaño fijo (una .sheet = una página), así que los
 * números del índice se calculan contando hojas (sin medir en navegador).
 * Orden: portada B1 → índice (2 hojas) → contenido B1 → B2 → B3 → B4.
 * Salida: Manual_A5_Modulo1_Bloques_1-4_indice.html
 * Uso: node build_a5_combined_toc.js
 */
const fs = require('fs');
const path = require('path');
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

const files = { 1: 'Modulo_1_Bloque_1.html', 2: 'Modulo_1_Bloque_2.html', 3: 'Modulo_1_Bloque_3.html', 4: 'Modulo_1_Bloque_4.html' };
const src = {}; for (const n in files) src[n] = read(files[n]);
const b1 = src[1];

// --- preámbulo compartido (de B1) ---
let style = b1.slice(b1.indexOf('<style>'), b1.indexOf('</style>') + 8);
style = style.replace(/counter-reset:pg\s*\d*/, 'counter-reset:pg 0'); // numeración continua desde 1
const defsSvg = (b1.match(/<svg width="0"[\s\S]*?<\/svg>/) || [''])[0];
const screenNote = (b1.match(/<p class="screen-note">[\s\S]*?<\/p>/) || [''])[0];
const ctrl = (b1.match(/<div class="ctrl">[\s\S]*?<\/div>/) || [''])[0];
const toggleScript = (b1.match(/<script>\(function\(\)\{var b=document\.getElementById\('bwtoggle'\)[\s\S]*?<\/script>/) || [''])[0];

// --- extraer hojas por bloque, con metadatos ---
function sheetsOf(html, bn) {
  const arr = html.match(/<section class="sheet[^"]*">[\s\S]*?<\/section>/g) || [];
  return arr.map((s) => ({
    html: s, bn,
    cover: /class="sheet cover"/.test(s),
    h1: (s.match(/<h1>([\s\S]*?)<\/h1>/) ? strip(s.match(/<h1>([\s\S]*?)<\/h1>/)[1]) : null),
    h2: (s.match(/<h2>([\s\S]*?)<\/h2>/) ? strip(s.match(/<h2>([\s\S]*?)<\/h2>/)[1]) : null),
  }));
}
const B = { 1: sheetsOf(src[1], 1), 2: sheetsOf(src[2], 2), 3: sheetsOf(src[3], 3), 4: sheetsOf(src[4], 4) };

// --- orden final: B1cover, TOC1, TOC2, B1resto, B2, B3, B4 ---
const TOC1 = { toc: 1 }, TOC2 = { toc: 2 };
const final = [B[1][0], TOC1, TOC2, ...B[1].slice(1), ...B[2], ...B[3], ...B[4]];
const pageOf = new Map();
final.forEach((sh, i) => pageOf.set(sh, i + 1)); // 1-based = nº de página (counter arranca en 0 → primera hoja = 1)

// --- entradas del índice (portada → su página; h2 → su página) ---
const entries = [];
for (const sh of final) {
  if (sh.toc) continue;
  if (sh.cover) entries.push({ level: 'b', bn: sh.bn, text: `Bloque ${sh.bn} · ${sh.h1}`, page: pageOf.get(sh) });
  else if (sh.h2) entries.push({ level: 's', bn: sh.bn, text: sh.h2, page: pageOf.get(sh) });
}

// --- hojas de índice (B1–2 en la primera, B3–4 en la segunda) ---
function tocRows(list) {
  return list.map(e => `<div class="toc-row ${e.level}"><span class="t">${e.text}</span><span class="ld"></span><span class="pg">${e.page}</span></div>`).join('\n');
}
function tocSheet(part) {
  const list = entries.filter(e => part === 1 ? e.bn <= 2 : e.bn >= 3);
  const head = part === 1
    ? '<p class="kicker">Módulo 1</p><h2>Índice del Módulo 1</h2>'
    : '<p class="kicker">Índice · continuación</p>';
  return `<section class="sheet">
    <div class="hd"><div class="brand"><svg class="dip"><use href="#dipolo"/></svg><span class="eyebrow">el cuerpo eléctrico</span></div><span class="tag">Índice</span></div>
    <div class="body">
      ${head}
      <div class="toc-list">${tocRows(list)}</div>
    </div>
    <div class="ft"><span>Regulación Bioeléctrica</span><span class="pg"></span></div>
  </section>`;
}

const tocStyle = `<style>
  .toc-list{display:flex;flex-direction:column;gap:1.5mm;margin-top:2.5mm}
  .toc-row{display:flex;align-items:baseline;font-family:var(--serif)}
  .toc-row .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .toc-row .ld{flex:1 1 auto;border-bottom:1px dotted var(--muted);opacity:.5;margin:0 5px;position:relative;top:-2px;min-width:8px}
  .toc-row .pg{font-variant-numeric:tabular-nums;color:var(--muted);font-size:11px}
  .toc-row.b{font-weight:700;color:var(--teal);font-size:12.5px;margin-top:3.4mm}
  .toc-row.b:first-child{margin-top:0}
  .toc-row.b .pg{color:var(--teal);font-size:12px}
  .toc-row.s{color:var(--ink-soft);font-size:11px;padding-left:5mm}
</style>`;

// --- ensamblar cuerpo ---
const bookInner = final.map(sh => sh.toc ? tocSheet(sh.toc) : sh.html).join('\n\n');

const out = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<title>El Cuerpo Eléctrico · Módulo 1 (Bloques 1–4) — Cuadernillo A5 con índice</title>
${style}
${tocStyle}
${defsSvg}
${screenNote}
${ctrl}
${toggleScript}
<div class="book">
${bookInner}
</div>
</body>
</html>
`;

const OUT = 'Manual_A5_Modulo1_Bloques_1-4_indice.html';
fs.writeFileSync(path.join(__dirname, OUT), out);
console.log(`✅  ${OUT}  ·  ${final.length} hojas A5 (incl. 2 de índice)  ·  ${entries.length} entradas  ·  ${(out.length / 1024).toFixed(0)} KB`);
