var CACHE_NAME = 'waterpolis-cache-v2';
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
            var CACHE_NAME = 'waterpolis-cache-v2';
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
  var CACHE_NAME = 'waterpolis-cache-v2';
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(CACHE_NAME);
        })
      );
    })
  );
});

//end install
