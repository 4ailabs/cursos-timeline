import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'bloque4_deck.html');
const assets = {
  scan: '01-rastreo.png',
  node: '05-nodo-premium.png',
  vagus: '07-vagal-premium.png',
  calibration: '04-calibracion-premium.png',
  gridImage: '06-rejilla-premium.png',
};
const toDataUri = file => `data:image/png;base64,${fs.readFileSync(path.join(root, 'assets4', file)).toString('base64')}`;
const imageMap = Object.fromEntries(Object.entries(assets).map(([key, file]) => [key, toDataUri(file)]));

let html = fs.readFileSync(sourcePath, 'utf8');
let script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
script = script
  .replace(/const A='assets\/';const I=\{[^}]+\};/, `const I=${JSON.stringify(imageMap)};`)
  .replace(/Object\.assign\(I,\{[^\n]+\}\);\n/, '')
  .replace('deck.innerHTML=S.map(r).join(\'\');', 'return S.map(r).join(\'\');');

const renderedSlides = new Function(script)();
html = html
  .replace('<main class="deck" id="deck"></main>', `<main class="deck" id="deck">${renderedSlides}</main>`)
  .replace(/<script>[\s\S]*?<\/script>/, '')
  .replace('</body>', '<script>document.body.classList.add("standalone")</script></body>');

fs.writeFileSync(path.join(root, 'bloque4_deck_standalone.html'), html);
console.log('Standalone Block 4 created with embedded raster assets.');
