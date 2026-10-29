/* Трактор 26/27: страница из сети, без сети — из запаса. Сборка 20261029-0825 */
const CACHE='traktor-20261029-0825'; const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./fonts/fonts.css", "./demo.json", "./fonts/Manrope-500-latin.woff2", "./fonts/MartianMono-500-cyrillic.woff2", "./fonts/MartianMono-500-latin.woff2", "./fonts/Manrope-600-latin.woff2", "./fonts/Manrope-800-latin.woff2", "./fonts/Manrope-500-cyrillic.woff2", "./fonts/Manrope-600-cyrillic.woff2", "./fonts/Manrope-800-cyrillic.woff2", "./fonts/Manrope-700-latin.woff2", "./fonts/Manrope-700-cyrillic.woff2", "./fonts/Manrope-rub.woff2", "./fonts/MartianMono-rub.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request; if(req.method!=='GET') return; let u; try{u=new URL(req.url);}catch(err){return;} if(u.origin!==self.location.origin) return;
  /* сеть ждём не дольше 3 с: дальше — из запаса, сеть дописывает запас в фоне (28.10.2026) */
  const fromCache=()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'));
  e.respondWith(new Promise(res=>{ let done=false; const fin=r=>{ if(!done&&r){ done=true; res(r); } };
    const t=setTimeout(()=>fromCache().then(fin),3000);
    fetch(req).then(r=>{ if(r&&r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c)).catch(()=>{});} clearTimeout(t); fin(r); })
      .catch(()=>{ clearTimeout(t); fromCache().then(r=>fin(r||Response.error())); }); }));});
