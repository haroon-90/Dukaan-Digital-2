const EmptyState = ({ icon: Icon, message, query }) => {
    return (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/20 p-8 text-center bg-muted/5">
            {Icon && (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                    <Icon size={52} className="text-muted-foreground/80" />
                </div>
            )}
            <div className="mx-auto max-w-[320px] space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {query ? 'No matches found' : 'Nothing to show'}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {query ? (
                        <>
                            We couldn't find any results matching <span className="font-medium text-foreground">"{query}"</span>. Try a different search term.
                        </>
                    ) : (
                        message
                    )}
                </p>
            </div>
        </div>
    );
};

export default EmptyState;
