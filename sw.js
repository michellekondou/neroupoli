var CACHE_NAME = 'waterpolis-cache-v3';
var urlsToCache = [
  '/index.html',
  'src/graphics/map-1920x1080-v42.svg',
  'src/graphics/map-1366x768-v42.svg',
  'src/graphics/map-768x1024-v42.svg',
  'dist/proxy/data.json',
  'dist/assets/app.css',
  'dist/assets/app.js',
  'dist/fonts/cfastystd-bold-webfont.woff2',
  'dist/fonts/cfastystd-book-webfont.woff2',
  'dist/svg/sprite.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(['waterpolis-cache-v2', 'waterpolis-cache-v1']);
        })
      );
    })
  );
});

// //end install
