const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
(async()=>{
  const html=fs.readFileSync(path.resolve(__dirname,'El Cuerpo Electrico - Manual M1 (Bloques 1 y 2).html'),'utf8');
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:900,height:1200,deviceScaleFactor:2});
  await p.setContent('<!doctype html><html><head><meta charset=utf-8></head><body>'+html+'</body></html>',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,600));
  const box=await p.evaluate(()=>{const pg=[...document.querySelectorAll('.pagedjs_page')][1];const r=pg.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});
  // recorte superior de la 2a hoja
  await p.screenshot({path:path.resolve(__dirname,'check_ext_png','crop_top.png'),clip:{x:box.x,y:box.y,width:box.w,height:230}});
  // recorte inferior
  await p.screenshot({path:path.resolve(__dirname,'check_ext_png','crop_bot.png'),clip:{x:box.x,y:box.y+box.h-210,width:box.w,height:210}});
  await b.close();console.log('ok');
})();
