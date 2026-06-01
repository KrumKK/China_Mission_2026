/* Misión China 2026 — Service Worker (red primero en la app) */
'use strict';

const CACHE_VERSION = 'v26';
const CACHE_NAME = 'mision-china-' + CACHE_VERSION;

/** Solo recursos estáticos ligeros; la app va siempre a red primero. */
const OFFLINE_ASSETS = [
  './icon.svg',
  './manifest.webmanifest',
  './lizarte-logo.png',
  './brochure-liz-china.html'
];

function isSameOrigin(url) {
  try {
    return new URL(url).origin === self.location.origin;
  } catch (_) {
    return false;
  }
}

function isAppResource(pathname) {
  return (
    pathname.endsWith('/') ||
    pathname.endsWith('/index.html') ||
    pathname.endsWith('/app.js') ||
    pathname.endsWith('/config.js') ||
    pathname.endsWith('/graph-sync.js') ||
    pathname.endsWith('/ficha-sharepoint.js') ||
    pathname.endsWith('/resumen-generator.js') ||
    pathname.endsWith('/styles.css') ||
    pathname.endsWith('/sw.js')
  );
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(OFFLINE_ASSETS).catch(() => undefined)
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'CLEAR_CACHES') return;
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!isSameOrigin(event.request.url)) return;

  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate' || isAppResource(url.pathname)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

function networkFirst(request) {
  return fetch(request)
    .then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    })
    .catch(() =>
      caches.match(request).then(cached =>
        cached || caches.match('./index.html')
      )
    );
}
