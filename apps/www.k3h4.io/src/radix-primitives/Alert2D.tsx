export type Alert2DProps = {
    title?: string;
    description?: string;
    tone?: "info" | "success" | "warn" | "error";
    className?: string;
};

const toneMap: Record<NonNullable<Alert2DProps["tone"]>, { bg: string; border: string; dot: string }> = {
    info: { bg: "bg-slate-900", border: "border-sky-300/50", dot: "bg-sky-300" },
    success: { bg: "bg-slate-900", border: "border-emerald-300/50", dot: "bg-emerald-300" },
    warn: { bg: "bg-slate-900", border: "border-amber-300/60", dot: "bg-amber-300" },
    error: { bg: "bg-slate-900", border: "border-rose-300/60", dot: "bg-rose-300" },
};

export function Alert2D({ title, description, tone = "info", className = "" }: Alert2DProps) {
    const toneStyle = toneMap[tone];
    return (
        <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm text-slate-100 shadow ${toneStyle.bg} ${toneStyle.border} ${className}`.trim()}>
            <span className={`mt-1 h-2 w-2 rounded-full ${toneStyle.dot}`} />
            <div className="flex flex-col gap-1">
                {title ? <span className="font-semibold text-white">{title}</span> : null}
                {description ? <span className="text-slate-300">{description}</span> : null}
            </div>
        </div>
    );
}
