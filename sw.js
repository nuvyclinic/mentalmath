// Mental Math — service worker: guarda os arquivos do site para o jogo abrir sem internet.
// Estratégia "rede primeiro": com internet sempre pega a versão nova (e atualiza a cópia);
// sem internet usa a cópia guardada. Chamadas ao Supabase (ranking, login) nunca são guardadas.
const CACHE='mm-v2';
const FILES=['./','index.html','app.html','img/shot-home.jpg','img/shot-game.jpg','img/shot-end.jpg','jogo.html','ranking.html','game.css','site.css','pc.css','i18n.js','game.js','online.js','mm.js','config.js','vendor/supabase.js',
  'bg.jpg','bg-pc.jpg','bg-game.jpg','favicon.ico','favicon-32.png','apple-touch-icon.png','icon.svg','manifest.webmanifest'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(
    fetch(r).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}
      return res;
    }).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('jogo.html'):Response.error())))
  );
});
