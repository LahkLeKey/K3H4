import { Html3D } from "./Html3D";

export type Spinner3DProps = {
    position?: [number, number, number];
    size?: number;
    className?: string;
};

export function Spinner3D({ position = [0, 1, 0], size = 18, className = "" }: Spinner3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <span
                className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-emerald-300 ${className}`.trim()}
                style={{ width: size, height: size }}
            />
        </Html3D>
    );
}
