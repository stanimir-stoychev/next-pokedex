import clsx, { ClassValue } from 'clsx';

function CardSkeleton({ className, ...props }: { className?: ClassValue }) {
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
            <div className={clsx('grid', 'gap-2', 'grid-cols-3', 'xl:grid-cols-4', 'justify-items-center')}>
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={clsx('h-6', 'bg-slate-700', 'dark:bg-slate-500', 'rounded', 'w-12')} />
                ))}
            </div>
        </div>
    );
}

export default function HomePageSkeleton() {
    return (
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
            {Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                    <CardSkeleton />
                </li>
            ))}
        </ul>
    );
}
