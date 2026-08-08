import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
await import(pathToFileURL(path.join(here, 'beginner-guides.js')).href);
const beginnerGuides = globalThis.BEGINNER_GUIDES ?? {};
await import(pathToFileURL(path.join(here, 'teaching-diagrams.js')).href);
const teachingDiagrams = globalThis.TEACHING_DIAGRAMS ?? {};
const sourcePath = '/Users/miguelojedarios/quintuple-multiescala/Curso quintuple/clase-quintuple-cono-cognitivo-guion.md';
const outputPath = path.join(here, 'guion-tarjetas.html');
const source = fs.readFileSync(sourcePath, 'utf8');

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const marker = /^(🖼️|🗣️|🎓|❓|➡️)/u;
const cleanBlock = (lines) => {
  const body = [...lines];
  if (body.length && marker.test(body[0])) body.shift();
  return body
    .map((line) => line.replace(/^> ?/, ''))
    .join('\n')
    .trim();
};

const renderText = (value, rich = false) => {
  let html = escapeHtml(value);
  if (rich) html = html
    .replace(/\*\*(.+?)\*\*/gs, '<strong>$1</strong>')
    .replace(/\$\$(.+?)\$\$/gs, '<span class="formula">$1</span>')
    .replace(/\$(.+?)\$/gs, '<span class="formula">$1</span>');
  return html.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
};

const slideHeader = /^## SLIDE (\d{2}) · (.+)$/gm;
const headers = [...source.matchAll(slideHeader)];
const slides = headers.map((match) => {
  const number = match[1];
  const title = match[2].trim();
  const bodyStart = match.index + match[0].length;
  const separator = source.indexOf('\n---', bodyStart);
  const raw = source.slice(bodyStart, separator === -1 ? source.length : separator).trim();
  const time = raw.match(/^\*\*Tiempo:\*\*\s*(.+)$/m)?.[1]?.trim() ?? '';
  const sections = { visual: [], guion: [], experta: [], interaccion: [], transicion: [] };
  let current = null;
  for (const line of raw.split('\n')) {
    if (line.startsWith('🖼️')) current = 'visual';
    else if (line.startsWith('🗣️')) current = 'guion';
    else if (line.startsWith('🎓')) current = 'experta';
    else if (line.startsWith('❓')) current = 'interaccion';
    else if (line.startsWith('➡️')) current = 'transicion';
    if (current) sections[current].push(line);
  }
  return {
    number,
    title,
    time: time.replaceAll('**', ''),
    raw: `## SLIDE ${number} · ${title}\n\n${raw}`,
    visual: cleanBlock(sections.visual),
    guion: cleanBlock(sections.guion),
    experta: cleanBlock(sections.experta),
    interaccion: cleanBlock(sections.interaccion),
    transicion: cleanBlock(sections.transicion),
    guide: beginnerGuides[Number(number)] ?? null,
    teaching: teachingDiagrams[Number(number)] ?? null,
  };
});

if (slides.length !== 30) throw new Error(`Se esperaban 30 slides y se encontraron ${slides.length}.`);

const sectionFor = (number) => {
  const n = Number(number);
  if (n <= 3) return 'La pregunta';
  if (n <= 14) return 'El quíntuple';
  if (n <= 22) return 'El cono cognitivo';
  if (n <= 27) return 'Qué cambia';
  return 'Cierre';
};

const cards = slides.map((slide) => `
<article class="script-card" id="slide-${slide.number}" data-search="${escapeHtml(`${slide.number} ${slide.title} ${slide.guion} ${slide.experta} ${slide.guide ? Object.values(slide.guide).join(' ') : ''} ${slide.teaching?.title ?? ''}`.toLowerCase())}">
  <header class="card-head">
    <div><span class="slide-number">${slide.number}</span><span class="section-name">${sectionFor(slide.number)}</span></div>
    <div class="card-meta">${slide.teaching ? '<span class="diagram-badge">Pizarra · D</span>' : ''}<span class="time">${escapeHtml(slide.time)}</span></div>
  </header>
  <h2>${escapeHtml(slide.title)}</h2>
  <section class="script-block guion-block">
    <h3><span>🗣</span> Guion exacto</h3>
    <div class="spoken"><p>${renderText(slide.guion)}</p></div>
  </section>
  ${slide.guide ? `<section class="script-block optional general-block"><h3><span>◎</span> Apoyo para público general</h3><div class="guide-grid"><div><b>En palabras simples</b><p>${escapeHtml(slide.guide.simple)}</p></div><div><b>Ejemplo</b><p>${escapeHtml(slide.guide.example)}</p></div><div><b>Qué observar</b><p>${escapeHtml(slide.guide.observe)}</p></div></div></section>` : ''}
  ${slide.experta ? `<section class="script-block optional expert-block"><h3><span>🎓</span> Capa experta</h3><div class="prose"><p>${renderText(slide.experta, true)}</p></div></section>` : ''}
  ${slide.interaccion ? `<section class="script-block optional interaction-block"><h3><span>❓</span> Interacción</h3><div class="prose"><p>${renderText(slide.interaccion, true)}</p></div></section>` : ''}
  ${slide.transicion ? `<section class="transition"><span>→</span><p>${renderText(slide.transicion)}</p></section>` : ''}
  <details class="source-details optional source-block"><summary>Ver bloque fuente literal</summary><pre>${escapeHtml(slide.raw)}</pre></details>
</article>`).join('\n');

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Guion exacto · El quíntuple y el cono cognitivo</title>
<style>
:root{--paper:#f4f1ea;--ink:#171a1f;--blue:#3d5a80;--amber:#e8a33d;--oxide:#a8452f;--muted:#686a69;--line:#d8d2c6;--white:#fffdf8;--serif:Georgia,'Times New Roman',serif;--sans:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--mono:'SFMono-Regular',Consolas,monospace}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans)}
.masthead{position:relative;padding:56px max(6vw,28px) 54px;background:var(--ink);color:var(--paper);overflow:hidden}.masthead:after{content:'';position:absolute;width:620px;height:620px;border:1px solid rgba(232,163,61,.3);border-radius:50%;right:-180px;top:-370px;box-shadow:0 0 0 60px rgba(232,163,61,.035),0 0 0 120px rgba(232,163,61,.025)}.brand-logo{position:relative;z-index:2;display:block;width:min(360px,70vw);height:auto;margin:0 0 34px;opacity:.96}
.eyebrow{margin:0 0 16px;color:var(--amber);font:700 12px/1 var(--mono);letter-spacing:.18em;text-transform:uppercase}.masthead h1{max-width:920px;margin:0;font:700 clamp(42px,6vw,78px)/.98 var(--serif);letter-spacing:-.04em}.masthead .dek{max-width:760px;margin:28px 0 0;color:#c9c7c0;font-size:19px;line-height:1.55}
.toolbar{position:sticky;top:0;z-index:20;display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:14px max(6vw,28px);background:rgba(244,241,234,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(18px)}.toolbar input{flex:1;min-width:220px;padding:12px 15px;border:1px solid var(--line);border-radius:4px;background:var(--white);font-size:15px}.toolbar button{border:1px solid var(--line);background:var(--white);padding:11px 14px;border-radius:4px;color:var(--ink);font-weight:700;cursor:pointer}.toolbar button[aria-pressed='true']{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.count{margin-left:auto;color:var(--muted);font:700 12px var(--mono)}main{width:min(1180px,88vw);margin:48px auto 100px;display:grid;gap:30px}.script-card{position:relative;background:var(--white);padding:42px 48px 46px;border:1px solid var(--line);box-shadow:0 18px 55px rgba(23,26,31,.07)}.script-card:before{content:'';position:absolute;left:-1px;top:-1px;bottom:-1px;width:5px;background:var(--amber)}
.card-head{display:flex;justify-content:space-between;gap:20px;align-items:center}.card-meta{display:flex;align-items:center;gap:12px}.diagram-badge{padding:8px 10px;background:var(--blue);color:white;font:800 10px var(--mono);letter-spacing:.08em;text-transform:uppercase}.slide-number{display:inline-grid;place-items:center;width:44px;height:32px;background:var(--ink);color:var(--paper);font:700 13px var(--mono)}.section-name,.time{margin-left:12px;color:var(--muted);font:700 11px var(--mono);letter-spacing:.12em;text-transform:uppercase}.script-card h2{margin:24px 0 30px;font:700 clamp(31px,4vw,49px)/1 var(--serif);letter-spacing:-.025em}.script-block{margin-top:24px;padding-top:23px;border-top:1px solid var(--line)}.script-block h3{margin:0 0 16px;color:var(--blue);font:800 12px var(--mono);letter-spacing:.11em;text-transform:uppercase}.script-block h3 span{margin-right:8px}.spoken{font:400 clamp(19px,2.1vw,25px)/1.62 var(--serif)}.spoken p,.prose p{margin:0}.prose{font-size:16px;line-height:1.65;color:#414443}.general-block{margin-left:-18px;margin-right:-18px;padding:23px 18px 20px;background:rgba(61,90,128,.07);border-top-color:rgba(61,90,128,.36)}.general-block h3{color:var(--blue)}.guide-grid{display:grid;grid-template-columns:1.12fr 1fr 1fr;gap:18px}.guide-grid>div{padding-right:18px;border-right:1px solid rgba(61,90,128,.2)}.guide-grid>div:last-child{border:0;padding-right:0}.guide-grid b{display:block;margin-bottom:7px;color:var(--blue);font:800 10px var(--mono);letter-spacing:.08em;text-transform:uppercase}.guide-grid p{margin:0;font-size:15px;line-height:1.48;color:#34383b}.expert-block{background:rgba(232,163,61,.07);margin-left:-18px;margin-right:-18px;padding:23px 18px 0;border-top-color:rgba(232,163,61,.4)}.interaction-block h3{color:var(--oxide)}.formula{display:inline-block;padding:0 .18em;color:#273f5e;font-family:var(--serif);font-style:italic}.transition{display:flex;gap:16px;align-items:flex-start;margin-top:26px;padding:17px 20px;background:var(--ink);color:var(--paper)}.transition span{color:var(--amber);font-size:24px}.transition p{margin:2px 0 0;font-weight:700;line-height:1.5}.source-details{margin-top:20px}.source-details summary{cursor:pointer;color:var(--muted);font:700 11px var(--mono);text-transform:uppercase;letter-spacing:.08em}.source-details pre{margin:16px 0 0;padding:20px;overflow:auto;background:#eeebe3;border:1px solid var(--line);white-space:pre-wrap;font:12px/1.55 var(--mono)}
.hide-optional .optional{display:none}.compact main{grid-template-columns:repeat(2,minmax(0,1fr));width:min(1500px,94vw);gap:18px}.compact .script-card{padding:30px}.compact .spoken{font-size:18px}.compact .script-card h2{font-size:32px}.script-card[hidden]{display:none}.empty{display:none;text-align:center;padding:80px;color:var(--muted)}
footer{padding:36px max(6vw,28px);background:var(--ink);color:#aaa79f;font-size:13px;line-height:1.6}footer strong{color:var(--paper)}
@media(max-width:760px){.masthead{padding-top:52px}.toolbar{align-items:stretch}.count{width:100%;margin:0}.script-card{padding:30px 25px}.compact main{grid-template-columns:1fr}.card-head{align-items:flex-start}.time{text-align:right}.section-name{display:none}.guide-grid{grid-template-columns:1fr}.guide-grid>div{border-right:0;border-bottom:1px solid rgba(61,90,128,.2);padding:0 0 13px}.guide-grid>div:last-child{border:0;padding:0}}
@media print{.toolbar{display:none}.masthead{padding:30px 40px}.masthead:after{display:none}main,.compact main{display:block;width:auto;margin:0}.script-card{break-inside:avoid;box-shadow:none;border-width:0 0 1px;margin:0;padding:34px 38px}.optional{display:block!important}.source-block{display:none!important}footer{display:none}}
</style>
</head>
<body>
<header class="masthead"><img class="brand-logo" src="assets/logo-regulacion-bioelectrica.png" alt="Regulación bioeléctrica"><p class="eyebrow">Guion de presentación · 30 slides · 75 minutos</p><h1>El quíntuple y el cono cognitivo</h1><p class="dek">Tarjetas de conducción con el guion literal de cada diapositiva, la capa experta, las interacciones y las transiciones.</p></header>
<nav class="toolbar" aria-label="Herramientas del guion"><input id="search" type="search" placeholder="Buscar por slide, concepto o frase…" aria-label="Buscar en el guion"><button id="optional" type="button" aria-pressed="true">Capas completas</button><button id="compact" type="button" aria-pressed="false">Vista compacta</button><button id="print" type="button">Imprimir</button><span class="count"><b id="visible-count">30</b> / 30 tarjetas</span></nav>
<main>${cards}</main><p class="empty" id="empty">No hay tarjetas que coincidan con la búsqueda.</p>
<footer><strong>Fuente:</strong> clase-quintuple-cono-cognitivo-guion.md · Autor: Dr. Miguel Ojeda Rios. El texto del guion no fue resumido ni reescrito. Cada tarjeta incluye un desplegable con su bloque fuente literal para cotejo.</footer>
<script>
const cards=[...document.querySelectorAll('.script-card')];
const search=document.querySelector('#search');
const count=document.querySelector('#visible-count');
const empty=document.querySelector('#empty');
function filter(){const q=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const show=!q||card.dataset.search.includes(q);card.hidden=!show;if(show)visible++});count.textContent=visible;empty.style.display=visible?'none':'block'}
search.addEventListener('input',filter);
document.querySelector('#optional').addEventListener('click',event=>{const hidden=document.body.classList.toggle('hide-optional');event.currentTarget.setAttribute('aria-pressed',String(!hidden));event.currentTarget.textContent=hidden?'Solo guion':'Capas completas'});
document.querySelector('#compact').addEventListener('click',event=>{const compact=document.body.classList.toggle('compact');event.currentTarget.setAttribute('aria-pressed',String(compact));event.currentTarget.textContent=compact?'Vista amplia':'Vista compacta'});
document.querySelector('#print').addEventListener('click',()=>window.print());
</script>
</body>
</html>`;

fs.writeFileSync(outputPath, html);
console.log(`Generadas ${slides.length} tarjetas en ${outputPath}`);
