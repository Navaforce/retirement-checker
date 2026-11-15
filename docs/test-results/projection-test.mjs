import {Window} from 'happy-dom';import fs from 'node:fs';
const html=fs.readFileSync('/Users/dnava/retirement-checker/index.html','utf8');
const w=new Window({url:'https://x.test/'});const d=w.document;
const src=html.match(/<script>([\s\S]*)<\/script>/)[1];d.body.innerHTML='<div id="app"></div>';
globalThis.window=w;globalThis.document=d;globalThis.localStorage=w.localStorage;globalThis.btoa=w.btoa.bind(w);globalThis.atob=w.atob.bind(w);globalThis.confirm=()=>true;
(0,eval)(src);
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),$=id=>d.getElementById(id);
$('pw').value='original passphrase1';$('pw2').value='original passphrase1';$('go').click();await sleep(2500);
const add=async(m,e,f,b)=>{d.querySelector('[data-t=log]').click();$('m').value=m;$('a_etrade').value=e;$('a_fidelity').value=f;$('a_blackdiamond').value=b;$('save').click();await sleep(60)};
const rows=()=>[...d.querySelectorAll('.row')].map(r=>r.textContent.replace(/\s+/g,' ')).join('\n');
await add('2026-11',160000,302000,812000);d.querySelector('[data-t=home]').click();
console.log(d.querySelector('.big').textContent);console.log(rows());console.log('svg:',!!d.querySelector('svg'));
let b=[160000,302000,812000];for(let i=1;i<=13;i++){const m=new Date(2026,10+i,1);const ym=m.getFullYear()+'-'+String(m.getMonth()+1).padStart(2,'0');b=b.map(v=>v*1.006);await add(ym,b[0]+(i%4==0?20000:0),b[1],b[2])}
d.querySelector('[data-t=home]').click();console.log('--13 months');console.log(d.querySelector('.big').textContent);console.log(rows());
d.querySelector('[data-t=set]').click();$('ssave').click();await sleep(100);console.log('saved ->',d.querySelector('.big')?.textContent);
process.exit(0)
