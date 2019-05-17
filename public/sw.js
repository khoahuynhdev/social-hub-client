/* eslint-disable no-restricted-globals */
const staticCacheName = 'our-first-cache';
const fileToCache = ['index.html']
self.addEventListener('install', event => {
  console.log('attemping to install service worker and cache statis asset');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      cache.addAll(fileToCache);
    })
  )
})