import { Html } from "@react-three/drei";
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
    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        const len = Math.max(points.length, 2);
        const verts: number[] = [];
        const max = Math.max(...points, 1);
        points.forEach((p, i) => {
            const x = (i / (len - 1)) * width;
            const y = (p / max) * height;
            verts.push(x, y, 0);
        });
        if (verts.length === 0) verts.push(0, 0, 0, width, 0, 0);
        geom.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
        return geom;
    }, [points, width, height]);

    return (
        <group position={position}>
            <line geometry={geometry}>
                <lineBasicMaterial color={color} linewidth={2} />
            </line>
            <Html position={[width + 0.1, height / 2, 0]} className="text-xs text-white">
                {points[points.length - 1]?.toFixed(1) ?? ""}
            </Html>
        </group>
    );
}
