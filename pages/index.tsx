import React from 'react'
import LinkCard from '@components/LinkCard'
import Grid from '@material-ui/core/Grid'
import { useLight } from '@utils/actions/useLight'
import Typography from '@material-ui/core/Typography'

export default function Home() {
    const { light } = useLight()
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h3">
                {light
                    ? 'Welcome to Corona Stories'
                    : 'Hmpf..., you made it here? Bravo.'}
            </Typography>

            <Typography variant="h5" align="center">
                Unlike the name suggests this is not about the virus corona, but
                its inevitable effects on our society.
                <br />
                <br />
                {light ? (
                    <>
                        As people are mostly sitting at home nowadays we created
                        a collaborative game for all groups of age. The rules
                        are simple. You can start writing a story and others
                        will continue and/or you can continue a story someone
                        else started.
                    </>
                ) : (
                    <>
                        With corona speading fast and people slowly following
                        the suggestions to stay at home, there's a gigantic
                        amount of - ungifted, but willing - people, like you,
                        sitting at home suddenly finding their alleged "creative
                        streak".
                    </>
                )}
                <br />
                <br />
                {light ? (
                    <>We're curious to see what you come up with!</>
                ) : (
                    <>
                        To prevent this written outpourings from ever wasting
                        paper in print, we've built this platform to help you
                        realize that your in fact not gifted reassure you you're
                        not alone.
                    </>
                )}
                <br />
            </Typography>

            <Grid container>
                <Grid item xs={12} md={6}>
                    <LinkCard passHref href="/write-a-story">
                        <Typography variant="h6">
                            Start your story &rarr;
                        </Typography>
                        <Typography>
                            Select a genre and write the beginning of your
                            story. Rest assured that other people will evolve it
                            to sth sexual/racits or farty. People are bad.
                        </Typography>
                    </LinkCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <LinkCard passHref href="/browse-stories">
                        <Typography variant="h6">
                            Continue a story &rarr;
                        </Typography>
                        <Typography>
                            Select a genre and you'll get a story assigned which
                            wou'll have the pleasure to read and continue with
                            your very own interpretation. Let the juices flow.
                        </Typography>
                    </LinkCard>
                </Grid>
            </Grid>
        </div>
    )
}
