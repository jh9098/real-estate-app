const CACHE_NAME = 'real-estate-cache-v1'; // 캐시 이름
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js', // 필요한 JS 파일
  'icon-72x72.png', // 아이콘 파일
  'icon-96x96.png',
  'icon-144x144.png',
  'icon-192x192.png',
  'icon-512x512.png'
]; // 캐싱할 파일 목록

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache); // 파일들을 캐시에 추가
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request) // 요청에 맞는 캐시된 파일이 있는지 확인
      .then((response) => {
        if (response) {
          return response; // 캐시된 파일 반환
        }
        return fetch(event.request); // 캐시된 파일이 없으면 네트워크 요청
      })
  );
});