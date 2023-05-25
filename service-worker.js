const CACHE_NAME = 'pwa+-v1.2';
const urlsToCache = [
  '/index.html',
  '/css/Login/login.css',
  '/css/bottomBar.css',
  '/css/main.css',
  '/css/topBar.css',

  '/img/favicon.png',
  '/img/iconDefautlt.jpg',
  '/img/Logo.webp',

  
  
  
  
  

  
  
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request because it's a stream and can only be consumed once
        var fetchRequest = event.request.clone();
        // Make a network request and add it to the cache if successful
        return fetch(fetchRequest)
          .then(function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone the response because it's a stream and can only be consumed once
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
          );
      })
  );
});

self.addEventListener('activate', function (event) {
  // Remove outdated caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('my-site-cache-') && cacheName !== CACHE_NAME;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});