/* ИП Романов 26/27: страница из сети, без сети — из запаса. Сборка 20261010-2232 */
const CACHE='romanov-20261010-2232'; const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-180.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request; if(req.method!=='GET') return; let u; try{u=new URL(req.url);}catch(err){return;} if(u.origin!==self.location.origin) return;
  e.respondWith(fetch(req).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c)).catch(()=>{});} return r;}).catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));});
