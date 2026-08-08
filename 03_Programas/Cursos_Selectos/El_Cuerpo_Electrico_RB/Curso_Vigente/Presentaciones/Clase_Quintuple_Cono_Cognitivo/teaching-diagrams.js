globalThis.TEACHING_DIAGRAMS = Object.freeze({
  2: {
    eyebrow: 'Pizarra · contrarregulación',
    title: 'El rebote requiere una cadena causal funcionando',
    caption: 'La curva muestra el dato. La cadena inferior explica qué tuvo que ocurrir para producirlo.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Curva de perturbación y retorno activo conectada con una cadena causal">
      <defs><marker id="arrow02" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <g class="axes"><path d="M90 315V55M90 315H790"/><text x="28" y="82">glucosa</text><text x="730" y="350">tiempo</text><path d="M90 145H790" class="target-line"/><text x="105" y="127" class="amber-text">valor defendido</text></g>
      <path d="M105 145 C165 145 175 146 220 145 C245 145 245 275 285 285 C390 310 455 160 610 148 C680 143 730 145 775 145" class="response-curve draw"/>
      <g class="diagram-step fragment"><path d="M238 90V240" class="oxide-stroke" marker-end="url(#arrow02)"/><text x="255" y="105" class="oxide-text">1 · intervención baja el valor</text></g>
      <g class="diagram-step fragment"><path d="M315 245Q420 115 595 147" class="amber-stroke" marker-end="url(#arrow02)"/><text x="385" y="235" class="amber-text">2 · retorno activo</text></g>
      <g class="causal-chain diagram-step fragment">
        <rect x="80" y="410" width="250" height="105" rx="10"/><rect x="405" y="410" width="250" height="105" rx="10"/><rect x="730" y="410" width="285" height="105" rx="10"/><rect x="1090" y="410" width="285" height="105" rx="10" class="final-node"/>
        <path d="M330 462H390M655 462H715M1015 462H1075" marker-end="url(#arrow02)"/>
        <text x="205" y="448" text-anchor="middle">glucosa baja</text><text x="205" y="483" text-anchor="middle" class="small-svg">se detecta el desvío</text>
        <text x="530" y="448" text-anchor="middle">glucagón</text><text x="530" y="483" text-anchor="middle" class="small-svg">se libera una señal</text>
        <text x="873" y="448" text-anchor="middle">hígado</text><text x="873" y="483" text-anchor="middle" class="small-svg">moviliza glucosa</text>
        <text x="1232" y="448" text-anchor="middle">retorno</text><text x="1232" y="483" text-anchor="middle" class="small-svg">la meta sigue activa</text>
      </g>
      <g class="diagram-step fragment"><text x="1232" y="565" text-anchor="middle" class="takeaway-svg">El rebote exige capacidad activa.</text></g>
    </svg>`
  },
  7: {
    eyebrow: 'Pizarra · restricciones',
    title: 'Abrir una sola compuerta cambia muchos destinos',
    caption: 'No añadimos un movimiento nuevo: cambiamos qué combinaciones de movimientos son posibles.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Red de rutas antes y después de abrir una restricción">
      <defs><marker id="arrow07" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <text x="270" y="55" class="panel-label">ANTES · compuerta cerrada</text><text x="940" y="55" class="panel-label amber-text">DESPUÉS · compuerta abierta</text>
      <g transform="translate(60 75)"><rect width="570" height="420" rx="14" class="canvas-box"/><circle cx="70" cy="210" r="25" class="start-node"/><g class="route-lines"><path d="M95 210 210 100 330 100"/><path d="M95 210 210 210 330 210"/><path d="M95 210 210 320 330 320"/><path d="M330 100 470 100"/><path d="M330 210 470 210"/><path d="M330 320 470 320"/></g><g class="destination-nodes"><circle cx="470" cy="100" r="22"/><circle cx="470" cy="210" r="22"/><circle cx="470" cy="320" r="22"/></g><rect x="292" y="60" width="34" height="300" rx="6" class="barrier"/><text x="309" y="392" text-anchor="middle" class="small-svg oxide-text">C cerrada</text><text x="70" y="260" text-anchor="middle" class="small-svg">inicio</text></g>
      <g class="diagram-step fragment" transform="translate(750 75)"><rect width="620" height="420" rx="14" class="canvas-box"/><circle cx="70" cy="210" r="25" class="start-node"/><g class="route-lines active-routes"><path d="M95 210 210 100 330 100 520 70"/><path d="M95 210 210 210 330 210 520 210"/><path d="M95 210 210 320 330 320 520 350"/><path d="M330 100 520 210"/><path d="M330 210 520 70"/><path d="M330 210 520 350"/><path d="M330 320 520 210"/></g><g class="destination-nodes active"><circle cx="520" cy="70" r="22"/><circle cx="520" cy="210" r="22"/><circle cx="520" cy="350" r="22"/></g><path d="M310 60V158M310 262V360" class="barrier-line"/><path d="M285 210H340" class="gate-open"/><text x="310" y="392" text-anchor="middle" class="small-svg amber-text">una apertura</text><text x="70" y="260" text-anchor="middle" class="small-svg">mismo inicio</text></g>
      <g class="diagram-step fragment"><path d="M635 285H720" class="amber-stroke" marker-end="url(#arrow07)"/><text x="677" y="265" text-anchor="middle" class="small-svg amber-text">editar C</text></g>
      <g class="diagram-step fragment"><text x="725" y="565" text-anchor="middle" class="takeaway-svg">Una edición pequeña en C puede ampliar combinatoriamente el espacio alcanzable.</text></g>
    </svg>`
  },
  12: {
    eyebrow: 'Pizarra · trinquete',
    title: 'La adaptación cambia de estado y después bloquea el regreso',
    caption: 'El punto crítico no es que aparezca una defensa, sino que la flecha de retorno deje de estar disponible.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Secuencia patogénica de cuatro estados con retorno bloqueado">
      <defs><marker id="arrow12" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <g class="state-card"><rect x="40" y="120" width="275" height="265" rx="14"/><circle cx="178" cy="190" r="42" class="storm-node"/><text x="178" y="270" text-anchor="middle">1 · demanda real</text><text x="178" y="310" text-anchor="middle" class="small-svg">aparece una tormenta</text></g>
      <g class="state-card diagram-step fragment"><rect x="395" y="120" width="275" height="265" rx="14"/><path d="M465 225H600M480 185 585 265M585 185 480 265" class="amber-stroke"/><text x="533" y="270" text-anchor="middle">2 · defensa</text><text x="533" y="310" text-anchor="middle" class="small-svg">C se reescribe</text></g>
      <g class="state-card diagram-step fragment"><rect x="750" y="120" width="275" height="265" rx="14"/><circle cx="888" cy="190" r="42" class="sun-node"/><path d="M820 225H955M835 185 940 265M940 185 835 265" class="amber-stroke"/><text x="888" y="270" text-anchor="middle">3 · contexto cambia</text><text x="888" y="310" text-anchor="middle" class="small-svg">la defensa permanece</text></g>
      <g class="state-card diagram-step fragment"><rect x="1105" y="120" width="300" height="265" rx="14" class="danger-card"/><path d="M1170 225H1340M1190 180 1320 270M1320 180 1190 270" class="oxide-stroke"/><path d="M1255 155V290" class="oxide-stroke thick"/><text x="1255" y="330" text-anchor="middle">4 · trinquete</text><text x="1255" y="365" text-anchor="middle" class="small-svg">el retorno queda bloqueado</text></g>
      <g class="flow-arrows"><path d="M315 252H380" marker-end="url(#arrow12)"/><path d="M670 252H735" marker-end="url(#arrow12)"/><path d="M1025 252H1090" marker-end="url(#arrow12)"/></g>
      <g class="diagram-step fragment"><path d="M1255 420 C1050 545 610 545 190 420" class="return-path blocked-path"/><line x1="680" y1="495" x2="745" y2="560" class="oxide-stroke thick"/><line x1="745" y1="495" x2="680" y2="560" class="oxide-stroke thick"/><text x="720" y="470" text-anchor="middle" class="oxide-text">la vuelta ya no pertenece al espacio permitido</text></g>
    </svg>`
  },
  13: {
    eyebrow: 'Pizarra · permiso contextual',
    title: 'La respuesta necesita señal primaria Y permiso',
    caption: 'El efector puede estar intacto y no responder porque una segunda condición no habilitó la ruta.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Compuerta lógica que combina señal primaria y permiso para activar un efector">
      <defs><marker id="arrow13" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <g><rect x="80" y="115" width="275" height="110" rx="12"/><text x="218" y="160" text-anchor="middle">señal primaria</text><text x="218" y="195" text-anchor="middle" class="small-svg">“haz la acción”</text><rect x="80" y="330" width="275" height="110" rx="12" class="permission-node"/><text x="218" y="375" text-anchor="middle">señal permisiva</text><text x="218" y="410" text-anchor="middle" class="small-svg">“ahora está permitido”</text></g>
      <g class="diagram-step fragment"><path d="M355 170H540V250M355 385H540V305" marker-end="url(#arrow13)"/><path d="M540 190 Q680 190 680 278 Q680 365 540 365Z" class="logic-gate"/><text x="610" y="286" text-anchor="middle" class="big-svg">Y</text></g>
      <g class="diagram-step fragment"><path d="M682 278H870" marker-end="url(#arrow13)"/><rect x="870" y="220" width="250" height="115" rx="12" class="effector-node"/><text x="995" y="265" text-anchor="middle">efector</text><text x="995" y="300" text-anchor="middle" class="small-svg">maquinaria intacta</text></g>
      <g class="diagram-step fragment"><path d="M1120 278H1300" marker-end="url(#arrow13)"/><circle cx="1340" cy="278" r="55" class="response-node"/><text x="1340" y="286" text-anchor="middle">acción</text></g>
      <g class="diagram-step fragment"><line x1="410" y1="355" x2="510" y2="415" class="oxide-stroke thick"/><line x1="510" y1="355" x2="410" y2="415" class="oxide-stroke thick"/><path d="M700 495H1320" class="muted-stroke"/><text x="1010" y="535" text-anchor="middle" class="oxide-text">permiso OFF → no hay salida, aunque el efector exista</text></g>
    </svg>`
  },
  14: {
    eyebrow: 'Pizarra · diagnóstico diferencial',
    title: 'Cerrar rutas y perder límites son topologías opuestas',
    caption: 'La misma pérdida de función visible puede requerir abrir restricciones o restaurarlas.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Comparación de red rigidificada y red debilitada">
      <text x="355" y="60" text-anchor="middle" class="panel-label amber-text">RIGIDIFICACIÓN · C+</text><text x="1095" y="60" text-anchor="middle" class="panel-label oxide-text">DEBILITAMIENTO · C−</text>
      <g transform="translate(45 90)"><rect width="620" height="390" rx="14" class="canvas-box"/><g class="network normal"><path d="M95 195 220 90 350 195 500 90M95 195 220 300 350 195 500 300M220 90V300M350 195 500 195"/><g><circle cx="95" cy="195" r="22"/><circle cx="220" cy="90" r="22"/><circle cx="220" cy="300" r="22"/><circle cx="350" cy="195" r="22"/><circle cx="500" cy="90" r="22"/><circle cx="500" cy="195" r="22"/><circle cx="500" cy="300" r="22"/></g></g><g class="diagram-step fragment"><rect x="195" y="40" width="48" height="310" rx="5" class="barrier"/><rect x="330" y="40" width="48" height="310" rx="5" class="barrier"/><text x="310" y="370" text-anchor="middle" class="small-svg">sobran barreras</text></g></g>
      <g class="diagram-step fragment" transform="translate(785 90)"><rect width="620" height="390" rx="14" class="canvas-box"/><path d="M310 35V355M75 195H545" class="boundary-lines"/><g class="network weak"><path d="M105 90 240 145M105 300 255 255M375 125 520 70M380 265 530 320"/><g><circle cx="105" cy="90" r="22"/><circle cx="105" cy="300" r="22"/><circle cx="240" cy="145" r="22"/><circle cx="255" cy="255" r="22"/><circle cx="375" cy="125" r="22"/><circle cx="380" cy="265" r="22"/><circle cx="520" cy="70" r="22"/><circle cx="530" cy="320" r="22"/></g></g><path d="M70 45 550 345M550 45 70 345" class="lost-boundary"/><text x="310" y="370" text-anchor="middle" class="small-svg">faltan límites y acoplamiento</text></g>
      <g class="diagram-step fragment"><text x="350" y="555" text-anchor="middle" class="takeaway-svg amber-text">respuesta: abrir rutas</text><text x="1095" y="555" text-anchor="middle" class="takeaway-svg oxide-text">respuesta: restaurar organización</text></g>
    </svg>`
  },
  21: {
    eyebrow: 'Pizarra · protocolo de medición',
    title: 'Cada propiedad exige una perturbación distinta',
    caption: 'Observar el sistema en reposo no permite separar alcance, anticipación y flexibilidad.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Tres protocolos para medir Lambda, H y flexibilidad">
      <defs><marker id="arrow21" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <g class="protocol-card"><rect x="35" y="90" width="430" height="390" rx="14"/><text x="80" y="145" class="big-symbol">Λ</text><text x="145" y="142">alcance</text><path d="M100 220H360" marker-end="url(#arrow21)"/><circle cx="135" cy="220" r="18"/><circle cx="215" cy="220" r="25"/><circle cx="305" cy="220" r="33"/><text x="250" y="285" text-anchor="middle" class="small-svg">perturbar célula → tejido → órgano</text><path d="M110 340H355" class="amber-stroke"/><path d="M275 318V362" class="amber-stroke"/><text x="250" y="408" text-anchor="middle">límite de respuesta = Λ</text></g>
      <g class="protocol-card diagram-step fragment"><rect x="510" y="90" width="430" height="390" rx="14"/><text x="555" y="145" class="big-symbol">H</text><text x="620" y="142">horizonte</text><path d="M570 350H870" marker-end="url(#arrow21)"/><path d="M620 330V370M790 330V370" class="muted-stroke"/><text x="620" y="405" text-anchor="middle" class="small-svg">acción</text><text x="790" y="405" text-anchor="middle" class="small-svg">desvío</text><path d="M620 270Q690 190 790 270" class="amber-stroke" marker-end="url(#arrow21)"/><text x="705" y="210" text-anchor="middle">si actúa antes, anticipa</text></g>
      <g class="protocol-card diagram-step fragment"><rect x="985" y="90" width="430" height="390" rx="14"/><text x="1030" y="145" class="big-symbol">Φ</text><text x="1095" y="142">flexibilidad</text><path d="M1045 260H1155M1235 260H1350" marker-end="url(#arrow21)"/><rect x="1155" y="215" width="80" height="90" rx="8" class="barrier"/><path d="M1080 330Q1195 420 1315 330" class="amber-stroke" marker-end="url(#arrow21)"/><text x="1195" y="388" text-anchor="middle">¿encuentra otra ruta?</text><text x="1195" y="445" text-anchor="middle" class="small-svg">bloquear el camino habitual</text></g>
      <g class="diagram-step fragment"><text x="725" y="555" text-anchor="middle" class="takeaway-svg">Medir es intervenir de forma selectiva y observar qué capacidad aparece.</text></g>
    </svg>`
  },
  25: {
    eyebrow: 'Pizarra · falsación',
    title: 'Una predicción debe poder perder',
    caption: 'El resultado negativo no “ajusta” automáticamente el relato: elimina o revisa una pieza concreta.',
    svg: `<svg class="explainer-svg" viewBox="0 0 1450 610" role="img" aria-label="Flujo lógico desde hipótesis hasta supervivencia o rechazo">
      <defs><marker id="arrow25" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0 10 5 0 10Z" class="arrow-fill"/></marker></defs>
      <g class="logic-flow"><rect x="55" y="205" width="260" height="125" rx="12"/><text x="185" y="255" text-anchor="middle">hipótesis</text><text x="185" y="295" text-anchor="middle" class="small-svg">“la coordinación cae primero”</text><path d="M315 267H405" marker-end="url(#arrow25)"/>
      <g class="diagram-step fragment"><rect x="405" y="205" width="260" height="125" rx="12"/><text x="535" y="255" text-anchor="middle">predicción</text><text x="535" y="295" text-anchor="middle" class="small-svg">orden temporal observable</text><path d="M665 267H755" marker-end="url(#arrow25)"/></g>
      <g class="diagram-step fragment"><rect x="755" y="205" width="230" height="125" rx="12"/><text x="870" y="255" text-anchor="middle">prueba</text><text x="870" y="295" text-anchor="middle" class="small-svg">protocolo definido antes</text></g>
      <g class="diagram-step fragment"><path d="M985 245H1080V135H1170" marker-end="url(#arrow25)"/><rect x="1170" y="75" width="240" height="120" rx="12" class="survive-node"/><text x="1290" y="125" text-anchor="middle">coincide</text><text x="1290" y="162" text-anchor="middle" class="small-svg">sobrevive; no se “prueba”</text></g>
      <g class="diagram-step fragment"><path d="M985 290H1080V420H1170" marker-end="url(#arrow25)"/><rect x="1170" y="360" width="240" height="120" rx="12" class="reject-node"/><text x="1290" y="410" text-anchor="middle">no coincide</text><text x="1290" y="447" text-anchor="middle" class="small-svg">revisar o abandonar la pieza</text></g></g>
      <g class="diagram-step fragment"><path d="M1120 535H1360" class="oxide-stroke"/><text x="1240" y="570" text-anchor="middle" class="oxide-text">Si todo encaja, no se probó.</text></g>
    </svg>`
  }
});
