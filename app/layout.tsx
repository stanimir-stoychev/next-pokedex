import clsx from 'clsx';
import { PokemonAppViewProvider, ReactQueryProvider } from '@/src/hoc';
import '@/styles/globals.css';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ReactQueryProvider>
                    <PokemonAppViewProvider>
                        <div className={clsx('container', 'm-auto')}>{children}</div>
                    </PokemonAppViewProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
