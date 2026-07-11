const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
(async()=>{
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.goto('file://'+path.resolve(__dirname,'Manual_Letter_BN_Modulo1_Bloques_1y2.html'),{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.querySelectorAll('.pagedjs_page').length>5,{timeout:90000});
  await new Promise(r=>setTimeout(r,3500));
  const d=await p.evaluate(()=>({
    styles:Array.from(document.querySelectorAll('style')).map(s=>s.textContent).join('\n'),
    pages:document.querySelector('.pagedjs_pages').outerHTML,
    n:document.querySelectorAll('.pagedjs_page').length
  }));
  await b.close();
  let css=d.styles.replace(/\[data-mode="bw"\]/g,''); // B&N incondicional (el artifact no fija data-mode)
  const screen=`\n/* presentacion de hojas separadas en el artifact */\nbody{background:#e7e5de}\n.pagedjs_pages{background:#e7e5de;padding:20px 0}\n.pagedjs_page{margin:0 auto 18px!important;background:#fff!important;box-shadow:0 8px 30px rgba(30,28,20,.20)!important}`;
  const out=`<style>${css}${screen}</style>\n<div class="manual-paged">${d.pages}</div>`;
  fs.writeFileSync(path.resolve(__dirname,'El Cuerpo Electrico - Manual M1 (Bloques 1 y 2).html'),out);
  console.log('paginas:',d.n,'| KB:',(out.length/1024).toFixed(0),'| tags prohibidos:',/<!doctype|<html|<head>|<body>/i.test(out)?'SI':'no');
})();
