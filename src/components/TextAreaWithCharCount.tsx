import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    helperText: {
        textAlign: 'right',
    },
})

export default function TextAreaWithCharCount(props) {
    const classes = useStyles()
    const maxLength = 400
    return (
        <TextField
            label="The story must go on"
            fullWidth
            multiline
            inputProps={{ maxLength }}
            FormHelperTextProps={{ className: classes.helperText }}
            helperText={`${props.value.length}/${maxLength}`}
            variant="outlined"
            rows={7}
            {...props}
        />
    )
}
