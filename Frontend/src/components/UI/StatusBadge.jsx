const StatusBadge = ({ status, type = 'default' }) => {
    const base = "px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 border";

    // Status normalization
    const s = status?.toString().toLowerCase();

    if (s === "active" || s === "paid") {
        return <span className={`${base} border-emerald-500 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20`}>{status}</span>;
    }

    if (s === "suspended" || s === "inactive" || s === "pending") {
        return <span className={`${base} ${s === 'pending' || s === 'suspended' ? 'border-rose-500 bg-rose-500/10 text-rose-500' : 'border-yellow-500 bg-yellow-500/10 text-yellow-500'} dark:bg-opacity-20`}>{status}</span>;
    }

    // Default fallback
    return <span className={`${base} border-[var(--color-muted)] bg-[var(--color-muted)]/50 text-[var(--color-muted-foreground)]`}>{status}</span>;
}

export default StatusBadge;
