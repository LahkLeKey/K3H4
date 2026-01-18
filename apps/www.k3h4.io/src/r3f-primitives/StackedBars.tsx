import { useMemo } from "react";
import * as THREE from "three";

export type StackedBarsProps = {
    buckets: Array<{ label: string; value: number; color?: string }>;
    width?: number;
    depth?: number;
    gap?: number;
};

export function StackedBars({ buckets, width = 0.6, depth = 0.4, gap = 0.15 }: StackedBarsProps) {
    const bars = useMemo(() => buckets.map((b, idx) => ({
        ...b,
        x: idx * (width + gap),
    })), [buckets, width, gap]);

    return (
        <group>
            {bars.map((bar) => (
                <mesh key={bar.label} position={[bar.x, bar.value / 2, 0]} castShadow>
                    <boxGeometry args={[width, Math.max(bar.value, 0.02), depth]} />
                    <meshStandardMaterial color={bar.color ?? "#60a5fa"} emissive={bar.color ?? "#60a5fa"} emissiveIntensity={0.3} />
                </mesh>
            ))}
        </group>
    );
}
