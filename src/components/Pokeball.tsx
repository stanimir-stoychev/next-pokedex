import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx, { ClassValue } from 'clsx';
import styles from '@/styles/Pokeball.module.css';

// https://duthcode.com/Blog/blogPostContent.php?post=create-a-pokeball-with-css-animation-26
export interface PokeballProps
    extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'className'> {
    className?: ClassValue;
    playAnimation?: boolean;
}

export function Pokeball({ className, playAnimation, ...props }: PokeballProps) {
    return (
        <div className={clsx(className, styles['pokeball'])} data-play-animation={playAnimation} {...props}>
            <div className={clsx(styles['pokeball__button'])} />
        </div>
    );
}
