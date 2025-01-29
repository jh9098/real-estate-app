const CACHE_NAME = 'real-estate-cache-v2'; // 새로운 캐시 이름 (버전 변경)
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'icon-72x72.png',
  'icon-96x96.png',
  'icon-144x144.png',
  'icon-192x192.png',
  'icon-512x512.png'
];

// 설치 이벤트 (캐싱 초기화)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 이벤트 (이전 버전의 캐시 삭제)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Old cache removed:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 네트워크 우선 전략 추가
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request) // 네트워크에서 먼저 시도
      .then((response) => {
        // 성공적으로 가져오면 캐시에 저장
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 가져오기
        return caches.match(event.request);
      })
  );
});
