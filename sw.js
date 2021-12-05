importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js")

if (workbox) {
    console.log("Workbox is loaded, ¡YES SIR!");
    workbox.precaching.precacheAndRoute([]);

    //Cache de imagenes en la carpeta por ejemplo "others", editamos a otras carpetas que se obtuvieron y configuramos en el archivo sw.js 

    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/, //expresion regular 
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                })
            ]
        })
    );

    //hacemos que el contenido js, css, scss sean rapidos devolviendo los "assets" de la cache, mientras se asegura de qie se actualizan en segundo plano para su proximo uso.
    workbox.routing.registerRoute(
        //cache de js, css, scss
        /.*\.(?:css|js|scss|)/,
        //usamos el cache temporal y actualizamos en segundo planos los nuevis cambios lo antes posible.
        new workbox.strategies.StaleWhileRevalidate({
            //usamos el nombre de un cache personalizado
            cacheName: "assets",
        })
    );

    //chache de fuentes de google
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0,200],
                }),
            ],
        })
    );

    //agregar un analisis offline 
    workbox.googleAnalytics.initialize();

    //instalar un nuevo service worker y hacer que actualice y controle la pagina web lo antes posible
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

} else {
    console.log("Failed, workbox is not working");
}