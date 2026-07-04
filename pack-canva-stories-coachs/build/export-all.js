const puppeteer=require('puppeteer-core'); const path=require('path'), fs=require('fs');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage(); const errs=[];
  p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text());});
  await p.goto('file://'+path.join(__dirname,'..','exports','editor.html'),{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,800));
  if(errs.length){ console.log('LOAD ERRORS:',errs.join(' | ')); await b.close(); process.exit(1); }
  const n=await p.evaluate(()=>STORIES.length);
  const dir=path.join(__dirname,'..','exports'); let bad=[];
  for(let i=0;i<n;i++){
    const r=await p.evaluate(async(i)=>{ idx=i; paint();
      const blob=await toPNG(STORIES[i]); const u=new Uint8Array(await blob.arrayBuffer());
      let bin=''; for(let j=0;j<u.length;j+=8192) bin+=String.fromCharCode.apply(null,u.subarray(j,j+8192));
      return {id:STORIES[i].id, b64:btoa(bin), w:u.length}; }, i);
    const buf=Buffer.from(r.b64,'base64'); fs.writeFileSync(path.join(dir,r.id+'.png'),buf);
    const d=buf.slice(16,24); const dim=d.readUInt32BE(0)+'x'+d.readUInt32BE(4);
    if(dim!=='1080x1920'||buf.length<40000) bad.push(r.id+'('+dim+','+buf.length+')');
  }
  console.log('rendered '+n+' PNGs; runtime errors: '+(errs.length?errs.join(' | '):'none'));
  console.log(bad.length?('SUSPECT: '+bad.join(', ')):'all dims 1080x1920, sizes OK');
  await b.close();
})();
