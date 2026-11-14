import {Window} from 'happy-dom';import {webcrypto} from 'node:crypto';import fs from 'node:fs';
const html=fs.readFileSync('/Users/dnava/retirement-checker/index.html','utf8');
const w=new Window({url:'https://x.test/',settings:{disableErrorCapturing:false}});const d=w.document;
const src=html.match(/<script>([\s\S]*)<\/script>/)[1];d.body.innerHTML='<div id="app"></div>';
globalThis.window=w;globalThis.document=d;globalThis.localStorage=w.localStorage;globalThis.btoa=w.btoa.bind(w);globalThis.atob=w.atob.bind(w);globalThis.confirm=()=>true;
(0,eval)(src);
globalThis.TextEncoder=TextEncoder;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
d.getElementById('pw').value='correct horse battery';d.getElementById('pw2').value='correct horse battery';
d.getElementById('go').click();await sleep(2500);
console.log('home?',d.querySelector('.big')?.textContent||d.body.textContent.slice(0,80));
d.querySelector('[data-t=log]').click();
const add=async(m,i,s)=>{d.getElementById('m').value=m;d.getElementById('inv').value=i;d.getElementById('sav').value=s;d.getElementById('save').click();await sleep(100);d.querySelector('[data-t=log]').click();};
await add('2026-09','900000','100000');await add('2026-10','930000','105000');await add('2026-11','960000','110000');
d.querySelector('[data-t=home]').click();
console.log(d.querySelector('.big').textContent);
console.log([...d.querySelectorAll('.row')].map(r=>r.textContent).join('\n'));
const stored=w.localStorage.getItem('rc_vault_v1');console.log('plaintext leak:',/960000|1070000/.test(stored));
fs.writeFileSync('/tmp/rc_vault.json',stored);
// relock and wrong pass
w.document.querySelector('[data-t=set]').click();d.getElementById('lock').click();
d.getElementById('pw').value='wrong wrong wrong';d.getElementById('go').click();await sleep(2500);
console.log('after wrong:',d.querySelector('.banner').textContent,'|',d.getElementById('err').textContent);
d.getElementById('pw').value='correct horse battery';d.getElementById('go').click();await sleep(2500);
console.log('relock ok:',d.querySelector('.big')?.textContent);
process.exit(0)
