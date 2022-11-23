import clsx from 'clsx';

export default function HomePage() {
    return (
        <div
            className={clsx(
                'bg-slate-300',
                'text-slate-900',
                'dark:bg-slate-900',
                'dark:text-slate-100',
                'h-screen',
                'relative',
            )}
        >
            WIP...
            <div
                className={clsx(
                    'rounded-full',
                    'bg-slate-300',
                    'p-4',
                    'absolute',
                    'bottom-4',
                    'right-4',
                    'hover:scale-110',
                )}
            />
        </div>
    );
}
