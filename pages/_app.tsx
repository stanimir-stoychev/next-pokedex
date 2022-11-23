import type { AppProps as NextAppProps } from 'next/app';
import { withPokemonAppViewProvider, withReactQueryProvider } from '@/src/hoc';
import '@/styles/globals.css';

function NextPokedex({ Component, pageProps }: NextAppProps) {
    return <Component {...pageProps} />;
}

export default withReactQueryProvider(withPokemonAppViewProvider(NextPokedex));
