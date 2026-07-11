/**
 * build_artifact.js — Genera el CONTENIDO (para Artifact) del manual web
 * El Cuerpo Eléctrico · Módulo 1 · Bloques 1 y 2. Monocromo editorial, Georgia,
 * temas claro/oscuro, figuras en grises. Reutiliza el contenido y las figuras SVG
 * de los cuadernillos A5. Salida SIN <!doctype>/<html>/<head>/<body> (solo <style> + contenido).
 * Uso: node build_artifact.js
 */
const fs = require('fs');
const path = require('path');
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');
const b1 = read('Modulo_1_Bloque_1.html');
const b2 = read('Modulo_1_Bloque_2.html');

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
const art1 = bodies(b1).map(clean).join('\n');
const art2 = bodies(b2).map(clean).join('\n');

const DIP = '<svg class="dip" viewBox="0 0 44 24" aria-hidden="true"><circle cx="8" cy="12" r="6" fill="currentColor"/><line x1="16" y1="12" x2="28" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="36" cy="12" r="6" fill="currentColor" opacity="0.35"/></svg>';

function blockHead(html, label, sub) {
  const h1 = meta(html, /<h1>([\s\S]*?)<\/h1>/, '');
  return `<header class="blockhead">
    <div class="bh-eyebrow">${label}</div>
    <h1 class="bh-title">${h1}</h1>
    <p class="bh-sub">${sub}</p>
  </header>`;
}

const CSS = `<style>
:root{
  --paper:#FBF9F2; --ink:#1b1913; --soft:#46433b; --muted:#8b8779; --line:#e4dfd1;
  --card:#F1EDE2; --figbg:#ffffff; --hair:#e4dfd1; --accent:#1b1913;
}
@media (prefers-color-scheme:dark){:root{
  --paper:#14130d; --ink:#ece7db; --soft:#bcb7a8; --muted:#8d897b; --line:#2c2a21;
  --card:#1e1c14; --figbg:#f7f5ef; --hair:#2c2a21; --accent:#ece7db;
}}
:root[data-theme="light"]{--paper:#FBF9F2;--ink:#1b1913;--soft:#46433b;--muted:#8b8779;--line:#e4dfd1;--card:#F1EDE2;--figbg:#fff;--hair:#e4dfd1;--accent:#1b1913}
:root[data-theme="dark"]{--paper:#14130d;--ink:#ece7db;--soft:#bcb7a8;--muted:#8d897b;--line:#2c2a21;--card:#1e1c14;--figbg:#f7f5ef;--hair:#2c2a21;--accent:#ece7db}

*{box-sizing:border-box}
.manual{background:var(--paper);color:var(--ink);font-family:Georgia,'Times New Roman',serif;
  -webkit-font-smoothing:antialiased;line-height:1.68;padding:0 24px 120px}
.manual .wrap{max-width:720px;margin:0 auto}

/* masthead */
.masthead{max-width:720px;margin:0 auto;padding:54px 0 34px;display:flex;align-items:center;
  justify-content:space-between;border-bottom:1px solid var(--hair);flex-wrap:wrap;gap:12px}
.masthead .brand{display:flex;align-items:center;gap:11px;color:var(--ink)}
.masthead .dip{width:40px;height:22px;color:var(--ink)}
.masthead .brand b{font-size:15px;letter-spacing:.02em}
.masthead .brand span{display:block;font-family:system-ui,sans-serif;font-size:10.5px;
  letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-top:2px}
.masthead .meta{font-family:system-ui,sans-serif;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);text-align:right}

/* portada de bloque */
.blockhead{max-width:720px;margin:0 auto;padding:88px 0 20px;border-bottom:1px solid var(--hair)}
.bh-eyebrow{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.28em;text-transform:uppercase;
  color:var(--muted);margin-bottom:20px}
.bh-title{font-size:52px;line-height:1.04;letter-spacing:-.015em;margin:0 0 14px;font-weight:700}
.bh-sub{font-size:20px;font-style:italic;color:var(--soft);margin:0 0 8px;max-width:36ch}

/* tipografía de contenido */
.manual h2{font-size:27px;line-height:1.2;letter-spacing:-.01em;margin:52px 0 14px;font-weight:700;text-wrap:balance}
.manual h3{font-size:19px;line-height:1.3;margin:34px 0 8px;font-weight:700;color:var(--ink)}
.manual p{font-size:18px;margin:0 0 16px;color:var(--soft)}
.manual .lead{font-size:19.5px;color:var(--ink)}
.manual strong{color:var(--ink);font-weight:700}
.manual em{font-style:italic}
.manual .kicker{font-family:system-ui,sans-serif;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--muted);font-weight:600;margin:0 0 6px}

/* listas */
.manual ul.blist,.manual ol.nlist{list-style:none;margin:14px 0 20px;padding:0;display:flex;flex-direction:column;gap:11px}
.manual ol.nlist{counter-reset:n}
.manual .blist>li,.manual .nlist>li{position:relative;padding-left:34px;font-size:18px;color:var(--soft)}
.manual .blist>li::before{content:"";position:absolute;left:6px;top:12px;width:6px;height:6px;border-radius:50%;background:var(--ink)}
.manual .nlist>li::before{counter-increment:n;content:counter(n);position:absolute;left:0;top:1px;width:23px;height:23px;
  border:1px solid var(--ink);border-radius:50%;font-family:system-ui,sans-serif;font-size:11px;font-weight:700;
  color:var(--ink);display:flex;align-items:center;justify-content:center}
.manual .blist>li b,.manual .nlist>li b{color:var(--ink)}

/* idea / chain */
.manual .idea{background:var(--card);border-radius:10px;padding:22px 26px;margin:26px 0}
.manual .idea .lab{display:flex;align-items:center;gap:9px;font-family:system-ui,sans-serif;font-size:10.5px;
  letter-spacing:.18em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:9px}
.manual .idea .lab .dot{width:6px;height:6px;border-radius:50%;background:var(--ink)}
.manual .idea p{margin:0;font-style:italic;font-size:18px;color:var(--ink)}
.manual .chain{border-left:2px solid var(--ink);padding:4px 0 4px 20px;margin:22px 0;font-size:18px;color:var(--soft)}
.manual .chain b{color:var(--ink)}

/* figuras */
.manual figure.fig{margin:34px 0;background:var(--figbg);border:1px solid var(--hair);border-radius:12px;
  padding:22px 22px 18px;overflow:hidden}
.manual .fig .fighd{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.manual .fig .figt{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8a897f;font-weight:700}
.manual .fig .leg{font-family:system-ui,sans-serif;font-size:11px;color:#4c4a42;display:flex;align-items:center;gap:5px;flex-wrap:wrap}
.manual .fig .leg i{display:inline-block;width:13px;height:3px;border-radius:2px;filter:grayscale(1)}
.manual .fig svg{width:100%;height:auto;display:block;filter:grayscale(1)}
.manual figcaption{font-family:system-ui,sans-serif;font-size:13px;line-height:1.5;color:#6f6d64;margin-top:14px}
.manual figcaption b{color:#25241e}
.manual .figcap{font-family:system-ui,sans-serif;font-size:13px;color:#6f6d64;margin-top:12px}

/* tabla */
.manual table.tbl{width:100%;border-collapse:collapse;margin:22px 0;font-family:system-ui,sans-serif}
.manual table.tbl th{text-align:left;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);
  border-bottom:1.5px solid var(--ink);padding:9px 12px;font-weight:700}
.manual table.tbl td{border-bottom:1px solid var(--hair);padding:11px 12px;font-size:14.5px;color:var(--soft);vertical-align:top}
.manual table.tbl td:first-child{font-weight:700;color:var(--ink)}

/* referencias / glosario */
.manual .two{column-count:2;column-gap:34px}
.manual .two>*{break-inside:avoid}
.manual dl.gl div{font-size:15px;margin-bottom:9px;padding-bottom:9px;border-bottom:1px solid var(--hair);color:var(--soft)}
.manual dl.gl dt{display:inline;font-weight:700;color:var(--ink)}
.manual dl.gl dd{display:inline;margin:0}
.manual dl.gl dd::before{content:" — "}
.manual .refs{font-size:14px;color:var(--soft);line-height:1.55}
.manual .refs h4{font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted);margin:18px 0 6px;font-weight:700}
.manual .refs p{font-size:14px;margin:0 0 6px}
.manual .refs .grp{margin-bottom:16px}

.manual .colophon{max-width:720px;margin:80px auto 0;padding-top:22px;border-top:1px solid var(--hair);
  font-family:system-ui,sans-serif;font-size:12px;letter-spacing:.04em;color:var(--muted);text-align:center}

@media (max-width:560px){
  .bh-title{font-size:38px}.manual h2{font-size:23px}.manual .two{column-count:1}
  .manual{padding:0 18px 90px}
}
</style>`;

const content = `${CSS}
<div class="manual">
  <div class="masthead">
    <div class="brand">${DIP}<div><b>Regulación Bioeléctrica</b><span>El Cuerpo Eléctrico · Manual</span></div></div>
    <div class="meta">Módulo 1 · Bloques 1 y 2<br>Dr. Miguel Ojeda Rios</div>
  </div>

  ${blockHead(b1, 'Módulo 1 · Bloque 1', 'Por qué el cuerpo es un sistema eléctrico.')}
  <div class="wrap">
${art1}
  </div>

  ${blockHead(b2, 'Módulo 1 · Bloque 2', 'Con qué se toca el cuerpo eléctrico y dónde actúa.')}
  <div class="wrap">
${art2}
  </div>

  <div class="colophon">Regulación Bioeléctrica · Instituto Centrobioenergetica · 2026</div>
</div>`;

fs.writeFileSync(path.join(__dirname, 'artifact_manual_m1_b1b2.html'), content);
console.log(`✅  artifact_manual_m1_b1b2.html  ·  ${(content.length / 1024).toFixed(0)} KB`);
