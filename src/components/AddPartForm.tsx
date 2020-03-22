import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextAreaWithCharCount from '@components/TextAreaWithCharCount'
import firebase from '@utils/firebase'
import { useUser } from '@utils/actions/useUser'
import SubmitButton from './SubmitButton'

export default function AddPartForm({ slug }: { slug: string }) {
    const [message, setMessage] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const { user } = useUser()

    const savePart = () => {
        setIsSaving(true)
        const db = firebase.firestore()
        db.collection('stories')
            .doc(slug)
            .update({
                parts: firebase.firestore.FieldValue.arrayUnion({
                    text: message,
                    userId: user.uid,
                }),
            })
    }
    return (
        <>
            <TextAreaWithCharCount
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <SubmitButton
                variant="outlined"
                onClick={savePart}
                disabled={isSaving}
            >
                Submit your part
            </SubmitButton>
        </>
    )
}
