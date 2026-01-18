import { Html3D } from "./Html3D";

export type Progress3DProps = {
    position?: [number, number, number];
    width?: number;
    value: number; // 0-100
    accent?: string;
    className?: string;
};

export function Progress3D({ position = [0, 1, 0], width = 220, value, accent = "#7fe4d0", className = "" }: Progress3DProps) {
    const clamped = Math.min(100, Math.max(0, value));
    return (
        <Html3D position={position} distanceFactor={9}>
            <div className={`h-2 w-full rounded-full bg-white/10 ${className}`.trim()} style={{ width }}>
                <div className="h-2 rounded-full" style={{ width: `${clamped}%`, background: accent }} />
            </div>
        </Html3D>
    );
}
