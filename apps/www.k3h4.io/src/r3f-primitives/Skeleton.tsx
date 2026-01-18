import { Html } from "./Html";

export type SkeletonProps = {
    position?: [number, number, number];
    width?: string | number;
    height?: string | number;
    className?: string;
};

export function Skeleton({ position = [0, 1, 0], width = "100%", height = "1rem", className = "" }: SkeletonProps) {
    return (
        <Html position={position} distanceFactor={9}>
            <div className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()} style={{ width, height }} />
        </Html>
    );
}
