// Exporta cada hoja (.pagedjs_page) del manual Letter a PNG.
const puppeteer=require('/Users/miguelojedarios/cursos-timeline/03_Programas/Cursos_Selectos/Taller_Actos_que_Mueven/02_Taller_Presencial/Materiales_Impresion/node_modules/puppeteer');
const path=require('path'),fs=require('fs');
const OUT=path.resolve(__dirname,'export_letter_color_png');
(async()=>{
  const html=fs.readFileSync(path.resolve(__dirname,'Manual_M1_Color_B1-4_artifact.html'),'utf8');
  fs.mkdirSync(OUT,{recursive:true});
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox','--disable-setuid-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:900,height:1200,deviceScaleFactor:2});
  await p.setContent('<!doctype html><html><head><meta charset=utf-8></head><body>'+html+'</body></html>',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,800));
  const pages=await p.$$('.pagedjs_page');
  console.log('hojas:',pages.length);
  for(let i=0;i<pages.length;i++){
    const n=String(i+1).padStart(2,'0');
    await p.evaluate(e=>e.scrollIntoView(),pages[i]);
    await new Promise(r=>setTimeout(r,60));
    await pages[i].screenshot({path:path.join(OUT,`hoja-${n}.png`)});
  }
  await b.close();
  console.log('✅ exportadas a',OUT);
})();
