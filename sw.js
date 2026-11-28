
const VERSION = "cb1bb4"; // version - need to change on every modificaiton
const BASE_PATH = ".";
const CACHE_NAME = "onnanotame-cb1bb4";

// The static resources that the app needs to function
const APP_STATIC_RESOURCES = ["./","./index.html","./manifest.json","./tyracorn-25ecb6.js","./style-7fa826.css","./icon-48.png","./icon-128.png","./icon-256.png","./icon-512.png","./screenshot-01-856x1789.jpg","./screenshot-02-1920x1080.jpg","./assets-54d835/content.json","./assets-54d835/default.tap","./assets-54d835/packages/characters/content.json","./assets-54d835/packages/characters/fighters.tap","./assets-54d835/packages/characters/girls.tap","./assets-54d835/packages/characters/human-base.tap","./assets-54d835/packages/content.json","./assets-54d835/packages/elements.tap","./assets-54d835/packages/loading.tap","./assets-54d835/packages/music.tap","./assets-54d835/packages/sfx.tap","./assets-54d835/packages/ui/background.tap","./assets-54d835/packages/ui/buttons.tap","./assets-54d835/packages/ui/content.json","./assets-54d835/packages/ui/controls.tap","./assets-54d835/packages/ui/fonts.tap","./assets-54d835/packages/ui/sprites.tap","./assets-54d835/packages/worlds/content.json","./assets-54d835/packages/worlds/medieval-village.tap","./assets-54d835/packages/worlds/nature.tap","./assets-54d835/packages/worlds/sci-fi.tap","./assets-54d835/packages/worlds/skybox.tap","./assets-54d835/prefabs.tap","./assets-54d835/scenes.tap"];

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
