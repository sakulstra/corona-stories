import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@components/UserAvatar'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: 60,
        padding: '5px 0px',
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1,
    },
})

export default function Header() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Link href="/" passHref>
                <Button variant="outlined">Home</Button>
            </Link>
            <div className={classes.grow}></div>
            <Avatar />
        </div>
    )
}
