const CACHE_NAME = `african-history-${Date.now()}`;

const urlsToCache = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
];

// Install event - pre-cache files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event - serve from cache first, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      // Otherwise fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Optionally cache new requests (for dynamic caching)
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

//push notification event
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: "New Notification", body: "You have a new notification." };
  const options = {
    body: data.body,
    icon: "/icon.png",
    badge: "/badge.png",
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});

// NODE SERVER
// const webPush = require("web-push");

// Generate these once and keep secret
// webPush.setVapidDetails(
//   "mailto:you@example.com",
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

// Example: push daily history event
// function sendDailyUpdate(subscription) {
//   const payload = JSON.stringify({
//     title: "This Day in African History",
//     body: "Nelson Mandela released – 1990",
//     url: "/history/1990/mandela",
//   });

//   webPush.sendNotification(subscription, payload).catch(console.error);
// }

//periodic sync event to update using the notification api
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "african-history-daily") {
    event.waitUntil(updateDailyHistory());
  }
});

async function updateDailyHistory() {
  try {
    const res = await fetch("/api/daily-history"); // Adjust the endpoint as needed
    if (!res.ok) {
      throw new Error("Failed to fetch daily history");
    }
    const data = await res.json();

    // Show notification with today’s history
    self.registration.showNotification("This Day in African History", {
      body: data.message,
      icon: "/pwa-192x192.png",
    });
  } catch (err) {
    console.error("Failed to fetch daily history:", err);
  }
}
