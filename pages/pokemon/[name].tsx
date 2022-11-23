import clsx from 'clsx';

import { usePokemonQuery } from '@/src/queries/pokedex';
import { useRouter } from 'next/router';

export default function PokemonPage() {
    const {
        query: { name },
    } = useRouter();

    const pName = (Array.isArray(name) ? name[0] : name) ?? 'bulbasaur';
    const pokemonQuery = usePokemonQuery({ name: pName, url: '' });

    return (
        <>
            WIP...
            {/* <pre>{JSON.stringify(pokemonQuery.data, null, 4)}</pre> */}
        </>
    );
}
