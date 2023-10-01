var CACHE_NAME = 'Geomixer';
// var OFFLINE_TILE = './offline.png';
var OFFLINE_TILE = './empty.jpg';

var offlineVersion = false;

console.log("SW startup");

self.addEventListener('install', function(event) {
  self.caches.delete(CACHE_NAME);
  
  // Store the «offline tile» on startup.
  return fetchAndCache(OFFLINE_TILE)
    .then(() => console.log('SW installed'));
});

self.addEventListener('activate', event => {
	console.log('SW activated!');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
  var data = event.data;
  if ('offlineVersion' in data) {
	offlineVersion = data.offlineVersion;
  }
  console.log("SW message", data);
});


//
// Intercept download of map tiles: read from cache or download.
//
self.addEventListener('fetch', event => {
  var req = event.request;
  // const flag = /\bsw=1\b/.test(req.url) || /\.ddm/.test(req.url);
  // if (flag) {
  if (/\bsw=1\b/.test(req.url)) {
    var cached = self.caches.match(req)
      .then(r => {
        if (r) return r;
        // console.log('Cache missed', req);
        return offlineVersion ? null : fetchAndCache(req);
      })
      .catch(fetch(OFFLINE_TILE));	// Fallback to offline tile if never cached.
    event.respondWith(cached);
  }
});

//
// Helper to fetch and store in cache.
//
function fetchAndCache(req) {
  return fetch(req)
    .then(resp => {
      return self.caches.open(CACHE_NAME)
        .then(cache => {
          cache.put(req, resp.clone());
          return resp;
        });
    })
	.catch(() => fetch(OFFLINE_TILE));

}

//	http://prgssr.ru/development/sozdaem-service-worker.html
//	http://almet.github.io/kinto-geophotos/
