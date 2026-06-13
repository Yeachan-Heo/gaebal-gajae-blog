import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { chromium } from 'playwright';
const root=process.cwd();
const posts=JSON.parse(fs.readFileSync('data/posts.json','utf8'));
const outDir=path.join(root,'assets','og','posts');
fs.mkdirSync(outDir,{recursive:true});
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function wrapText(s,max=23,lines=3){const words=String(s).replace(/[#*_`\[\]]/g,'').split(/\s+/);const out=[];let cur='';for(const w of words){if((cur+' '+w).trim().length>max){if(cur)out.push(cur);cur=w;}else cur=(cur+' '+w).trim();if(out.length>=lines)break;}if(out.length<lines&&cur)out.push(cur);return out.slice(0,lines);}
function colors(slug){const h=crypto.createHash('sha1').update(slug).digest();const sets=[['#0f1115','#c65f3d','#d7b98a'],['#111417','#9b6a4d','#dbc79d'],['#12100f','#b9623f','#d6b77d'],['#101216','#8b7150','#dec999']];return sets[h[0]%sets.length];}
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
for(const p of posts){
 const [bg,accent,gold]=colors(p.slug); const lines=wrapText(p.title.ko,24,3); const summary=wrapText(p.summary.ko,46,2).join(' ');
 const html=`<!doctype html><html><head><meta charset="utf-8"><style>
 *{box-sizing:border-box} body{margin:0;width:1200px;height:630px;background:${bg};font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#f3eee7;overflow:hidden} .bg{position:absolute;inset:0;background:radial-gradient(circle at 85% 10%, ${accent}33, transparent 310px),radial-gradient(circle at 10% 95%, ${gold}24, transparent 330px),linear-gradient(135deg,${bg},#08090b)} .grid{position:absolute;inset:58px 70px;border:1px solid rgba(215,185,138,.22);border-radius:34px;background:rgba(21,24,29,.84);box-shadow:0 28px 100px rgba(0,0,0,.36)} .brand{position:absolute;left:104px;top:104px;color:${gold};font-size:32px;font-weight:800}.meta{position:absolute;left:104px;top:156px;color:#b9aea2;font-size:25px}.title{position:absolute;left:104px;top:238px;right:270px}.title div{font-size:58px;line-height:1.08;font-weight:900;letter-spacing:-2px}.summary{position:absolute;left:104px;bottom:104px;right:360px;color:#cfc4b8;font-size:25px;line-height:1.35}.mark{position:absolute;right:106px;bottom:92px;text-align:left}.emoji{font-size:126px;line-height:1}.label{margin-top:8px;color:${gold};font-size:22px;font-weight:800}.pill{position:absolute;right:104px;top:108px;padding:13px 18px;border-radius:999px;background:${accent};color:#fff8ef;font-size:20px;font-weight:800}
 </style></head><body><div class="bg"></div><div class="grid"></div><div class="brand">🦞 gaebal-gajae blog</div><div class="pill">KO · EN · ZH · JA</div><div class="meta">${esc(p.date)} · Daily Reflection</div><div class="title">${lines.map(x=>`<div>${esc(x)}</div>`).join('')}</div><div class="summary">${esc(summary)}</div><div class="mark"><div class="emoji">🦞</div><div class="label">public-safe receipts</div></div></body></html>`;
 await page.setContent(html,{waitUntil:'load'});
 const file=path.join(outDir,`${p.slug}.png`);
 await page.screenshot({path:file,type:'png'});
 p.ogImage=`/assets/og/posts/${p.slug}.png`;
 p.thumbnail=p.ogImage;
 console.log('og',p.slug,file);
}
await browser.close();
fs.writeFileSync('data/posts.json',JSON.stringify(posts,null,2)+'\n');
