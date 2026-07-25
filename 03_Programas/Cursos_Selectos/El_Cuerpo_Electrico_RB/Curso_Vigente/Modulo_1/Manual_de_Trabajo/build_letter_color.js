/**
 * build_letter_color.js — Manual tamaño CARTA (Letter), A COLOR, con REFLUJO real
 * y PAGINADO VISIBLE (paged.js). Igual que build_letter_reflow.js pero en color:
 * sin data-mode="bw", sin el override de grises ni el grisado de figuras.
 * Uso: node build_letter_color.js
 */
const fs = require('fs');
const path = require('path');
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const b1 = read('Modulo_1_Bloque_1.html');
const b2 = read('Modulo_1_Bloque_2.html');
const b3 = read('Modulo_1_Bloque_3.html');
const b4 = read('Modulo_1_Bloque_4.html');
const pagedjs = read('pagedjs.min.js');

const style = b1.slice(b1.indexOf('<style>'), b1.indexOf('</style>') + '</style>'.length);

function bodies(html) {
  const res = [];
  const open = '<div class="body">';
  let i = 0;
  while ((i = html.indexOf(open, i)) !== -1) {
    let j = i + open.length, depth = 1;
    while (depth > 0) {
      const nd = html.indexOf('<div', j);
      const cd = html.indexOf('</div>', j);
      if (cd === -1) break;
      if (nd !== -1 && nd < cd) { depth++; j = nd + 4; }
      else { depth--; j = cd + 6; }
    }
    res.push(html.slice(i + open.length, j - 6));
    i = j;
  }
  return res;
}
const meta = (h, re, d) => { const m = h.match(re); return m ? m[1].trim() : (d || ''); };

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

const clean = (s) => s.replace(/<p class="kicker">[^<]*continuaci[oó]n[^<]*<\/p>\s*/gi, '');
const art1 = bodies(b1).map(clean).join('\n');
const art2 = bodies(b2).map(clean).join('\n');
const art3 = bodies(b3).map(clean).join('\n');
const art4 = bodies(b4).map(clean).join('\n');

const override = `<style>
/* ===== CARTA (Letter) · Reflujo paginado (paged.js) · COLOR ===== */
*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important}
@page{
  size: letter;
  margin: 19mm 24mm 20mm 30mm;
  @top-left{ content:"El Cuerpo Eléctrico"; font:8.5pt Georgia,serif; color:#8A897F; letter-spacing:1px; text-transform:uppercase; }
  @top-right{ content:"Módulo 1"; font:8.5pt Georgia,serif; color:#8A897F; letter-spacing:1px; text-transform:uppercase; }
  @bottom-left{ content:"Regulación Bioeléctrica"; font:8.5pt Georgia,serif; color:#8A897F; letter-spacing:1px; text-transform:uppercase; }
  @bottom-right{ content: counter(page); font:8.5pt Georgia,serif; color:#8A897F; letter-spacing:.5px; }
}
@page cover{ @top-left{content:""} @top-right{content:""} @bottom-left{content:""} @bottom-right{content:""} }
.titlepage{ page: cover; }
/* --- encabezados y numeración: este paged.js no aplica las cajas @page anidadas,
   así que apuntamos directo a los divs de margen que genera --- */
.pagedjs_margin-top-left,.pagedjs_margin-top-right,.pagedjs_margin-bottom-left,.pagedjs_margin-bottom-right{visibility:visible !important}
.pagedjs_margin-content{width:100%}
.pagedjs_page .pagedjs_margin-top-left .pagedjs_margin-content::after{content:"El Cuerpo Eléctrico";font-family:Georgia,serif;font-size:8.5pt;color:#8A897F;letter-spacing:1px;text-transform:uppercase}
.pagedjs_page .pagedjs_margin-top-right .pagedjs_margin-content::after{content:"Módulo 1";font-family:Georgia,serif;font-size:8.5pt;color:#8A897F;letter-spacing:1px;text-transform:uppercase}
.pagedjs_page .pagedjs_margin-bottom-left .pagedjs_margin-content::after{content:"Regulación Bioeléctrica";font-family:Georgia,serif;font-size:8.5pt;color:#8A897F;letter-spacing:1px;text-transform:uppercase}
.pagedjs_page .pagedjs_margin-bottom-right .pagedjs_margin-content::after{content:counter(page);font-family:Georgia,serif;font-size:8.5pt;color:#8A897F;letter-spacing:.5px}
.pagedjs_cover_page .pagedjs_margin-content::after,
.pagedjs_page:has(.titlepage) .pagedjs_margin-content::after{content:"" !important}
.pagedjs_area{position:relative}
.pagedjs_page_content{padding:3.5mm 0}
.pagedjs_area::before{content:"";position:absolute;left:0;right:0;top:0;border-top:1px solid #C4E4D8;z-index:5}
.pagedjs_area::after{content:"";position:absolute;left:0;right:0;bottom:0;border-top:1px solid #C4E4D8;z-index:5}
.pagedjs_area:has(.titlepage)::before,.pagedjs_area:has(.titlepage)::after{content:none}
.pagedjs_area:has(.titlepage) .pagedjs_page_content{padding:0}

html,body{background:#fff;margin:0}
.doc{color:#25241E;font-family:Georgia,'Times New Roman',serif}
.doc p{font-size:13px;line-height:1.6;margin:0 0 3.1mm;color:#25241E}
.doc .lead{font-size:13.8px;color:#4C4A42}
.doc h2{font-size:21px;line-height:1.16;margin:6.5mm 0 2mm;break-after:avoid}
.doc h3{font-size:15px;margin:4.7mm 0 1.6mm;break-after:avoid}
.doc .kicker{margin:5mm 0 2mm;font-size:10px}
.doc ul,.doc ol,.doc dl{margin:2mm 0 3mm}
.doc li{font-size:13px;line-height:1.55}
.doc figure.fig{margin:4mm 0 5mm;break-inside:avoid}
.doc .idea,.doc .chain{break-inside:avoid}
.doc .nlist{break-inside:avoid}
.doc h3+.nlist,.doc h3+.blist{break-before:avoid}
.doc table.tbl{break-inside:avoid;font-size:11.5px}
.doc .refs{break-inside:avoid}
.doc .two{column-gap:9mm}

/* portada de bloque */
.titlepage{min-height:220mm;display:flex;flex-direction:column;justify-content:space-between;break-after:page;break-inside:avoid}
.tp-mark{display:flex;align-items:center;gap:9px}
.tp-mark .dip{width:36px;height:19px;color:#0F6E56}
.tp-mark span{font-family:system-ui,-apple-system,sans-serif;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#8A897F}
.tp-center{margin:auto 0}
.tp-prog{font-family:system-ui,sans-serif;font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:#B84E27;margin-bottom:6mm}
.titlepage h1{font-size:46px;line-height:1.03;margin:0;letter-spacing:-.01em;color:#25241E}
.tp-sub{font-size:17px;font-style:italic;color:#4a4a44;margin:5mm 0 0;max-width:120mm}
.tp-meta{display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid #E7E4DA;padding-top:4.5mm;font-size:11.5px;color:#25241E}
.tp-meta b{color:#0F6E56}
.tp-mod{font-family:system-ui,sans-serif;font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#8A897F;text-align:right}

/* vista en pantalla: hojas Letter separadas */
@media screen{
  body{background:#e7e5de}
  .pagedjs_pages{display:flex;flex-direction:column;align-items:center;gap:16px;padding:20px 0}
  .pagedjs_page{background:#fff;box-shadow:0 8px 30px rgba(30,28,20,.18)}
}
</style>`;

const out = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>El Cuerpo Eléctrico · Módulo 1 (Bloques 1–4) — Manual (Carta · Color)</title>
${style}
${override}
</head>
<body>
<div class="doc">
${titlePage(b1, 'Módulo 1 · Bloque 1')}
${art1}
${titlePage(b2, 'Módulo 1 · Bloque 2')}
${art2}
${titlePage(b3, 'Módulo 1 · Bloque 3')}
${art3}
${titlePage(b4, 'Módulo 1 · Bloque 4')}
${art4}
</div>
<script>${pagedjs}</script>
</body>
</html>
`;

const OUT = 'Manual_Letter_Color_Modulo1_Bloques_1-4.html';
fs.writeFileSync(path.join(__dirname, OUT), out);
console.log(`✅  ${OUT}  ·  ${(out.length / 1024).toFixed(0)} KB  ·  paginado visible (paged.js, Letter, COLOR)`);
