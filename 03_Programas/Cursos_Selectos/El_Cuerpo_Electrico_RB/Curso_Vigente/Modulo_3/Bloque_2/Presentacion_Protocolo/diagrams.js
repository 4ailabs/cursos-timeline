const defs=`<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow"/></marker><linearGradient id="grad" x1="0" x2="1"><stop stop-color="#477ca5"/><stop offset=".55" stop-color="#78c6d9"/><stop offset="1" stop-color="#efa83b"/></linearGradient></defs>`;
const S=(body,label)=>`<svg class="diagram" viewBox="0 0 760 560" role="img" aria-label="${label}">${defs}${body}</svg>`;
const mid=(t,x,y,cls='')=>`<text x="${x}" y="${y}" text-anchor="middle" class="${cls}">${t}</text>`;
const wrapMid=(t,x,y,chars,lh=24,cls='small')=>{const w=String(t).split(' ');const L=[];let l='';
  w.forEach(k=>{const test=l?l+' '+k:k;if(test.length>chars){L.push(l);l=k}else l=test});if(l)L.push(l);
  return L.map((s,i)=>mid(s,x,y+i*lh,cls)).join('')};
const dot=(x,y,r,t,c='blue')=>`<g class="node"><circle cx="${x}" cy="${y}" r="${r}" class="${c}"/>${mid(t,x,y+8)}</g>`;
const link=(d,c='flow')=>`<path d="${d}" class="${c}" marker-end="url(#arr)"/>`;

/* Los diecisiete pasos, repartidos por momento de la atención */
function pasos(){const rows=[['Primera consulta',1,5],['Entre consultas',6,6],['Sesión de aplicación',7,12],['Consultas de revisión',13,17]];
return S(rows.map(([t,a,b],r)=>{const n=b-a+1,y=96+r*116;
  return `<text x="30" y="${y-40}" class="small">${t.toUpperCase()}</text>`+
    Array.from({length:n},(_,k)=>`<g class="zone"><circle cx="${72+k*104}" cy="${y}" r="30"/>${mid(a+k,72+k*104,y+9)}</g>`).join('')}).join('')
+`<path d="M30 148H730M30 264H730M30 380H730" class="axis" opacity=".3"/>`,'Los diecisiete pasos por momento de la atención')}

/* Criterios de derivación inmediata */
function derivacion(){const items=['Sangre en el excremento','Pérdida de peso no buscada','Anemia','Fiebre','Dolor que despierta de noche','Ritmo cambiado más de 6 semanas, mayor de 50 años'];
return S(items.map((t,i)=>{const x=30+(i%2)*370,y=36+Math.floor(i/2)*116;
  return `<g class="ratchet"><path d="M${x+12} ${y}h316a12 12 0 0 1 12 12v76a12 12 0 0 1-12 12H${x+12}a12 12 0 0 1-12-12V${y+12}a12 12 0 0 1 12-12z"/>${wrapMid(t,x+170,y+40,26,28,'')}</g>`}).join('')
+mid('Con uno solo se deriva, y el protocolo no empieza',380,514,'small'),'Criterios de derivación inmediata')}

/* Secuencia de intervención */
function secuencia(){const p=[['0','Horario','2 semanas','amber'],['1','Sustrato','3 semanas','blue'],['2','Campo','semanas 3 a 6','coral'],['3','Retiro','semana 10','blue']];
return S(link('M62 260H700','route')
+p.map(([n,t,d,c],i)=>{const x=95+i*190;return dot(x,260,58,n,c)+mid(t,x,358)+mid(d,x,392,'small')}).join('')
+mid('cada paso decide si hace falta el siguiente',380,120,'')
+mid('lo que sobrevive a los dos primeros es lo que corresponde al tercero',380,472,'small'),'Secuencia de horario, sustrato, campo y retiro')}

/* Calendario: cuatro consultas y tres periodos */
function calendario(){const m=[[110,'Día 0','historia y basal'],[290,'Día 21','misma comida'],[470,'Semana 6','tres mediciones'],[650,'Semana 10','cuánto duró']];
const per=[[110,180,'sustrato, sin imán'],[290,180,'sesiones de aplicación'],[470,180,'sin sustrato y sin imán']];
return S(`<text x="30" y="52" class="small">CUATRO CONSULTAS</text><path d="M110 210H650" class="timeline"/>`
+m.map(([x,t,s],i)=>`<g class="zone"><circle cx="${x}" cy="210" r="30"/>${mid(i+1,x,219)}</g>`+mid(t,x,160)+wrapMid(s,x,272,18)).join('')
+`<text x="30" y="368" class="small">TRES PERIODOS ENTRE ELLAS</text>`
+per.map(([x,w,t])=>`<g class="channel"><rect x="${x}" y="392" width="${w}" height="64" rx="10"/></g>${wrapMid(t,x+w/2,424,20)}`).join('')
+mid('la segunda consulta decide si faltaba material o si hay algo cerrado',380,522,'small'),'Cuatro consultas y tres periodos entre ellas')}

/* Secuencia de rastreo en cada unidad */
function cincoPasos(){const L=[['1','Zona de proyección','de la unidad que toca'],['2','Polo negativo','cara negativa a la piel'],['3','Medir simetría','levantar 30° y comparar'],['4','Polo positivo al lado','probar posiciones'],['5','Tiempo','hasta que deje de acortar']];
return S(L.map(([n,h,s],i)=>{const y=26+i*104;
  return `<g class="stepNode"><rect x="30" y="${y}" width="380" height="86" rx="12"/><circle cx="72" cy="${y+43}" r="24" class="blue"/>${mid(n,72,y+52)}<text x="112" y="${y+38}">${h}</text><text x="112" y="${y+68}" class="small">${s}</text></g>`}).join('')
+`<g class="practiceNode"><rect x="440" y="130" width="290" height="86" rx="12"/><text x="458" y="166">Acorta</text><text x="458" y="196" class="small">zona confirmada, se deja fijo</text></g>`
+`<g class="practiceNode"><rect x="440" y="234" width="290" height="86" rx="12"/><text x="458" y="270">No cambia</text><text x="458" y="300" class="small">se mueve dentro de la zona</text></g>`
+`<g class="practiceNode"><rect x="440" y="338" width="290" height="86" rx="12"/><text x="458" y="374">Isométricas</text><text x="458" y="404" class="small">dipolo local, se deja puesto</text></g>`
+link('M410 173H440','thinFlow')+link('M410 277H440','thinFlow')+link('M410 381H440','thinFlow'),'Secuencia de rastreo en cada unidad funcional')}

/* Orden fijo de nodos distantes */
function ordenFijo(){const n=[['1','Renal','derecha','blue'],['2','Renal','izquierda','blue'],['3','Suprarrenal','derecha','blue'],['4','Suprarrenal','izquierda','blue'],['5','Hígado','zona completa','amber'],['6','Bulbo','bajo el occipucio','amber'],['7','Cuerpo','entero','coral']];
return S(link('M52 230H726','route')
+n.map(([k,a,b,c],i)=>{const x=58+i*111;return dot(x,230,40,k,c)+mid(a,x,308)+mid(b,x,336,'small')}).join('')
+mid('efector iónico · neuroendocrino · metabólico · control central',380,120,'small')
+mid('se detiene en el primero que restablece la isometría',380,430,''),'Orden fijo de nodos distantes')}

/* Variables y plazos de revisión */
function plazos(){const r=[['Náusea tratada en el píloro','minutos, en la sesión',70,'coral'],['Estómago, duodeno, páncreas','3 semanas',300,'blue'],['Yeyuno, íleon, colon','3 semanas',300,'blue'],['Unión esofagogástrica, píloro, recto','3 semanas',300,'blue'],['Cualquier tramo, problema de ritmo','3 a 6 semanas',430,'amber'],['Hígado, o cierre en bulbo','3 a 6 semanas',430,'amber'],['Rigidez de la respuesta','meses',600,'coral']];
return S(r.map(([t,d,w,c],i)=>{const y=26+i*74;
  return `<text x="30" y="${y+26}">${t}</text><g class="channel"><rect x="30" y="${y+40}" width="${w}" height="18" rx="9" class="${c}"/></g><text x="${w+46}" y="${y+56}" class="small">${d}</text>`}).join('')
+`<text x="30" y="548" class="small">tres semanas equivalen a dos renovaciones completas del epitelio</text>`,'Variables y plazos de revisión por unidad tratada')}

/* Náusea: el ritmo precede al síntoma */
function nausea(){return S(`<path d="M60 300H700" class="axis"/>
<path d="M60 300C150 300 180 170 260 170" class="curve coral" fill="none" stroke-width="7"/>
<path d="M260 300C350 300 380 210 460 210" class="curve blueStroke" fill="none" stroke-width="7" stroke-dasharray="10 8"/>
<text x="70" y="140" class="small">se desordena el ritmo eléctrico del estómago</text>
<text x="300" y="180">la persona reporta náusea</text>
<path d="M260 320V366M460 320V366" class="thinFlow"/>${mid('1 a 20 minutos',360,400,'')}
`+[['A','por el ritmo','cede en la sesión','coral'],['B','por el esfínter','días o semanas','blue'],['C','por el aferente vagal','sin cambiar el vaciamiento','amber']]
.map(([k,t,s,c],i)=>{const x=140+i*240;return dot(x,472,34,k,c)+mid(t,x,532,'small')}).join(''),'El desorden del ritmo precede al reporte de náusea')}

/* Clasificación del resultado */
function resultados(){const q=[['Mejoró con el sustrato','Faltaba material. No necesitaba la aplicación','blue'],['Mejoró con el imán y se sostiene','Se reabrió lo cerrado. Se espacían las sesiones','blue'],['Mejoró con el imán y regresa','Algo sigue sosteniendo el estado. Revisar microbiota e hígado','amber'],['No mejoró con ninguno','El sistema que manda es otro. Volver a la lectura por sistemas','coral']];
return S(q.map(([h,s,c],i)=>{const x=30+(i%2)*370,y=40+Math.floor(i/2)*246;
  return `<g class="stepNode"><rect x="${x}" y="${y}" width="340" height="206" rx="14"/><circle cx="${x+40}" cy="${y+44}" r="22" class="${c}"/>${mid(i+1,x+40,y+53)}${wrapMid(h,x+170,y+114,24,30,'')}${wrapMid(s,x+170,y+172,30,26)}</g>`}).join(''),'Clasificación del resultado en la semana diez')}

/* Polaridad y cara del imán */
function polos(){return S(`<g class="channel"><rect x="90" y="130" width="240" height="110" rx="12"/></g>${mid('NEGATIVO',210,180)}${mid('Norte · rastrea',210,214,'small')}
<path d="M90 254H330" class="acid"/>${mid('cara negativa hacia la piel',210,296,'small')}
<g class="channel"><rect x="430" y="130" width="240" height="110" rx="12"/></g>${mid('POSITIVO',550,180)}${mid('Sur · complementa',550,214,'small')}
<path d="M430 254H670" class="base"/>${mid('par local o nodo distante',550,296,'small')}
<rect x="60" y="366" width="640" height="130" rx="14" class="window"/>${mid('Excepción: acidosis temporal',380,414)}${mid('se empieza con el positivo, y la cara positiva va hacia la piel',380,456,'small')}`,'Polaridad y cara del imán hacia la piel')}

/* Puntos pendientes de definición */
function pendientes(){const p=[['Puntos de cada unidad',0],['Delgado frente a colon',0],['Puntos hepáticos de este eje',0],['Puntos del hiato y del píloro',0],['Zona propia de las tres puertas',0],['Puntos del retorno vagal',0],['Retorno antes o después del recorrido',1],['Ritmo frente a barrera al colocar',0],['Cómo se coloca el hiato al respirar',1],['Si la rejilla entra en este eje',0]];
return S(p.map(([t,key],i)=>{const x=30+(i%2)*370,y=24+Math.floor(i/2)*106;
  return `<g class="${key?'ratchet':'stepNode'}">${key?`<path d="M${x+12} ${y}h316a12 12 0 0 1 12 12v64a12 12 0 0 1-12 12H${x+12}a12 12 0 0 1-12-12V${y+12}a12 12 0 0 1 12-12z"/>`:`<rect x="${x}" y="${y}" width="340" height="88" rx="12"/>`}<text x="${x+22}" y="${y+40}" class="small">${String(i+1).padStart(2,'0')}</text>${wrapMid(t,x+195,y+38,25,26,'')}${key?mid('cambia la maniobra',x+195,y+72,'small'):''}</g>`}).join(''),'Los diez puntos que faltan por definir')}

const MAP={pasos,derivacion,secuencia,calendario,cincoPasos,ordenFijo,plazos,nausea,resultados,polos,pendientes};
function diagramFor(name){return (MAP[name]||(()=>''))()}
