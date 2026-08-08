const defs=`<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow"/></marker><linearGradient id="grad" x1="0" x2="1"><stop stop-color="#477ca5"/><stop offset=".55" stop-color="#78c6d9"/><stop offset="1" stop-color="#efa83b"/></linearGradient></defs>`;
const S=(body,label)=>`<svg class="diagram" viewBox="0 0 760 560" role="img" aria-label="${label}">${defs}${body}</svg>`;
const mid=(t,x,y,cls='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="${cls}">${t}</text>`;
const wrapMid=(t,x,y,chars,lh=24,cls='small')=>{const w=String(t).split(' ');const L=[];let l='';
  w.forEach(k=>{const test=l?l+' '+k:k;if(test.length>chars){L.push(l);l=k}else l=test});if(l)L.push(l);
  return L.map((s,i)=>mid(s,x,y+i*lh,cls)).join('')};
const dot=(x,y,r,t,c='blue')=>`<g class="node"><circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>${mid(t,x,y+8)}</g>`;
const link=(d,c='flow')=>`<path d="${d}" class="${c}" marker-end="url(#arr)"/>`;

/* Las seis fases del ciclo defensivo, con su perfil autonómico */
function seisFases(){const f=[['1','Arousal','activación y orientación','coral'],['2','Freeze','huida o lucha en espera','coral'],['3','Flight o fight','defensa activa','coral'],['4','Fright','inmovilidad tónica','blue'],['5','Flag o faint','colapso y disociación','blue'],['6','Quiescent','quietud que repara','blue']];
return S(`<rect x="18" y="96" width="360" height="300" rx="16" class="field"/><rect x="392" y="96" width="350" height="300" rx="16" class="window"/>
${mid('SIMPÁTICO',198,72,'small')}${mid('PARASIMPÁTICO DOMINANTE',567,72,'small')}`
+f.map(([n,h,s,c],i)=>{const x=78+i*121;return dot(x,180,38,n,c)+wrapMid(h,x,252,12,26,'')+wrapMid(s,x,306,13)}).join('')
+link('M40 448H720','route')
+mid('la cascada termina en reparación',380,504,'')
+mid('quedarse atascado es no llegar a la fase seis',380,542,'small'),'Las seis fases del ciclo defensivo con su perfil autonómico')}

/* El mismo frenazo, con y sin terminación */
function frenazo(){return S(`
<g class="stepNode"><rect x="30" y="40" width="330" height="220" rx="14"/>${mid('SE DETIENE',195,86,'small')}${wrapMid('Temblor de manos, falta de aire, piernas flojas, corazón golpeando',195,132,26,30,'')}${mid('la activación culmina',195,232,'small')}</g>
<g class="ratchet"><path d="M412 40h316a12 12 0 0 1 12 12v196a12 12 0 0 1-12 12H412a12 12 0 0 1-12-12V52a12 12 0 0 1 12-12z"/>${mid('NO SE DETIENE',570,86,'small')}${wrapMid('Dice que no pasó nada, respira hondo una vez y sigue conduciendo',570,132,26,30,'')}${mid('el temblor no ocurre',570,232,'small')}</g>
${link('M195 264V330','thinFlow')}${link('M570 264V330','thinFlow')}
<g class="practiceNode"><rect x="30" y="350" width="330" height="110" rx="12"/>${wrapMid('El programa llegó a su última fase',195,398,24,28,'')}</g>
<g class="practiceNode"><rect x="400" y="350" width="330" height="110" rx="12"/>${wrapMid('La secuencia quedó interrumpida',565,398,24,28,'')}</g>
${mid('el humano interrumpe la terminación por contexto social, urgencia, vergüenza o cortesía',380,512,'small')}`,'El mismo frenazo con y sin terminación del ciclo')}

/* El ciclo que no cierra, dicho en tres lenguajes */
function tresLenguajes(){const L=[['Etológico','un ciclo defensivo que no llegó a su última fase'],['Predictivo','una predicción que no recibió evidencia en contra'],['Bioeléctrico','una isla que no se re-enroló en el colectivo']];
return S(L.map(([h,t],i)=>{const y=60+i*140;
  return `<g class="stepNode"><rect x="30" y="${y}" width="700" height="112" rx="14"/><text x="56" y="${y+46}" class="small">${h.toUpperCase()}</text>${wrapMid(t,380,y+84,52,26,'')}</g>`}).join('')
+mid('son la misma cosa vista desde tres sistemas',380,512,''),'El ciclo que no cierra dicho en tres lenguajes')}

/* Las cuatro predicciones congeladas */
function predicciones(){const P=[['El general japonés','la guerra sigue'],['El ojo miope','el mundo será cercano'],['El dolor crónico','aquí hay que proteger'],['El tono de defensa alto','va a hacer falta']];
return S(P.map(([a,b],i)=>{const y=54+i*118;
  return `<g class="stepNode"><rect x="30" y="${y}" width="700" height="94" rx="12"/><text x="56" y="${y+58}">${a}</text><text x="400" y="${y+58}" class="small">predice</text><text x="520" y="${y+58}">«${b}»</text></g>`}).join('')
+mid('una predicción no se actualiza con un sedante: se actualiza con evidencia que la contradiga',380,548,'small'),'Las cuatro predicciones congeladas')}

/* Las tres formulaciones, y cuál se usa */
function formulaciones(){const F=[['Bajar la simpaticotonía','Suprime un valor','Clase A','SE RETIRA','coral'],['Restaurar la alternancia entre activación y recuperación','Devuelve la capacidad de subir y bajar','Clase B','Correcta, y no dice cómo','amber'],['Entregar la señal de que el episodio terminó','Actualiza el modelo que sostiene el estado','Clase B','ES LA QUE SE USA','blue']];
return S(F.map(([t,q,c,v,col],i)=>{const y=40+i*168;
  return `<g class="stepNode"><rect x="30" y="${y}" width="700" height="140" rx="14"/><circle cx="76" cy="${y+50}" r="22" class="${col}"/><text x="76" y="${y+59}" text-anchor="middle">${i+1}</text>${wrapMid(t,420,y+42,44,28,'')}<text x="120" y="${y+108}" class="small">${q} · ${c}</text><text x="712" y="${y+108}" text-anchor="end">${v}</text></g>`}).join(''),'Las tres formulaciones del objetivo terapéutico')}

/* Qué se mide, frente a qué no */
function queSeMide(){const M=[['cuánto bajó el simpático','la amplitud','¿puede subir cuando toca?'],['el nivel en reposo','el tiempo de retorno','¿puede bajar, y en cuánto?'],['un número aislado','la variabilidad','¿modula?'],['el alivio del día','cuánto dura','¿se sostiene?']];
return S(`<text x="200" y="52" text-anchor="middle" class="small">NO SE MIDE</text><text x="545" y="52" text-anchor="middle" class="small">SE MIDE</text>`
+M.map(([a,b,c],i)=>{const y=80+i*112;
  return `<g class="ratchet"><path d="M42 ${y}h316a12 12 0 0 1 12 12v64a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12V${y+12}a12 12 0 0 1 12-12z"/>${wrapMid(a,200,y+52,26,26,'')}</g>`
  +`<g class="stepNode"><rect x="400" y="${y}" width="330" height="88" rx="12"/>${wrapMid(b,565,y+40,24,26,'')}${mid(c,565,y+72,'small')}</g>`}).join('')
+mid('la variabilidad de la frecuencia cardiaca mide flexibilidad, y ya era el marcador correcto',380,548,'small'),'Qué se mide frente a qué no se mide')}

/* La hoja de valoración, sus cuatro apartados */
function hoja(){const A=[['A','Mapa de sensaciones','12 zonas, de 0 a 10','blue'],['B','Signos de salida de la ventana','4 del método y 6 dominios','blue'],['C','Conteo de nodos que marcan','corte en 6 de 10','amber'],['D','Prueba de respiración profunda','la única medida objetiva','coral']];
return S(A.map(([k,h,s,c],i)=>{const y=44+i*118;
  return `<g class="stepNode"><rect x="30" y="${y}" width="700" height="94" rx="12"/><circle cx="82" cy="${y+47}" r="26" class="${c}"/><text x="82" y="${y+56}" text-anchor="middle">${k}</text><text x="140" y="${y+42}">${h}</text><text x="140" y="${y+74}" class="small">${s}</text></g>`}).join('')
+mid('cinco minutos los cuatro apartados · se repiten al cierre',380,532,''),'Los cuatro apartados de la hoja de valoración')}

/* La prueba de respiración profunda, con sus cortes */
function respiracion(){const B=[['15 latidos por minuto o más','Normal',520,'blue'],['11 a 14','Límite',330,'amber'],['10 o menos','Patológica',200,'coral']];
return S(`${wrapMid('Un minuto respirando a seis respiraciones por minuto, con metrónomo a doce tiempos',380,70,52,32,'')}
${mid('se toma la diferencia entre la frecuencia máxima en inspiración y la mínima en espiración',380,150,'small')}`
+B.map(([t,l,w,c],i)=>{const y=210+i*104;
  return `<g class="channel"><rect x="30" y="${y}" width="${w}" height="64" rx="10" class="${c}"/></g><text x="52" y="${y+42}">${t}</text><text x="${w+56}" y="${y+42}">${l}</text>`}).join('')
+mid('mide el control parasimpático de la frecuencia cardiaca, que es la variable que la técnica pretende mover',380,548,'small'),'Puntos de corte de la prueba de respiración profunda')}

/* Lectura conjunta de los cuatro apartados */
function lectura(){const filas=[['Polo hiperactivado','Alto','Varios','6 o más','Reducida','coral'],['Polo hipoactivado','Bajo, con contraste','Variables','6 o más','Reducida','amber'],['En ventana','Bajo sin contraste','Pocos','Menos de 6','15 o más','blue'],['No es el eje','Localizado','Pocos','Menos de 6','15 o más','blue']];
const col=[300,430,545,660];
return S(`<text x="30" y="60" class="small">PERFIL</text>${['MAPA','DOMINIOS','NODOS','RESPIRACIÓN'].map((t,i)=>mid(t,col[i],60,'small')).join('')}
<path d="M30 78H730" class="axis"/>`
+filas.map(([n,a,b,c,d,cl],i)=>{const y=126+i*104;
  return `<circle cx="46" cy="${y-8}" r="11" class="${cl}"/><text x="72" y="${y}">${n}</text>`
  +[a,b,c,d].map((v,k)=>wrapMid(v,col[k],y,14,24,'small')).join('')
  +`<path d="M30 ${y+40}H730" class="axis" opacity=".25"/>`}).join('')
+wrapMid('El segundo perfil es el que esta hoja existe para no pasar por alto: mapa bajo, contraste presente y nodos altos',380,516,58,30,''),'Lectura conjunta de los cuatro apartados')}

/* Por qué no es una técnica emocional */
function noEmocional(){const R=[['Rompería el marco','el objeto es un estado, leído por el rastreo'],['Cambiaría lo que hace el operador','perseguiría la descarga en vez de rastrear'],['Es fuera de alcance','la formación habilita para regulación, no para psicoterapia'],['Sube la ganancia','dirigir la atención al malestar es lo contrario del objetivo'],['Lo volvería indistinguible','aterriza en una categoría saturada y de evidencia pobre']];
return S(R.map(([h,s],i)=>{const y=26+i*106;
  return `<g class="stepNode"><rect x="30" y="${y}" width="700" height="88" rx="12"/><circle cx="76" cy="${y+44}" r="20" class="coral"/><text x="76" y="${y+52}" text-anchor="middle">${i+1}</text><text x="122" y="${y+38}">${h}</text><text x="122" y="${y+68}" class="small">${s}</text></g>`}).join(''),'Cinco razones estructurales')}

/* La regla operativa sobre la descarga */
function descarga(){return S(`<rect x="40" y="60" width="680" height="150" rx="16" class="window"/>
${mid('La descarga es un signo, no un objetivo',380,132,'')}
${mid('confirma que el proceso está ocurriendo',380,178,'small')}
`+['No se busca','No se provoca','No se interpreta','No se persigue'].map((t,i)=>{const x=30+(i%2)*370,y=250+Math.floor(i/2)*104;
  return `<g class="ratchet"><path d="M${x+12} ${y}h316a12 12 0 0 1 12 12v56a12 12 0 0 1-12 12H${x+12}a12 12 0 0 1-12-12V${y+12}a12 12 0 0 1 12-12z"/>${mid(t,x+170,y+50,'')}</g>`}).join('')
+mid('si aparece, se acompaña · si no aparece, la sesión está igual de completa',380,508,''),'La regla operativa sobre la descarga')}

const MAP={seisFases,frenazo,tresLenguajes,predicciones,formulaciones,queSeMide,hoja,respiracion,lectura,noEmocional,descarga};
function diagramFor(name){return (MAP[name]||(()=>''))()}
