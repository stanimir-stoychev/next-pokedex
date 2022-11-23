import NextImage from 'next/image';
import clsx, { ClassValue } from 'clsx';

import { PokemonType } from '@/src/lib';

export interface PokemonTypesProps {
    addLabels?: boolean;
    className?: ClassValue;
    types: PokemonType[];
}

export function PokemonTypes({ addLabels = false, className, types, ...props }: PokemonTypesProps) {
    return (
        <ul className={clsx(className, 'grid', 'gap-2', 'grid-cols-2', 'md:grid-cols-4', 'py-1')} {...props}>
            {types.map(({ type: { name } }) => (
                <li key={name} className={clsx('flex', 'items-center', 'space-x-2', 'capitalize', 'w-full')}>
                    <div className={clsx('relative', 'h-8', 'w-8')}>
                        <NextImage src={`/types/${name}.svg`} alt={name} fill />
                    </div>
                    {addLabels && <span>{name}</span>}
                </li>
            ))}
        </ul>
    );
}
