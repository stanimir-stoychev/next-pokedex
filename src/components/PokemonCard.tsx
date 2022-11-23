import { DetailedHTMLProps, HTMLAttributes } from 'react';
import NextImg from 'next/image';
import NextLink from 'next/link';
import clsx, { ClassValue } from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookSkull,
    faCrosshairs,
    faGaugeHigh,
    faHeartPulse,
    faJetFighterUp,
    faShield,
    faUpDown,
    faWeightScale,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { faSpaceAwesome, faUsps } from '@fortawesome/free-brands-svg-icons';

import { NamedAPIResource, Pokemon } from '@/src/lib';
import { usePokemonQuery, useStatsQuery } from '@/src/queries/pokedex';

export interface PokemonCardProps
    extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'> {
    apiResource: NamedAPIResource;
    className?: ClassValue;
}

const supportedIcons: Record<string, IconDefinition> = {
    hp: faHeartPulse,
    attack: faJetFighterUp,
    'special-attack': faSpaceAwesome,
    defense: faShield,
    'special-defense': faBookSkull,
    speed: faGaugeHigh,
    accuracy: faCrosshairs,
    evasion: faUsps,
    weight: faWeightScale,
    height: faUpDown,
};

function Stat({ stat }: { stat: Pokemon['stats'][0] }) {
    const icon = supportedIcons[stat.stat.name];

    return (
        <p className={clsx('font-thin')}>
            {icon && <FontAwesomeIcon icon={icon} className="mr-1" />} {stat.base_stat}
        </p>
    );
}

function Skeleton({ className, ...props }: Omit<PokemonCardProps, 'apiResource'>) {
    return (
        <div
            {...props}
            className={clsx(
                className,
                'animate-pulse',
                'text-white',
                'bg-primary',
                'border',
                'border-secondary',
                'shadow-md',
                'rounded',
                'w-full',
                'flex-col',
                'space-y-4',
                'py-4',
                'px-5',
            )}
        >
            <div className={clsx('h-44', 'w-full', 'bg-slate-700', 'dark:bg-slate-500', 'rounded')} />
            <div className={clsx('bg-slate-700', 'dark:bg-slate-500', 'h-8', 'w-3/5', 'rounded')} />
            <div className={clsx('grid', 'gap-2', 'grid-cols-3', 'xl:grid-cols-4', 'justify-items-center')}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className={clsx('h-6', 'bg-slate-700', 'dark:bg-slate-500', 'rounded', 'w-12')} />
                ))}
            </div>
        </div>
    );
}

export function PokemonCard({ apiResource, className, ...rest }: PokemonCardProps) {
    const pokemon = usePokemonQuery(apiResource);
    useStatsQuery();

    if (!pokemon.data) return null;

    const [data] = Array.isArray(pokemon.data) ? pokemon.data : [pokemon.data];
    const pokemonUrl = `/pokemon/${apiResource.name}`;

    return (
        <div
            {...rest}
            className={clsx(
                className,
                'text-white',
                'bg-primary',
                'hover:bg-primary-dark',
                'border',
                'border-secondary',
                'shadow-md',
                'rounded',
                'w-full',
            )}
        >
            <NextLink
                href={pokemonUrl}
                className={clsx('flex', 'justify-center', 'space-x-1', 'p-1', 'relative', 'h-48')}
            >
                {data.sprites.other['official-artwork'].front_default && (
                    <NextImg
                        className={clsx('hover:scale-125', 'transition', 'ease-in-out')}
                        src={data.sprites.other['official-artwork'].front_default}
                        alt=""
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                )}
            </NextLink>
            <h5
                className={clsx(
                    'px-5',
                    'capitalize',
                    'text-gray-900',
                    'font-bold',
                    'text-2xl',
                    'tracking-tight',
                    'mb-2',
                    'dark:text-white',
                )}
            >
                {data.name}
            </h5>

            <ul className={clsx('grid', 'gap-2', 'grid-cols-3', 'xl:grid-cols-4', 'justify-items-center', 'p-5')}>
                <li>
                    <Stat stat={{ base_stat: data.height, stat: { name: 'height', url: '' }, effort: 0 }} />
                </li>
                <li>
                    <Stat stat={{ base_stat: data.weight, stat: { name: 'weight', url: '' }, effort: 0 }} />
                </li>
                {data.stats.map((stat) => (
                    <li key={stat.stat.name}>
                        <Stat stat={stat} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

PokemonCard.Skeleton = Skeleton;
