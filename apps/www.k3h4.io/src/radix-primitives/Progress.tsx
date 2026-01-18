export type ProgressProps = {
    value: number; // 0-100
    accent?: string;
    className?: string;
};

export function Progress({ value, accent = "#7fe4d0", className = "" }: ProgressProps) {
    const clamped = Math.min(100, Math.max(0, value));
    return (
        <div className={`h-2 w-full rounded-full bg-white/10 ${className}`.trim()}>
            <div className="h-2 rounded-full" style={{ width: `${clamped}%`, background: accent }} />
        </div>
    );
}
