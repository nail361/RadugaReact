// Set this to true for production
const doCache = true;

// Name our cache
const CACHE_NAME = 'pwa-cache-v1';

// Delete old caches that are not our current one!
this.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((keyList) => Promise.all(keyList.map((key) => {
        if (!cacheWhitelist.includes(key)) {
          console.log(`Deleting cache: ${key}`);
          return caches.delete(key);
        }
      }))),
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
this.addEventListener('install', (event) => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          fetch('asset-manifest.json')
            .then((response) => {
              return response.json();
            })
            .then((assets) => {
              const urlsToCache = [
                '/',
                'index.html',
                'manifest.json',
                'asset-manifest.json',
                'css/1.css',
                'service-worker.js',
                'js/0.main.js',
                'js/1.main.js',
                'assets/imgs/error.png',
                assets['main.js'],
                assets['main.css'],
              ];
              cache.addAll(urlsToCache);
              console.log('cached', assets);
            });
        }),
    );
  }
});

this.addEventListener('fetch', (event) => {
  if (doCache) {
    const matchRequest = event.request.clone();
    event.respondWith(
      caches.match(matchRequest).then((response1) => {
        if (response1) {
          return response1;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then((response2) => {
          // if (!response2 || response2.status !== 200 || response2.type !== 'basic') {
            return response2;
          // }
        });
      }).catch(() => {
        return caches.match('assets/imgs/error.png');
      }),
    );
  }
});
