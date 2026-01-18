import { Html } from "./Html";

export type SpinnerProps = {
    position?: [number, number, number];
    size?: number;
    className?: string;
};

export function Spinner({ position = [0, 1, 0], size = 18, className = "" }: SpinnerProps) {
    return (
        <Html position={position} distanceFactor={9}>
            <span
                className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-emerald-300 ${className}`.trim()}
                style={{ width: size, height: size }}
            />
        </Html>
    );
}
