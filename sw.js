const cacheName = "dev.giroto-v1";

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then(
          (networkResponse) => {
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          },
        );

        return cachedResponse || fetchedResponse;
      });
    }),
  );
});
