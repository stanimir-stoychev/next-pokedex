import clsx from 'clsx';

export default function HomePage() {
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
                WIP
            </ul>
        </div>
    );
}
