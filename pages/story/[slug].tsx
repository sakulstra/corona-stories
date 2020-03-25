import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Image from '@components/Image'
import AddPartForm from '@components/AddPartForm'
import { Story, SENTIMENT } from '@ty'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'
import { randomFromArray } from '@utils/helpers'
import { useLight } from '@utils/actions/useLight'
import SubscribeButton from '@components/SubscribeButton'

const lightModeForSentiment = (sentiment: SENTIMENT): boolean => {
    const sentiNum: number = parseInt(SENTIMENT[sentiment])
    if (sentiNum < 3) {
        return false
    }
    if (sentiNum == 3) {
        return randomFromArray([false, true])
    }
    return true
}

export default function WriteAStory() {
    const { light, turnOffLight, turnOnLight } = useLight()
    const {
        query: { slug },
    } = useRouter()
    const { user } = useUser()
    const [story, setStory] = useState<Story | null>(null)
    useEffect(() => {
        if (!slug) return
        const db = firebase.firestore()
        return db
            .collection('stories')
            .doc(slug as string)
            .onSnapshot(function (doc) {
                setStory(doc.data() as Story)
            })
    }, [slug])
    if (!story) return null
    lightModeForSentiment(story.sentiment) ? turnOnLight() : turnOffLight()

    const isParticipant = user
        ? story.parts
              .slice(Math.max(story.parts.length - 2, 0))
              .find((part) => part.userId === user.uid)
        : false
    return (
        <Grid container justify="center" direction="column">
            <Image image={story.image} />
            <Typography variant="h4" gutterBottom align="center">
                {story.title}
            </Typography>
            {story.parts.map((part, ix) => (
                <Typography key={ix} variant="body1" gutterBottom>
                    {part.text}
                </Typography>
            ))}
            {!isParticipant && <AddPartForm slug={slug as string} />}
            {isParticipant && (
                <Typography variant="caption" align="center">
                    You're already part of this story!
                    <br />
                    Send it over to friends to see how it evolves!!
                    <br />
                    Only every 3th part is allowed to be owned by you.
                </Typography>
            )}
            <SubscribeButton topic={slug as string} />
        </Grid>
    )
}
