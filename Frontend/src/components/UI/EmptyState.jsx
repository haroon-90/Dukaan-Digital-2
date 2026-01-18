const EmptyState = ({ icon: Icon, message, query }) => {
    return (
        <div className="px-6 py-12 text-center text-[var(--color-muted-foreground)] w-full">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
                {Icon && <Icon size={40} />}
                <p className="text-sm">
                    {query ? `No results found matching "${query}"` : message}
                </p>
            </div>
        </div>
    );
};

export default EmptyState;
