import clsx from 'clsx';

export default function PokemonPage({ params: { name } }: { params: { name: string } }) {
    const pName = (Array.isArray(name) ? name[0] : name) ?? 'bulbasaur';

    return <div className={clsx('container', 'm-auto', 'p-4', 'space-y-4')}>{pName}</div>;
}
