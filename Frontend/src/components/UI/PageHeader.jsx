const PageHeader = ({
    title,
    description,
    icon: Icon,
    actionButtonText,
    onAction,
    actionIcon: ActionIcon,
    actionDisabled = false,
    additionalActions = null
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 w-full glass-panel p-4 rounded-2xl animate-fade-in-down">
            <div>
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={28} className="text-[var(--color-primary)]" />}
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">{title}</h1>
                        {description && <p className="text-[var(--color-muted-foreground)] text-sm">{description}</p>}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                {additionalActions}

                {actionButtonText && (
                    <button
                        onClick={onAction}
                        disabled={actionDisabled}
                        className="inline-flex items-center w-full justify-center gap-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {ActionIcon && <ActionIcon size={18} />}
                        {actionButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;
