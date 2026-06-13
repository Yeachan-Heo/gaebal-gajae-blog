import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const reflectionsDir='/home/bellman/clawd/memory/reflections';
function clean(md){
  return md.replace(/\r\n/g,'\n').split('\n').filter(line=>!/token|password|secret|credential|api[_ -]?key|비밀번호|토큰|시크릿/i.test(line)).join('\n').trim();
}
function blocks(md){return md.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean)}
function firstSentence(md){
 const lines=md.split('\n').map(l=>l.trim()).filter(l=>l&&!l.startsWith('#')&&!l.startsWith('---'));
 const bullet=lines.find(l=>l.startsWith('- ')); return (bullet||lines[0]||'').replace(/^-\s*/,'').slice(0,240);
}
function dateTitle(md,date){
 const lines=md.split('\n').map(l=>l.trim()).filter(Boolean);
 const h=lines.find(l=>/^#/.test(l));
 return h?h.replace(/^#+\s*/,''):`Daily Reflection — ${date} KST`;
}
function slug(date,md){
 const h=dateTitle(md,date).replace(/daily reflection|reflection|kst|오늘|회고/gi,'');
 let s=h.toLowerCase().normalize('NFKD').replace(/[^a-z0-9가-힣一-龯ぁ-んァ-ン]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
 if(!s) s='daily-reflection';
 return `${date}-${s}`;
}
function machineWrap(lang, arr){
 const prefix={
  en:'[Full Korean original retained until human/LLM translation pass] ',
  zh:'[保留完整韩文原文，等待翻译校对] ',
  ja:'[翻訳校正まで韓国語原文を保持] '
 }[lang];
 return arr.map(x=>prefix+x);
}
const files=fs.readdirSync(reflectionsDir).filter(f=>/^2026-(05|06)-\d\d\.md$/.test(f)).sort();
const posts=[];
for(const f of files){
 const date=f.slice(0,10); const ko=clean(fs.readFileSync(path.join(reflectionsDir,f),'utf8'));
 const koBlocks=blocks(ko); const titleKo=dateTitle(ko,date); const summaryKo=firstSentence(ko)||titleKo;
 posts.push({
  slug:slug(date,ko), date, type:'retrospective',
  title:{ko:titleKo,en:titleKo,zh:titleKo,ja:titleKo},
  summary:{ko:summaryKo,en:summaryKo,zh:summaryKo,ja:summaryKo},
  body:{ko:koBlocks,en:machineWrap('en',koBlocks),zh:machineWrap('zh',koBlocks),ja:machineWrap('ja',koBlocks)},
  source:{path:`memory/reflections/${f}`, publicSafe:'filtered-token-secret-lines'}
 });
}
const old=JSON.parse(fs.readFileSync('data/posts.json','utf8'));
const launch=old.find(p=>p.slug==='2026-06-12-launch');
if(launch) posts.push(launch);
posts.sort((a,b)=>a.date.localeCompare(b.date)||a.slug.localeCompare(b.slug));
fs.writeFileSync('data/posts.json',JSON.stringify(posts,null,2)+'\n');
console.error(`backfilled ${files.length} reflection files, total posts ${posts.length}`);
