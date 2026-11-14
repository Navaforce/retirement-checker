import {Window} from 'happy-dom';import {webcrypto} from 'node:crypto';import fs from 'node:fs';
const html=fs.readFileSync('/Users/dnava/retirement-checker/index.html','utf8');
const w=new Window({url:'https://x.test/'});const d=w.document;
const src=html.match(/<script>([\s\S]*)<\/script>/)[1];d.body.innerHTML='<div id="app"></div>';
globalThis.window=w;globalThis.document=d;globalThis.localStorage=w.localStorage;globalThis.btoa=w.btoa.bind(w);globalThis.atob=w.atob.bind(w);globalThis.confirm=()=>true;
(0,eval)(src);
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),$=id=>d.getElementById(id);
$('pw').value='original passphrase1';$('pw2').value='original passphrase1';$('go').click();await sleep(2500);
d.querySelector('[data-t=log]').click();$('m').value='2026-11';$('a_etrade').value='160000';$('a_fidelity').value='302000';$('a_blackdiamond').value='812000';$('save').click();await sleep(100);
d.querySelector('[data-t=set]').click();$('np').value='brand new passphrase2';$('np2').value='brand new passphrase2';$('chpw').click();await sleep(1500);
console.log('msg:',$('serr').textContent);
$('lock').click();
$('pw').value='original passphrase1';$('go').click();await sleep(2500);console.log('old pass:',d.querySelector('.banner').textContent);
$('pw').value='brand new passphrase2';$('go').click();await sleep(2500);console.log('new pass total:',[...d.querySelectorAll('.row')].find(r=>r.textContent.startsWith('Current total'))?.textContent);
process.exit(0)
