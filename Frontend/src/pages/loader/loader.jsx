const Loader = () => {
    return (
        <div className="relative flex w-full animate-pulse gap-2 p-4">
            <div className="flex-1">
                <div className="mb-1 h-5 w-3/5 rounded-lg bg-[var(--color-muted)] text-lg"></div>
                <div className="mb-1 h-5 w-[90%] rounded-lg bg-[var(--color-muted)] text-sm"></div>
                <div className="mb-1 h-5 w-3/5 rounded-lg bg-[var(--color-muted)] text-lg"></div>
                <div className="h-5 w-[90%] rounded-lg bg-[var(--color-muted)] text-sm"></div>
            </div>
        </div>
    );
};

export default Loader;