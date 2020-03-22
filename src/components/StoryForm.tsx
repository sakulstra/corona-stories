import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ImageSelector from '@components/ImageSelector'
import firebase from '@utils/firebase'
import { Story, UploadMetadata } from '@ty'
import { useUser } from '@utils/actions/useUser'

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    img: {
        maxWidth: 400,
        margin: theme.spacing(1),
    },
    helperText: {
        textAlign: 'right',
    },
}))

export default function CustomTextField(props) {
    const classes = useStyles()
    const { user } = useUser()
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState({} as UploadMetadata)
    const maxLength = 400
    const saveStory = () => {
        const db = firebase.firestore()
        db.collection('stories')
            .doc(title)
            .set({
                title: title,
                slug: title,
                image,
                parts: [{ text: message, userId: user.uid }],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            } as Story)
    }
    return (
        <div className={classes.root}>
            <img
                className={classes.img}
                src={
                    image.url ||
                    'https://api.deepai.org/job-view-file/cec969fc-4866-406c-bcaf-0d5dacb4f6ae/outputs/output.png'
                }
            />
            <ImageSelector sentence={title} onChange={setImage} />
            <TextField
                fullWidth
                variant="outlined"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                rows={6}
            />
            <Button variant="outlined" onClick={saveStory}>
                Start your story
            </Button>
        </div>
    )
}
