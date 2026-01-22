export type SparklineProps = { values: number[]; color?: string; className?: string };

export function Sparkline({ values, color = "#22d3ee", className = "" }: SparklineProps) {
    if (values.length === 0) return <div className={`h-8 w-full rounded-md bg-slate-900/80 ${className}`} />;
    const max = Math.max(...values, 1);
    const points = values
        .map((value, idx) => {
            const x = (idx / Math.max(values.length - 1, 1)) * 100;
            const y = 32 - (value / max) * 32;
            return `${x},${y}`;
        })
        .join(" ");
    return (
        <svg className={`h-8 w-full ${className}`} viewBox="0 0 100 32" preserveAspectRatio="none">
            <polyline fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" points={points} />
        </svg>
    );
}
