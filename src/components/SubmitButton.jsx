import React from 'react'
import Button from '@material-ui/core/Button'
import { useUser } from '@utils/actions/useUser'

export default function SubmitButton(props) {
    const { user } = useUser()
    return (
        <Button
            {...props}
            variant="outlined"
            disabled={props.disabled || !user}
        >
            {!user ? 'You have to Login first' : props.children}
        </Button>
    )
}
