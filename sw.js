importScripts('https://www.gstatic.com/firebasejs/12.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.0/firebase-messaging-compat.js');

// Initialize Firebase with your exact config
firebase.initializeApp({
    apiKey: "AIzaSyDsLwSL9iHLMhwib_nNBQU4ZV-pyGbw5XM",
    authDomain: "mauscat-auction.firebaseapp.com",
    projectId: "mauscat-auction",
    storageBucket: "mauscat-auction.firebasestorage.app",
    messagingSenderId: "757558311508",
    appId: "1:757558311508:web:d6bafca980219c76f70bc1"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRFXPObEuOdFxXhjBmKkLuttPG5RS_M3D5qLRA-sPccZ4bER8pQT4p-FOAMNgiiNfgd-1XewlF-dMtmpHlbBXL102POWiwD2FhCy-_wkUPQ48q-rNiCsFNHtrkEOrW47mC3_GTuvFaa0mCPOk5jGxqwZjrLXuQjcb3hnl5pU85_FWRrLmCYgS4wiIUkd71/s192/WhatsApp%20Image%202026-04-17%20at%203.14.28%20PM.jpeg'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle clicking the notification (opens the app)
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                // If so, just focus it
                if (client.url.includes('blogspot.com') && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab
            if (clients.openWindow) {
                return clients.openWindow('https://muscatauctions.blogspot.com'); // Replace with your actual domain if custom
            }
        })
    );
});
