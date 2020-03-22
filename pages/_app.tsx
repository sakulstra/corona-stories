import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Theme from '@utils/theme'
import { store } from '@utils/store'
import Footer from '@components/Footer'
import Header from '@components/Header'

export default class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles)
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <React.Fragment>
                <Head>
                    <title>Corona Stories</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <Provider store={store}>
                    <Theme>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Container
                            maxWidth="md"
                            style={{
                                minHeight: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Header />
                            <main
                                style={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: 'column',
                                }}
                            >
                                <Component {...pageProps} />
                            </main>
                            <Footer />
                        </Container>
                    </Theme>
                </Provider>
            </React.Fragment>
        )
    }
}
