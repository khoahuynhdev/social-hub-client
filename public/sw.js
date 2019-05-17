/* eslint-disable no-restricted-globals */
const staticCacheName = 'our-first-cache';
const PRECACHE_URLS = [
  './img/Background.jpg',
  './img/huflit-event.jpg',
  './img/logo.png',
  './img/school.jpg',
  './favicon.ico'];
self.addEventListener('install', event => {
  console.log('attemping to install service worker and cache statis asset');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      cache.addAll(PRECACHE_URLS);
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request)          
      })
      .catch(err => {        
      })
  )
})