import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { NamedAPIResourceList, Pokedex, PokedexListEndpointOptions } from '@/src/lib';

async function fetchInfinitePokemonList(params: { pageParam?: PokedexListEndpointOptions }) {
    console.log({ params });
    const { pageParam: interval } = params;
    const result = await Pokedex.getPokemonsList(interval ?? { limit: 10 });
    return result;
}

export const queryKeys = {
    root: ['pokedex'],
    'pokemon-list': ['pokedex', 'pokemon-list'],
} as const;

const getNextPageParam = (page: NamedAPIResourceList): PokedexListEndpointOptions | undefined => {
    if (!page.next) return;

    const url = new URL(page.next);
    const offset = url.searchParams.get('offset');
    const limit = url.searchParams.get('limit');

    if (!offset || !limit) return;

    return {
        offset: parseInt(offset),
        limit: parseInt(limit),
    };
};

const getPreviousPageParam = (page: NamedAPIResourceList): PokedexListEndpointOptions | undefined => {
    if (!page.previous) return;

    const url = new URL(page.previous);
    const offset = url.searchParams.get('offset');
    const limit = url.searchParams.get('limit');

    if (!offset || !limit) return;

    return {
        offset: parseInt(offset),
        limit: parseInt(limit),
    };
};

type InfinitePokemonListOptions<TData = NamedAPIResourceList> = UseInfiniteQueryOptions<
    PokedexListEndpointOptions,
    unknown,
    TData,
    typeof queryKeys['pokemon-list']
>;

export const useInfinitePokemonList = <TData = NamedAPIResourceList>(options?: InfinitePokemonListOptions<TData>) =>
    useInfiniteQuery<PokedexListEndpointOptions, unknown, TData>({
        queryKey: queryKeys['pokemon-list'],
        queryFn: fetchInfinitePokemonList,
        ...(options as any),
        getNextPageParam,
        getPreviousPageParam,
    });
