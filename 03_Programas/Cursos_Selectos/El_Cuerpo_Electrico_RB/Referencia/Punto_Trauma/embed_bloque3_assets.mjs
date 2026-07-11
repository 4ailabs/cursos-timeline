import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname, basename } from 'node:path';

const source = resolve(process.cwd(), 'bloque3_deck.html');
const output = resolve(process.cwd(), 'bloque3_deck_embedded.html');
const html = await readFile(source, 'utf8');
const assetDir = resolve(process.cwd(), 'assets3');
const files = {
  eye: '01-ojo-adaptativo.png',
  agent: '02-agencia-multiescala.png',
  health: '03-mantenimiento-salud.png',
  mac: '04-macrofagos-m1-m2.png',
  island: '05-isla-bioelectrica.png',
  machine: '06-maquina-agente.png',
  planaria: '07-planaria-memoria.png',
  trauma: '08-trauma-anatomia.png',
};

const entries = await Promise.all(Object.entries(files).map(async ([key, file]) => {
  const data = await readFile(resolve(assetDir, file));
  return `${key}:'data:image/png;base64,${data.toString('base64')}'`;
}));

const embedded = html.replace(
  /const A='assets\/',I=\{[^}]+\};/,
  `const A='',I={${entries.join(',')}};`,
);

if (embedded === html) throw new Error('No se encontró el mapa de assets para incrustar.');
await writeFile(output, embedded);
