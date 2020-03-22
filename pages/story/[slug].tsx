import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Image from '@components/Image'
import { Story } from '@ty'
import firebase from '@utils/firebase'

export default function WriteAStory() {
    const {
        query: { slug },
    } = useRouter()
    if (!slug) return null
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
    return (
        <Grid container justify="center" alignItems="center">
            <Image image={story.image} />
            <Typography variant="h6" gutterBottom>
                {story.title}
            </Typography>
            {story.parts.map((part, ix) => (
                <Typography key={ix}>{part.text}</Typography>
            ))}
        </Grid>
    )
}
