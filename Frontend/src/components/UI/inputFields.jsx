const InputField = ({ label, icon: Icon, type = "text", name, placeholder, required = true, value, onChange, loading }) => (
    <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-medium text-[var(--color-foreground)]">
            {label}
        </label>
        <div className="relative group">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)] transition-colors" size={18} />}
            <input
                type={type}
                name={name}
                id={name}
                required={required}
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all disabled:opacity-70"
                onChange={onChange}
                placeholder={placeholder}
                disabled={loading}
                value={value}
            />
        </div>
    </div>
);

export default InputField;
