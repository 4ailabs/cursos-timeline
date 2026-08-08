const slides=[...document.querySelectorAll('.slide')];
const notesPanel=document.querySelector('.notes-panel');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const beginnerGuides=globalThis.BEGINNER_GUIDES||{};
const teachingDiagrams=globalThis.TEACHING_DIAGRAMS||{};
document.body.classList.add('guided');
const motionFamilies={
  cover:[1],image:[2,12],cards:[10,11,14,15,20,21,22,23,25,28,29],
  route:[4,6,8,9],field:[5,16,17,19],system:[7,13,24,26,30],
  contract:[18],reconnect:[24],question:[27]
};
Object.entries(motionFamilies).forEach(([family,numbers])=>numbers.forEach(n=>slides[n-1]?.classList.add(`motion-${family}`)));
slides.forEach((slide,i)=>{
  const chrome=document.createElement('div');
  chrome.className='chrome';
  chrome.innerHTML=`<span class="section">${slide.dataset.section||'Clase'}</span><span class="brand-side"><img class="brand-mark" src="assets/logo-regulacion-bioelectrica.png" alt="Regulación Bioeléctrica"><span>El quíntuple y el cono cognitivo · ${String(i+1).padStart(2,'0')}</span></span>`;
  slide.prepend(chrome);
  const guide=beginnerGuides[i+1];
  if(guide){
    slide.classList.add('has-guide');
    const strip=document.createElement('aside');
    strip.className='guide-strip';
    strip.setAttribute('aria-label','Explicación para público general');
    strip.innerHTML=`<div><b>EN PALABRAS SIMPLES</b><p>${guide.simple}</p></div><div><b>EJEMPLO</b><p>${guide.example}</p></div><div><b>QUÉ OBSERVAR</b><p>${guide.observe}</p></div>`;
    slide.append(strip);
  }
  const teaching=teachingDiagrams[i+1];
  if(teaching){
    slide.classList.add('has-teaching-diagram');
    const overlay=document.createElement('aside');
    overlay.className='diagram-overlay';
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML=`<header class="diagram-overlay-head"><div><p>${teaching.eyebrow}</p><h2>${teaching.title}</h2></div><span class="diagram-close-hint">D · cerrar</span></header><div class="diagram-stage">${teaching.svg}</div><p class="diagram-caption">${teaching.caption}</p>`;
    overlay.querySelectorAll('.fragment').forEach(f=>f.setAttribute('aria-hidden','true'));
    slide.append(overlay);
  }
  [...slide.querySelectorAll('.diagram>*')].forEach((el,n)=>el.style.setProperty('--motion-order',n));
  [...slide.querySelectorAll('.item,.panel,.mode,.step,.seven p,.prompts p')].forEach((el,n)=>el.style.setProperty('--motion-order',n));
  fragments(slide).forEach(f=>f.setAttribute('aria-hidden','true'));
});
let index=Math.max(0,Math.min(slides.length-1,Number(location.hash.replace('#',''))-1||0));
let transitionTimer;
function fragments(s){
  const open=s.querySelector('.diagram-overlay.open');
  if(open)return [...open.querySelectorAll('.fragment')];
  return [...s.querySelectorAll('.fragment')].filter(f=>!f.closest('.diagram-overlay'));
}
function closeDiagrams(){
  slides.forEach(s=>s.querySelectorAll('.diagram-overlay').forEach(o=>{o.classList.remove('open');o.setAttribute('aria-hidden','true');o.querySelectorAll('.fragment').forEach(f=>{f.classList.remove('visible');f.setAttribute('aria-hidden','true')})}));
  const button=document.querySelector('.diagram-toggle');
  button.setAttribute('aria-pressed','false');
  button.textContent='DIAGRAMA';
}
function updateDiagramButton(){
  const button=document.querySelector('.diagram-toggle');
  const available=!!slides[index].querySelector('.diagram-overlay');
  button.disabled=!available;
  button.title=available?'Abrir pizarra explicativa (D)':'Esta slide no tiene pizarra adicional';
}
function show(i,push=true){
  const nextIndex=Math.max(0,Math.min(slides.length-1,i));
  const previous=index;
  const direction=nextIndex<previous?'backward':'forward';
  const outgoing=slides.find(s=>s.classList.contains('active'));
  clearTimeout(transitionTimer);
  closeDiagrams();
  slides.forEach(s=>s.classList.remove('leaving','enter-forward','enter-backward','exit-forward','exit-backward'));
  if(outgoing&&outgoing!==slides[nextIndex]&&!reducedMotion.matches){outgoing.classList.remove('active');outgoing.classList.add('leaving',`exit-${direction}`)}
  else if(outgoing&&outgoing!==slides[nextIndex])outgoing.classList.remove('active');
  index=nextIndex;
  slides[index].classList.add('active');
  if(previous!==index&&!reducedMotion.matches)slides[index].classList.add(`enter-${direction}`);
  slides.forEach((s,n)=>{if(n!==index)fragments(s).forEach(f=>{f.classList.remove('visible');f.setAttribute('aria-hidden','true')})});
  transitionTimer=setTimeout(()=>slides.forEach(s=>s.classList.remove('leaving','enter-forward','enter-backward','exit-forward','exit-backward')),700);
  const src=slides[index].querySelector('.notes');
  notesPanel.innerHTML=src?src.innerHTML:'<h3>Sin notas</h3>';
  document.querySelector('.progress').style.width=`${((index+1)/slides.length)*100}%`;
  document.querySelector('.counter').textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  updateDiagramButton();
  if(push)history.replaceState(null,'',`#${index+1}`);
}
function next(){const fs=fragments(slides[index]);const hidden=fs.find(f=>!f.classList.contains('visible'));if(hidden){hidden.classList.add('visible');hidden.setAttribute('aria-hidden','false');return}if(slides[index].querySelector('.diagram-overlay.open')){toggleDiagram();return}show(index+1)}
function prev(){const open=slides[index].querySelector('.diagram-overlay.open');if(open){const visible=[...open.querySelectorAll('.fragment.visible')];const last=visible.at(-1);if(last){last.classList.remove('visible');last.setAttribute('aria-hidden','true')}else toggleDiagram();return}show(index-1)}
function toggleNotes(){notesPanel.classList.toggle('open')}
function toggleFull(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}
function toggleGuide(){
  const enabled=document.body.classList.toggle('guided');
  const button=document.querySelector('.guide-toggle');
  button.setAttribute('aria-pressed',String(enabled));
  button.textContent=enabled?'GUÍA: ON':'GUÍA: OFF';
}
function toggleDiagram(){
  const overlay=slides[index].querySelector('.diagram-overlay');
  if(!overlay)return;
  const opening=!overlay.classList.contains('open');
  if(opening){
    closeDiagrams();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
  }else{
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    overlay.querySelectorAll('.fragment').forEach(f=>{f.classList.remove('visible');f.setAttribute('aria-hidden','true')});
  }
  const button=document.querySelector('.diagram-toggle');
  button.setAttribute('aria-pressed',String(opening));
  button.textContent=opening?'CERRAR DIAGRAMA':'DIAGRAMA';
}
document.addEventListener('keydown',e=>{
  if(['ArrowRight','ArrowDown',' ','PageDown'].includes(e.key)){e.preventDefault();next()}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev()}
  if(e.key==='Home')show(0);if(e.key==='End')show(slides.length-1);
  if(e.key.toLowerCase()==='n')toggleNotes();if(e.key.toLowerCase()==='f')toggleFull();if(e.key.toLowerCase()==='g')toggleGuide();if(e.key.toLowerCase()==='d')toggleDiagram();
  if(e.key==='Escape'){closeDiagrams();notesPanel.classList.remove('open')}
});
document.querySelector('.guide-toggle').addEventListener('click',toggleGuide);
document.querySelector('.diagram-toggle').addEventListener('click',toggleDiagram);
document.addEventListener('click',e=>{if(e.target.closest('.notes-panel,.controls'))return;if(e.clientX>innerWidth*.52)next();else prev()});
window.addEventListener('hashchange',()=>show(Number(location.hash.replace('#',''))-1,false));
show(index,false);
