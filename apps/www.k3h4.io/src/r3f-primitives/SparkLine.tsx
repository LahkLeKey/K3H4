import { Html, Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export type SparkLineProps = {
    points: number[];
    color?: string;
    width?: number;
    height?: number;
    position?: [number, number, number];
};

export function SparkLine({ points, color = "#22d3ee", width = 2.4, height = 0.8, position = [0, 0, 0] }: SparkLineProps) {
    const linePoints = useMemo(() => {
        const len = Math.max(points.length, 2);
        const verts: THREE.Vector3[] = [];
        const max = Math.max(...points, 1);
        points.forEach((p, i) => {
            const x = (i / (len - 1)) * width;
            const y = (p / max) * height;
            verts.push(new THREE.Vector3(x, y, 0));
        });
        if (verts.length === 0) verts.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(width, 0, 0));
        return verts;
    }, [points, width, height]);

    return (
        <group position={position}>
            <Line points={linePoints} color={color} lineWidth={2} />
            <Html position={[width + 0.1, height / 2, 0]} className="text-xs text-white">
                {points[points.length - 1]?.toFixed(1) ?? ""}
            </Html>
        </group>
    );
}
