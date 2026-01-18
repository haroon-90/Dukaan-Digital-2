import { Search } from 'lucide-react';

const SearchBar = ({
    value,
    onChange,
    placeholder = "Search...",
    stats,
    statsLabel,
    children // For extra filters like dropdowns
}) => {
    return (
        <div className="flex justify-center gap-3 flex-wrap w-full lg:w-auto">
            <div className="relative group flex-1 md:max-w-sm min-w-[200px]">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors"
                />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="pl-10 pr-4 py-1 w-full h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)]"
                />
            </div>

            {children}

            {(stats !== undefined && stats !== null) && (
                <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium border border-[var(--color-border)] rounded-xl bg-[var(--color-surface)] text-[var(--color-muted-foreground)]">
                    <span className="text-[var(--color-foreground)] font-semibold">
                        {stats}
                    </span>
                    {statsLabel}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
