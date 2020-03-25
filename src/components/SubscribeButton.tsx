import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useFcm } from '@utils/actions/useFcm'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'

const useStyles = makeStyles({
    root: {
        width: 200,
        margin: '20px auto',
    },
})

export default function SubscribeButton({ topic }: { topic?: string }) {
    const classes = useStyles()
    const { user } = useUser()
    const { fcmEnabled, fcmSettings, setFcmSettings } = useFcm()

    const subscribe = () => {
        const ref = firebase.firestore().collection('fcmUsers').doc(user.uid)
        ref.update({ [`topics.${topic}`]: true })
        setFcmSettings({
            ...fcmSettings,
            topics: { ...fcmSettings.topics, [topic]: true },
        })
    }

    const unsubscribe = () => {
        const ref = firebase.firestore().collection('fcmUsers').doc(user.uid)
        ref.update({ [`topics.${topic}`]: false })
        setFcmSettings({
            ...fcmSettings,
            topics: { ...fcmSettings.topics, [topic]: false },
        })
    }

    if (!fcmEnabled || !user) return null
    const isSubscribed = fcmSettings.topics && fcmSettings.topics[topic]
    return (
        <Button
            onClick={isSubscribed ? unsubscribe : subscribe}
            className={classes.root}
        >
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
    )
}
