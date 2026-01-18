import { Html3D } from "./Html3D";

export type StatChip3DProps = {
    position?: [number, number, number];
    label: string;
    value: string;
    accent?: string;
    delta?: string;
};

export function StatChip3D({ position = [0, 1.1, 0], label, value, accent = "#7fe4d0", delta }: StatChip3DProps) {
    return (
        <Html3D position={position} distanceFactor={8}>
            <div className="flex min-w-[180px] items-start justify-between rounded-2xl border border-white/12 bg-slate-950/80 px-4 py-3 text-left shadow-xl backdrop-blur">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span>
                    <span className="text-xl font-semibold text-white">{value}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                    {delta ? <span className="text-[11px] font-semibold text-emerald-200">{delta}</span> : null}
                </div>
            </div>
        </Html3D>
    );
}
