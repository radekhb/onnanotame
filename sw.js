
const VERSION = "ab81d4"; // version - need to change on every modificaiton
const BASE_PATH = "/onnanotame";
const CACHE_NAME = "onnanotame-ab81d4";

// The static resources that the app needs to function
const APP_STATIC_RESOURCES = ["/onnanotame/","/onnanotame/index.html","/onnanotame/manifest.json","/onnanotame/tyracorn-5d8858.js","/onnanotame/style-7fa826.css","/onnanotame/icon-48.png","/onnanotame/icon-128.png","/onnanotame/icon-256.png","/onnanotame/icon-512.png","/onnanotame/screenshot-01-856x1789.jpg","/onnanotame/screenshot-02-1920x1080.jpg","/onnanotame/assets-53587a/content.json","/onnanotame/assets-53587a/default.tap","/onnanotame/assets-53587a/packages/characters/content.json","/onnanotame/assets-53587a/packages/characters/fighters.tap","/onnanotame/assets-53587a/packages/characters/girls.tap","/onnanotame/assets-53587a/packages/characters/human-base.tap","/onnanotame/assets-53587a/packages/content.json","/onnanotame/assets-53587a/packages/elements.tap","/onnanotame/assets-53587a/packages/loading.tap","/onnanotame/assets-53587a/packages/music.tap","/onnanotame/assets-53587a/packages/ui/background.tap","/onnanotame/assets-53587a/packages/ui/buttons.tap","/onnanotame/assets-53587a/packages/ui/content.json","/onnanotame/assets-53587a/packages/ui/controls.tap","/onnanotame/assets-53587a/packages/ui/fonts.tap","/onnanotame/assets-53587a/packages/ui/sprites.tap","/onnanotame/assets-53587a/packages/worlds/content.json","/onnanotame/assets-53587a/packages/worlds/medieval-village.tap","/onnanotame/assets-53587a/packages/worlds/nature.tap","/onnanotame/assets-53587a/packages/worlds/sci-fi.tap","/onnanotame/assets-53587a/packages/worlds/skybox.tap","/onnanotame/assets-53587a/prefabs.tap","/onnanotame/assets-53587a/scenes.tap"];

self.addEventListener("install", event => {
    // Kick out old service worker
    self.skipWaiting();
    event.waitUntil(
            caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(APP_STATIC_RESOURCES);
    })
            );
});

self.addEventListener("activate", event => {
    // Delete any cache that is not current
    event.waitUntil(
            caches.keys().then(keys => {
        Promise.all(
                keys.map(key => {
                    if (![CACHE_NAME].includes(key)) {
                        return caches.delete(key);
                    }
                })
                )
    })
            );
});

// Use offline-first, cache-first strategy
self.addEventListener("fetch", event => {
    event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
    })
            );
});
