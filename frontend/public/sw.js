// Minimal service worker: exists only so the browser considers the site
// installable as a PWA. Deliberately does NOT cache pages, since blog posts,
// leads and reviews change constantly, stale cached HTML would be worse than
// no offline support at all. Every request just passes through to the network.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', () => {
  // No-op: let the browser handle every request normally.
});
