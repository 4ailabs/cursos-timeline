const data=globalThis.POINTS||[];
const deck=document.querySelector('.deck');
const panels={
  headFront:{src:'assets/atlas-cabeza-cuello.png',start:0,end:100,div:1},headSide:{src:'assets/atlas-cabeza-cuello.png',start:0,end:100,div:1},headBack:{src:'assets/atlas-cabeza-cuello.png',start:0,end:100,div:1},
  torsoFront:{src:'assets/atlas-tronco-pelvis.png',start:0,end:100,div:1},torsoBack:{src:'assets/atlas-tronco-pelvis.png',start:0,end:100,div:1},
  upperFront:{src:'assets/atlas-miembro-superior.png',start:0,end:100,div:1},upperBack:{src:'assets/atlas-miembro-superior.png',start:0,end:100,div:1},
  lowerFront:{src:'assets/atlas-miembro-inferior.png',start:0,end:100,div:1},lowerBack:{src:'assets/atlas-miembro-inferior.png',start:0,end:100,div:1},lowerSole:{src:'assets/atlas-miembro-inferior.png',start:0,end:100,div:1},
  perineum:{src:'assets/perine-inferior.svg',start:0,end:100,div:1}
};
const precisionMap={
  1:{a:'head',x:18.3,y:5.5,z:2.25,v:'Anterior',k:'point'},2:{a:'head',x:84.4,y:22,z:2.25,v:'Posterior',k:'area',w:110,h:72},3:{a:'head',x:18.4,y:29,z:2.55,v:'Anterior',k:'point'},
  4:{a:'head',x:84.5,y:48,z:2.4,v:'Posterior',k:'point'},5:{a:'head',x:90.2,y:48,z:2.4,v:'Posterior · lado derecho mostrado',k:'area',w:72,h:50},6:{a:'head',x:49.8,y:45,z:2.35,v:'Lateral derecha',k:'point'},
  7:{a:'head',x:60.2,y:48,z:2.35,v:'Lateral derecha',k:'area',w:66,h:86},8:{a:'head',x:87.5,y:63,z:2.25,v:'Posterior · lado derecho mostrado',k:'track',w:28,h:125,r:0},
  9:{a:'head',x:51.2,y:67,z:2.25,v:'Lateral derecha',k:'track',w:28,h:155,r:18},10:{a:'head',x:18.4,y:75,z:2.15,v:'Anterior',k:'point'},11:{a:'head',x:12.8,y:77.5,z:2.1,v:'Anterior · lado derecho mostrado',k:'area',w:100,h:42},
  12:{a:'torso',x:25,y:35,z:1.68,v:'Anterior',k:'point'},13:{a:'upper',x:14.8,y:15.5,z:1.72,v:'Anterior · lado derecho mostrado',k:'triangle',w:72,h:58},14:{a:'torso',x:31,y:25,z:1.62,v:'Anterior · hemitórax izquierdo',k:'area',w:130,h:110},
  15:{a:'torso',x:75,y:40,z:1.52,v:'Posterior · línea media',k:'track',w:28,h:300},16:{a:'torso',x:77.5,y:44,z:1.58,v:'Posterior · lado derecho mostrado',k:'track',w:34,h:235},17:{a:'upper',x:81,y:8,z:1.68,v:'Posterior · lado derecho mostrado',k:'track',w:125,h:28,r:-12},18:{a:'torso',x:80,y:24,z:1.7,v:'Posterior · lado derecho mostrado',k:'track',w:26,h:155,r:8},
  19:{a:'torso',x:25,y:37,z:1.7,v:'Anterior · línea media',k:'area',w:175,h:90},20:{a:'torso',x:25,y:52,z:1.72,v:'Anterior · línea media',k:'area',w:185,h:96},21:{a:'torso',x:25,y:63,z:1.72,v:'Anterior · línea media',k:'area',w:180,h:88},22:{a:'torso',x:25,y:52,z:1.82,v:'Anterior · línea media',k:'point'},
  23:{a:'torso',x:17.8,y:60,z:1.72,v:'Anterior · lado derecho mostrado',k:'area',w:105,h:92},24:{a:'torso',x:14.2,y:39,z:1.67,v:'Anterior · lado derecho mostrado',k:'area',w:125,h:64},25:{a:'torso',x:81.5,y:62,z:1.72,v:'Posterior · lado derecho mostrado',k:'point'},26:{a:'torso',x:14.5,y:62,z:1.72,v:'Anterior · lado derecho mostrado',k:'point'},27:{a:'torso',x:17.5,y:66.5,z:1.72,v:'Anterior · lado derecho mostrado',k:'track',w:92,h:28,r:12},28:{a:'torso',x:87,y:76,z:1.7,v:'Posterior · lado derecho mostrado',k:'area',w:78,h:92},
  29:{a:'perineum',x:50,y:51,z:1.15,v:'Inferior · límites del rombo perineal',k:'guide',w:0,h:0},
  30:{a:'upper',x:56.5,y:42,z:1.65,v:'Posterior · lado izquierdo mostrado',k:'track',w:32,h:78},31:{a:'upper',x:40,y:43,z:1.68,v:'Anterior · lado izquierdo mostrado',k:'area',w:90,h:65},32:{a:'upper',x:41,y:67,z:1.75,v:'Anterior · lado izquierdo mostrado',k:'track',w:38,h:104},33:{a:'upper',x:43.5,y:73,z:1.76,v:'Anterior · lado izquierdo mostrado',k:'area',w:88,h:54},34:{a:'upper',x:91.5,y:82,z:1.7,v:'Posterior · lado izquierdo mostrado',k:'area',w:105,h:120},
  35:{a:'torso',x:17,y:78,z:1.65,v:'Anterior · muslo derecho proximal',k:'track',w:50,h:125,r:8},36:{a:'lower',x:14.5,y:30,z:2.45,v:'Anterior · rodilla derecha',k:'area',w:92,h:92},37:{a:'lower',x:58,y:29,z:2.7,v:'Posterior · rodilla derecha',k:'area',w:100,h:82},38:{a:'lower',x:58,y:76,z:2.7,v:'Posterior · tobillo derecho',k:'track',w:28,h:145},39:{a:'lower',x:56.2,y:81,z:2.7,v:'Posterior · canal medial derecho',k:'track',w:26,h:92,r:5},40:{a:'lower',x:10.5,y:83,z:2.7,v:'Anterior · pie derecho',k:'area',w:90,h:60},41:{a:'lower',x:75,y:67,z:2.35,v:'Plantar · pie derecho',k:'area',w:145,h:220}
};
function choosePanel(v){if(v.a==='head')return v.v.startsWith('Anterior')?panels.headFront:v.v.startsWith('Lateral')?panels.headSide:panels.headBack;if(v.a==='torso')return v.v.startsWith('Anterior')?panels.torsoFront:panels.torsoBack;if(v.a==='upper')return v.v.startsWith('Anterior')?panels.upperFront:panels.upperBack;if(v.a==='lower')return v.v.startsWith('Anterior')?panels.lowerFront:v.v.startsWith('Plantar')?panels.lowerSole:panels.lowerBack;return panels.perineum}
function visual(p){const v=precisionMap[p.n],panel=choosePanel(v),localX=(v.x-panel.start)/(panel.end-panel.start)*100,localZ=Math.max(1,v.z/panel.div);return `<figure class="atlas atlas-clean" data-x="${localX}" data-y="${v.y}" data-zoom="${localZ}">
  <div class="atlas-frame"><img src="${panel.src}" alt="Referencia anatómica para ${p.name}"></div>
</figure>`}

function render(p){return `<section class="slide" data-section="${p.zone}">
  <div class="chrome"><span>${p.zone}</span><span class="brand"><img src="assets/logo-regulacion-bioelectrica.png" alt="Regulación Bioeléctrica"><em>${String(p.n).padStart(2,'0')}</em></span></div>
  <div class="cols"><div class="copy">
    <p class="eyebrow">Punto ${String(p.n).padStart(2,'0')} · ${p.zone}</p>
    <h1>${p.name}</h1>
    <p class="lead">${p.where}</p>
    <div class="anatomy fragment"><h2>Referencias anatómicas</h2><ul>${p.refs.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="relation fragment"><b>Relación superficial</b><span>${p.near}</span></div>
    ${p.caution?`<div class="caution fragment"><b>Precisión</b><span>${p.caution}</span></div>`:''}
  </div><div class="visual">${visual(p)}</div></div>
  <aside class="notes"><h3>${p.n} · ${p.name}</h3>${p.notes.map(x=>`<p>${x}</p>`).join('')}<p class="source">[Sources] ${p.source}</p></aside>
</section>`}

deck.innerHTML=data.map(render).join('');
function positionAtlasImages(){document.querySelectorAll('.atlas').forEach(fig=>{const frame=fig.querySelector('.atlas-frame'),img=fig.querySelector('img');if(!img.complete||!img.naturalWidth)return;const fw=frame.clientWidth,fh=frame.clientHeight,nw=img.naturalWidth,nh=img.naturalHeight,s=Math.min(fw/nw,fh/nh),dw=nw*s,dh=nh*s,ox=(fw-dw)/2,oy=(fh-dh)/2,x=Number(fig.dataset.x)/100,y=Number(fig.dataset.y)/100,z=Number(fig.dataset.zoom),px=ox+x*dw,py=oy+y*dh,tx=fw/2-px*z,ty=fh/2-py*z;img.style.transformOrigin='0 0';img.style.transform=`matrix(${z},0,0,${z},${tx},${ty})`})}
document.querySelectorAll('.atlas img').forEach(img=>img.addEventListener('load',positionAtlasImages));
window.addEventListener('resize',positionAtlasImages);requestAnimationFrame(positionAtlasImages);
const slides=[...document.querySelectorAll('.slide')],panel=document.querySelector('.notes-panel');
slides.forEach(s=>s.querySelectorAll('.fragment').forEach(f=>f.setAttribute('aria-hidden','true')));
let index=Math.max(0,Math.min(slides.length-1,Number(location.hash.slice(1))-1||0)),timer;
const fragments=s=>[...s.querySelectorAll('.fragment')];
function show(n,push=true){const next=Math.max(0,Math.min(slides.length-1,n)),old=slides.find(s=>s.classList.contains('active'));clearTimeout(timer);slides.forEach(s=>s.classList.remove('leaving','enter-forward','enter-backward','exit-forward','exit-backward'));const dir=next<index?'backward':'forward';if(old&&old!==slides[next]){old.classList.remove('active');old.classList.add('leaving',`exit-${dir}`)}index=next;slides[index].classList.add('active',`enter-${dir}`);requestAnimationFrame(positionAtlasImages);slides.forEach((s,i)=>{if(i!==index)fragments(s).forEach(f=>{f.classList.remove('visible');f.setAttribute('aria-hidden','true')})});timer=setTimeout(()=>slides.forEach(s=>s.classList.remove('leaving','enter-forward','enter-backward','exit-forward','exit-backward')),650);panel.innerHTML=slides[index].querySelector('.notes')?.innerHTML||'';document.querySelector('.progress').style.width=`${(index+1)/slides.length*100}%`;document.querySelector('.counter').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;if(push)history.replaceState(null,'',`#${index+1}`)}
function next(){const f=fragments(slides[index]).find(x=>!x.classList.contains('visible'));if(f){f.classList.add('visible');f.setAttribute('aria-hidden','false')}else show(index+1)}
function prev(){const v=fragments(slides[index]).filter(x=>x.classList.contains('visible'));if(v.length){const f=v.at(-1);f.classList.remove('visible');f.setAttribute('aria-hidden','true')}else show(index-1)}
document.addEventListener('keydown',e=>{if(['ArrowRight','ArrowDown',' ','PageDown'].includes(e.key)){e.preventDefault();next()}if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev()}if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);if(e.key.toLowerCase()==='n')panel.classList.toggle('open');if(e.key.toLowerCase()==='f')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();if(e.key==='Escape')panel.classList.remove('open')});
document.addEventListener('click',e=>{if(e.target.closest('.notes-panel,.controls'))return;e.clientX>innerWidth*.52?next():prev()});
window.addEventListener('hashchange',()=>show(Number(location.hash.slice(1))-1,false));show(index,false);
