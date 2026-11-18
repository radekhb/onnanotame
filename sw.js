
const VERSION = "5e3c6c"; // version - need to change on every modificaiton
const BASE_PATH = ".";
const CACHE_NAME = "onnanotame-5e3c6c";

// The static resources that the app needs to function
const APP_STATIC_RESOURCES = ["./","./index.html","./manifest.json","./tyracorn-57e195.js","./style-7fa826.css","./icon-48.png","./icon-128.png","./icon-256.png","./icon-512.png","./screenshot-01-856x1789.jpg","./screenshot-02-1920x1080.jpg","./assets-53587a/content.json","./assets-53587a/default.tap","./assets-53587a/packages/characters/content.json","./assets-53587a/packages/characters/fighters.tap","./assets-53587a/packages/characters/girls.tap","./assets-53587a/packages/characters/human-base.tap","./assets-53587a/packages/content.json","./assets-53587a/packages/elements.tap","./assets-53587a/packages/loading.tap","./assets-53587a/packages/music.tap","./assets-53587a/packages/ui/background.tap","./assets-53587a/packages/ui/buttons.tap","./assets-53587a/packages/ui/content.json","./assets-53587a/packages/ui/controls.tap","./assets-53587a/packages/ui/fonts.tap","./assets-53587a/packages/ui/sprites.tap","./assets-53587a/packages/worlds/content.json","./assets-53587a/packages/worlds/medieval-village.tap","./assets-53587a/packages/worlds/nature.tap","./assets-53587a/packages/worlds/sci-fi.tap","./assets-53587a/packages/worlds/skybox.tap","./assets-53587a/prefabs.tap","./assets-53587a/scenes.tap"];

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
