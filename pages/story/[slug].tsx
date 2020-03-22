import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Image from '@components/Image'
import AddPartForm from '@components/AddPartForm'
import { Story } from '@ty'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'

export default function WriteAStory() {
    const {
        query: { slug },
    } = useRouter()
    if (!slug) return null
    const { user } = useUser()
    const [story, setStory] = useState<Story | null>(null)
    useEffect(() => {
        const db = firebase.firestore()
        return db
            .collection('stories')
            .doc(slug as string)
            .onSnapshot(function (doc) {
                setStory(doc.data() as Story)
            })
    }, [])
    if (!story) return null
    const isParticipant = story.parts.find((part) => part.userId === user.uid)
    return (
        <Grid container justify="center" direction="column">
            <Image image={story.image} />
            <Typography variant="h6" gutterBottom>
                {story.title}
            </Typography>
            {story.parts.map((part, ix) => (
                <Typography key={ix} variant="body2" gutterBottom>
                    {part.text}
                </Typography>
            ))}
            {!isParticipant && <AddPartForm />}
            {isParticipant && (
                <Typography variant="caption" align="center">
                    You're already part of this story!
                    <br />
                    Send it over to friends to see how it evolves!!
                </Typography>
            )}
        </Grid>
    )
}
