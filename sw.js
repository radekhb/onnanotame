
const VERSION = "ec1cd5"; // version - need to change on every modificaiton
const BASE_PATH = ".";
const CACHE_NAME = "onnanotame-ec1cd5";

// The static resources that the app needs to function
const APP_STATIC_RESOURCES = ["./","./index.html","./manifest.json","./tyracorn-d3336e.js","./style-7fa826.css","./icon-48.png","./icon-128.png","./icon-256.png","./icon-512.png","./screenshot-01-856x1789.jpg","./screenshot-02-1920x1080.jpg","./assets-c69530/content.json","./assets-c69530/default.tap","./assets-c69530/packages/characters/content.json","./assets-c69530/packages/characters/fighters.tap","./assets-c69530/packages/characters/girls.tap","./assets-c69530/packages/characters/human-base.tap","./assets-c69530/packages/content.json","./assets-c69530/packages/elements.tap","./assets-c69530/packages/loading.tap","./assets-c69530/packages/music.tap","./assets-c69530/packages/sfx.tap","./assets-c69530/packages/ui/background.tap","./assets-c69530/packages/ui/buttons.tap","./assets-c69530/packages/ui/content.json","./assets-c69530/packages/ui/controls.tap","./assets-c69530/packages/ui/fonts.tap","./assets-c69530/packages/ui/sprites.tap","./assets-c69530/packages/worlds/content.json","./assets-c69530/packages/worlds/medieval-village.tap","./assets-c69530/packages/worlds/nature.tap","./assets-c69530/packages/worlds/sci-fi.tap","./assets-c69530/packages/worlds/skybox.tap","./assets-c69530/prefabs.tap","./assets-c69530/scenes.tap"];

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
