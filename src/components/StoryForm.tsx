import React, { useState } from 'react'
import Router from 'next/router'
import slugify from 'slugify'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Image from '@components/Image'
import ImageSelector from '@components/ImageSelector'
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
    helperText: {
        textAlign: 'right',
    },
}))

export default function CustomTextField(props) {
    const classes = useStyles()
    const { user } = useUser()
    const [isSaving, setIsSaving] = useState(false)
    const [preTitle, setPreTitle] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState([] as UploadMetadata)
    const maxLength = 400
    const saveStory = async () => {
        setIsSaving(true)
        const slug = slugify(title)
        const db = firebase.firestore()
        await db
            .collection('stories')
            .doc(slug)
            .set({
                title: title,
                slug,
                image,
                parts: [{ text: message, userId: user.uid }],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            } as Story)
        Router.push('/browse-stories')
    }
    return (
        <div className={classes.root}>
            <Image image={image} />
            <ImageSelector sentence={title} onChange={setImage} />
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={preTitle}
                onChange={(e) => setPreTitle(e.target.value)}
                onBlur={(e) => setTitle(preTitle)}
            />
            <TextField
                {...props}
                label="The story must go on"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                inputProps={{ maxLength }}
                FormHelperTextProps={{ className: classes.helperText }}
                helperText={`${message.length}/${maxLength}`}
                variant="outlined"
                rows={7}
            />
            <Button variant="outlined" onClick={saveStory} disabled={isSaving}>
                Start your story
            </Button>
        </div>
    )
}
