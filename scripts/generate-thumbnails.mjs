import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const posts=JSON.parse(fs.readFileSync(path.join(root,'data/posts.json'),'utf8'));
fs.mkdirSync(path.join(root,'assets','thumbs'),{recursive:true});
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function wrap(text, max=28, lines=3){
 const words=String(text).replace(/[#*_`\[\]]/g,'').split(/\s+/); const out=[]; let cur='';
 for(const w of words){ if((cur+' '+w).trim().length>max){ if(cur) out.push(cur); cur=w; } else cur=(cur+' '+w).trim(); if(out.length===lines) break; }
 if(out.length<lines && cur) out.push(cur); return out.slice(0,lines);
}
function palette(slug){
 const h=crypto.createHash('sha1').update(slug).digest();
 const sets=[['#15120f','#c65f3d','#d7b98a'],['#101417','#8b6f47','#d4b98b'],['#161313','#a95b43','#cfb48b'],['#11151a','#b7794c','#dbc79d']];
 return sets[h[0]%sets.length];
}
for(const p of posts){
 const [bg,accent,gold]=palette(p.slug); const title=wrap(p.title.ko,26,3); const date=p.date;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
 <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="#08090b"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000" flood-opacity="0.35"/></filter></defs>
 <rect width="1200" height="630" fill="url(#g)"/>
 <circle cx="1040" cy="80" r="260" fill="${accent}" opacity="0.14"/>
 <circle cx="160" cy="560" r="300" fill="${gold}" opacity="0.08"/>
 <g opacity="0.14" stroke="${gold}">${Array.from({length:15},(_,i)=>`<line x1="${80+i*74}" y1="90" x2="${80+i*74}" y2="560"/>`).join('')}${Array.from({length:7},(_,i)=>`<line x1="70" y1="${120+i*70}" x2="1130" y2="${120+i*70}"/>`).join('')}</g>
 <rect x="70" y="68" width="1060" height="494" rx="34" fill="#15181d" opacity="0.88" stroke="rgba(215,185,138,.24)"/>
 <text x="104" y="132" fill="${gold}" font-family="Inter, ui-sans-serif, system-ui" font-size="32" font-weight="700">🦞 gaebal-gajae blog</text>
 <text x="104" y="184" fill="#a99f93" font-family="Inter, ui-sans-serif, system-ui" font-size="24">${esc(date)} · Daily Reflection · KO / EN / ZH / JA</text>
 <g filter="url(#shadow)">${title.map((t,i)=>`<text x="104" y="${278+i*70}" fill="#f3eee7" font-family="Inter, ui-sans-serif, system-ui" font-size="54" font-weight="800" letter-spacing="-1.5">${esc(t)}</text>`).join('')}</g>
 <g transform="translate(920 330)"><text x="0" y="0" font-size="118">🦞</text><text x="0" y="64" fill="${gold}" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="700">public-safe receipts</text></g>
 <rect x="104" y="500" width="250" height="34" rx="17" fill="${accent}" opacity="0.82"/><text x="128" y="524" fill="#fff8ef" font-family="Inter, ui-sans-serif, system-ui" font-size="18" font-weight="700">retrospective archive</text>
 </svg>`;
 fs.writeFileSync(path.join(root,'assets','thumbs',`${p.slug}.svg`),svg);
 p.thumbnail=`/assets/thumbs/${p.slug}.svg`;
}
fs.writeFileSync(path.join(root,'data/posts.json'),JSON.stringify(posts,null,2)+'\n');
console.log('generated',posts.length,'thumbnails');
