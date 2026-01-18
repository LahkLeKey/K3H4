export type Progress2DProps = {
    value: number; // 0-100
    accent?: string;
    className?: string;
};

export function Progress2D({ value, accent = "#7fe4d0", className = "" }: Progress2DProps) {
    const clamped = Math.min(100, Math.max(0, value));
    return (
        <div className={`h-2 w-full rounded-full bg-white/10 ${className}`.trim()}>
            <div className="h-2 rounded-full" style={{ width: `${clamped}%`, background: accent }} />
        </div>
    );
}
