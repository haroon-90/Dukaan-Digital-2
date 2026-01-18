import { Calendar } from 'lucide-react';

const DateRangeFilter = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    disabled = false
}) => {
    return (
        <div className="flex items-center justify-center flex-wrap w-full lg:w-auto gap-4">
            <div className="flex items-center gap-2 bg-[var(--color-surface)] px-2 py-1.5 rounded-xl border border-[var(--color-border)]">
                <Calendar disabled={disabled} size={16} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-muted-foreground)]">From:</span>
                <input
                    type="date"
                    value={startDate}
                    onChange={onStartDateChange}
                    disabled={disabled}
                    className="bg-transparent border-none text-[var(--color-foreground)] text-sm focus:ring-0 cursor-pointer outline-none"
                />
            </div>
            <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-1.5 rounded-xl border border-[var(--color-border)]">
                <Calendar disabled={disabled} size={16} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-muted-foreground)]">To:</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={onEndDateChange}
                    disabled={disabled}
                    className="bg-transparent border-none text-[var(--color-foreground)] text-sm focus:ring-0 cursor-pointer outline-none"
                />
            </div>
        </div>
    );
};

export default DateRangeFilter;
