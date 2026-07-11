const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
(async()=>{
  const html=fs.readFileSync(path.resolve(__dirname,'El Cuerpo Electrico - Manual M1 (Bloques 1 y 2).html'),'utf8');
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:900,height:1200,deviceScaleFactor:1.4});
  await p.setContent('<!doctype html><html><head><meta charset=utf-8></head><body>'+html+'</body></html>',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,600));
  // encontrar la hoja con el título del Bloque 3
  const idx=await p.evaluate(()=>{const ps=[...document.querySelectorAll('.pagedjs_page')];return ps.findIndex(pg=>/El agente y la regulaci/.test(pg.textContent))});
  const pages=await p.$$('.pagedjs_page');
  if(pages[idx])await pages[idx].screenshot({path:path.resolve(__dirname,'check_ext_png','b3cover.png')});
  console.log('portada B3 en hoja index',idx,'(pag',idx+1,')');
  await b.close();
})();
