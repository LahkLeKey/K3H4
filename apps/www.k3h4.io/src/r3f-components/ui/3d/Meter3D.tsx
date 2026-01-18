import { Html3D } from "./Html3D";

export type Meter3DProps = {
    position?: [number, number, number];
    label?: string;
    value: number; // 0 to 1
    accent?: string;
};

export function Meter3D({ position = [0, 1, 0], label, value, accent = "#7fe4d0" }: Meter3DProps) {
    const clamped = Math.min(1, Math.max(0, value));
    return (
        <Html3D position={position} distanceFactor={9}>
            <div className="flex min-w-[200px] flex-col gap-2 rounded-2xl border border-white/12 bg-slate-950/85 px-4 py-3 shadow-xl backdrop-blur">
                {label ? <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span> : null}
                <div className="h-2.5 w-full rounded-full bg-white/10">
                    <div className="h-2.5 rounded-full" style={{ width: `${clamped * 100}%`, background: accent }} />
                </div>
            </div>
        </Html3D>
    );
}
