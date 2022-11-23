import { Fragment } from 'react';
import clsx from 'clsx';

import { Pokeball, PokemonCard } from '@/src/components';
import { useInfinitePokemonList } from '@/src/queries/pokedex';

export default function HomePage() {
    const infinitePokemonList = useInfinitePokemonList();

    return (
        <div className={clsx('container', 'm-auto')}>
            <ul
                className={clsx(
                    'p-4',
                    'grid',
                    'gap-2',
                    'lg:gap-3',
                    'grid-cols-1',
                    'sm:grid-cols-2',
                    'md:grid-cols-3',
                    'lg:grid-cols-4',
                )}
            >
                {infinitePokemonList.isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <PokemonCard.Skeleton />
                        </li>
                    ))}

                {infinitePokemonList.data?.pages?.map((page, index) => (
                    <Fragment key={page?.next ?? index}>
                        {page.results.map((apiResource) => (
                            <li key={apiResource.name}>
                                <PokemonCard apiResource={apiResource} />
                            </li>
                        ))}
                    </Fragment>
                ))}

                {(infinitePokemonList.hasNextPage || infinitePokemonList.isLoading) && (
                    <li className={clsx('flex', 'justify-center', 'items-center')}>
                        <Pokeball
                            className="cursor-pointer"
                            aria-label="load-more-btn"
                            playAnimation={infinitePokemonList.isFetchingNextPage || infinitePokemonList.isLoading}
                            aria-disabled={infinitePokemonList.isFetchingNextPage}
                            onClick={() => infinitePokemonList.fetchNextPage()}
                        />
                    </li>
                )}

                {!infinitePokemonList.isLoading &&
                    infinitePokemonList.isFetching &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <PokemonCard.Skeleton />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
