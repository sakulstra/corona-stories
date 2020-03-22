import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextAreaWithCharCount from '@components/TextAreaWithCharCount'

export default function AddPartForm() {
    const [message, setMessage] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const savePart = () => {
        setIsSaving(true)
        console.log('saving that shiat')
    }
    return (
        <>
            <TextAreaWithCharCount
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="outlined" onClick={savePart} disabled={isSaving}>
                Submit your part
            </Button>
        </>
    )
}
