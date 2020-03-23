import firebase from './firebase'

export function saveToken(user, token) {
    const currentTokens = user.fcmTokens || {}
    if (!currentTokens[token]) {
        // ref = collection('fcmUsers').doc(user.uid)
        const tokens = { ...currentTokens, [token]: true }
        // ref.update({fcmTokens: tokens})
    }
}

export function requestPushPermission() {
    const messaging = firebase.messaging()

    Notification.requestPermission()
        .then(() => {
            const resp = messaging.getToken().then((token) =>
                // TODO: send to server
                console.log({ token })
            )
            return resp
        })
        .catch((error) => {
            if (error.code === 'messaging/permission-blocked') {
                console.log('Please Unblock Notification Request Manually')
            } else {
                console.log('Error Occurred', error)
            }
        })

    messaging.onTokenRefresh(() => {
        messaging.getToken().then((refreshedToken) => {
            // TODO: send to server
            console.log({ token: refreshedToken })
        })
    })

    // get's triggered when there's a push even while app is in foreground
    messaging.onMessage((payload) => {
        console.log('Notification Received', payload)
    })
}
