const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
(async()=>{
  const html=fs.readFileSync(path.resolve(__dirname,'El Cuerpo Electrico - Manual M1 (Bloques 1 y 2).html'),'utf8');
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();await p.setViewport({width:900,height:1200,deviceScaleFactor:1.4});
  await p.setContent('<!doctype html><html><head><meta charset=utf-8></head><body>'+html+'</body></html>',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,700));
  const idx=await p.evaluate(()=>[...document.querySelectorAll('.pagedjs_page')].findIndex(pg=>/El rastreo y el nodo de lesi/.test(pg.textContent)));
  const pages=await p.$$('.pagedjs_page');
  if(pages[idx])await pages[idx].screenshot({path:path.resolve(__dirname,'check_ext_png','b4cover.png')});
  if(pages[idx+1])await pages[idx+1].screenshot({path:path.resolve(__dirname,'check_ext_png','b4content.png')});
  console.log('total hojas:',pages.length,'| portada B4 en pag',idx+1);
  await b.close();
})();
