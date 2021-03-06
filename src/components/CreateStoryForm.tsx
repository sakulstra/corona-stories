import React, { useState } from 'react'
import Router from 'next/router'
import slugify from 'slugify'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ImageSelector from '@components/ImageSelector'
import TextAreaWithCharCount from '@components/TextAreaWithCharCount'
import SubmitButton from './SubmitButton'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'
import { Story, UploadMetadata } from '@ty'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}))

export default function CreateStoryForm() {
    const classes = useStyles()
    const { user } = useUser()
    const [isSaving, setIsSaving] = useState(false)
    const [preTitle, setPreTitle] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState([] as UploadMetadata)
    const saveStory = async () => {
        setIsSaving(true)
        const slug = slugify(title)
        const db = firebase.firestore()
        const createdAt = new Date()
        await db
            .collection('stories')
            .doc(slug)
            .set({
                title: title,
                slug,
                image,
                parts: [{ text: message, userId: user.uid, createdAt }],
                createdAt,
            } as Story)
        Router.push('/browse-stories')
    }
    return (
        <div className={classes.root}>
            <ImageSelector image={image} onChange={setImage} />
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={preTitle}
                onChange={(e) => setPreTitle(e.target.value)}
                onBlur={(e) => setTitle(preTitle)}
            />
            <TextAreaWithCharCount
                label="This could be fun"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitButton onClick={saveStory} disabled={isSaving}>
                Start your story
            </SubmitButton>
        </div>
    )
}
