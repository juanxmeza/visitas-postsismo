/* Service worker: hace que la aplicación funcione sin señal.
 *
 * Estrategia: primero la copia guardada, y si no está, la red.
 * Se eligió así —y no al revés— porque en campo la prioridad es que ABRA. Una red
 * intermitente (una barra de señal que va y viene) es peor que ninguna: la página se
 * quedaría esperando. Con esta estrategia abre al instante y nunca depende de la señal.
 *
 * Contrapartida: al publicar una versión nueva hay que subir el número de CACHE, o el
 * teléfono seguirá abriendo la vieja para siempre.
 */
var CACHE = "visitas-postsismo-v1";

var ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icono-180.png",
];

self.addEventListener("install", function (e) {
  // skipWaiting: la versión nueva entra sin esperar a que se cierren las pestañas viejas.
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ARCHIVOS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (e) {
  // Barre las versiones anteriores: si no, el teléfono acumula copias viejas sin límite.
  e.waitUntil(
    caches.keys().then(function (nombres) {
      return Promise.all(nombres.map(function (n) {
        return n === CACHE ? null : caches.delete(n);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (e) {
  // Solo GET. Nada que hacer con otros métodos, y responderlos rompería el envío de datos.
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then(function (guardada) {
      if (guardada) return guardada;

      return fetch(e.request).then(function (r) {
        // Se guarda lo que llegue bien, para que la segunda vez ya no dependa de la red.
        if (r && r.ok && r.type === "basic") {
          var copia = r.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copia); });
        }
        return r;
      }).catch(function () {
        // Sin señal y sin copia: si es una navegación, se devuelve la aplicación.
        // Así, escribir la dirección a mano en modo avión sigue abriendo.
        if (e.request.mode === "navigate") return caches.match("./index.html");
        throw new Error("sin conexión y sin copia guardada");
      });
    })
  );
});
