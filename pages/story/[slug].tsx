import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import { Story } from '@ty'
import firebase from '@utils/firebase'

export default function WriteAStory() {
    const {
        query: { slug },
    } = useRouter()
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
        <div>
            <img src={story.image.url} />
            <Typography variant="h6">{story.title}</Typography>
            {story.parts.map((part, ix) => (
                <Typography key={ix}>{part.text}</Typography>
            ))}
        </div>
    )
}
