const CACHE_NAME = "version-6";
const urlsToCache = [
	"index.html",
	"offline.html",
	"/cases",
	"/resources",
	"/states",
	"/blogs",
	"/auth",
	"/precautions",
	"/about",
	"https://res.cloudinary.com/dlgu8heb4/image/upload/v1628013374/20210803_232133_h8mno8.jpg",
	"https://res.cloudinary.com/dlgu8heb4/image/upload/v1628012832/23_nytf3b.jpg",
	"https://rachitcoderai.github.io/precautionsCovid/precaution.html",
	"https://rachitcoderai.github.io/About-Us-/aboutus.html",
];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");

			return cache.addAll(urlsToCache);
		})
	);
});

// Listen for requests
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then(() => {
			return fetch(event.request).catch(() => caches.match("offline.html"));
		})
	);
});

// Activate the SW
self.addEventListener("activate", (event) => {
	const cacheWhitelist = [];
	cacheWhitelist.push(CACHE_NAME);

	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});
