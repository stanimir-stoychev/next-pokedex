import clsx from 'clsx';

export default async function HomePage() {
    const test = await new Promise((resolve) => setTimeout(resolve, 1500));
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
