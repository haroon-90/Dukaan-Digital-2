export const Table = ({ children }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            {children}
        </table>
    </div>
);

export const Thead = ({ children, className = "" }) => (
    <thead className={`bg-[var(--color-background)] border-b border-[var(--color-border)] text-[var(--color-muted-foreground)] font-medium uppercase text-xs ${className}`}>
        {children}
    </thead>
);

export const Tbody = ({ children, className = "" }) => (
    <tbody className={`divide-y divide-[var(--color-border)] ${className}`}>
        {children}
    </tbody>
);

export const Th = ({ children, className = "" }) => (
    <th className={`px-6 py-3 font-semibold tracking-wider ${className}`}>
        {children}
    </th>
);

export const Td = ({ children, className = "" }) => (
    <td className={`px-4 py-2 ${className}`}>
        {children}
    </td>
);

export const Tr = ({ children, className = "", onClick, ...props }) => (
    <tr
        className={`hover:bg-[var(--color-muted)] transition-colors group ${className}`}
        onClick={onClick}
        {...props}
    >
        {children}
    </tr>
);
