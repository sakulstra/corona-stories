import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
    const { route } = useRouter()
    return (
        <div className={classes.root}>
            <Link
                href={route === '/browse-stories' ? '/' : '/browse-stories'}
                passHref
            >
                <Button variant="outlined">
                    {route === '/browse-stories' ? 'Home' : 'Stories'}
                </Button>
            </Link>
            <div className={classes.grow}></div>
            <Avatar />
        </div>
    )
}
