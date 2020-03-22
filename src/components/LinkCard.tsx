import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@components/Link'

const useStyles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem',
        padding: '1.5rem',
        textAlign: 'left',
        color: 'inherit',
        textDecoration: 'none',
        border: '1px solid #eaeaea',
        borderRadius: '10px',
        transition: 'color 0.15s ease, border-color 0.15s ease',
        '&:hover': {
            color: '#0070f3',
            borderColor: '#0070f3',
            textDecoration: 'none',
        },
        '& h3': {
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
        },
        '& p': {
            margin: 0,
            fontSize: '1.25rem',
            lineHeight: 1.5,
        },
    },
})

export default function LinkCard(props) {
    const classes = useStyles()
    return <Link {...props} className={classes.card} />
}
