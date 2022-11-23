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

import { StatElement } from '@/src/lib';

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

export interface PokemonStatsProps {
    addLabels?: boolean;
    className?: ClassValue;
    stats: StatElement[];
}

export function PokemonStats({ addLabels = false, className, stats, ...props }: PokemonStatsProps) {
    return (
        <ul
            {...props}
            className={clsx(className, 'grid', 'gap-2', 'grid-cols-3', 'xl:grid-cols-4', 'justify-items-center')}
        >
            {stats.map(({ base_stat, stat: { name } }) => {
                const icon = supportedIcons[name];
                return (
                    <li key={name}>
                        {icon && (
                            <p className={clsx('font-thin', 'capitalize')}>
                                <FontAwesomeIcon icon={icon} className="mr-1" />{' '}
                                {addLabels ? `${name}: ${base_stat}` : base_stat}
                            </p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
