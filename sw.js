var CACHE_NAME = 'v5';
var urlsToCache = [
  'index.html',
  'dist/graphics/map-1920x1080-v42.svg',
  'dist/graphics/map-1366x768-v42.svg',
  'dist/graphics/map-768x1024-v42.svg',
  'dist/assets/app.css',
  'dist/assets/app-e076c6c908.js',
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
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['waterpolis-cache-v6', 'waterpolis-cache-v5', 'waterpolis-cache-v4', 'waterpolis-cache-v3', 'waterpolis-cache-v2', 'v1', 'v2', 'v3', 'v4'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// //end install
