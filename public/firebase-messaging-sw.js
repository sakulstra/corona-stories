/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyB9M0rMoZtJ0VHyksZO9DGtXBaXcH7E8TI',
    authDomain: 'corona-stories.firebaseapp.com',
    databaseURL: 'https://corona-stories.firebaseio.com',
    projectId: 'corona-stories',
    storageBucket: 'corona-stories.appspot.com',
    messagingSenderId: '579433547134',
    appId: '1:579433547134:web:7542cf74ae12c7dbe1df2f',
    measurementId: 'G-29E766Z3ZV',
})

if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging()

    messaging.setBackgroundMessageHandler((payload) => {
        const title = payload.notification.title
        const options = {
            body: payload.notification.body,
            // badge: '/launcher_button_circle.png',
        }
        return self.registration.showNotification(title, options)
    })

    self.addEventListener('notificationclick', function (event) {
        const clickedNotification = event.notification
        clickedNotification.close()
        const promiseChain = clients
            .matchAll({
                type: 'window',
                includeUncontrolled: true,
            })
            .then((windowClients) => {
                let matchingClient = null
                for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i]
                    if (windowClient.url === feClickAction) {
                        matchingClient = windowClient
                        break
                    }
                }
                if (matchingClient) {
                    return matchingClient.focus()
                } else {
                    return clients.openWindow(feClickAction)
                }
            })
        event.waitUntil(promiseChain)
    })
}
