const CACHE_NAME = "calmly-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",

    "./login.html",
    "./login.js",

    "./signup.html",
    "./signup.js",

    "./reset.html",
    "./reset.js",

    "./dashboard.html",
    "./dashboard.js",

    "./breathing.html",
    "./breathing.js",

    "./journal.html",
    "./journal.js",

    "./supabase.js",
    "./manifest.json"
];


// ================================
// INSTALL
// ================================

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );

    self.skipWaiting();
});


// ================================
// ACTIVATE
// ================================

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );

    self.clients.claim();
});


// ================================
// FETCH
// ================================

self.addEventListener("fetch", (event) => {

    // Only handle GET requests
    if (event.request.method !== "GET") {
        return;
    }

    // Only handle Calmly's own files
    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
    );
});