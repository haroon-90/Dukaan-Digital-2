import { ChevronRight } from "lucide-react";

const ProfileDetail = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 rounded-2xl bg-[var(--color-surface)] px-5 py-4 shadow-sm border border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors">
        <div className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">{label}</span>
            <span className="text-base font-semibold text-[var(--color-foreground)] break-words">{value || "Not Provided"}</span>
        </div>
    </div>
);

const MenuLink = ({ icon, label, onClick, danger, value }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-muted)] transition-all active:scale-[0.99] ${danger ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10' : 'text-[var(--color-foreground)]'}`}>
        <div className="flex items-center gap-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${danger ? 'bg-red-100 dark:bg-red-900/20' : 'bg-[var(--color-primary)]/10'} ${danger ? 'text-red-500' : 'text-[var(--color-primary)]'}`}>
                {icon}
            </div>
            <span className="font-medium text-base">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-sm text-[var(--color-muted-foreground)]">{value}</span>}
            <ChevronRight size={18} className="text-[var(--color-muted-foreground)]" />
        </div>
    </button>
);

export { ProfileDetail, MenuLink };
