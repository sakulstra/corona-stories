import React from 'react'
import Grid from '@material-ui/core/Grid'
import CreateStoryForm from '@components/CreateStoryForm'

export default function WriteAStory() {
    return (
        <Grid container justify="center" alignItems="center">
            <CreateStoryForm />
        </Grid>
    )
}
