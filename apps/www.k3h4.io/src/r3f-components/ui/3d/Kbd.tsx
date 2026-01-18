import { Html } from "./Html";

export type KbdProps = {
    position?: [number, number, number];
    keys: string;
    className?: string;
};

export function Kbd({ position = [0, 1, 0], keys, className = "" }: KbdProps) {
    return (
        <Html position={position} distanceFactor={9}>
            <span className={`inline-flex items-center gap-1 rounded-lg border border-white/15 bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-sm ${className}`.trim()}>
                {keys}
            </span>
        </Html>
    );
}
