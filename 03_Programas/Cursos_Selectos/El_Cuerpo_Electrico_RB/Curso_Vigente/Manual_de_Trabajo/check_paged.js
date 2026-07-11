const puppeteer = require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'), fs=require('fs');
(async()=>{
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:1000,height:1200,deviceScaleFactor:1.5});
  await p.goto('file://'+path.resolve(__dirname,'Manual_Letter_BN_Modulo1_Bloques_1y2.html'),{waitUntil:'load',timeout:120000});
  // esperar a que paged.js termine
  await p.waitForFunction(()=>document.querySelectorAll('.pagedjs_page').length>5,{timeout:90000});
  await new Promise(r=>setTimeout(r,2500));
  const n=await p.evaluate(()=>document.querySelectorAll('.pagedjs_page').length);
  console.log('hojas paginadas:',n);
  fs.mkdirSync(path.resolve(__dirname,'check_paged_png'),{recursive:true});
  for(const i of [0,1,2]){
    const el=(await p.$$('.pagedjs_page'))[i];
    if(el){await el.screenshot({path:path.resolve(__dirname,'check_paged_png','p'+(i+1)+'.png')});console.log('  ✓ p'+(i+1));}
  }
  await b.close();
})();
