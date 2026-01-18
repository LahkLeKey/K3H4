import { Html3D } from "./Html3D";

export type Skeleton3DProps = {
    position?: [number, number, number];
    width?: string | number;
    height?: string | number;
    className?: string;
};

export function Skeleton3D({ position = [0, 1, 0], width = "100%", height = "1rem", className = "" }: Skeleton3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <div className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()} style={{ width, height }} />
        </Html3D>
    );
}
