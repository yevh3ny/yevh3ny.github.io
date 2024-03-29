// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/assets/css/styles.css',
          '/assests/js/main.js',
          '/assets/img/hero-bg-w.jpg',
          '/assets/img/profile-img.jpg',
          '/assets/favicon/android-chrome-192x192.png',
          '/assets/favicon/android-chrome-512x512.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  