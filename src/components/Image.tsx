import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { UploadMetadata } from '@ty'

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
    img: {
        maxWidth: '100%',
    },
})

export default function Image({ image }: { image: UploadMetadata }) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img
                className={classes.img}
                src={image?.url || '/placeholder.jpg'}
            />
            <Typography variant="caption" component="div" gutterBottom>
                <a target="_blank" href={image?.photoUrl}>
                    {image?.photoAuthor || 'nobody'}
                </a>{' '}
                in style of{' '}
                <a target="_blank" href={image?.styleUrl}>
                    {image?.styleAuthor || 'nobody'}
                </a>
            </Typography>
        </div>
    )
}
