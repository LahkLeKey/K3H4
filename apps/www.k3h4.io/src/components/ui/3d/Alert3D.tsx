import { Html3D } from "./Html3D";

export type Alert3DProps = {
    position?: [number, number, number];
    width?: number;
    title?: string;
    description?: string;
    tone?: "info" | "success" | "warn" | "error";
    className?: string;
};

const toneMap: Record<NonNullable<Alert3DProps["tone"]>, { bg: string; border: string; dot: string }> = {
    info: { bg: "bg-slate-900/90", border: "border-sky-300/50", dot: "bg-sky-300" },
    success: { bg: "bg-slate-900/90", border: "border-emerald-300/50", dot: "bg-emerald-300" },
    warn: { bg: "bg-slate-900/90", border: "border-amber-300/60", dot: "bg-amber-300" },
    error: { bg: "bg-slate-900/90", border: "border-rose-300/60", dot: "bg-rose-300" },
};

export function Alert3D({ position = [0, 1.1, 0], width = 320, title, description, tone = "info", className = "" }: Alert3DProps) {
    const toneStyle = toneMap[tone];
    return (
        <Html3D position={position} distanceFactor={8}>
            <div
                className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm text-slate-100 shadow-2xl backdrop-blur ${toneStyle.bg} ${toneStyle.border} ${className}`.trim()}
                style={{ width }}
            >
                <span className={`mt-1 h-2 w-2 rounded-full ${toneStyle.dot}`} />
                <div className="flex flex-col gap-1">
                    {title ? <span className="font-semibold text-white">{title}</span> : null}
                    {description ? <span className="text-slate-300">{description}</span> : null}
                </div>
            </div>
        </Html3D>
    );
}
