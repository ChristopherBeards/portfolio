const cacheName = 'cb_cached';

const cacheAssets = [
  'index.html',
  'about.html',
  'contact.html',
  'work.html',
  '/portfolio/dist/css/main.css',
  '/portfolio/dist/img/projects/pmhub.jpg',
  '/portfolio/dist/img/projects/react-contactmgr.jpg',
  '/portfolio/dist/img/projects/react-fb-clientpanel.jpg',
  '/portfolio/dist/img/projects/maincourse.jpg',
  '/portfolio/dist/img/background3.jpg',
  '/portfolio/dist/img/portrait.jpg',
  '/portfolio/dist/img/portraitsmall.jpg',
  '/portfolio/dist/js/main.js',
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
