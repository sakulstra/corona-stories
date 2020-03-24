import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'

export default function SubscribeButton() {
    const { user } = useUser()

    const saveToken = async (token) => {
        // set current fcm state
        const doc = (
            await firebase
                .firestore()
                .collection('fcmUsers')
                .doc(user.uid)
                .get()
        ).data()
        const currentTokens = (doc && doc.tokens) || {}
        if (token && !currentTokens[token]) {
            const ref = firebase
                .firestore()
                .collection('fcmUsers')
                .doc(user.uid)
            const tokens = { ...currentTokens, [token]: true }
            if (doc) ref.update({ tokens: tokens })
            else ref.set({ tokens: tokens })
        }
    }

    const initializeFcm = async () => {
        const messaging = firebase.messaging()
        // check if we have push rights
        await Notification.requestPermission()
            .then(async () => messaging.getToken().then(saveToken))
            .catch((error) => {
                if (error.code === 'messaging/permission-blocked') {
                    console.log('Please Unblock Notification Request Manually')
                } else {
                    console.log('Error Occurred', error)
                }
            })

        messaging.onTokenRefresh(async () => {
            await messaging.getToken().then(saveToken)
        })

        messaging.onMessage((payload) => {
            console.log('Notification Received', payload)
        })
    }
    useEffect(() => {
        if (!user) return
        if (Notification.permission !== 'granted') return
        initializeFcm()
    }, [user])

    return Notification.permission !== 'granted' ? (
        <Button onClick={() => initializeFcm()}>Subscribe</Button>
    ) : null
}
