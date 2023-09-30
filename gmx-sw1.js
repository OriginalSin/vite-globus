var CACHE_NAME = 'Geomixer';
var OFFLINE_TILE = './offline.png';
var offlineVersion = false;

console.log("SW startup");

self.addEventListener('install', function(event) {
	
  caches.delete(CACHE_NAME);
  
  // Store the «offline tile» on startup.
  return fetchAndCache(OFFLINE_TILE)
    .then(function () {
      console.log("SW installed");
    });
});

self.addEventListener('activate', function(event) {
	console.log("SW activated!");
    event.waitUntil(clients.claim());
});

self.addEventListener('message', function(event) {
  var data = event.data;
  if ('offlineVersion' in data) {
	offlineVersion = data.offlineVersion;
  }
  console.log("SW message", data);
});


//
// Intercept download of map tiles: read from cache or download.
//
self.addEventListener('fetch', function(event) {
  var request = event.request;
  // const flag = /\bsw=1\b/.test(request.url) || /\.ddm/.test(request.url);
  // if (flag) {
  if (/\bsw=1\b/.test(request.url)) {
    var cached = caches.match(request)
      .then(function (r) {
        if (r) {
          // console.log('Cache hit', r);
          return r;
        }
        // console.log('Cache missed', request);
        // return fetchAndCache(request);
        return offlineVersion ? null : fetchAndCache(request);
      })
      // Fallback to offline tile if never cached.
      .catch(function(e) {
        console.log('Fetch failed', e);
        return fetch(OFFLINE_TILE);
      });
    event.respondWith(cached);
  }
});

//
// Helper to fetch and store in cache.
//
function fetchAndCache(request) {
  return fetch(request)
    .then(function (response) {
      return caches.open(CACHE_NAME)
        .then(function(cache) {
          // console.log('Store in cache', response);
          cache.put(request, response.clone());
          return response;
        });
    });
}

//	http://prgssr.ru/development/sozdaem-service-worker.html
//	http://almet.github.io/kinto-geophotos/
