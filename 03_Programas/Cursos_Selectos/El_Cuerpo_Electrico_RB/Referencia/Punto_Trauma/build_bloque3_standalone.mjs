import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const source = await readFile(resolve(root, 'bloque3_deck.html'), 'utf8');
const files = {
  eye: '01-ojo-adaptativo.png', agent: '02-agencia-multiescala.png',
  health: '03-mantenimiento-salud.png', mac: '04-macrofagos-m1-m2.png',
  island: '05-isla-bioelectrica.png', machine: '06-maquina-agente.png',
  planaria: '07-planaria-memoria.png', trauma: '08-trauma-anatomia.png',
};
const entries = await Promise.all(Object.entries(files).map(async ([key, file]) => {
  const bytes = await readFile(resolve(root, 'assets3', file));
  return `${key}:'data:image/png;base64,${bytes.toString('base64')}'`;
}));

let html = source.replace(/const A='assets\/',I=\{[^}]+\};/, `const A='',I={${entries.join(',')}};`);
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) throw new Error('No se encontró el script del deck.');
const script = scriptMatch[1];
const pivot = "document.getElementById('deck').innerHTML=S.map(r).join('');";
const pos = script.indexOf(pivot);
if (pos < 0) throw new Error('No se encontró el render del deck.');
const renderCode = script.slice(0, pos) + '\nreturn S.map(r).join(\'\');';
const renderedSlides = new Function(renderCode)();

html = html.replace('<main id="deck" class="deck"></main>', `<main id="deck" class="deck">${renderedSlides}</main>`);
html = html.replace('.slide{position:relative;width:1280px;height:720px;overflow:hidden;background:var(--p);box-shadow:0 24px 68px #0009;display:none}', '.slide{position:relative;width:1280px;height:720px;overflow:hidden;background:var(--p);box-shadow:0 24px 68px #0009;display:block}.js .slide{display:none}');
const navigation = `<script>
const all=[...document.querySelectorAll('.slide')];
let at=Math.max(0,(+location.hash.slice(1)||1)-1);
function show(i){at=(i+all.length)%all.length;all.forEach((slide,index)=>slide.classList.toggle('active',index===at));history.replaceState(null,'','#'+(at+1));}
document.documentElement.classList.add('js');show(at);
document.getElementById('prev').onclick=()=>show(at-1);
document.getElementById('next').onclick=()=>show(at+1);
addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key===' ')show(at+1);if(event.key==='ArrowLeft')show(at-1)});
</script>`;
html = html.replace(/<script>[\s\S]*<\/script>/, navigation);
await writeFile(resolve(root, 'bloque3_deck_standalone.html'), html);
