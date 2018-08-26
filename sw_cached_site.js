const cacheName = 'cb_cached';

const cacheAssets = [
  '/dist/index.html',
  '/dist/about.html',
  '/dist/contact.html',
  '/dist/work.html',
  '/dist/css/main.css',
  '/dist/img/projects/pmhub.jpg',
  '/dist/img/projects/react-contactmgr.jpg',
  '/dist/img/projects/react-fb-clientpanel.jpg',
  '/dist/img/background3.jpg',
  '/dist/img/portrait.jpg',
  '/dist/img/portraitsmall.jpg',
  '/dist/js/main.js',
  'https://png.icons8.com/windows/50/000000/guru.png',
  'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
];

// * Call Install Event
self.addEventListener('install', e => {
  // * Service worker is installed
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        // * Caching files
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting()),
  );
});

// * Call Activate Event
self.addEventListener('activate', e => {
  // * Service worker is activated
  // * Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            // * Clearing old cache
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
});

// * Call Fetch Event
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
