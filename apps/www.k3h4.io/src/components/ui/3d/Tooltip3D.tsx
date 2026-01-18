import { Html3D } from "./Html3D";

export type Tooltip3DProps = {
    position?: [number, number, number];
    label: string;
    children: React.ReactNode;
    className?: string;
};

export function Tooltip3D({ position = [0, 1, 0], label, children, className = "" }: Tooltip3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <div className={`relative inline-flex ${className}`.trim()}>
                {children}
                <span className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/12 bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-xl">
                    {label}
                </span>
            </div>
        </Html3D>
    );
}
