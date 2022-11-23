import { ReactNode, ComponentType, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export interface ReactQueryProviderProps {
    children: ReactNode;
    dehydratedState?: unknown;
}

export function ReactQueryProvider({ children, dehydratedState }: ReactQueryProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>{children}</Hydrate>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export function withReactQueryProvider<T>(Component: ComponentType<T>) {
    return function WithReactQueryProvider({
        providerProps,
        ...props
    }: T & { providerProps?: Omit<ReactQueryProviderProps, 'children'> }) {
        return (
            <ReactQueryProvider {...providerProps}>
                <Component {...(props as any)} />
            </ReactQueryProvider>
        );
    };
}
