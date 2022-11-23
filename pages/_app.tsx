import type { AppProps as NextAppProps } from 'next/app';
import '@/styles/globals.css';

export default function NextPokedex({ Component, pageProps }: NextAppProps) {
    return <Component {...pageProps} />;
}
