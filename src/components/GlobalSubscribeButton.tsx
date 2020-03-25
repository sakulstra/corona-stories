import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'
import { useFcm } from '@utils/actions/useFcm'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        left: 0,
        top: 0,
    },
    button: {
        display: 'flex',
        position: 'fixed',
        bottom: 20,
    },
})

export default function SubscribeButton() {
    const { user } = useUser()
    const { setFcmEnabled, setFcmSettings, fcmEnabled } = useFcm()
    const classes = useStyles()

    const saveToken = async (token) => {
        const ref = firebase.firestore().collection('fcmUsers').doc(user.uid)
        // set current fcm state
        const doc = (await ref.get()).data()
        const currentTokens = (doc && doc.tokens) || {}
        if (token && !currentTokens[token]) {
            const tokens = { ...currentTokens, [token]: true }
            if (doc) ref.update({ tokens })
            else ref.set({ tokens })
            setFcmSettings({ ...doc, tokens })
        } else {
            setFcmSettings(doc)
        }
        setFcmEnabled(true)
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

    return !fcmEnabled &&
        (global as any).Notification?.permission !== 'granted' ? (
        <div className={classes.root}>
            <Button
                color="primary"
                onClick={initializeFcm}
                className={classes.button}
                variant="contained"
            >
                Subscribe
            </Button>
        </div>
    ) : null
}
