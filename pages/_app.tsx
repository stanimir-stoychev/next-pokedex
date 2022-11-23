import type { AppProps as NextAppProps } from 'next/app';
import { withReactQueryProvider } from '@/src/hoc';
import '@/styles/globals.css';

function NextPokedex({ Component, pageProps }: NextAppProps) {
    return <Component {...pageProps} />;
}

export default withReactQueryProvider(NextPokedex);
