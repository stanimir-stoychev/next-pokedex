import { ComponentType, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import clsx, { ClassValue } from 'clsx';

export interface PokemonAppViewProviderProps
    extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'> {
    children: ReactNode;
    className?: ClassValue;
}

export function PokemonAppViewProvider({ children, className, ...rest }: PokemonAppViewProviderProps) {
    return (
        <div
            className={clsx(
                className,
                'min-h-screen',
                'relative',
                'bg-slate-300',
                'text-slate-900',
                'dark:bg-slate-900',
                'dark:text-slate-100',
            )}
            {...rest}
        >
            <nav className={clsx('flex', 'justify-center')}>
                <NextLink href="/">
                    <NextImage src="/pokemon-logo.png" alt="Pokemon logo" width={250} height={150} />
                </NextLink>
            </nav>
            {children}
        </div>
    );
}

export function withPokemonAppViewProvider<T>(Component: ComponentType<T>) {
    return function WithPokemonAppViewProvider({
        providerProps,
        ...props
    }: T & { providerProps?: Omit<PokemonAppViewProviderProps, 'children'> }) {
        return (
            <PokemonAppViewProvider {...providerProps}>
                <Component {...(props as any)} />
            </PokemonAppViewProvider>
        );
    };
}
