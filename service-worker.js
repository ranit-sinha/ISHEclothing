const CACHE = "ishe-v1";

const PRECACHE = [
  "/ISHEclothing/",
  "/ISHEclothing/index.html",
  "/ISHEclothing/style.css",
  "/ISHEclothing/responsive.css",
  "/ISHEclothing/script.js",
  "/ISHEclothing/offline.html",
  "/ISHEclothing/images/logobanner/logo2.webp",
  "/ISHEclothing/images/logobanner/ishelogo.webp",
  "/ISHEclothing/images/logobanner/banner1.webp",
  "/ISHEclothing/images/logobanner/banner2.webp",
  "/ISHEclothing/images/logobanner/banner3.webp",
  "/ISHEclothing/images/logobanner/banner4.webp"
];

/* Install â€” cache core files */
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PRECACHE);
    })
  );
  self.skipWaiting();
});

/* Activate â€” delete old caches */
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* Fetch â€” network first, fallback to cache, fallback to offline.html */
self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        /* Cache fresh copy */
        var clone = response.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(function() {
        return caches.match(e.request).then(function(cached) {
          if (cached) return cached;
          /* For navigation requests show offline page */
          if (e.request.mode === "navigate") {
            return caches.match("/ISHEclothing/offline.html");
          }
        });
      })
  );
});