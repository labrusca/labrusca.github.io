var cacheName = 'labrusca-net-v2';

var urlsToCache = [
    '/',
    'css/',
    'img/',
    'js/',
    'blog/index.html',
    'contact.html',
    'about.html',
    'views/',
    'fonts/'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch the contents and reply with cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});