import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LightSwitch from '@components/LightSwitch'

const useStyles = makeStyles({
    root: {
        marginTop: '20px',
        position: 'relative',
        width: '100%',
        height: 100,
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    social: {
        textDecoration: 'none',
        color: 'inherit',
    },
    switch: {
        position: 'absolute',
        right: 0,
    },
})

export default function Footer() {
    const classes = useStyles()
    return (
        <footer className={classes.root}>
            Proudly presented by&nbsp;
            <a
                className={classes.social}
                href="https://twitter.com/sakulstra"
                target="_blank"
                rel="noopener noreferrer"
            >
                @sakulstra
            </a>
            <p>&nbsp;and&nbsp;</p>
            <a
                className={classes.social}
                href="https://github.com/boredland"
                target="_blank"
                rel="noopener noreferrer"
            >
                boredland
            </a>
            <div className={classes.switch}>
                <LightSwitch />
            </div>
        </footer>
    )
}
