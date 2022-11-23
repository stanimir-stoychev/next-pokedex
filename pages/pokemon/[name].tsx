import clsx from 'clsx';
import NextImage from 'next/image';

import { usePokemonQuery } from '@/src/queries/pokedex';
import { useRouter } from 'next/router';
import { PokemonStats, PokemonTypes } from '@/src/components';

// https://commons.wikimedia.org/wiki/Category:Pok%C3%A9mon_types_icons

export default function PokemonPage() {
    const {
        query: { name },
    } = useRouter();

    const pName = (Array.isArray(name) ? name[0] : name) ?? 'bulbasaur';
    const pokemon = usePokemonQuery({ name: pName, url: '' });
    const artworkSrc = pokemon.data?.sprites.other['official-artwork'].front_default;

    return (
        <div className={clsx('container', 'm-auto', 'p-4', 'space-y-4')}>
            {artworkSrc && (
                <div className={clsx('relative', 'w-full', 'h-64')}>
                    <NextImage
                        src={artworkSrc}
                        alt={pName}
                        fill
                        style={{ objectFit: 'contain' }}
                        className={clsx('hover:scale-150', 'transition', 'ease-in-out')}
                    />
                </div>
            )}
            <h1 className={clsx('capitalize', 'text-3xl')}>{pName}</h1>
            <PokemonStats addLabels stats={pokemon.data?.stats ?? []} />
            <PokemonTypes addLabels types={pokemon.data?.types ?? []} />
        </div>
    );
}
