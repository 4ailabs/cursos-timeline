const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const RITUAL_DIR = path.join(ROOT, "Rituales_Desarrollados");
const OUT = path.join(ROOT, "Cuadernillo_Rituales_Vida_Diaria.html");

const files = fs
  .readdirSync(RITUAL_DIR)
  .filter((f) => /^\d+_.*\.md$/.test(f))
  .sort((a, b) => Number(a.slice(0, 2)) - Number(b.slice(0, 2)));

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripMd(s) {
  return String(s || "")
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/"/g, "")
    .trim();
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

function step(md, n) {
  const re = new RegExp(`^## Paso ${n}\\. ([^\\n]+)\\n([\\s\\S]*?)(?=\\n## Paso \\d|\\n## Accion nueva|\\n## Cierre|\\n## Que observar despues|(?![\\s\\S]))`, "m");
  const m = md.match(re);
  if (!m) return null;
  return {
    title: stripMd(m[1]).replace(/^.*?:\s*/, ""),
    phrase: firstQuote(m[2]),
    body: paras(m[2], 1)[0] || "",
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
  const central = steps[4]?.phrase || "";
  const newPhrase = firstQuote(accion);
  return { num, title, subtitle, para, principio, materiales, cuando, steps, central, newPhrase, cierre: paras(cierre, 2), observar };
}

const rituals = files.map(parseRitual);

const data = JSON.stringify(rituals);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rituales para la Vida Diaria — Cuadernillo del Participante</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#1c1815}</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const RITUALES=${data};

if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style'); s.id='dc-styles';
  s.textContent = '.dc-exp{position:absolute;bottom:100%;right:0;margin-bottom:5px;z-index:2;opacity:0;transition:opacity .12s;width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center}[data-dc-slot]:hover .dc-exp{opacity:1}.dc-exp:hover{background:rgba(0,0,0,.06)}';
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);
function DesignCanvas({ children }) {
  const [focus, setFocus] = React.useState(null);
  const api = React.useMemo(() => ({ focus, setFocus }), [focus]);
  const registry = {}, sectionMeta = {};
  React.Children.forEach(children, sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    const ids = [];
    React.Children.forEach(sec.props.children, ab => {
      if (!ab || (ab.type !== DCArtboard && ab.type !== Board)) return;
      const aid = ab.props.id ?? ab.props.label;
      registry[\`\${sid}/\${aid}\`] = { sectionId:sid, artboard:ab };
      ids.push(aid);
    });
    sectionMeta[sid] = { slotIds:ids };
  });
  React.useEffect(() => {
    const k = e => { if (e.key==='Escape') setFocus(null); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);
  return <DCCtx.Provider value={api}><DCViewport>{children}</DCViewport>{focus && registry[focus] && <DCFocusOverlay entry={registry[focus]} sectionMeta={sectionMeta}/>}</DCCtx.Provider>;
}
function DCViewport({ children }) {
  const vpRef = React.useRef(null), worldRef = React.useRef(null);
  const tf = React.useRef({ x:0, y:0, scale:1 });
  const apply = React.useCallback(() => {
    const {x,y,scale}=tf.current;
    if(worldRef.current) worldRef.current.style.transform=\`translate3d(\${x}px,\${y}px,0) scale(\${scale})\`;
  },[]);
  React.useEffect(() => {
    const vp = vpRef.current; if(!vp) return;
    const zoomAt=(cx,cy,f)=>{const r=vp.getBoundingClientRect(),t=tf.current,n=Math.min(8,Math.max(0.1,t.scale*f)),k=n/t.scale;t.x=(cx-r.left)-((cx-r.left)-t.x)*k;t.y=(cy-r.top)-((cy-r.top)-t.y)*k;t.scale=n;apply();};
    let drag=null;
    const onW=e=>{e.preventDefault();if(e.ctrlKey){zoomAt(e.clientX,e.clientY,Math.exp(-e.deltaY*0.01))}else{tf.current.x-=e.deltaX;tf.current.y-=e.deltaY;apply();}};
    const onPD=e=>{if(!(e.button===1||(e.button===0&&!e.target.closest('[data-dc-slot]'))))return;e.preventDefault();vp.setPointerCapture(e.pointerId);drag={id:e.pointerId,lx:e.clientX,ly:e.clientY};vp.style.cursor='grabbing';};
    const onPM=e=>{if(!drag||e.pointerId!==drag.id)return;tf.current.x+=e.clientX-drag.lx;tf.current.y+=e.clientY-drag.ly;drag.lx=e.clientX;drag.ly=e.clientY;apply();};
    const onPU=e=>{if(!drag||e.pointerId!==drag.id)return;vp.releasePointerCapture(e.pointerId);drag=null;vp.style.cursor='';};
    vp.addEventListener('wheel',onW,{passive:false}); vp.addEventListener('pointerdown',onPD); vp.addEventListener('pointermove',onPM); vp.addEventListener('pointerup',onPU);
    return()=>{vp.removeEventListener('wheel',onW);vp.removeEventListener('pointerdown',onPD);vp.removeEventListener('pointermove',onPM);vp.removeEventListener('pointerup',onPU);};
  },[apply]);
  const grid=\`url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='rgba(0,0,0,0.055)' stroke-width='1'/%3E%3C/svg%3E")\`;
  return <div ref={vpRef} style={{height:'100vh',width:'100vw',background:'#f0ede8',overflow:'hidden',overscrollBehavior:'none',touchAction:'none',position:'relative'}}><div ref={worldRef} style={{position:'absolute',top:0,left:0,transformOrigin:'0 0',willChange:'transform',width:'max-content',minWidth:'100%',minHeight:'100%',padding:'60px 0 80px'}}><div style={{position:'absolute',inset:-6000,backgroundImage:grid,backgroundSize:'120px 120px',pointerEvents:'none',zIndex:-1}}/>{children}</div></div>;
}
function DCSection({ id, title, children, gap=40 }) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const abs = React.Children.toArray(children).filter(c=>c&&(c.type===DCArtboard || c.type===Board));
  return <div style={{marginBottom:72}}><div style={{padding:'0 60px 40px',fontSize:22,fontWeight:600,color:'rgba(40,30,20,0.85)',fontFamily:'-apple-system,sans-serif'}}>{title}</div><div style={{display:'flex',gap,padding:'0 60px',alignItems:'flex-start',width:'max-content'}}>{abs.map(ab=>{const aid=ab.props.id??ab.props.label;return <div key={aid} data-dc-slot={aid} style={{position:'relative',flexShrink:0}}><div style={{position:'absolute',bottom:'100%',left:-4,marginBottom:4,fontSize:13,fontWeight:500,color:'rgba(60,50,40,0.7)',fontFamily:'-apple-system,sans-serif',padding:'0 6px 3px',userSelect:'none'}}>{ab.props.label}</div><button className="dc-exp" onClick={()=>ctx&&ctx.setFocus(\`\${sid}/\${aid}\`)}><svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"/></svg></button><div style={{borderRadius:2,boxShadow:'0 1px 3px rgba(0,0,0,.09),0 4px 16px rgba(0,0,0,.07)',overflow:'hidden',width:ab.props.width||450,height:ab.props.height||690}}>{artboardContent(ab)}</div></div>})}</div></div>;
}
function DCArtboard(){return null}
function artboardContent(ab){ return ab.type===Board ? <S>{ab.props.children}</S> : ab.props.children; }
function DCFocusOverlay({ entry, sectionMeta }) {
  const ctx = React.useContext(DCCtx); const { sectionId, artboard } = entry; const aid = artboard.props.id ?? artboard.props.label; const peers = sectionMeta[sectionId]?.slotIds||[]; const idx = peers.indexOf(aid);
  const go = d => { const n=peers[(idx+d+peers.length)%peers.length]; if(n) ctx.setFocus(\`\${sectionId}/\${n}\`); };
  React.useEffect(()=>{const k=e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}if(e.key==='ArrowRight'){e.preventDefault();go(1)}};document.addEventListener('keydown',k);return()=>document.removeEventListener('keydown',k);});
  const [vp,setVp]=React.useState({w:window.innerWidth,h:window.innerHeight}); React.useEffect(()=>{const r=()=>setVp({w:window.innerWidth,h:window.innerHeight});window.addEventListener('resize',r);return()=>window.removeEventListener('resize',r)},[]);
  const {width=450,height=690}=artboard.props; const scale=Math.max(0.1,Math.min((vp.w-160)/width,(vp.h-220)/height,2));
  return ReactDOM.createPortal(<div onClick={()=>ctx.setFocus(null)} style={{position:'fixed',inset:0,zIndex:100,background:'rgba(20,15,10,.65)',backdropFilter:'blur(16px)'}}><div onClick={e=>e.stopPropagation()} style={{position:'absolute',top:0,right:0,padding:16}}><button onClick={()=>ctx.setFocus(null)} style={{border:'none',background:'transparent',color:'rgba(255,255,255,.6)',width:32,height:32,borderRadius:16,fontSize:22,cursor:'pointer',lineHeight:1}}>×</button></div><div style={{position:'absolute',top:60,bottom:48,left:80,right:80,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14}}><div onClick={e=>e.stopPropagation()} style={{width:width*scale,height:height*scale,position:'relative'}}><div style={{width,height,transform:\`scale(\${scale})\`,transformOrigin:'top left',background:'#fff',overflow:'hidden',boxShadow:'0 20px 80px rgba(0,0,0,.45)'}}>{artboardContent(artboard)}</div></div><div style={{fontSize:13,opacity:.8,color:'#fff',fontFamily:'-apple-system,sans-serif'}}>{artboard.props.label} <span style={{opacity:.5}}>{idx+1}/{peers.length}</span></div></div></div>, document.body);
}

const MM=3, W=130*MM, H=210*MM, MX=13*MM, MT=14*MM, MB=12*MM;
const SERIF="'Cormorant Garamond',Georgia,serif", MONO="'Courier New',monospace";
const C={siena:'#8B4513',sienaL:'#C4926A',arena:'#F2E8DC',arenaL:'#F7F0E8',ink:'#2C2C2A',cream:'#E8E6DE',grey:'#888780',grey2:'#B4B2A9',warm:'#FAF9F6',rule:'#DDD7CE',olive:'#6C704F'};
const BG='#26201c';
const AW=W+60, AH=H+60;
const Pg=({bg=C.warm,children})=><div style={{width:W,height:H,background:bg,position:'relative',overflow:'hidden',fontFamily:SERIF,userSelect:'none'}}>{children}</div>;
const S=({children})=><div style={{width:AW,height:AH,background:BG,display:'flex',alignItems:'center',justifyContent:'center',padding:30}}>{children}</div>;
const Ct=({children,style={}})=><div style={{position:'absolute',left:MX,right:MX,top:MT,bottom:MB,display:'flex',flexDirection:'column',overflow:'hidden',zIndex:2,...style}}>{children}</div>;
const Lbl=({children,color=C.grey})=><div style={{fontFamily:MONO,fontSize:6.5,letterSpacing:'0.14em',textTransform:'uppercase',color,lineHeight:1.35,flexShrink:0}}>{children}</div>;
const Rule=({color=C.rule,my=0})=><div style={{height:1,background:color,flexShrink:0,marginTop:my,marginBottom:my}}/>;
const PgN=({n,dark=false})=><div style={{position:'absolute',bottom:MB*0.55,right:MX,fontFamily:SERIF,fontSize:9,fontWeight:300,color:dark?\`\${C.grey2}60\`:\`\${C.grey}60\`,lineHeight:1}}>{n}</div>;
const Vortex=({size=24,color=C.siena})=><svg width={size} height={size} viewBox="-1 -19 138 155" fill="none"><path d="M 72 122 C 73 121, 74 120, 73 119 C 72 118, 71 119, 71 120 C 71 121, 72 122, 72 122 C 76 121, 79 117, 78 113 C 76 109, 70 108, 68 111 C 66 114, 68 120, 72 119 C 80 116, 88 104, 84 92 C 80 80, 62 76, 52 84 C 42 92, 50 108, 66 104 C 90 96, 108 72, 100 52 C 92 34, 56 26, 40 40 C 24 54, 34 78, 58 74 C 100 62, 128 32, 118 10 C 108 -6, 48 -10, 26 8 C 8 24, 18 50, 48 48" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.82"/><circle cx="72" cy="124" r="2.8" fill={color} opacity="0.55"/></svg>;
const P=({children,style={}})=><div style={{fontSize:8.8,color:C.grey,lineHeight:1.48,marginBottom:7,flexShrink:0,...style}}>{children}</div>;
const Heading=({children})=><div style={{fontSize:16.5,fontWeight:300,fontStyle:'italic',color:C.ink,lineHeight:1.05,marginTop:5,flexShrink:0}}>{children}</div>;
const Quote=({children})=><div style={{borderLeft:\`2px solid \${C.siena}55\`,paddingLeft:7,marginTop:4,marginBottom:6,fontSize:9,fontStyle:'italic',color:C.ink,lineHeight:1.35,flexShrink:0}}>"{children}"</div>;
const Mini=({children})=><div style={{fontSize:7.4,fontFamily:MONO,letterSpacing:'0.08em',textTransform:'uppercase',color:C.sienaL,lineHeight:1.35,marginBottom:3,flexShrink:0}}>{children}</div>;
const Bullet=({children})=><div style={{display:'flex',gap:5,alignItems:'flex-start',marginBottom:3.2,flexShrink:0}}><span style={{width:3,height:3,borderRadius:'50%',background:C.sienaL,marginTop:4.8,flexShrink:0}}/><span style={{fontSize:8.2,color:C.grey,lineHeight:1.35}}>{children}</span></div>;
const NoteLines=()=> <div style={{flex:1,marginTop:8,backgroundImage:\`repeating-linear-gradient(to bottom, transparent 0px, transparent 21px, \${C.rule} 21px, \${C.rule} 22px)\`}}/>;

function Cover(){
  return <Pg bg="#25211d"><Ct style={{alignItems:'center',justifyContent:'center',textAlign:'center'}}><Vortex size={84} color={C.sienaL}/><div style={{fontSize:14,color:C.grey2,letterSpacing:'0.16em',fontFamily:MONO,textTransform:'uppercase',marginTop:22}}>Actos que Mueven</div><div style={{fontSize:38,fontWeight:300,fontStyle:'italic',lineHeight:0.92,color:C.cream,marginTop:16}}>Rituales para<br/>la Vida Diaria</div><div style={{fontSize:11,color:C.grey2,lineHeight:1.55,marginTop:20,width:250}}>Cuaderno somatico de descanso, limites, direccion, energia e integracion cotidiana.</div><Rule color="#C4926A55" my={24}/><div style={{fontSize:9,color:C.grey2,fontFamily:MONO,letterSpacing:'0.12em',textTransform:'uppercase'}}>Dr. Miguel Ojeda Rios · Instituto CentroBioenergetica</div></Ct></Pg>;
}
function Guide({pgN}){
  return <Pg><Ct><Lbl color={C.siena}>Como usar este cuaderno</Lbl><Heading>Hazlo para mover algo, no para entenderlo todo.</Heading><Rule color={C.siena+'35'} my={10}/><P>Este cuaderno contiene rituales breves para la vida diaria. No son meditaciones ni ejercicios de reflexion. Cada ritual usa un objeto, una accion fisica y una frase dicha en voz alta para darle al cuerpo una experiencia distinta.</P><P>Elige un ritual por situacion. No hagas varios rituales profundos el mismo dia. Si el cuerpo se abruma, vuelve a la respiracion, toca el suelo, mira alrededor y busca apoyo.</P><Mini>Reglas basicas</Mini>{['Di las frases en voz alta.','No saltes la pausa despues del acto central.','Haz la accion nueva, aunque sea pequena.','Observa el cuerpo despues, no solo lo que piensas.','Si hay crisis, riesgo o trauma activo, busca acompanamiento.'].map(x=><Bullet key={x}>{x}</Bullet>)}<Rule my={10}/><Mini>La secuencia TAME</Mini>{['Inducir el cambio: mirar el patron de frente.','Generar regulacion: volver a ventana de tolerancia.','Colocar en recursos: sentir lo que si tienes.','Ampliar conciencia: preguntar al cuerpo.','Influir sobre N3: acto fisico, frase, pausa y accion nueva.'].map(x=><Bullet key={x}>{x}</Bullet>)}<PgN n={pgN}/></Ct></Pg>;
}
function IndexPage({pgN}){
  return <Pg><Ct><Lbl color={C.siena}>Indice de rituales</Lbl><Heading>Veintiun actos cotidianos</Heading><Rule color={C.siena+'35'} my={8}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4px 14px',marginTop:2}}>{RITUALES.map((r,i)=><div key={r.num} style={{display:'flex',gap:5,borderBottom:\`1px solid \${C.rule}\`,padding:'2px 0 3px',alignItems:'baseline'}}><span style={{fontFamily:MONO,fontSize:6.5,color:C.sienaL,width:13}}>{r.num}</span><span style={{fontSize:8.3,color:C.ink,lineHeight:1.1}}>{r.title.replace(/^\\d+\\.\\s*/,'')}</span></div>)}</div><div style={{marginTop:14,padding:9,border:\`1px solid \${C.siena}30\`,background:C.arenaL}}><Mini>Modo sugerido</Mini><P style={{marginBottom:0}}>Usa los rituales como un mapa, no como una lista obligatoria. Algunos son para noche, otros para manana, ansiedad, vinculos, trabajo, dinero, culpa o cierre.</P></div><PgN n={pgN}/></Ct></Pg>;
}
function RitualIntro({r,pgN}){
  return <Pg><Ct><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10}}><div><Lbl color={C.siena}>Ritual {r.num}</Lbl><Heading>{r.title.replace(/^\\d+\\.\\s*/,'')}</Heading></div><Vortex size={32} color={C.sienaL}/></div><P style={{fontStyle:'italic',color:C.siena,marginTop:5}}>{r.subtitle.replace(/^Ritual\\s+/, '')}</P><Rule color={C.siena+'35'} my={8}/><Mini>Para quien es</Mini>{r.para.map((p,i)=><P key={i}>{p}</P>)}<Mini>Principio</Mini>{r.principio.map((p,i)=><P key={i}>{p}</P>)}<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:2,overflow:'hidden'}}><div><Mini>Materiales</Mini>{r.materiales.slice(0,7).map(x=><Bullet key={x}>{x}</Bullet>)}</div><div><Mini>Cuando hacerlo</Mini><P>{r.cuando}</P></div></div><PgN n={pgN}/></Ct></Pg>;
}
function RitualTame({r,pgN}){
  return <Pg><Ct><Lbl color={C.siena}>Ritual {r.num} · TAME</Lbl><Heading>{r.title.replace(/^\\d+\\.\\s*/,'')}</Heading><Rule color={C.siena+'35'} my={8}/>{r.steps.map((s,i)=><div key={i} style={{display:'flex',gap:7,marginBottom:6.5,flexShrink:0}}><div style={{fontFamily:MONO,fontSize:6.5,color:C.sienaL,width:12,paddingTop:2}}>{i+1}</div><div style={{flex:1}}><div style={{fontSize:9.5,color:C.siena,fontWeight:500,lineHeight:1.12}}>{s.title}</div>{s.body&&<P style={{fontSize:8.1,marginBottom:2,lineHeight:1.32}}>{s.body}</P>}{s.phrase&&<Quote>{s.phrase}</Quote>}</div></div>)}<Rule my={6}/><Mini>Accion nueva</Mini>{r.newPhrase ? <Quote>{r.newPhrase}</Quote> : <P>{r.cierre[0]}</P>}<Mini>Observa despues</Mini>{r.observar.slice(0,4).map(x=><Bullet key={x}>{x}</Bullet>)}<PgN n={pgN}/></Ct></Pg>;
}
function Registro({pgN}){
  return <Pg><Ct><Lbl color={C.siena}>Registro de integracion</Lbl><Heading>Lo que se movio en mi cuerpo</Heading><Rule color={C.siena+'35'} my={10}/><P>Usa esta pagina despues de cualquier ritual. Registra sensaciones, no solo ideas.</P>{['Ritual realizado','Objeto usado','Frase que movio algo','Donde lo senti en el cuerpo','Que cambio despues de la pausa','Que accion nueva hice'].map(x=><div key={x} style={{marginTop:8,flexShrink:0}}><Mini>{x}</Mini><div style={{height:22,borderBottom:\`1px solid \${C.rule}\`}}/></div>)}<NoteLines/><PgN n={pgN}/></Ct></Pg>;
}
function Back(){
  return <Pg bg="#25211d"><Ct style={{alignItems:'center',justifyContent:'center',textAlign:'center'}}><Vortex size={70} color={C.sienaL}/><div style={{fontSize:26,fontStyle:'italic',fontWeight:300,color:C.cream,lineHeight:1.05,marginTop:24}}>No termino perfecto.<br/>Termino presente.</div><div style={{fontSize:11,color:C.grey2,lineHeight:1.55,marginTop:22,width:250}}>Un ritual no borra la vida. Le da al cuerpo una experiencia nueva para volver a habitarla.</div><Rule color="#C4926A55" my={24}/><div style={{fontSize:8.5,color:C.grey2,fontFamily:MONO,letterSpacing:'0.12em',textTransform:'uppercase'}}>Rituales para la Vida Diaria · Actos que Mueven</div></Ct></Pg>;
}
function Board({id,label,children}){return <DCArtboard id={id} label={label} width={AW} height={AH}><S>{children}</S></DCArtboard>}
function App(){
  let page=1;
  const ritualBoards = RITUALES.flatMap(r => {
    const a = <Board key={r.num+'a'} id={\`r\${r.num}a\`} label={\`\${String(page).padStart(2,'0')} · \${r.num} intro\`}><RitualIntro r={r} pgN={page++}/></Board>;
    const b = <Board key={r.num+'b'} id={\`r\${r.num}b\`} label={\`\${String(page).padStart(2,'0')} · \${r.num} TAME\`}><RitualTame r={r} pgN={page++}/></Board>;
    return [a,b];
  });
  const cover = <Board id="p01" label="01 · Portada"><Cover/></Board>; page++;
  const guide = <Board id="p02" label="02 · Guia"><Guide pgN={2}/></Board>; page++;
  const index = <Board id="p03" label="03 · Indice"><IndexPage pgN={3}/></Board>; page++;
  const startPage = 4;
  page = startPage;
  const boards = RITUALES.flatMap(r => {
    const p1=page++; const p2=page++;
    return [
      <Board key={r.num+'a'} id={\`r\${r.num}a\`} label={\`\${String(p1).padStart(2,'0')} · \${r.num} intro\`}><RitualIntro r={r} pgN={p1}/></Board>,
      <Board key={r.num+'b'} id={\`r\${r.num}b\`} label={\`\${String(p2).padStart(2,'0')} · \${r.num} TAME\`}><RitualTame r={r} pgN={p2}/></Board>
    ];
  });
  const registroN=page++;
  return <DesignCanvas><DCSection id="cubierta" title="Cubierta">{cover}</DCSection><DCSection id="guia" title="Guia de uso">{guide}{index}</DCSection><DCSection id="rituales" title="Los 21 rituales">{boards}</DCSection><DCSection id="cierre" title="Cierre"><Board id="registro" label={\`\${String(registroN).padStart(2,'0')} · Registro\`}><Registro pgN={registroN}/></Board><Board id="contra" label={\`\${String(page).padStart(2,'0')} · Contraportada\`}><Back/></Board></DCSection></DesignCanvas>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Generado: ${OUT}`);
console.log(`Rituales: ${rituals.length}`);
console.log(`Paginas estimadas: ${3 + rituals.length * 2 + 2}`);
