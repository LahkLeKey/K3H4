import { Html } from "./Html";

export type ProgressProps = {
    position?: [number, number, number];
    width?: number;
    value: number; // 0-100
    accent?: string;
    className?: string;
};

export function Progress({ position = [0, 1, 0], width = 220, value, accent = "#7fe4d0", className = "" }: ProgressProps) {
    const clamped = Math.min(100, Math.max(0, value));
    return (
        <Html position={position} distanceFactor={9}>
            <div className={`h-2 w-full rounded-full bg-white/10 ${className}`.trim()} style={{ width }}>
                <div className="h-2 rounded-full" style={{ width: `${clamped}%`, background: accent }} />
            </div>
        </Html>
    );
}
