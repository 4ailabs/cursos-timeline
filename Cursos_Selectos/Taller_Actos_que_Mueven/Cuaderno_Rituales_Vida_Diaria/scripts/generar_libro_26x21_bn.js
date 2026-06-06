const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const RITUAL_DIR = path.join(ROOT, "Rituales_Desarrollados");
const OUT = path.join(ROOT, "Libro_Rituales_Diarios_26x21_BN.html");

const files = fs
  .readdirSync(RITUAL_DIR)
  .filter((f) => /^\d+_.*\.md$/.test(f))
  .sort((a, b) => Number(a.slice(0, 2)) - Number(b.slice(0, 2)));

function stripMd(s) {
  return accentText(String(s || "")
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/"/g, "")
    .trim());
}

function accentText(s) {
  const phraseFixes = [
    [/\besta aqui\b/gi, "está aquí"],
    [/\besta afuera\b/gi, "está afuera"],
    [/\besta en\b/gi, "está en"],
    [/\besta dentro\b/gi, "está dentro"],
    [/\besta sobre\b/gi, "está sobre"],
    [/\besta pegada\b/gi, "está pegada"],
    [/\besta cerrado\b/gi, "está cerrado"],
    [/\besta cerrada\b/gi, "está cerrada"],
    [/\besta lista\b/gi, "está lista"],
    [/\besta frase\b/gi, "esta frase"],
    [/\besta carga\b/gi, "esta carga"],
    [/\besta noche\b/gi, "esta noche"],
    [/\beste dia\b/gi, "este día"],
    [/\beste cuerpo\b/gi, "este cuerpo"],
    [/\bmi cuerpo esta\b/gi, "mi cuerpo está"],
    [/\btu cuerpo esta\b/gi, "tu cuerpo está"],
    [/\bno estas\b/gi, "no estás"],
    [/\bestas despierto\b/gi, "estás despierto"],
    [/\btodavia no\b/gi, "todavía no"],
    [/\baun asi\b/gi, "aun así"],
  ];
  let out = s;
  for (const [from, to] of phraseFixes) out = out.replace(from, to);

  const wordFixes = {
    accion: "acción",
    activacion: "activación",
    algun: "algún",
    acompanar: "acompañar",
    aparecera: "aparecerá",
    aparecio: "apareció",
    anotalo: "anótalo",
    atencion: "atención",
    atras: "atrás",
    aun: "aún",
    automatico: "automático",
    automaticamente: "automáticamente",
    basico: "básico",
    cafe: "café",
    caida: "caída",
    cancion: "canción",
    colocala: "colócala",
    colocalo: "colócalo",
    comparacion: "comparación",
    contencion: "contención",
    conversacion: "conversación",
    cotizacion: "cotización",
    corazon: "corazón",
    debi: "debí",
    decision: "decisión",
    denominacion: "denominación",
    desaparecio: "desapareció",
    destruccion: "destrucción",
    diferenciacion: "diferenciación",
    direccion: "dirección",
    dificil: "difícil",
    dispersion: "dispersión",
    emocion: "emoción",
    energia: "energía",
    ensena: "enseña",
    especifica: "específica",
    especifico: "específico",
    estan: "están",
    estas: "estás",
    estomago: "estómago",
    extension: "extensión",
    facil: "fácil",
    fisica: "física",
    fisico: "físico",
    fisicamente: "físicamente",
    friccion: "fricción",
    guardalos: "guárdalos",
    historico: "histórico",
    imaginala: "imagínala",
    indice: "índice",
    informacion: "información",
    integracion: "integración",
    intimo: "íntimo",
    intencion: "intención",
    lampara: "lámpara",
    linea: "línea",
    limite: "límite",
    mama: "mamá",
    mandibula: "mandíbula",
    manana: "mañana",
    mas: "más",
    metafora: "metáfora",
    mio: "mío",
    movil: "móvil",
    moviliza: "moviliza",
    movilizacion: "movilización",
    musica: "música",
    notificacion: "notificación",
    numero: "número",
    pagina: "página",
    pasara: "pasará",
    panuelo: "pañuelo",
    pequeno: "pequeño",
    pequena: "pequeña",
    pequenas: "pequeñas",
    pequenos: "pequeños",
    practica: "práctica",
    preocupacion: "preocupación",
    presionalos: "presiónalos",
    preguntale: "pregúntale",
    proposito: "propósito",
    podria: "podría",
    podrian: "podrían",
    quedo: "quedó",
    rapido: "rápido",
    reaccion: "reacción",
    relacion: "relación",
    repeticion: "repetición",
    respiracion: "respiración",
    senal: "señal",
    separacion: "separación",
    sellalo: "séllalo",
    sensacion: "sensación",
    simbolica: "simbólica",
    sintio: "sintió",
    situacion: "situación",
    sosten: "sostén",
    sosteniendola: "sosteniéndola",
    sobreviví: "sobreviví",
    sobrevivi: "sobreviví",
    telefono: "teléfono",
    tension: "tensión",
    tambien: "también",
    tirala: "tírala",
    tiralos: "tíralos",
    todavia: "todavía",
    transicion: "transición",
    transformacion: "transformación",
    utiles: "útiles",
    util: "útil",
    vacio: "vacío",
    vacia: "vacía",
    vacias: "vacías",
    vergüenza: "vergüenza",
    verguenza: "vergüenza",
    vinculo: "vínculo",
    volvio: "volvió",
    dias: "días",
    dia: "día",
    anos: "años",
    despues: "después",
    aqui: "aquí",
    asi: "así",
  };

  out = out.replace(/(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)(?=$|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])/g, (full, prefix, word) => {
    const lower = word.toLowerCase();
    const fixed = wordFixes[lower];
    if (!fixed) return full;
    if (word === lower.toUpperCase()) return prefix + fixed.toUpperCase();
    if (word[0] === word[0].toUpperCase()) return prefix + fixed[0].toUpperCase() + fixed.slice(1);
    return prefix + fixed;
  });

  out = out.replace(/\bQue (?=[a-záéíóúñ])/g, "Qué ");
  out = out.replace(/\bCual (?=de|es|ser|quiere|necesita)/g, "Cuál ");
  return out;
}

function section(md, title) {
  const re = new RegExp(`^## ${title}\\n([\\s\\S]*?)(?=\\n## |\\n# |(?![\\s\\S]))`, "m");
  const m = md.match(re);
  return m ? m[1].trim() : "";
}

function bullets(block) {
  return block
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-*]\s+/.test(l))
    .map((l) => stripMd(l));
}

function paras(block, max = 2) {
  return block
    .split(/\n\s*\n/)
    .map((p) => stripMd(p))
    .filter(Boolean)
    .slice(0, max);
}

function firstQuote(block) {
  const m = block.match(/^>\s*"?(.+?)"?$/m);
  return m ? stripMd(m[1]) : "";
}

function sentenceCase(s) {
  const text = String(s || "").trim();
  return text ? text[0].toUpperCase() + text.slice(1) : "";
}

function step(md, n) {
  const re = new RegExp(`^## Paso ${n}\\. ([^\\n]+)\\n([\\s\\S]*?)(?=\\n## Paso \\d|\\n## Accion nueva|\\n## Cierre|\\n## Que observar despues|(?![\\s\\S]))`, "m");
  const m = md.match(re);
  if (!m) return null;
  return {
    title: sentenceCase(stripMd(m[1]).replace(/^.*?:\s*/, "")),
    phrase: firstQuote(m[2]),
    body: paras(m[2], 4),
  };
}

function parseRitual(file) {
  const md = fs.readFileSync(path.join(RITUAL_DIR, file), "utf8");
  const num = file.slice(0, 2);
  const title = stripMd((md.match(/^#\s+(.+)$/m) || [])[1] || file.replace(/\.md$/, ""));
  const subtitle = stripMd((md.match(/^##\s+(.+)$/m) || [])[1] || "");
  const para = paras(section(md, "Para quien es este ritual"), 2);
  const principio = paras(section(md, "Principio"), 2);
  const materiales = bullets(section(md, "Materiales"));
  const cuando = paras(section(md, "Cuando hacerlo"), 1)[0] || "";
  const accion = section(md, "Accion nueva");
  const cierre = section(md, "Cierre");
  const observar = bullets(section(md, "Que observar despues"));
  const steps = [1, 2, 3, 4, 5].map((i) => step(md, i)).filter(Boolean);
  const newPhrase = firstQuote(accion);
  return { num, title, subtitle, para, principio, materiales, cuando, steps, newPhrase, accion: paras(accion, 2), cierre: paras(cierre, 3), observar };
}

const rituals = files.map(parseRitual);
const data = JSON.stringify(rituals);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rituales para la Vida Diaria - Libro 26x21 BN</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#e8e6e1;color:#111;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
  .toolbar{position:sticky;top:0;z-index:10;background:#fff;border-bottom:1px solid #d0d0d0;padding:12px 22px;display:flex;justify-content:space-between;align-items:center;gap:20px}
  .toolbar h1{margin:0;font-size:16px}
  .toolbar p{margin:2px 0 0;font-size:12px;color:#555}
  .note{font-size:12px;color:#555;text-align:right;line-height:1.35}
  .book{padding:24px 0 60px}
  .spread{width:26cm;height:21cm;background:#fff;margin:0 auto 24px;position:relative;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.18);font-family:"Cormorant Garamond",Georgia,serif;page-break-after:always}
  .spread:last-child{page-break-after:auto}
  .bind{position:absolute;left:0;top:0;bottom:0;width:2cm;background:transparent;border-right:1px solid #eeeeee}
  .bind::before{content:"";position:absolute;left:1cm;top:12mm;bottom:12mm;border-left:1px dashed #dddddd}
  .hole{position:absolute;left:7.5mm;width:5mm;height:5mm;border:1px solid #d6d6d6;border-radius:50%;background:#fff}
  .h1{top:34mm}.h2{top:78mm}.h3{top:122mm}.h4{top:166mm}
  .page{position:absolute;top:13mm;bottom:12mm}
  .left{left:2.8cm;width:10.3cm}
  .right{left:14.1cm;width:10.8cm}
  .gutter{position:absolute;top:13mm;bottom:12mm;left:13.3cm;border-left:1px solid #e0e0e0}
  .cover .gutter{display:none}
  .backSide .bind{left:auto;right:0;border-right:0;border-left:1px solid #eeeeee}
  .backSide .hole{left:auto;right:7.5mm}
  .backSide .left{left:.9cm;width:10.8cm}
  .backSide .right{left:12.8cm;width:10.3cm}
  .backSide .gutter{left:12.2cm}
  .backSide .folio{left:.9cm;width:22.1cm}
  .label{font-family:"Courier New",monospace;font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:#444;line-height:1.25}
  .title{font-size:28pt;font-weight:300;line-height:.92;margin-top:5mm;color:#111}
  .title em{font-style:italic}
  .subtitle{font-size:13.5pt;font-style:italic;color:#444;line-height:1.25;margin-top:4mm}
  .rule{height:1px;background:#111;margin:6mm 0 5mm;width:28mm}
  .mini{font-family:"Courier New",monospace;font-size:7.2pt;letter-spacing:.12em;text-transform:uppercase;color:#333;margin:4mm 0 1.8mm}
  .p{font-size:10.2pt;line-height:1.38;color:#333;margin:0 0 2.6mm}
  .bul{display:flex;gap:2.2mm;margin:0 0 1.7mm;align-items:flex-start}
  .dot{width:2.3mm;height:2.3mm;border-radius:50%;background:#111;flex:0 0 auto;margin-top:1.6mm}
  .bul span{font-size:9.2pt;line-height:1.28;color:#333}
  .step{display:grid;grid-template-columns:8mm 1fr;gap:3mm;margin-bottom:3mm}
  .num{font-family:"Courier New",monospace;font-size:7.5pt;color:#555;padding-top:.8mm}
  .st{font-size:10.6pt;font-weight:600;color:#111;line-height:1.08}
  .sb{font-size:8.2pt;line-height:1.15;color:#444;margin-top:.6mm}
  .sb p{margin:0 0 .85mm}
  .quote{border-left:2px solid #111;padding-left:3mm;font-size:10.4pt;font-style:italic;line-height:1.14;color:#111;margin-top:1mm}
  .quoteHint{font-family:"Courier New",monospace;font-size:6.3pt;letter-spacing:.07em;text-transform:uppercase;color:#555;margin-top:1mm}
  .exec .step{margin-bottom:2.35mm}
  .exec .quote{font-size:9.5pt;line-height:1.1}
  .smallNote{font-size:8.8pt;line-height:1.25;color:#444;border:1px solid #d0d0d0;padding:3mm;margin-top:3mm}
  .callout{border:1px solid #111;padding:4mm 5mm;text-align:center;margin:3mm 0 3.5mm}
  .callout .mini{margin:0 0 2mm}
  .callout .quote{border:0;padding:0;margin:0;font-size:13pt}
  .footer{position:absolute;bottom:5.5mm;right:10mm;font-family:"Courier New",monospace;font-size:7pt;letter-spacing:.12em;color:#666;text-transform:uppercase}
  .folio{position:absolute;bottom:5.5mm;left:2.8cm;width:22.1cm;text-align:center;font-family:"Courier New",monospace;font-size:7.2pt;letter-spacing:.1em;color:#333}
  .cover .page{display:flex;flex-direction:column;justify-content:center}
  .cover .left{left:3.1cm;width:15.8cm}
  .cover .right{left:20cm;width:4.4cm}
  .coverLockup{position:absolute;top:18mm;left:3.1cm;display:flex;align-items:center;gap:4mm}
  .coverLockup .mark{width:14mm;height:14mm}
  .coverBrand{font-size:12.5pt;line-height:.95;font-weight:300}
  .coverBand{position:absolute;left:3.1cm;right:12mm;bottom:22mm;border-top:1px solid #111;padding-top:5mm;display:flex;justify-content:space-between;gap:10mm;align-items:flex-start}
  .coverBand p{margin:0;font-size:9.4pt;line-height:1.35;color:#333;width:7cm}
  .brandTitle{font-size:36pt;line-height:.88;font-weight:300;letter-spacing:0}
  .brandTitle em{font-style:italic}
  .coverBook{font-size:24pt;line-height:1;font-weight:300;margin-top:10mm}
  .coverBook em{font-style:italic}
  .coverSub{font-size:12.6pt;line-height:1.32;color:#333;margin-top:5mm;width:9.2cm}
  .coverMeta{font-family:"Courier New",monospace;font-size:7pt;letter-spacing:.13em;text-transform:uppercase;color:#555;margin-top:7mm}
  .cover .right{display:block}
  .coverEdition{position:absolute;right:9mm;top:20mm;writing-mode:vertical-rl;transform:rotate(180deg);font-family:"Courier New",monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:#555}
  .mark{width:35mm;height:35mm}
  .indexGrid{display:grid;grid-template-columns:1fr 1fr;gap:2mm 8mm;margin-top:5mm}
  .idx{display:flex;gap:2mm;border-bottom:1px solid #ddd;padding:1.2mm 0;align-items:baseline}
  .idx b{font-family:"Courier New",monospace;font-size:7pt;font-weight:400;width:8mm;color:#555}
  .idx span{font-size:9.2pt;line-height:1.05}
  .page.exec{top:16mm}
  .exec .label{margin-bottom:3mm}
  @page{size:26cm 21cm;margin:0}
  @media print{
    body{background:#fff}
    .toolbar{display:none}
    .book{padding:0}
    .spread{box-shadow:none;margin:0}
  }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <h1>Rituales para la Vida Diaria - Propuesta 26 x 21 cm</h1>
    <p>Margen izquierdo reservado para encuadernado. Cada hoja contiene dos páginas interiores.</p>
  </div>
  <div class="note">Impresión: 26 x 21 cm horizontal, escala 100%.<br>Reserva de encuadernado: 2 cm a la izquierda.</div>
</div>
<main class="book" id="book"></main>
<script>
const RITUALES=${data};

function esc(s){return String(s||"").replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));}
function cleanTitle(t){return String(t||"").replace(/^\\d+\\.\\s*/,'');}
function bullets(items, max=4){return (items||[]).slice(0,max).map(x=>'<div class="bul"><i class="dot"></i><span>'+esc(x)+'</span></div>').join('');}
function paras(items, max=2){return (items||[]).slice(0,max).map(x=>'<p class="p">'+esc(x)+'</p>').join('');}
function bodyParas(items){return (items||[]).map(x=>'<p>'+esc(x)+'</p>').join('');}
function quoteHint(text){
  const q = String(text||'').trim();
  if (!q) return '';
  if (q.includes('___') || q.includes('____')) return 'Completa y dilo en voz alta:';
  if (/^(Qué|Cuál|De dónde|Dónde|Cuándo|Cómo|Es )/.test(q)) return 'Pregunta en voz alta y espera:';
  return 'Dilo en voz alta, despacio:';
}
function quoteBlock(text){
  if (!text) return '';
  return '<div class="quoteHint">'+esc(quoteHint(text))+'</div><div class="quote">'+esc(text)+'</div>';
}
function mark(){return '<svg class="mark" viewBox="-1 -19 138 155" fill="none"><path d="M 72 122 C 73 121, 74 120, 73 119 C 72 118, 71 119, 71 120 C 71 121, 72 122, 72 122 C 76 121, 79 117, 78 113 C 76 109, 70 108, 68 111 C 66 114, 68 120, 72 119 C 80 116, 88 104, 84 92 C 80 80, 62 76, 52 84 C 42 92, 50 108, 66 104 C 90 96, 108 72, 100 52 C 92 34, 56 26, 40 40 C 24 54, 34 78, 58 74 C 100 62, 128 32, 118 10 C 108 -6, 48 -10, 26 8 C 8 24, 18 50, 48 48" stroke="#111" stroke-width="4.2" stroke-linecap="round" opacity=".82"/><circle cx="72" cy="124" r="5.5" fill="#111" opacity=".55"/></svg>'}
function shell(inner, cls=''){
  return '<section class="spread '+cls+'"><div class="bind"><i class="hole h1"></i><i class="hole h2"></i><i class="hole h3"></i><i class="hole h4"></i></div><div class="gutter"></div>'+inner+'</section>';
}

function cover(){
  return shell('<div class="coverLockup">'+mark()+'<div class="coverBrand">Ritual<br><em>Experiencing</em></div></div><div class="page left"><div class="label">Libro de práctica cotidiana</div><div class="coverBook" style="font-size:43pt;line-height:.88;margin-top:6mm">Rituales<br><em>para la</em><br>Vida Diaria</div><div class="rule" style="margin-top:8mm"></div><div class="coverSub">Actos somáticos con objetos cotidianos para descanso, límites, dirección, energía e integración corporal.</div></div><div class="page right"></div><div class="coverBand"><p>Preparar · Hacer · Integrar</p><p style="text-align:right">Dr. Miguel Ojeda Rios<br>Instituto Centrobioenergetica · 2026</p></div>', 'cover');
}

function blankAfterCover(){
  return shell('', 'blankAfterCover');
}

function guide(){
  return shell('<div class="page left"><div class="label">Cómo usar este libro</div><div class="title">Hazlo para mover algo,<br><em>no para entenderlo todo.</em></div><div class="rule"></div><p class="p">Cada ritual usa un objeto, una acción física y una frase dicha en voz alta para darle al cuerpo una experiencia distinta.</p><p class="p">Lee primero la preparación. Después ejecuta los pasos en orden, sin saltar la pausa posterior al acto central.</p><div class="mini">Reglas básicas</div>'+bullets(['Di las frases en voz alta.','Respeta silencios y tiempos.','Haz la acción nueva, aunque sea pequeña.','Si el cuerpo se abruma, vuelve al suelo y busca apoyo.'])+'<div class="smallNote">Este libro está diseñado para aplicarse. No uses los rituales como lectura rápida: prepara el objeto, haz el gesto, di la frase y observa el cuerpo.</div></div><div class="page right"><div class="label">Índice</div><div class="title">21 actos<br><em>cotidianos</em></div><div class="indexGrid">'+RITUALES.map(r=>'<div class="idx"><b>'+r.num+'</b><span>'+esc(cleanTitle(r.title))+'</span></div>').join('')+'</div></div>');
}

function ritualContext(r, idx){
  return shell('<div class="page left"><div class="label">Ritual '+r.num+' · contexto</div><div class="title">'+esc(cleanTitle(r.title))+'</div><div class="subtitle">'+esc(String(r.subtitle||'').replace(/^Ritual\\s+/,''))+'</div><div class="rule"></div><div class="mini">Para quién es</div>'+paras(r.para,3)+'<div class="mini">Principio</div>'+paras(r.principio,2)+'</div><div class="page right"><div class="label">Ritual '+r.num+' · preparación</div><div class="mini">Materiales</div>'+bullets(r.materiales,8)+'<div class="mini">Cuándo hacerlo</div><p class="p">'+esc(r.cuando)+'</p><div class="mini">Antes de empezar</div>'+bullets(['Prepara todos los objetos antes de iniciar.','Lee el paso completo antes de hacerlo.','Si una frase se siente difícil, dilo más lento, no más bajo.','Si te activas demasiado, detente y vuelve a la respiración.'],4)+'<div class="smallNote">Duración sugerida: 10 a 20 minutos. Hazlo sin prisa y sin celular en la mano.</div><div class="footer">'+String(idx).padStart(2,'0')+' · Preparación</div></div>');
}

function ritualExecution(r, idx){
  const steps = (r.steps||[]).map((s,i)=>'<div class="step"><div class="num">'+String(i+1).padStart(2,'0')+'</div><div><div class="st">'+esc(s.title)+'</div><div class="sb">'+bodyParas(s.body)+'</div>'+quoteBlock(s.phrase)+'</div></div>').join('');
  return shell('<div class="page left exec"><div class="label">Ritual '+r.num+' · ejecución</div>'+steps+'</div><div class="page right"><div class="label">Ritual '+r.num+' · cierre</div><div class="callout"><div class="mini">Acción nueva</div><div class="quoteHint">'+esc(quoteHint(r.newPhrase||''))+'</div><div class="quote">'+esc(r.newPhrase||'')+'</div></div><div class="mini">Después del acto</div>'+paras(r.accion,1)+paras(r.cierre,2)+'<div class="mini">Qué observar después</div>'+bullets(r.observar,5)+'<div class="smallNote">No evalúes si lo hiciste perfecto. Observa si el cuerpo quedó igual, más liviano, más activo, triste, cansado o presente.</div><div class="footer">'+String(idx).padStart(2,'0')+' · Ejecución</div></div>');
}

function closing(){
  return shell('<div class="page left"><div class="label">Registro de integración</div><div class="title">Lo que se movió<br><em>en mi cuerpo</em></div><div class="rule"></div>'+['Ritual realizado','Objeto usado','Frase que movió algo','Dónde lo sentí en el cuerpo','Qué acción nueva hice'].map(x=>'<div class="mini">'+x+'</div><div style="height:13mm;border-bottom:1px solid #cfcfcf"></div>').join('')+'</div><div class="page right" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">'+mark()+'<div class="label" style="margin-top:10mm">Ritual Experiencing</div><div class="title" style="font-size:25pt;margin-top:5mm">Rituales<br><em>para la Vida Diaria</em></div><div class="rule" style="margin:7mm auto 5mm"></div><p class="p" style="width:8.2cm;margin-top:0">Preparar · Hacer · Integrar</p><div class="mini" style="margin-top:7mm">Dr. Miguel Ojeda Rios</div><p class="p" style="font-size:8.8pt;margin-top:2mm;width:8.2cm">Ritual Experiencing — Instituto Centrobioenergetica · 2026</p></div>');
}

const book = document.getElementById('book');
book.innerHTML = cover() + blankAfterCover() + guide() + RITUALES.map((r,i)=>ritualContext(r,i+1)+ritualExecution(r,i+1)).join('') + closing();
[...document.querySelectorAll('.spread')].forEach((spread, i) => {
  if (spread.classList.contains('cover')) return;
  if (spread.classList.contains('blankAfterCover')) {
    spread.classList.add('backSide');
    return;
  }
  const contentIndex = [...document.querySelectorAll('.spread:not(.cover):not(.blankAfterCover)')].indexOf(spread);
  if (contentIndex % 2 === 1) spread.classList.add('backSide');
});
[...document.querySelectorAll('.spread:not(.cover):not(.blankAfterCover)')].forEach((spread, i) => {
  const folio = String(i + 1).padStart(2, '0');
  spread.insertAdjacentHTML('beforeend', '<div class="folio">'+folio+'</div>');
});
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html, "utf8");
console.log(`Generado: ${OUT}`);
