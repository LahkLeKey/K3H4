import { Html3D } from "./Html3D";

export type Kbd3DProps = {
    position?: [number, number, number];
    keys: string;
    className?: string;
};

export function Kbd3D({ position = [0, 1, 0], keys, className = "" }: Kbd3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <span className={`inline-flex items-center gap-1 rounded-lg border border-white/15 bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-sm ${className}`.trim()}>
                {keys}
            </span>
        </Html3D>
    );
}
