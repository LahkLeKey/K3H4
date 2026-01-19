import { Html } from "@react-three/drei";

export type StatusBillboardProps = {
    label: string;
    value: string;
    accent?: string;
    position?: [number, number, number];
};

export function StatusBillboard({ label, value, accent = "#22c55e", position = [0, 0, 0] }: StatusBillboardProps) {
    return (
        <Html position={position} center transform distanceFactor={10} className="select-none">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                    <span className="font-semibold uppercase tracking-[0.16em] text-slate-300">{label}</span>
                    <span className="text-white">{value}</span>
                </div>
            </div>
        </Html>
    );
}
