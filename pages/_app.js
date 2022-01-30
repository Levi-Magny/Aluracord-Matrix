import Head from "next/head";
import { MessageProvider } from '../contexts/mensagecontext';
import appConfig from '../config.json';

function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
        }
        body {
            font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */
        html, body, #__next {
            min-height: 100vh;
            display: flex;
            flex: 1;
        }

        /* width */
        ::-webkit-scrollbar {
            width: 6px;
        }
    
        /* Track */
        ::-webkit-scrollbar-track {
            background: ${appConfig.theme.colors.neutrals["200"]};
            border-radius: 2px
        }
     
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${appConfig.theme.colors.neutrals['999']}; 
            border-radius: 2px;
        }

        #__next {
            flex: 1;
        }
        #__next > * {
            flex: 1;
        }
        li {
            border-top: 1px solid transparent;
            border-image: linear-gradient( 30deg , ${appConfig.theme.colors.neutrals['200']} , ${appConfig.theme.colors.neutrals['600']});
            border-image-slice: 1;
        }
        /* ./App fit Height */
        `}</style>
    );
}

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Aranhacord</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Aranhacord" key="title" />
                <meta property="og:description" content="Entre em um chat para conversar sobre os infinitos universos do Teioso." />
                <meta property="og:url" content="https://aluracord-levi.vercel.app/" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <MessageProvider>
                <Component {...pageProps} />
            </MessageProvider>
        </>
    );
}