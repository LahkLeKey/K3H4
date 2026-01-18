export type RadioOption = {
    key: string;
    label: string;
    description?: string;
};

export type RadioGroupProps = {
    name: string;
    options: RadioOption[];
    value?: string;
    onValueChange?: (key: string) => void;
    className?: string;
};

export function RadioGroup({ name, options, value, onValueChange, className = "" }: RadioGroupProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`.trim()}>
            {options.map((opt) => (
                <label key={opt.key} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-sm backdrop-blur">
                    <input
                        type="radio"
                        name={name}
                        value={opt.key}
                        checked={value === opt.key}
                        onChange={() => onValueChange?.(opt.key)}
                        className="mt-1 h-4 w-4 accent-emerald-300"
                    />
                    <span className="flex flex-col">
                        <span className="font-semibold text-white">{opt.label}</span>
                        {opt.description ? <span className="text-xs text-slate-400">{opt.description}</span> : null}
                    </span>
                </label>
            ))}
        </div>
    );
}
