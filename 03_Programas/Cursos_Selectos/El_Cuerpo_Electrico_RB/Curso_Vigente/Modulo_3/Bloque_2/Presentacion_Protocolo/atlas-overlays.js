const atlasSvg=(body,label,viewBox='0 0 1000 667')=>`<svg class="atlas-overlay" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
const badge=(x,y,w,text,i=0)=>`<g class="marker" style="--i:${i}"><rect class="badge" x="${x}" y="${y}" width="${w}" height="42" rx="21"/><text class="badge-text" x="${x+w/2}" y="${y+29}" text-anchor="middle">${text}</text></g>`;
const pin=(n,x,y,i=0,amber=false)=>`<g class="marker" style="--i:${i}"><circle class="${amber?'num-amber':'num'}" cx="${x}" cy="${y}" r="19"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="20" fill="white" stroke="none">${n}</text></g>`;
const label=(text,x,y,w,i=0,amber=false)=>`<g class="marker" style="--i:${i}"><rect class="${amber?'tag-amber':'tag'}" x="${x}" y="${y}" width="${w}" height="38" rx="8"/><text class="small-label" x="${x+12}" y="${y+26}">${text}</text></g>`;

function overlay18(){return atlasSvg(
  badge(92,18,260,'ACORTAMIENTO',0)+badge(760,18,240,'ISOMETRÍA',1)+
  label('Diferencia de altura',64,338,250,2,true)+label('Talones al mismo nivel',844,338,292,3)+
  `<path class="leader-amber marker" style="--i:2" d="M314 356L392 310"/><path class="leader marker" style="--i:3" d="M844 356L780 312"/>`,
  'Comparación de talones con acortamiento y con isometría','0 0 1200 415');}

function overlay23(){const marks=[
  [9,330,58],[1,330,124],[11,246,228],[3,326,274],[2,416,240],[10,366,282],[4,350,350],[5,282,425],[6,306,446],[7,362,390],[8,806,432]
];return atlasSvg(
  badge(135,18,250,'VISTA ANTERIOR',0)+badge(700,18,250,'VISTA POSTERIOR',1)+
  marks.map((m,i)=>pin(...m,i+2,i===7||i===10)).join('')+
  label('9 · salivales',20,50,155,13)+label('8 · sacra/perineal',790,472,185,14,true)+
  `<path class="leader marker" style="--i:13" d="M175 69L310 58"/><path class="leader-amber marker" style="--i:14" d="M790 491L806 451"/>`,
  'Atlas de las once zonas de proyección, con vista anterior y posterior','0 0 1000 563');}

function overlay25(){return atlasSvg(
  badge(120,30,255,'NEGATIVO · NORTE',0)+badge(625,30,255,'POSITIVO · SUR',1)+
  `<path class="leader marker" style="--i:0" d="M245 72L330 232"/><path class="leader-amber marker" style="--i:1" d="M750 72L666 232"/>`+
  `<g class="marker" style="--i:2"><path class="field" d="M420 292C480 248 520 248 580 292M420 326C480 282 520 282 580 326"/>${label('Gradiente entre polos',370,365,260,2,true)}</g>`,
  'Dipolo local con polo negativo, polo positivo y gradiente entre ambos');}

function overlay27(){return atlasSvg(
  badge(128,18,220,'VISTA ANTERIOR',0)+badge(652,18,220,'VISTA POSTERIOR',1)+
  pin(1,244,414,2)+pin(2,328,414,3)+pin(3,245,376,4,true)+pin(4,327,376,5,true)+pin(5,224,322,6,true)+pin(6,748,108,7,true)+
  label('Derecha anatómica',42,604,206,8)+label('Izquierda anatómica',752,604,218,9)+
  `<path class="leader marker" style="--i:7" d="M748 127L748 165"/>`,
  'Localización anatómica de zonas renales, suprarrenales, hígado y bulbo raquídeo');}

function overlay29(){return atlasSvg(
  badge(145,38,190,'NORTE',0)+badge(665,38,190,'SUR',1)+
  pin('N',356,330,2)+pin('S',644,330,3,true)+pin('S',356,650,4,true)+pin('N',644,650,5)+
  `<g class="marker" style="--i:6"><path class="field" d="M460 330H540M356 440V540M644 440V540M460 650H540"/>${label('Fronteras de gradiente',368,845,264,6,true)}</g>`,
  'Rejilla de cuatro imanes con polaridad alternada y fronteras de gradiente','0 0 1000 1000');}

function overlay38(){return atlasSvg(
  badge(120,22,240,'INSPIRACIÓN',0)+badge(640,22,240,'ESPIRACIÓN',1)+
  label('Esfínter esofágico inferior',66,540,282,2)+label('Diafragma crural',650,540,218,3,true)+
  label('Nervio vago',66,592,166,4)+label('Nervio frénico',768,592,166,5,true)+
  `<path class="leader marker" style="--i:2" d="M348 559L416 394"/><path class="leader-amber marker" style="--i:3" d="M650 559L610 365"/><path class="leader marker" style="--i:4" d="M232 611L310 202"/><path class="leader-amber marker" style="--i:5" d="M768 611L742 203"/>`,
  'Comparación del hiato durante inspiración y espiración, con esfínter interno, diafragma crural, vago y frénico');}

const ATLAS_OVERLAYS={17:overlay18,24:overlay25,26:overlay27,28:overlay29};
globalThis.atlasOverlay=n=>(ATLAS_OVERLAYS[n]?.()||'');
