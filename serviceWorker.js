/**
 *  Ici nous allons ecouter l'évenement install et nous ferons un console log
 */
self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open('dev-coffee-v1')
      .then((cache) => {
        cache.addAll([
          '/', '/index.html', '/css/style.css', '/js/app.js'
        ])
      })
  )
})

self.addEventListener('fetch', (event) => {
  if(event.request.url.indexOf('http') === 0) {
    event.respondWith(
      caches.match(event.request)
        .then((cacheRessources) => {
          if(cacheRessources) {
            return cacheRessources
          }

          return fetch(event.request)
            .then((response) => {
              const responseToCache = response.clone()
              caches.open('dev-coffee-v1').then(cache => {
                cache.put(event.request, responseToCache)
              })
            })
        })
    )
  }
})