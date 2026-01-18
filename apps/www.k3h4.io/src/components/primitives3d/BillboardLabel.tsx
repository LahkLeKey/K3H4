import { Html } from "@react-three/drei";

export type BillboardLabelProps = {
    position: [number, number, number];
    text: string;
    accent?: string;
};

export function BillboardLabel({ position, text, accent }: BillboardLabelProps) {
    return (
        <Html position={position} center transform distanceFactor={8} className="select-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-lg backdrop-blur">
                <span className="h-2 w-2 rounded-full" style={{ background: accent ?? "#a5f3fc" }} />
                <span>{text}</span>
            </div>
        </Html>
    );
}
