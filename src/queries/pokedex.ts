import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { NamedAPIResource, NamedAPIResourceList, Pokedex, PokedexListEndpointOptions, Pokemon, Stat } from '@/src/lib';

export const queryKeys = {
    root: ['pokedex'],
    'pokemon-list': ['pokedex', 'pokemon-list'],
    'pokemon-query': (apiResource: NamedAPIResource) => ['pokedex', 'pokemon-list', apiResource],
    'pokemon-stats': ['pokedex', 'pokemon-stats'],
} as const;

type InfinitePokemonListOptions<TData = NamedAPIResourceList> = UseInfiniteQueryOptions<
    PokedexListEndpointOptions,
    unknown,
    TData,
    typeof queryKeys['pokemon-list']
>;

export const useInfinitePokemonList = <TData = NamedAPIResourceList>(options?: InfinitePokemonListOptions<TData>) =>
    useInfiniteQuery<PokedexListEndpointOptions, unknown, TData>({
        queryKey: queryKeys['pokemon-list'],
        queryFn: ({ pageParam: interval }: { pageParam?: PokedexListEndpointOptions }) =>
            Pokedex.getPokemonsList(interval ?? { limit: 10 }),
        ...(options as any),
        getNextPageParam: (page: NamedAPIResourceList): PokedexListEndpointOptions | undefined => {
            if (!page.next) return;

            const url = new URL(page.next);
            const offset = url.searchParams.get('offset');
            const limit = url.searchParams.get('limit');

            if (!offset || !limit) return;

            return {
                offset: parseInt(offset),
                limit: parseInt(limit),
            };
        },
        getPreviousPageParam: (page: NamedAPIResourceList): PokedexListEndpointOptions | undefined => {
            if (!page.previous) return;

            const url = new URL(page.previous);
            const offset = url.searchParams.get('offset');
            const limit = url.searchParams.get('limit');

            if (!offset || !limit) return;

            return {
                offset: parseInt(offset),
                limit: parseInt(limit),
            };
        },
    });

type PokemonQueryOptions<TData = Pokemon | Pokemon[]> = UseQueryOptions<unknown, unknown, TData, any[]>;

export const usePokemonQuery = <TData = Pokemon | Pokemon[]>(
    apiResource: NamedAPIResource,
    options?: PokemonQueryOptions<TData>,
) => useQuery(queryKeys['pokemon-query'](apiResource), () => Pokedex.getPokemonByName(apiResource.name), options);

type PokemonStatsQueryOptions<TData = Stat[]> = UseQueryOptions<
    unknown,
    unknown,
    TData,
    typeof queryKeys['pokemon-stats']
>;

export const useStatsQuery = <TData = Stat[]>(options?: PokemonStatsQueryOptions<TData>) =>
    useQuery(
        queryKeys['pokemon-stats'],
        async () => {
            const allStats = await Pokedex.getStatsList();
            return Promise.all(
                allStats.results.map(async ({ name }) => {
                    const res = await Pokedex.getStatByName(name);
                    const stat = Array.isArray(res) ? res[0] : res;
                    return stat;
                }),
            );
        },
        options,
    );

export const useSelectStatQuery = (name: string, options?: Omit<PokemonStatsQueryOptions, 'select'>) =>
    useStatsQuery<Stat | undefined>({
        ...(options as any),
        select: (stats: Stat[]) => stats?.find((stat) => stat.name === name),
    });
